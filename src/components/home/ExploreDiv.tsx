import { useEffect, useState, useRef } from "react";
import { useReward } from "react-rewards";
import { iconsExplore } from "./ExploreIconsObservatorio";
import { ExploreItem } from "./ExploreItem"
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
              className={`grid w-full justify-center ${
                totalResults === 1
                  ? "grid-cols-1 justify-center"
                  : totalResults === 4
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-x-8 lg:px-16 sm:px-8"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:px-32 sm:px-32"
              } justify-items-center text-center gap-y-24 mt-24 observatorio-icon-wrapper`}
            >
              {section.items.map((item) => (
                <ExploreItem
                  key={item.label}
                  item={item}
                  bundleProgress={bundleProgress}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          )
      )}
    </div>
  );
};
