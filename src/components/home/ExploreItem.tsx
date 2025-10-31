import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useReward } from "react-rewards";
import { ExploreIcon } from "./ExploreIcon";

export const ExploreItem = ({ item, bundleProgress, isDarkMode }: {
  item: any;
  bundleProgress: any;
  isDarkMode: boolean;
}) => {
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
        <ExploreIcon progresso={progresso} isLinkDisabled={isLinkDisabled} rewardId={rewardId} icon={item.icon} logo={item.logo} iconClassName={iconClassName} />
        
        <div className="text-[#0155AE] text-lg mt-2 font-light dark:text-white transition-all duration-300 ease-in-out z-50 dark:group-hover:text-[#ffffff]/80 group-hover:text-[#0155AE]/80">
          {item.label}
        </div>
      </Link>
    </div>
  );
};
