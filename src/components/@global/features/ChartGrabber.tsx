import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import OptionsMenu from "./OptionsMenu";
import { useDashboard } from "@/context/DashboardContext";

const ChartGrabber = ({
  children,
  left,
}: {
  children: React.ReactNode;
  left?: boolean;
}) => {

  const { filters } = useDashboard()

  const additionalFilters = filters.additionalFilters
  const yearFilter = filters?.year || filters.years[filters.years.length - 1]

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

      html2canvas(tempChartRef.current, {
        backgroundColor: "white",
        scale: 2, // Melhora a resolução da imagem
        useCORS: true, // Garante que imagens externas sejam renderizadas corretamente
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
          {removeButtonContainer(children)}
          <div className="border shadow-md rounded-md p-4 text-sm text-gray-700">
          <ul>
            <li><strong>Filtros:</strong></li>
            
            <li className="mt-2"><strong>Ano:</strong> {yearFilter}</li>
              {additionalFilters
                .filter((filter) => filter.selected.length > 0) // Filtra apenas os que têm itens selecionados
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