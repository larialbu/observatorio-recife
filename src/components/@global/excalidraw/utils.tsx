import domtoimage from "dom-to-image-more";

export const loadImageFromDataURL = (dataURL: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataURL;
  });
};

export const captureChartSVG = (chartWrapper: HTMLElement) => {
  const svgElem = chartWrapper.querySelector("svg.recharts-surface") as SVGSVGElement | null;
  if (!svgElem) {
    console.error("SVG com a classe 'recharts-surface' não encontrado.");
    return null;
  }

  const clonedSvg = svgElem.cloneNode(true) as SVGSVGElement;
  const svgRect = svgElem.getBoundingClientRect();
  const chartWidth = svgRect.width || 300;
  clonedSvg.setAttribute("width", chartWidth.toString());

  const paths = clonedSvg.querySelectorAll("path.recharts-rectangle");

  if (paths.length > 15) {
    const first15 = Array.from(paths).slice(0, 15);
    Array.from(paths).slice(15).forEach((el, idx) => {
      (el as Element).remove();
    });

    let minY = Infinity;
    let maxY = -Infinity;
    first15.forEach((el) => {
      const yAttr = el.getAttribute("y");
      const heightAttr = el.getAttribute("height");
      if (yAttr && heightAttr) {
        const y = parseFloat(yAttr);
        const height = parseFloat(heightAttr);
        if (y < minY) {
          minY = y;
        }
        const bottom = y + height;
        if (bottom > maxY) {
          maxY = bottom;
        }
      }
    });

    const unionHeight = maxY - minY;
    const offset = 40; //pixelzinhos extras
    const marginTop = 30;
    const newHeight = unionHeight + offset + marginTop;

    const gWrapper = document.createElementNS("http://www.w3.org/2000/svg", "g");
    while (clonedSvg.firstChild) {
      gWrapper.appendChild(clonedSvg.firstChild);
    }
    gWrapper.setAttribute("transform", `translate(0, ${marginTop})`);
    clonedSvg.appendChild(gWrapper);

    clonedSvg.setAttribute("height", newHeight.toString());
    clonedSvg.setAttribute("viewBox", `0 ${minY - marginTop} ${chartWidth} ${newHeight}`);

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(clonedSvg);
    const base64Chart = window.btoa(
      encodeURIComponent(svgString).replace(/%([0-9A-F]{2})/g, (match, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );

    return {
      dataURL: `data:image/svg+xml;base64,${base64Chart}`,
      width: chartWidth,
      height: newHeight,
    };
  } else {
    clonedSvg.setAttribute("height", svgRect.height.toString());
    clonedSvg.setAttribute("viewBox", `0 0 ${chartWidth} ${svgRect.height}`);
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(clonedSvg);
    const base64Chart = window.btoa(
      encodeURIComponent(svgString).replace(/%([0-9A-F]{2})/g, (match, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );
    return {
      dataURL: `data:image/svg+xml;base64,${base64Chart}`,
      width: chartWidth,
      height: svgRect.height,
    };
  }
};




export const captureElementAsPNG = async (elem: HTMLElement) => {
  const rect = elem.getBoundingClientRect();
  const width = rect.width || 300;
  const height = rect.height || 50;
  const dataURL = await domtoimage.toPng(elem, {
    cacheBust: true,
    bgcolor: "#ffffff",
    useCORS: true,
    width,
    height,
    style: {
      width: width + "px",
      height: height + "px",
      transform: "none",
      boxShadow: "none",
      border: "none",
    },

    onclone: (clonedDoc: Document) => {
      clonedDoc.querySelectorAll("*").forEach((node) => {
        const el = node as HTMLElement;
        const bg = window.getComputedStyle(el).backgroundColor;
        if (bg && bg !== "rgb(255, 255, 255)" && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
          el.style.backgroundColor = "#fff";
        }
        el.style.transform = "none";
        el.style.boxShadow = "none";
        el.style.border = "none";
      });
      
    },
  });
  return { dataURL, width, height };
};


export const createCompositeChartImage = async (chartWrapper: HTMLElement): Promise<string | null> => {

  const chartData = captureChartSVG(chartWrapper);
  if (!chartData) return null;

  const titleElem = chartWrapper.querySelector("h3") as HTMLElement | null;
  
  const legendElem = chartWrapper.querySelector(".recharts-legend-wrapper") as HTMLElement | null;
  const titleData = titleElem ? await captureElementAsPNG(titleElem) : null;
  const legendData = legendElem ? await captureElementAsPNG(legendElem) : null;

  const chartImg = await loadImageFromDataURL(chartData.dataURL);
  const titleImg = titleData ? await loadImageFromDataURL(titleData.dataURL) : null;
  const legendImg = legendData ? await loadImageFromDataURL(legendData.dataURL) : null;

  const compositeWidth = Math.max(
    chartImg.width,
    titleImg ? titleImg.width : 0,
    legendImg ? legendImg.width : 0
  );
  const compositeHeight =
    (titleImg ? titleImg.height : 0) + chartImg.height + (legendImg ? legendImg.height : 0);

  const compositeCanvas = document.createElement("canvas");
  compositeCanvas.width = compositeWidth;
  compositeCanvas.height = compositeHeight;
  const ctx = compositeCanvas.getContext("2d");
  if (!ctx) return null;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, compositeWidth, compositeHeight);

  let yOffset = 0;
  if (titleImg) {
    const offsetX = (compositeWidth - titleImg.width);
    ctx.drawImage(titleImg, offsetX, yOffset);
    yOffset += titleImg.height;
  }
  const offsetXChart = (compositeWidth - chartImg.width);
  ctx.drawImage(chartImg, offsetXChart, yOffset);
  yOffset += chartImg.height;
  if (legendImg) {
    const offsetXLegend = (compositeWidth - legendImg.width);
    ctx.drawImage(legendImg, offsetXLegend, yOffset);
  }
  
  return compositeCanvas.toDataURL("image/png");
};
