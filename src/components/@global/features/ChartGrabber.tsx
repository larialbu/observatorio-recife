import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import OptionsMenu from "./OptionsMenu";
import { useDashboard } from "@/context/DashboardContext";

const ChartGrabber = ({
  children,
  id = 'algumacoisa-geral-1',
  left,
}: {
  children: React.ReactNode;
  id: string
  left?: boolean;
}) => {
  console.log('ID', id)

  const { filters, chartsContext, setChartsContext } = useDashboard()

  const additionalFilters = filters.additionalFilters
  const yearFilter = filters?.year || filters.years[filters.years.length - 1]

  const [showContent, setShowContent] = useState(true)
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

  const handleHiddenChart = () => {
    const chart = Object.assign({}, chartsContext.find((chart) => chart.id === id) )   
    const chartContextRomeved = chartsContext.filter((charts) => charts.id !== chart.id)

    if (showContent) {
      console.log('VAI SER APAGADO', showContent)      
      chart.order = 0 
      setChartsContext([...chartContextRomeved, chart])
      setShowContent(false)
    } else {
      console.log('VAI SER MOSTRADO', showContent)
      console.log('ORDER Q VAI Ser',+chart.id.split('-')[2])      
      chart.order = +chart.id.split('-')[2]
      console.log('ARRAY', [...chartContextRomeved, chart])
      setChartsContext([...chartContextRomeved, chart])
      setShowContent(true)
    }
    
  }

  return (
    <div className="w-full">
      <div
        ref={chartRef}
        className={`chart-container relative ${
          isFullScreen ? "flex items-center justify-center pr-4 pl-4" : ""
        }`}
      >
       {showContent ? 
       <>
        <div className={`absolute w-[100%] h-full`}>
            <OptionsMenu
              left={left}
              onDownload={handleDownload}
              onFullScreen={
                isFullScreen ? handleExitFullScreen : handleFullScreen
              }
              onHidden={handleHiddenChart}
              isFullScreen={isFullScreen}
            />
          </div>
          <div className={`${isFullScreen ? "w-[80%]" : ""} z-10`}>
            {children}
          </div>
       </> : <div><button onClick={() => {
        handleHiddenChart()
        }}>aaa</button></div> }
        
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