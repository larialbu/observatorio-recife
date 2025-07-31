import React from "react";

export interface TutorialItem {
  id: string;
  title: string;
  description: string;
  content: string | React.ReactNode;
  category?: string;
}

export const tutorialData: Record<string, TutorialItem> = {
  esconderGraficos: {
    id: "esconderGraficos",
    title: "Esconder Gráficos",
    description: "Oculte gráficos específicos para personalizar sua visualização e focar no que é importante.",
    content: (
      <>
        <p>
          Personalize seu painel ocultando gráficos individuais para focar nos dados mais relevantes para sua análise.
        </p>
        <p className="mt-3">
          <strong>Como fazer:</strong> Clique no ícone de "olho" no canto superior do gráfico desejado. Para exibi-lo novamente, basta clicar no mesmo ícone.
        </p>
        <h3 className="font-semibold mt-4">Vantagens:</h3>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
          <li>Foco total nos dados que importam.</li>
          <li>Criação de uma visualização limpa e personalizada.</li>
          <li>Facilita a comparação entre gráficos específicos.</li>
        </ul>
      </>
    ),
  },
  telaCheia: {
    id: "telaCheia",
    title: "Modo Tela Cheia",
    description: "Ative o modo de tela cheia para uma visualização imersiva e sem distrações.",
    content: (
      <>
        <p>
          Maximize sua área de visualização para uma análise detalhada e focada.
        </p>
        <p className="mt-3">
          <strong>Como ativar:</strong> Clique no ícone de <strong>Tela Cheia</strong> no canto superior direito do painel.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg mt-4 text-sm">
          💡 <strong>Dica:</strong> Para sair, pressione a tecla <strong>ESC</strong> em seu teclado.
        </div>
      </>
    ),
  },
  baixarGraficos: {
    id: "baixarGraficos",
    title: "Baixar Gráficos",
    description: "Salve qualquer gráfico como uma imagem (PNG) para usar em seus relatórios e apresentações.",
    content: (
      <>
        <p>
          Exporte facilmente qualquer visualização do painel para uma imagem de alta qualidade.
        </p>
        <h3 className="font-semibold mt-4">Passo a passo:</h3>
        <ol className="list-decimal pl-5 mt-2 space-y-2">
          <li>Passe o mouse sobre o gráfico desejado para ver as opções.</li>
          <li>Clique no ícone de <strong>download</strong> (uma nuvem com uma seta).</li>
          <li>A imagem será salva automaticamente em seu dispositivo no formato PNG.</li>
        </ol>
      </>
    ),
  },
  quadro: {
    id: "quadro",
    title: "Quadro Interativo",
    description: "Sua tela de análise pessoal para combinar gráficos, anotações e desenhos.",
    content: (
      <>
        <p>
          O <strong>Quadro Interativo</strong> é uma ferramenta poderosa para quem deseja ir além da simples visualização e construir uma análise personalizada.
        </p>
        <h3 className="font-semibold mt-4">Principais Ações:</h3>
        <ul className="list-disc pl-5 mt-2 space-y-2">
          <li><strong>Adicionar Gráficos:</strong> Arraste e solte visualizações do painel para o seu quadro.</li>
          <li><strong>Anotar e Destacar:</strong> Use ferramentas de texto e marcação para adicionar insights.</li>
          <li><strong>Desenhar Livremente:</strong> Crie setas, círculos e diagramas com a ferramenta de caneta.</li>
          <li><strong>Salvar e Exportar:</strong> Guarde seus quadros na plataforma ou exporte-os como imagem.</li>
        </ul>
        <div className="bg-green-50 dark:bg-green-900 p-3 rounded-lg mt-4 text-sm">
          ✅ <strong>Dica Pro:</strong> Crie múltiplos quadros para organizar suas análises por projeto ou tema.
        </div>
      </>
    ),
  },
  fontesDeDados: {
    id: "fontesDeDados",
    title: "Fontes dos Dados",
    description: "Saiba mais sobre a origem e a metodologia dos dados utilizados no Observatório.",
    content: (
      <>
        <p>
          A credibilidade de nossas análises vem da qualidade de nossas fontes. Todos os dados são coletados de <strong>fontes públicas e oficiais</strong>.
        </p>
        <h3 className="font-semibold mt-4">Nossas Fontes Incluem:</h3>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
          <li><strong>Aviação:</strong> ANAC, Aena</li>
          <li><strong>Economia e Sociedade:</strong> IBGE, Novo Caged, Comex Stat</li>
          <li><strong>Transporte e Logística:</strong> Portos do Recife, ANTAQ</li>
          <li><strong>Setor Público e Empresarial:</strong> Prefeitura do Recife, Gov.br, Tesouro Nacional, BCB, CLP</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg mt-4 text-sm">
          💡 <strong>Para saber mais:</strong> Visite nossa página de <a href="/fontes" className="font-bold underline">Fontes</a> para ver a lista completa, com descrições e links diretos para os dados originais.
        </div>
      </>
    ),
  },
  tema: {
    id: "tema",
    title: "Alterar Tema Visual",
    description: "Alterne entre os modos claro e escuro para seu conforto visual.",
    content: (
      <>
        <p>
          Ajuste a aparência do painel para se adequar ao seu ambiente de trabalho e preferência pessoal.
        </p>
        <div className="flex items-center gap-4 mt-4">
          <svg className="flex-shrink-0 rotate-0 transition-transform duration-500 fill-black dark:fill-white w-10 h-10" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
              <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -4199.000000)">
                <g id="icons" transform="translate(56.000000, 160.000000)">
                  <path d="M126,4049 C126,4044.589 129.589,4041 134,4041 L134,4057 C129.589,4057 126,4053.411 126,4049 M134,4039 C128.477,4039 124,4043.477 124,4049 C124,4054.523 128.477,4059 134,4059 C139.523,4059 144,4054.523 144,4049 C144,4043.477 139.523,4039 134,4039"></path>
                </g>
              </g>
            </g>
          </svg>
          <p>
            <strong>Como usar:</strong> Clique no ícone de tema no canto superior direito da tela para alternar instantaneamente entre os modos <strong>claro</strong> e <strong>escuro</strong>.
          </p>
        </div>
      </>
    ),
  },
};

export const TutorialContext = React.createContext(tutorialData);

export const useTutorial = () => React.useContext(TutorialContext);

export const TutorialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <TutorialContext.Provider value={tutorialData}>
      {children}
    </TutorialContext.Provider>
  );
};