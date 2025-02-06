"use client";
import { useState, useEffect } from "react";

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0); // Estado para o progresso (0 a 100%)
  const [loadingComplete, setLoadingComplete] = useState(false); // Indica se o carregamento terminou
  const [loadingMessage, setLoadingMessage] = useState("Iniciando carregamento...");
  const [loadingTime, setLoadingTime] = useState<string | null>(null); // Variável para armazenar o tempo de carregamento

  useEffect(() => {
    const loadData = async () => {
      const startTime = performance.now(); // Começa a medir o tempo
      try {
        // Chama a função que simula o carregamento dos dados específicos
        await loadPageData(startTime);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setProgress(100); // Define progresso como 100% em caso de erro
      }
    };

    loadData();
  }, []); // O useEffect vai rodar apenas uma vez, ao montar o componente

  // Função para simular o carregamento dos dados da página
  const loadPageData = async (startTime: number) => {
    // Simulação de 3 etapas de carregamento (por exemplo, carregando gráficos, tabelas, etc.)
    const totalSteps = 3;
    let currentStep = 0;

    // Função para atualizar o progresso
    const updateProgress = (message: string) => {
      currentStep++;
      const newProgress = Math.floor((currentStep / totalSteps) * 100);
      setProgress(newProgress);
      setLoadingMessage(message);

      if (currentStep === totalSteps) {
        const endTime = performance.now(); // Fim da medição de tempo
        const timeTaken = ((endTime - startTime) / 1000).toFixed(2); // Tempo de carregamento em segundos
        setLoadingTime(timeTaken); // Armazena o tempo de carregamento
        setLoadingComplete(true);
      }
    };

    // Simula o carregamento do primeiro dado
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        updateProgress("Carregando gráficos...");
        resolve();
      }, 1000); // Simula 1 segundo para carregar gráficos
    });

    // Simula o carregamento do segundo dado
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        updateProgress("Carregando tabelas...");
        resolve();
      }, 2000); // Simula 2 segundos para carregar tabelas
    });

    // Simula o carregamento do terceiro dado
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        updateProgress("Finalizando carregamento...");
        resolve();
      }, 1500); // Simula 1.5 segundos para finalização
    });
  };

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
