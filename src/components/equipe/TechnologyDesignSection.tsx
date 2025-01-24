import React from "react";

// Defina a interface de tipo de membro
export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

// Componente: TechnologyDesignSection
// Recebe um array de `lastSectionMembers` para exibir
export function TechnologyDesignSection({
  lastSectionMembers,
}: {
  lastSectionMembers: TeamMember[];
}) {
  return (
    <section className="relative w-full bg-gradient-to-t from-white to-blue-50 dark:bg-[#0c2136] dark:from-[#0c2136] dark:to-[#0c2136] px-6 py-16 overflow-hidden flex flex-col justify-center">
      {/* Onda no topo */}
      <svg
        className="absolute top-0 left-0 w-full pointer-events-none fill-white dark:fill-[#0C1B2B]"
        viewBox="0 0 1440 320"
      >
        <path fillOpacity="1" d="M0,64L1440,192L1440,0L0,0Z" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto mb-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Nossa Equipe de Tecnologia &amp; Design
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Criando soluções que transformam ideias em realidade.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-6xl mx-auto relative z-10">
        {lastSectionMembers.map((member, index) => (
          <div
            key={index}
            className="
              group
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
    </section>
  );
}
