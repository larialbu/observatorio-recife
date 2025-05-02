import { useState } from "react";

interface CardProps {
  title: string;
  description: string;
  icon: any;
  detailedDescription: string;
}

const HelpCenter = () => {
  const cardData = [
    {
        title: 'Contate o Suporte',
        description: 'Entre em contato com a equipe de suporte para dúvidas ou problemas.',
        icon: (
            <svg fill="#0155AE" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 10.999h2C22 5.869 18.127 2 12.99 2v2C17.052 4 20 6.943 20 10.999z"/><path d="M13 8c2.103 0 3 .897 3 3h2c0-3.225-1.775-5-5-5v2zm3.422 5.443a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a1 1 0 0 0-.086-1.391l-4.064-3.696z"/></svg>
        ),
        detailedDescription: 'Para entrar em contato com o suporte, você pode enviar um e-mail para nosso time ou abrir um chamado diretamente na plataforma. Nosso time de suporte está disponível para resolver qualquer problema técnico ou esclarecer dúvidas sobre o uso da plataforma.',
    },
    {
      title: 'Acessibilidade e Usabilidade',
      description: 'Dicas sobre como personalizar sua experiência para ser mais acessível.',
      icon: (
        <svg viewBox="0 0 24 24" fill="#52B348" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 6.50024C13.5 7.32867 12.8284 8.00024 12 8.00024C11.1716 8.00024 10.5 7.32867 10.5 6.50024C10.5 5.67182 11.1716 5.00024 12 5.00024C12.8284 5.00024 13.5 5.67182 13.5 6.50024Z"/>
            <path d="M6.05132 8.68402C5.87667 9.20796 6.15983 9.77428 6.68377 9.94893C6.85906 10.0071 7.03576 10.0613 7.21265 10.1143C7.5363 10.2114 7.98911 10.3408 8.50746 10.4704C9.08908 10.6158 9.78094 10.7687 10.4783 10.8727C10.4323 11.7654 10.3205 12.4059 10.2166 12.8309L8.10557 17.053C7.85858 17.547 8.05881 18.1477 8.55279 18.3947C9.04677 18.6417 9.64744 18.4414 9.89443 17.9475L12 13.7363L14.1056 17.9475C14.3526 18.4414 14.9532 18.6417 15.4472 18.3947C15.9412 18.1477 16.1414 17.547 15.8944 17.053L13.7834 12.8309C13.6795 12.4059 13.5677 11.7654 13.5217 10.8727C14.2191 10.7687 14.9109 10.6158 15.4925 10.4704C16.0109 10.3408 16.4637 10.2114 16.7873 10.1143C16.963 10.0616 17.1384 10.0077 17.3125 9.95015C17.8261 9.77972 18.1201 9.19822 17.9487 8.68402C17.7741 8.16012 17.2078 7.87697 16.6839 8.05151C16.5277 8.10318 16.3703 8.15138 16.2127 8.19867C15.9113 8.28907 15.4891 8.40969 15.0075 8.5301C14.0216 8.77657 12.8709 9.00024 12 9.00024C11.1291 9.00024 9.97843 8.77657 8.99254 8.5301C8.51089 8.40969 8.0887 8.28907 7.78735 8.19867C7.63167 8.15196 7.47632 8.10404 7.32186 8.05342C6.80235 7.88161 6.22544 8.16164 6.05132 8.68402Z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M23 12.0002C23 18.0754 18.0751 23.0002 12 23.0002C5.92487 23.0002 1 18.0754 1 12.0002C1 5.92511 5.92487 1.00024 12 1.00024C18.0751 1.00024 23 5.92511 23 12.0002ZM3.00683 12.0002C3.00683 16.967 7.03321 20.9934 12 20.9934C16.9668 20.9934 20.9932 16.967 20.9932 12.0002C20.9932 7.03345 16.9668 3.00707 12 3.00707C7.03321 3.00707 3.00683 7.03345 3.00683 12.0002Z"/>
        </svg>
      ),
      detailedDescription: 'Acessibilidade no Observatório Econômico é uma prioridade. Temos várias opções para garantir que todos possam usar a plataforma de forma eficaz, como o aumento do contraste e a navegação por teclado.',
    },
    {
      title: 'Erro Comum e Soluções',
      description: 'Encontre soluções para erros mais comuns encontrados na plataforma.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.9998 9.00023V13.0002M11.9998 17.0002H12.0098M10.6151 3.89195L2.39019 18.0986C1.93398 18.8866 1.70588 19.2806 1.73959 19.6039C1.769 19.886 1.91677 20.1423 2.14613 20.309C2.40908 20.5002 2.86435 20.5002 3.77487 20.5002H20.2246C21.1352 20.5002 21.5904 20.5002 21.8534 20.309C22.0827 20.1423 22.2305 19.886 22.2599 19.6039C22.2936 19.2806 22.0655 18.8866 21.6093 18.0986L13.3844 3.89195C12.9299 3.10679 12.7026 2.71421 12.4061 2.58235C12.1474 2.46734 11.8521 2.46734 11.5935 2.58235C11.2969 2.71421 11.0696 3.10679 10.6151 3.89195Z" stroke="#EC6625" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      detailedDescription: 'Encontramos erros comuns e fornecemos soluções para eles. Se vocês encontrar um erro, por favor, nos avise e ajudaremos a resolver o problema.',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mb-9 max-w-[1120px] ">
      {cardData.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};

const Card: React.FC<CardProps> = ({ title, description, icon, detailedDescription }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
    <div
      className={`p-8 dark:bg-[#1d2b3d] bg-gray-100 w-full rounded-xl cursor-pointer transition-all duration-700 transform hover:-translate-y-2 hover:shadow-xl overflow-hidden ${isHovered ? '' : 'sm:max-h-[250px] md:max-h-[200px]'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mb-6">
        <div className="w-10">{icon}</div>
      </div>
      <h3 className="text-base text-gray-800 font-semibold dark:text-white mb-2">
        {title}
      </h3>
      <p
        className={`text-sm text-gray-800 dark:text-white transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-75'} ${isHovered ? 'max-h-full' : 'max-h-[50px] overflow-hidden'}`}
      >
        {isHovered ? detailedDescription : description}
      </p>
    </div>
    </>
  );
};

export default HelpCenter;
