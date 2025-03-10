import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import OptionsMenu from "./OptionsMenu";

const ChartGrabber = ({
  children,
  left,
}: {
  children: React.ReactNode;
  left?: boolean;
}) => {
  const [showTempContainer, setShowTempContainer] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [chartTitle, setChartTitle] = useState("grafico");
  const [chartSubText, setChartSubText] = useState<string | null>(null); // Novo estado para subText
  const chartRef = useRef<HTMLDivElement>(null);
  const tempChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Extrai o título e o subText do componente filho, se disponível
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.props.title) {
          setChartTitle(child.props.title);
        }
        if (child.props.subText) {
          setChartSubText(child.props.subText); // Captura o subText
        }
      }
    });
  }, [children]);

  const handleDownload = () => {
    setShowTempContainer(true);
    setTimeout(() => {
      captureChartImage();
    }, 2000);
  };

  const captureChartImage = () => {
    if (tempChartRef.current) {
      const buttonContainers =
        tempChartRef.current.getElementsByClassName("button-container");
      Array.from(buttonContainers).forEach((element) => {
        element.parentNode?.removeChild(element);
      });

      html2canvas(tempChartRef.current, { backgroundColor: "white" }).then(
        (canvas) => {
          const link = document.createElement("a");
          link.download = `${chartTitle.replace(/\s+/g, "_").toLowerCase()}.png`;
          link.href = canvas.toDataURL();
          link.click();
          setShowTempContainer(false);
        }
      );
    }
  };

  const handleFullScreen = () => {
    if (chartRef.current) {
      chartRef.current.style.backgroundColor = "white";
      chartRef.current.requestFullscreen();
      setIsFullScreen(true);
      chartRef.current.onfullscreenchange = () => {
        if (!document.fullscreenElement) {
          setIsFullScreen(false);
          chartRef.current!.style.backgroundColor = "";
        }
      };
    }
  };

  const handleExitFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  const removeButtonContainer = (element: React.ReactNode): React.ReactNode => {
    if (!React.isValidElement(element)) {
      return element;
    }
    const elementProps = element.props || {};
    if (
      elementProps.className &&
      typeof elementProps.className === "string" &&
      elementProps.className.includes("button-container")
    ) {
      return null;
    }
    const children = React.Children.map(
      elementProps.children,
      removeButtonContainer
    );
    return React.cloneElement(element, { ...elementProps }, children);
  };

  return (
    <div className="w-full">
      <div
        ref={chartRef}
        className={`chart-container relative ${
          isFullScreen ? "flex items-center justify-center pr-4 pl-4" : ""
        }`}
      >
        <div className={`absolute w-[100%] h-full`}>
          <OptionsMenu
            left={left}
            onDownload={handleDownload}
            onFullScreen={
              isFullScreen ? handleExitFullScreen : handleFullScreen
            }
            isFullScreen={isFullScreen}
          />
        </div>
        <div className={`${isFullScreen ? "w-[80%]" : ""} z-10`}>
          {children}
        </div>
      </div>

      {showTempContainer && (
        <div
          className="capture_div p-10"
          style={{
            width: "650px",
            height: "fit-content",
            position: "absolute",
            top: "-9999px",
            left: "-9999px",
            paddingBottom: "20px",
            background: "white",
            lineHeight: "normal",
          }}
          ref={tempChartRef}
        >
          <div className="!flex !items-center !justify-center"></div>
          {removeButtonContainer(children)}
          <div className="p-4">
            <ul>
              <li>Filtros:</li>
              <li>AEROPORTO NOME: Recife, Salvador e Rio de Janeiro</li>
            </ul>
          </div>
          {/* Adiciona o subText ao container temporário */}
          {chartSubText && (
            <p
              className="font-medium text-center mt-4"
              style={{ color: "#333" }} // Cor padrão para o subText
            >
              {chartSubText}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ChartGrabber;