import React from "react";

const IntroExcalidraw = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center px-4">
      <div className="bg-white max-w-lg w-full rounded-xl shadow-xl p-6 relative text-center animate-fade-in">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          ✨ Nova Funcionalidade: Quadro de análises!
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Agora você pode criar <strong>desenhos, rascunhos e análises visuais</strong> com base nos gráficos exibidos aqui na plataforma.
        </p>
        <p className="text-gray-600 text-sm mb-6">
          Basta clicar no botão azul flutuante no canto inferior direito para abrir o editor. Você poderá salvar suas ideias como cenas e voltar a elas quando quiser!
        </p>
        <p className="text-gray-500 text-xs mb-6">
            <strong>*Para adicionar um gráfico ao quadro, clique nos “3 pontinhos” no canto superior direito de qualquer gráfico e selecione <em>“Inserir no Quadro”</em></strong>.
        </p>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-5 py-2 mb-5 rounded-md hover:bg-blue-600 transition"
          >
            Vamos lá! 🚀
          </button>
        </div>
        <span className="absolute bottom-3 left-3 text-xs text-gray-400">Dica: clique no botão azul no canto inferior direito</span>
      </div>
    </div>
  );
};

export default IntroExcalidraw;
