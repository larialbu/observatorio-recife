import React, { useState } from "react";
import GenericModal from "./GenericModal";
import { useTutorial } from "./TutorialProvider";

interface CardProps {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  tutorial: string | JSX.Element;
}

const HelpCard: React.FC<CardProps> = ({ id, title, description, icon }) => {
  const tutorials = useTutorial();
  const tutorial = tutorials[id] || { content: "Conteúdo não encontrado." };
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="relative h-[320px] bg-gray-100 dark:bg-[#1d2b3d] p-8 rounded-lg shadow-md hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-gray-200"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="w-20 flex mb-8">
          {icon}
        </div>
        <div className="absolute top-32 pr-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-white dark:opacity-75">{description}</p>
        </div>
      </div>

      <GenericModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title={title}
      description={tutorial.description}
      tutorial={tutorial.content}
      />
    </>
  );
};


const GettingStarted: React.FC = () => {
  const helpItems = [
    { 
      id: "esconderGraficos",
      title: "Esconder Gráficos",
      description:
        "Oculte todos os gráficos para facilitar a navegação visual.",
      icon: (
        <svg viewBox="0 0 24 24" className="fill-[#0155AE]" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.61399 4.21063C3.17804 3.87156 2.54976 3.9501 2.21069 4.38604C1.87162 4.82199 1.95016 5.45027 2.38611 5.78934L4.66386 7.56093C3.78436 8.54531 3.03065 9.68043 2.41854 10.896L2.39686 10.9389C2.30554 11.1189 2.18764 11.3514 2.1349 11.6381C2.09295 11.8661 2.09295 12.1339 2.1349 12.3618C2.18764 12.6485 2.30554 12.881 2.39686 13.0611L2.41854 13.104C4.35823 16.956 7.71985 20 12.0001 20C14.2313 20 16.2129 19.1728 17.8736 17.8352L20.3861 19.7893C20.8221 20.1284 21.4503 20.0499 21.7894 19.6139C22.1285 19.178 22.0499 18.5497 21.614 18.2106L3.61399 4.21063ZM16.2411 16.5654L14.4434 15.1672C13.7676 15.6894 12.9201 16 12.0001 16C9.79092 16 8.00006 14.2091 8.00006 12C8.00006 11.4353 8.11706 10.898 8.32814 10.4109L6.24467 8.79044C5.46659 9.63971 4.77931 10.6547 4.20485 11.7955C4.17614 11.8525 4.15487 11.8948 4.13694 11.9316C4.12114 11.964 4.11132 11.9853 4.10491 12C4.11132 12.0147 4.12114 12.036 4.13694 12.0684C4.15487 12.1052 4.17614 12.1474 4.20485 12.2045C5.9597 15.6894 8.76726 18 12.0001 18C13.5314 18 14.9673 17.4815 16.2411 16.5654ZM10.0187 11.7258C10.0064 11.8154 10.0001 11.907 10.0001 12C10.0001 13.1046 10.8955 14 12.0001 14C12.2667 14 12.5212 13.9478 12.7538 13.8531L10.0187 11.7258Z"/>
          <path d="M10.9506 8.13908L15.9995 12.0661C15.9999 12.0441 16.0001 12.022 16.0001 12C16.0001 9.79085 14.2092 7.99999 12.0001 7.99999C11.6369 7.99999 11.285 8.04838 10.9506 8.13908Z"/>
          <path d="M19.7953 12.2045C19.4494 12.8913 19.0626 13.5326 18.6397 14.1195L20.2175 15.3467C20.7288 14.6456 21.1849 13.8917 21.5816 13.104L21.6033 13.0611C21.6946 12.881 21.8125 12.6485 21.8652 12.3618C21.9072 12.1339 21.9072 11.8661 21.8652 11.6381C21.8125 11.3514 21.6946 11.1189 21.6033 10.9389L21.5816 10.896C19.6419 7.04402 16.2803 3.99998 12.0001 3.99998C10.2848 3.99998 8.71714 4.48881 7.32934 5.32257L9.05854 6.66751C9.98229 6.23476 10.9696 5.99998 12.0001 5.99998C15.2329 5.99998 18.0404 8.31058 19.7953 11.7955C19.824 11.8525 19.8453 11.8948 19.8632 11.9316C19.879 11.964 19.8888 11.9853 19.8952 12C19.8888 12.0147 19.879 12.036 19.8632 12.0684C19.8453 12.1052 19.824 12.1474 19.7953 12.2045Z"/>
        </svg>
        
      ),
    },
    { 
      id: "telaCheia",
      title: "Tela Cheia",
      description:
        "Ative o modo de tela cheia para visualizar os dados em tela inteira.",
      icon: (
        <svg className="fill-[#52B348]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M3 4C3 3.44772 3.44772 3 4 3H8C8.55228 3 9 3.44772 9 4C9 4.55228 8.55228 5 8 5H6.41421L9.70711 8.29289C10.0976 8.68342 10.0976 9.31658 9.70711 9.70711C9.31658 10.0976 8.68342 10.0976 8.29289 9.70711L5 6.41421V8C5 8.55228 4.55228 9 4 9C3.44772 9 3 8.55228 3 8V4ZM16 3H20C20.5523 3 21 3.44772 21 4V8C21 8.55228 20.5523 9 20 9C19.4477 9 19 8.55228 19 8V6.41421L15.7071 9.70711C15.3166 10.0976 14.6834 10.0976 14.2929 9.70711C13.9024 9.31658 13.9024 8.68342 14.2929 8.29289L17.5858 5H16C15.4477 5 15 4.55228 15 4C15 3.44772 15.4477 3 16 3ZM9.70711 14.2929C10.0976 14.6834 10.0976 15.3166 9.70711 15.7071L6.41421 19H8C8.55228 19 9 19.4477 9 20C9 20.5523 8.55228 21 8 21H4C3.44772 21 3 20.5523 3 20V16C3 15.4477 3.44772 15 4 15C4.55228 15 5 15.4477 5 16V17.5858L8.29289 14.2929C8.68342 13.9024 9.31658 13.9024 9.70711 14.2929ZM14.2929 14.2929C14.6834 13.9024 15.3166 13.9024 15.7071 14.2929L19 17.5858V16C19 15.4477 19.4477 15 20 15C20.5523 15 21 15.4477 21 16V20C21 20.5523 20.5523 21 20 21H16C15.4477 21 15 20.5523 15 20C15 19.4477 15.4477 19 16 19H17.5858L14.2929 15.7071C13.9024 15.3166 13.9024 14.6834 14.2929 14.2929Z"/>
        </svg>
      ),
    },
    { 
      id: "baixarGraficos",
      title: "Baixar os Gráficos",
      description:
        "Baixe os gráficos em formato de imagem para uso externo ou relatórios.",
      icon: (
        <svg className="stroke-2 stroke-[#EC6625]" viewBox="0 0 24 24"xmlns="http://www.w3.org/2000/svg">
          <g id="Interface / Download">
            <path id="Vector" d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        </svg>
      ),
    },
    {
      id: "quadro",
      title: "Quadro",
      description:
        "Monte seu próprio painel de análise com gráficos, anotações e desenhos.",
      icon: (
        <svg className="fill-purple-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.8944 5.44721C18.1414 4.95324 17.9412 4.35256 17.4472 4.10557C16.9532 3.85858 16.3526 4.05881 16.1056 4.55279L13.6414 9.48107L11.0435 7.53264C10.3319 6.99895 9.31491 7.19817 8.85727 7.96089L6.14251 12.4855C5.85836 12.9591 6.01192 13.5733 6.4855 13.8575C6.95908 14.1416 7.57334 13.9881 7.85749 13.5145L10.287 9.46527L12.9207 11.4405C13.6694 12.0021 14.7438 11.7484 15.1624 10.9114L17.8944 5.44721Z"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M23 4C23 2.34315 21.6569 1 20 1H4C2.34315 1 1 2.34315 1 4V14C1 15.6569 2.34315 17 4 17H10.438L5.35982 21.2318C4.93554 21.5853 4.87821 22.2159 5.23178 22.6402C5.58534 23.0645 6.21591 23.1218 6.64018 22.7682L11 19.135V22C11 22.5523 11.4477 23 12 23C12.5523 23 13 22.5523 13 22V19.135L17.3598 22.7682C17.7841 23.1218 18.4147 23.0645 18.7682 22.6402C19.1218 22.2159 19.0645 21.5853 18.6402 21.2318L13.562 17H20C21.6569 17 23 15.6569 23 14V4ZM21 4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V14C3 14.5523 3.44772 15 4 15H20C20.5523 15 21 14.5523 21 14V4Z"/>
        </svg>
      ),
    },
    {
      id: "tema",
      title: "Alterar Tema",
      description:
        "Mude entre tema claro e escuro para sua preferência visual.",
      icon: (
        <svg className="rotate-0 transition-transform duration-500 fill-[#facc00]" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd">
            <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -4199.000000)">
              <g id="icons" transform="translate(56.000000, 160.000000)">
                <path d="M126,4049 C126,4044.589 129.589,4041 134,4041 L134,4057 C129.589,4057 126,4053.411 126,4049 M134,4039 C128.477,4039 124,4043.477 124,4049 C124,4054.523 128.477,4059 134,4059 C139.523,4059 144,4054.523 144,4049 C144,4043.477 139.523,4039 134,4039"></path>
              </g>
            </g>
          </g>
        </svg>
      ),
    },
  ];

  return (
    <div className="container max-w-[1120px] px-4 py-10 flex flex-col">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center self-start">Começando Agora?</h2>
      <p className="text-lg mb-8 text-gray-600 dark:text-white text-center self-start">Aprenda a usar nossas funcionalidades!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-9">
        {helpItems.map((item, index) => (
          <HelpCard tutorial={""} key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default GettingStarted;