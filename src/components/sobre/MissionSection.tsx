import React from "react";

// O componente Card não precisa de alterações, pois é reutilizável.
interface CardProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const InfoCard: React.FC<CardProps> = ({ title, description, icon }) => (
  <div
    className="
      flex h-full flex-col items-center justify-start
      bg-gray-50 dark:bg-[#1d2b3d]
      rounded-xl shadow-md
      p-6
      text-center
      transition-transform
      transform hover:-translate-y-2 hover:shadow-xl
    "
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

// O componente principal foi renomeado e seu conteúdo, atualizado.
export const AboutSdeSection: React.FC = () => {
  const cardsData = [
    {
      title: "Nossa Missão",
      description:
        "Formular e executar as políticas de desenvolvimento econômico do Recife, focando na geração de emprego e renda, na atração de investimentos e no fomento à inovação e ao empreendedorismo.",
      icon: (
        // Ícone de alvo/meta para "Missão"
        <svg
          className="w-8 h-8 stroke-[#0155AE]"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="6"></circle>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>
      ),
    },
    {
      title: "Áreas de Atuação",
      description:
        "Nossa atuação abrange o fomento à ciência e tecnologia, o apoio à economia criativa, o desenvolvimento do turismo e lazer e o fortalecimento de um ambiente de negócios inovador e competitivo na cidade.",
      icon: (
        // Ícone de maleta para "Atuação" (Negócios)
        <svg
          className="w-8 h-8 stroke-[#52B348]"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
    },
    {
      title: "Visão de Futuro",
      description:
        "Consolidar o Recife como um polo de desenvolvimento sustentável, uma cidade inteligente, criativa e inovadora, que oferece um ambiente de negócios próspero e mais qualidade de vida para seus cidadãos.",
      icon: (
        <svg
          // Atributos Padrão do SVG
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"

          className="w-8 h-8 text-[#EC6625]"
        >
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9.2 18 8a6 6 0 0 0-12 0c0 1.2.3 2.2 1.5 3.5.7.7 1.2 1.5 1.5 2.5" />
          
          <path d="M9 18h6" />

          <path d="M10 22h4" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full py-12 md:py-20 bg-white dark:bg-[#0C1B2B]">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Conheça a Secretaria de Desenvolvimento Econômico
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Trabalhando para um Recife mais próspero, inovador e sustentável.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cardsData.map((card, index) => (
            <InfoCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};