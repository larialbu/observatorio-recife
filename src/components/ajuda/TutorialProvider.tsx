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