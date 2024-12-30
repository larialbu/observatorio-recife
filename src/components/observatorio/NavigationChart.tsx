import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import OptionsMenu from "../@global/features/OptionsMenu";

import { useRouter } from "next/navigation";

export const NavigationChart = ({
  children,
  to,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  //   const [showTempContainer, setShowTempContainer] = useState(false);
  //   const [isFullScreen, setIsFullScreen] = useState(false);
  //   const chartRef = useRef<HTMLDivElement>(null);
  //   const tempChartRef = useRef<HTMLDivElement>(null);

  //   const handleDownload = () => {
  //     setShowTempContainer(true);
  //     setTimeout(() => {
  //       captureChartImage();
  //     }, 2000);
  //   };

  //   const captureChartImage = () => {
  //     if (tempChartRef.current) {
  //       const buttonContainers =
  //         tempChartRef.current.getElementsByClassName("button-container");
  //       Array.from(buttonContainers).forEach((element) => {
  //         element.parentNode?.removeChild(element);
  //       });

  //       html2canvas(tempChartRef.current, { backgroundColor: "white" }).then(
  //         (canvas) => {
  //           const link = document.createElement("a");
  //           link.download = "grafico.png";
  //           link.href = canvas.toDataURL();
  //           link.click();

  //           setShowTempContainer(false);
  //         }
  //       );
  //     }
  //   };

  //   const handleFullScreen = () => {
  //     if (chartRef.current) {
  //       chartRef.current.style.backgroundColor = "white";
  //       chartRef.current.requestFullscreen();
  //       setIsFullScreen(true);
  //       chartRef.current.onfullscreenchange = () => {
  //         if (!document.fullscreenElement) {
  //           setIsFullScreen(false);
  //           chartRef.current!.style.backgroundColor = "";
  //         }
  //       };
  //     }
  //   };

  //   const handleExitFullScreen = () => {
  //     if (document.fullscreenElement) {
  //       document.exitFullscreen();
  //     }
  //   };

  //   const removeButtonContainer = (element: React.ReactNode): React.ReactNode => {
  //     if (!React.isValidElement(element)) {
  //       return element;
  //     }

  //     const elementProps = element.props || {};

  //     if (
  //       elementProps.className &&
  //       typeof elementProps.className === "string" &&
  //       elementProps.className.includes("button-container")
  //     ) {
  //       return null;
  //     }

  //     const children = React.Children.map(
  //       elementProps.children,
  //       removeButtonContainer
  //     );

  //     return React.cloneElement(element, { ...elementProps }, children);
  //   };
  const router = useRouter();

  const handleNavigation = () => {
    // setLoading(true);
    router.push(to);
  };

  return (
    <div className="relative pb-4 bg-white">
      <div
        // ref={chartRef}
        className={`chart-container relative `}
      >
        {/* ${
          isFullScreen ? "grid items-center pr-4 pl-4" : ""
        } */}
        <div className="h-[20px]">
          <div className={`absolute  -top-2 right-0  z-20 options-menu`}>
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={handleNavigation}
            >
              <p className="flex items-center font-semibold text-[13px] gap-2 hover:gap-4 transition-gap duration-500">
                Ir para dashboard
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
                    fill="#000000"
                  />
                </svg>
              </p>
            </button>
          </div>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};
