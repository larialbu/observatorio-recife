import React, { useState } from "react";

interface CardProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const HelpCard: React.FC<CardProps> = ({ title, description, icon }) => {
  return (
    <div className="relative h-[300px] bg-gray-100 dark:bg-[#1d2b3d] p-8 rounded-lg shadow-md hover:cursor-pointer:">
      <div className="w-20 flex mb-8">
        {icon}
      </div>
      <div className="absolute top-32 pr-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-white dark:opacity-75">{description}</p>
      </div>
    </div>
  );
};

const GettingStarted: React.FC = () => {
  const helpItems = [
    {
      title: "Gerenciando Tarefas",
      description:
        "Suas tarefas econômicas são específicas ao Recife. Incluem dados e análises disponíveis no portal.",
      icon: (
        <svg className="w-20 h-20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path fill="#0155AE" fill-rule="evenodd" d="M4,4 L9,4 C9.55228,4 10,3.55228 10,3 C10,2.44772 9.55228,2 9,2 L4,2 C2.89543,2 2,2.89543 2,4 L2,12 C2,13.1046 2.89543,14 4,14 L12,14 C13.1046,14 14,13.1046 14,12 L14,10 C14,9.44771 13.5523,9 13,9 C12.4477,9 12,9.44771 12,10 L12,12 L4,12 L4,4 Z M15.2071,2.29289 C14.8166,1.90237 14.1834,1.90237 13.7929,2.29289 L8.5,7.58579 L7.70711,6.79289 C7.31658,6.40237 6.68342,6.40237 6.29289,6.79289 C5.90237,7.18342 5.90237,7.81658 6.29289,8.20711 L7.79289,9.70711 C7.98043,9.89464 8.23478,10 8.5,10 C8.76522,10 9.01957,9.89464 9.20711,9.70711 L15.2071,3.70711 C15.5976,3.31658 15.5976,2.68342 15.2071,2.29289 Z"/>
        </svg>
        
      ),
    },
    {
      title: "Dados Econômicos",
      description:
        "Curta introdução aos principais indicadores econômicos do Recife.",
      icon: (
        <svg className="fill-[#52B348]" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <svg width="700px" height="700px" viewBox="-10 -8 30 30" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 2h2v4h6v2H7v3H5V6h6V2zM5 18h6v4h2v-4h6v-2H5v2zm14-7H5v2h12v3h2v-5z"/>
            </svg>
            <path d="M182.55 474.18c0-181.12 147.36-328.48 328.48-328.48s328.48 147.36 328.48 328.48c0 22.13-2.23 44.29-6.59 65.87l71.53 14.51c5.35-26.34 8.06-53.37 8.06-80.37 0-221.37-180.1-401.47-401.47-401.47s-401.47 180.1-401.47 401.47c0 159.39 94.34 303.76 240.34 367.81l29.33-66.83C259.75 722.74 182.55 604.6 182.55 474.18z"/>
            <path d="M739.64 693.13h54.03L660.73 826.08l-107.7-107.71-184.09 184.09 51.61 51.61 132.48-132.48 107.7 107.71 178.78-178.78V793h72.99V620.14H739.64z"/>
        </svg>
      ),
    },
    {
      title: "Atualizando seus Dados",
      description:
        "Deseja atualizar suas informações ou adicionar novos dados? É fácil!",
      icon: (
        <svg className="" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="System / Data">
          <path id="Vector" d="M18 12V17C18 18.6569 15.3137 20 12 20C8.68629 20 6 18.6569 6 17V12M18 12V7M18 12C18 13.6569 15.3137 15 12 15C8.68629 15 6 13.6569 6 12M18 7C18 5.34315 15.3137 4 12 4C8.68629 4 6 5.34315 6 7M18 7C18 8.65685 15.3137 10 12 10C8.68629 10 6 8.65685 6 7M6 12V7" stroke="#EC6625" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
        </svg>
      ),
    },
    {
      title: "Entre em Contato",
      description:
        "Precisa de ajuda? Envie sua solicitação e entraremos em contato.",
      icon: (
        <svg className="w-20 h-20 fill-none stroke-purple-700 stroke-[1.91px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 12.0001V10.0001H18V12.0001M3.02832 10.0002L10.2246 14.8168C10.8661 15.2444 11.1869 15.4583 11.5336 15.5414C11.8399 15.6148 12.1593 15.6148 12.4657 15.5414C12.8124 15.4583 13.1332 15.2444 13.7747 14.8168L20.9709 10.0001M10.2981 4.06892L4.49814 7.71139C3.95121 8.05487 3.67775 8.2266 3.4794 8.45876C3.30385 8.66424 3.17176 8.90317 3.09111 9.16112C3 9.45256 3 9.77548 3 10.4213V16.8001C3 17.9202 3 18.4803 3.21799 18.9081C3.40973 19.2844 3.71569 19.5904 4.09202 19.7821C4.51984 20.0001 5.07989 20.0001 6.2 20.0001H17.8C18.9201 20.0001 19.4802 20.0001 19.908 19.7821C20.2843 19.5904 20.5903 19.2844 20.782 18.9081C21 18.4803 21 17.9202 21 16.8001V10.4213C21 9.77548 21 9.45256 20.9089 9.16112C20.8282 8.90317 20.6962 8.66424 20.5206 8.45876C20.3223 8.2266 20.0488 8.05487 19.5019 7.71139L13.7019 4.06891C13.0846 3.68129 12.776 3.48747 12.4449 3.41192C12.152 3.34512 11.848 3.34512 11.5551 3.41192C11.224 3.48747 10.9154 3.68129 10.2981 4.06892Z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="container max-w-[1120px] px-4 py-10 flex flex-col">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white text-center self-start">Começando Agora?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-9">
        {helpItems.map((item, index) => (
          <HelpCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default GettingStarted;