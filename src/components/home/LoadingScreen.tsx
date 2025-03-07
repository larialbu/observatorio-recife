"use client";
import { useState, useEffect } from "react";

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0); // Estado para o progresso (0 a 100%)
  const [loadingComplete, setLoadingComplete] = useState(false); // Indica se o carregamento terminou
  const [loadingMessage, setLoadingMessage] = useState("Iniciando carregamento...");
  const [loadingTime, setLoadingTime] = useState<string | null>(null); // Variável para armazenar o tempo de carregamento

  useEffect(() => {
    const startTime = performance.now(); // Começa a medir o tempo

    // Função para atualizar o progresso com base no carregamento real
    const updateProgress = () => {
      const resourcesLoaded = performance.getEntriesByType("resource").length; // Número de recursos carregados
      const totalResources = document.getElementsByTagName("img").length + // Imagens
        document.getElementsByTagName("script").length + // Scripts
        document.getElementsByTagName("link").length; // Folhas de estilo

      if (totalResources === 0) return;

      const newProgress = Math.min(
        Math.floor((resourcesLoaded / totalResources) * 100),
        99
      ); // Limita o progresso a 99%
      setProgress(newProgress);

      if (newProgress >= 99) {
        setLoadingMessage("Finalizando carregamento...");
      }
    };

    // Evento DOMContentLoaded: Disparado quando o HTML é completamente carregado
    const handleDOMContentLoaded = () => {
      setLoadingMessage("Carregando scripts e estilos...");
      updateProgress();
    };

    // Evento load: Disparado quando todos os recursos (imagens, scripts, etc.) são carregados
    const handleLoad = () => {
      const endTime = performance.now(); // Fim da medição de tempo
      const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // Tempo de carregamento em segundos
      setLoadingTime(timeTaken); // Armazena o tempo de carregamento
      setProgress(100); // Define progresso como 100%
      setLoadingComplete(true);
    };

    // Adiciona os listeners para os eventos
    document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);
    window.addEventListener("load", handleLoad);

    // Atualiza o progresso inicialmente
    updateProgress();

    // Limpa os listeners ao desmontar o componente
    return () => {
      document.removeEventListener("DOMContentLoaded", handleDOMContentLoaded);
      window.removeEventListener("load", handleLoad);
    };
  }, []); // O useEffect vai rodar apenas uma vez, ao montar o componente

  return (
    <div className="fixed z-50 flex flex-col items-center justify-center right-0 top-0 h-screen w-full bg-white">
      {/* Logo girando */}
      <img
        src="/images/logos/observatorio_logo.png"
        alt="logo observatorio"
        className="animate-spin w-20 h-20 object-cover"
      />
      <p className="text-center text-gray-600 mt-2">
        {loadingMessage} {progress}%
      </p>
      {/* Barra de carregamento com base no progresso */}
      <div className="relative w-48 h-2 bg-gray-200 rounded overflow-hidden mt-4">
        <div
          className="absolute left-0 top-0 h-full bg-blue-600 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
      {loadingComplete && (
        <>
          <p className="text-green-600 mt-4">Carregamento concluído!</p>
          <p className="text-gray-600 mt-2">
            Tempo de carregamento: {loadingTime} segundos
          </p>
        </>
      )}
    </div>
  );
};