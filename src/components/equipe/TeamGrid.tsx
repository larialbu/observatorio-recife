import React from "react";

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export const TeamGrid: React.FC<{ members: TeamMember[] }> = ({ members }) => {
  return (
    <div className="flex flex-wrap items-center justify-center lg:justify-between max-w-6xl mx-auto gap-y-8 gap-x-4">
      {members.map((member, index) => (
        <div
          key={index}
          className="
            group w-72
            bg-white dark:bg-gray-800
            rounded-3xl shadow-xl
            transform transition
            hover:-translate-y-3 hover:shadow-2xl
            overflow-hidden
          "
        >
          <div className="relative w-full h-56 overflow-hidden">
            <img
              src={member.image}
              alt={member.name}
              className="
                w-full h-full object-cover
                transition-transform
                duration-500
                group-hover:scale-110
              "
            />
            <div className="absolute inset-0 from-black via-transparent to-transparent opacity-50" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              {member.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {member.role}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
