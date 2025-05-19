import React, { useState, useRef, useEffect, useId } from "react";
import html2canvas from "html2canvas";
import OptionsMenu from "./OptionsMenu";
import { useDashboard } from "@/context/DashboardContext";
import { usePathname } from "next/navigation";
import { useExcalidraw } from "@/components/@global/excalidraw/context/useContext";

const ChartGrabber = ({
  children,
  left,
}: {
  children: React.ReactNode;
  left?: boolean;
}) => {
  const { filters, hiddenCharts, addHiddenChart } = useDashboard();
  const { addChartToExcalidraw } = useExcalidraw();

  const pathname = usePathname();
  const category = pathname.split('/')[2] || 'default';
  const chartId = useId();
  const chartWrapperRef = useRef<HTMLElement | null>(null);

  const additionalFilters = filters.additionalFilters
  const yearFilter = filters?.year || filters.years[filters.years.length - 1]

  const [showTempContainer, setShowTempContainer] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [chartTitle, setChartTitle] = useState("grafico");
  const [chartSubText, setChartSubText] = useState<string | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const tempChartRef = useRef<HTMLDivElement>(null);
  const chartIsHidden = hiddenCharts.find((chart) => chart.title === chartTitle)

  useEffect(() => {
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.props.title) {
          setChartTitle(child.props.title);
        }
        if (child.props.subText) {
          setChartSubText(child.props.subText);
        }
      }
    });
  }, [children]);

  useEffect(() => {
    if (chartRef.current) {
      chartWrapperRef.current = chartRef.current.closest('.chart-content-wrapper');
    }
  }, []);

  useEffect(() => {
    if (chartIsHidden && chartWrapperRef.current) {
      chartWrapperRef.current.style.display = 'none';
    } else if (!chartIsHidden && chartWrapperRef.current) {
      chartWrapperRef.current.style.display = 'flex';
    }

  }, [chartWrapperRef.current, hiddenCharts]);

  useEffect(() => {
    if (chartRef.current) {
      // Navega até o avô (container com a classe 'chart-content-wrapper')
      chartWrapperRef.current = chartRef.current.closest('.chart-content-wrapper');
    }
  }, []);

  const handleAddToExcalidraw = async () => {
    if (chartWrapperRef.current) {
      await addChartToExcalidraw(chartWrapperRef.current);
    } else {
      console.error("Container do gráfico não encontrado.");
    }
  };

  const handleDownload = () => {
    setShowTempContainer(true);
    setTimeout(() => {
      captureChartImage();
    }, 2000);
  };

  const handleHide = async () => {
    if (chartWrapperRef.current) {
      const clonedElement = chartWrapperRef.current.cloneNode(true) as HTMLElement;
      
      chartWrapperRef.current.style.display = 'none';

      const menus = clonedElement.getElementsByClassName('options-menu');
      while (menus.length > 0) {
        menus[0].parentNode?.removeChild(menus[0]);
      }
  
      const buttons = clonedElement.getElementsByClassName('options-button');
      while (buttons.length > 0) {
        buttons[0].parentNode?.removeChild(buttons[0]);
      }
  
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.appendChild(clonedElement);
      document.body.appendChild(tempDiv);
  
      setTimeout( async() => {
      const canvas = await html2canvas(tempDiv.firstChild as HTMLElement, {
        scale: 0.3,
        useCORS: true,
      });
      const thumbnailUrl = canvas.toDataURL("image/png");
      document.body.removeChild(tempDiv);
  
      addHiddenChart({
        id: chartId,
        category,
        title: chartTitle,
        subText: chartSubText || undefined,
        component: children,
        wrapperElement: chartWrapperRef.current,
        originalDisplay: chartWrapperRef.current?.style.display || '',
        thumbnailUrl
      });
      }, 100)

      
    }
  };

  const captureChartImage = () => {
    if (tempChartRef.current) {
      const buttonContainers =
        tempChartRef.current.getElementsByClassName("button-container");
      Array.from(buttonContainers).forEach((element) => {
        element.parentNode?.removeChild(element);
      });
      const isDarkMode = document.documentElement.classList.contains("dark");
      html2canvas(tempChartRef.current, {
        backgroundColor: isDarkMode ? "#0C1B2B" : "white",
        scale: 2,
        useCORS: true,
      }).then((canvas) => {
        const link = document.createElement("a");
        link.download = `${chartTitle.replace(/\s+/g, "_").toLowerCase()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        setShowTempContainer(false);
      });
    }
  };

  const handleFullScreen = () => {
    if (chartRef.current) {
      const isDarkMode = document.documentElement.classList.contains("dark");
      chartRef.current.style.backgroundColor = isDarkMode ? "#0C1B2B" : "white";
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
            onFullScreen={isFullScreen ? handleExitFullScreen : handleFullScreen}
            isFullScreen={isFullScreen}
            onHide={handleHide}
            onAddToExcalidraw={handleAddToExcalidraw}
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
            backgroundColor: document.documentElement.classList.contains("dark")
            ? "#0C1B2B"
            : "white",
            lineHeight: "normal",
          }}
          ref={tempChartRef}
        >
          {removeButtonContainer(children)}
          <div className="border shadow-md rounded-md p-4 text-sm text-gray-700 dark:text-gray-300">
          <ul>
            <li><strong>Filtros:</strong></li>
            
            <li className="mt-2"><strong>Ano:</strong> {yearFilter}</li>
              {additionalFilters
                .filter((filter) => filter.selected.length > 0)
                .map((filter, index) => {
                  const filterSelected = filter.selected;
                  const filterLength = filterSelected.length;

                  return (
                    <li key={index} className="mt-2">
                      <strong>{filter.label}:</strong>{" "}
                      {filterLength > 5
                        ? `${filterSelected.slice(0, 5).join(", ")}... e outros (${filterLength - 5})`
                        : filterSelected.join(", ")}
                    </li>
                  );
                })}
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