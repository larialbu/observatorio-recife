import { useEffect, useState, useRef } from "react";
import { useReward } from "react-rewards";
import { iconsExplore } from "./ExploreIconsObservatorio";
import Link from "next/link";
import React from "react";

interface ExploreDivProps {
  searchTerm: string;
  bundleProgress: any;
  progress: any;
}

export const ExploreDiv: React.FC<ExploreDivProps> = ({ searchTerm, bundleProgress, progress }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const filteredItems = iconsExplore.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    ),
  }));

  const totalResults = filteredItems.reduce((count, section) => count + section.items.length, 0);

  return (
    <div className="w-full">
      {filteredItems.map(
        (section) =>
          section.items.length > 0 && (
            <div
              key={section.items[0].label}
              className={`grid w-full ${
                totalResults === 1
                  ? "grid-cols-1 justify-center"
                  : totalResults === 4
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-x-8 lg:px-16 sm:px-8"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:px-64 sm:px-32"
              } justify-items-center text-center gap-y-24 mt-24 observatorio-icon-wrapper`}
            >
              {section.items.map((item) => {
                const progresso = item.bundleKey ? bundleProgress[item.bundleKey] || 0 : 0;
                const isLinkDisabled = progresso < 100;

                const rewardId = `reward-${item.bundleKey}`;
                const { reward } = useReward(rewardId, "emoji", {
                  emoji: ["🔭", "🦀"],
                  elementCount: 5,
                  spread: 40,
                  startVelocity: 15,
                  position: "absolute",
                  lifetime: 70,
                });
                const prevProgress = useRef(progresso);
                useEffect(() => {
                  if (prevProgress.current < 100 && prevProgress.current >= 1 && progresso === 100) {
                    reward();
                  }
                  prevProgress.current = progresso;
                }, [progresso, reward]);

                const iconClassName = isDarkMode ? "darkin" : "";

                return (
                  <div
                    key={item.label}
                    className="relative flex flex-col pt-2 min-w-[10em] items-center group transition-transform duration-300 ease-in-out bg-white dark:bg-inherit select-none"
                  >
                    <Link
                      href={item.href || "#"}
                      className={`flex flex-col items-center select-none ${
                        isLinkDisabled ? "pointer-events-none opacity-50" : ""
                      }`}
                    >
                      <div className="relative">
                        <div
                          className={`${isLinkDisabled ? "" : "hidden dark:flex"} absolute -inset-0 rounded-full bg-blue-600 opacity-50 transition-all duration-300`}
                          style={{ clipPath: `inset(${100 - progresso}% 0 0 0)` }}
                        />
                        <div
                          className={`relative ${isLinkDisabled ? "grayscale" : ""} hover:rotate-[-5deg] border-2 border-[#0155AE] rounded-full dark:border-white transition-all duration-300 ease-in-out group-hover:scale-110 cursor-pointer select-none icon-content`}
                        >
                          <span
                            id={rewardId}
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              width: "1px",
                              height: "1px",
                              zIndex: "15"
                            }}
                          />
                          <div className="relative z-10 icon-wrapper">
                            {React.cloneElement(item.icon, {
                              className: `${item.icon.props.className} ${iconClassName} transition-transform duration-300 ease-in-out group-hover:scale-110`,
                            })}
                          </div>
                          <div className="logo-wrapper absolute z-0 bg-white rounded-full p-1 dark:bg-[#0C1B2B] transition-transform duration-300 ease-in-out group-hover:scale-110">
                            {React.cloneElement(item.logo, {
                              className: `${item.logo.props.className} ${iconClassName} w-full h-full`,
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="text-[#0155AE] text-lg mt-2 font-light dark:text-white transition-all duration-300 ease-in-out z-50 dark:group-hover:text-[#ffffff]/80 group-hover:text-[#0155AE]/80">
                        {item.label}
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )
      )}
    </div>
  );
};
