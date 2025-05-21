import React from "react";

// Definimos uma interface para padronizar os tutoriais
export interface TutorialItem {
  id: string;
  title: string;
  description: string;
  content: string | React.ReactNode; // pode ser texto simples ou JSX
  category?: string;
}

// Aqui dentro colocamos os tutoriais em formato JSON
export const tutorialData: Record<string, TutorialItem> = {
  esconderGraficos: {
    id: "esconderGraficos",
    title: "Esconder Gráficos",
    description: "Oculte todos os gráficos para facilitar a navegação visual.",
    content: (
      <>
        <p>
          Para ocultar todos os gráficos na tela, basta clicar no botão <strong>"Esconder Gráficos"</strong>.
        </p>
        <p className="mt-2">
          Essa funcionalidade é útil quando você deseja focar apenas nos dados textuais ou fazer uma leitura simplificada das informações.
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Ocultamento global dos gráficos</li>
          <li>Interface mais limpa</li>
          <li>Ideal para relatórios ou apresentações rápidas</li>
        </ul>
      </>
    ),
  },
  telaCheia: {
    id: "telaCheia",
    title: "Tela Cheia",
    description: "Ative o modo de tela cheia para visualizar os dados em tela inteira.",
    content: (
      <>
        <p>
          Clique no ícone <strong>Tela Cheia</strong> localizado no canto superior direito do painel para expandir a interface ao máximo.
        </p>
        <p className="mt-2">
          Este recurso é ideal para análises detalhadas, apresentações ou quando desejar utilizar toda a área do monitor sem distrações.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded mt-4 text-sm">
          💡 <strong>Dica:</strong> Pressione ESC para sair do modo tela cheia.
        </div>
      </>
    ),
  },
  baixarGraficos: {
    id: "baixarGraficos",
    title: "Baixar os Gráficos",
    description: "Baixe os gráficos em formato de imagem para uso externo ou relatórios.",
    content: (
      <>
        <p>
          Para baixar um gráfico, clique no botão de download localizado no canto superior direito de cada gráfico.
        </p>
        <ol className="list-decimal pl-5 mt-2 space-y-1">
          <li>Clique no ícone de download no gráfico desejado.</li>
          <li>Selecione o formato de saída.</li>
          <li>Salve o arquivo no seu dispositivo.</li>
        </ol>
      </>
    ),
  },
  quadro: {
    id: "quadro",
    title: "Quadro Interativo",
    description: "Monte seu próprio painel de análise com gráficos, anotações e desenhos.",
    content: (
      <>
        <p>
          O Quadro é uma ferramenta interativa onde você pode montar seu próprio painel personalizado de análise.
        </p>

        <h3 className="font-semibold mt-4">Como usar:</h3>
        <ol className="list-decimal pl-5 mt-2 space-y-2">
          <li><strong>Crie um novo quadro:</strong> Clique no botão “Novo Quadro” no menu lateral ou no topo da página.</li>
          <li><strong>Adicione gráficos:</strong> Arraste e solte gráficos existentes para dentro do quadro.</li>
          <li><strong>Faça anotações:</strong> Use as ferramentas de escrita e marcação para adicionar comentários ou destaques.</li>
          <li><strong>Desenhe:</strong> Ative a ferramenta de caneta para desenhar setas, formas ou linhas diretamente sobre os gráficos.</li>
          <li><strong>Salve seu trabalho:</strong> Clique em “Salvar” para guardar seu quadro e acessá-lo posteriormente.</li>
        </ol>

        <div className="bg-green-50 dark:bg-green-900 p-3 rounded mt-4 text-sm">
          ✅ <strong>Dica Pro:</strong> Você pode organizar múltiplos quadros por tema ou projeto!
        </div>
      </>
    ),
  },
   tema: {
    id: "tema",
    title: "Alterar Tema",
    description: "Mude entre tema claro e escuro para sua preferência visual.",
    content: (
      <>
        <p>
          Personalize a aparência da interface para se adequar ao seu ambiente e preferência visual. 
          Alterne facilmente entre os modos claro e escuro com apenas um clique.
        </p>

        <h3 className="font-semibold mt-4">Como usar:</h3>
        <ol className="list-decimal pl-5 mt-2 space-y-2">
          <li>
            <strong>Localize o ícone de tema:</strong> Encontre-o no canto superior direito da tela — ele representa a opção de alterar o tema.
            <svg className="rotate-0 transition-transform duration-500 fill-black dark:fill-white w-8 h-8 m-2" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd">
                <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -4199.000000)">
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path d="M126,4049 C126,4044.589 129.589,4041 134,4041 L134,4057 C129.589,4057 126,4053.411 126,4049 M134,4039 C128.477,4039 124,4043.477 124,4049 C124,4054.523 128.477,4059 134,4059 C139.523,4059 144,4054.523 144,4049 C144,4043.477 139.523,4039 134,4039"></path>
                  </g>
                </g>
              </g>
            </svg>
          </li>
          <li>
            <strong>Clique no ícone para alternar entre modo claro e escuro.</strong>
            <ul className="list-disc pl-5 mt-1">
              <li>O tema será atualizado imediatamente após o clique.</li>
              <li>Para voltar ao modo anterior, basta clicar novamente no mesmo ícone.</li>
            </ul>
          </li>
        </ol>
      </>
    ),
  },
};

// Contexto opcional (para escalabilidade futura)
export const TutorialContext = React.createContext(tutorialData);

// Hook customizado para acessar tutoriais facilmente
export const useTutorial = () => React.useContext(TutorialContext);

// Componente provedor (útil se quiser carregar tutoriais via API futuramente)
export const TutorialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <TutorialContext.Provider value={tutorialData}>
      {children}
    </TutorialContext.Provider>
  );
};