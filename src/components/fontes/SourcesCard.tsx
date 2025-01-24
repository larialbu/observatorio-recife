import React from "react";

interface SourcesCardProps {
  collaborator: {
    name: string;
    description: string;
    imageUrl?: string;
    href: string;
  };
  onClick: () => void;
}

export const SourcesCard: React.FC<SourcesCardProps> = ({
  collaborator,
  onClick,
}) => (
  <div
    onClick={onClick}
    className="
      group
      relative
      flex
      flex-col
      items-center
      justify-center
      rounded-xl
      bg-white
      dark:bg-[#1d2b3d]
      shadow-md
      cursor-pointer
      p-6
      transition
      hover:scale-105
      hover:shadow-2xl
    "
  >
    <div
      className="
        absolute inset-0 rounded-xl
        pointer-events-none opacity-0
        group-hover:opacity-100 transition-opacity
      "
      style={{
        background: "linear-gradient(135deg, rgba(0,255,188,0.4), rgba(0,153,255,0.4))",
      }}
    />
    {collaborator.imageUrl ? (
      <img
        src={collaborator.imageUrl}
        alt={collaborator.name}
        className=" 
            w-24
            h-24
            object-contain
            pointer-events-none
            transition-transform
            mb-2
            dark:invert 
            dark:grayscale 
            dark:brightness-0 
            duration-0 
            dark:duration-0 
            z-10"
      />
    ) : (
      <div className="w-24 h-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full">
        <span className="text-sm text-gray-600 dark:text-gray-300">Sem logo</span>
      </div>
    )}
  </div>
);
