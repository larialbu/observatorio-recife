"use client";
import { useState, useEffect } from "react";

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0); // Estado para o progresso (0 a 100%)
  const [loadingComplete, setLoadingComplete] = useState(false); // Indica se o carregamento terminou

  useEffect(() => {
    const loadData = async () => {
      try {
        // Carrega os dados da página atual
        await loadPageData();
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setProgress(100); // Define progresso como 100% em caso de erro
      }
    };

    loadData();
  }, []); // O useEffect vai rodar apenas uma vez, ao montar o componente

  // Função simulada para carregar os dados específicos da página
  const loadPageData = async () => {
    // Aqui, você pode simular o carregamento de dados necessários para a página
    // Exemplo: Carregar dados de um gráfico, tabela, etc.

    const totalSteps = 3; // Total de etapas de carregamento
    let currentStep = 0;

    // Simulando etapas de carregamento
    const updateProgress = () => {
      currentStep++;
      setProgress(Math.floor((currentStep / totalSteps) * 100));

      if (currentStep === totalSteps) {
        setLoadingComplete(true); // Quando tudo estiver carregado
      }
    };

    // Simula 3 etapas de carregamento
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Carregando dados...");
        updateProgress();
      }, 1000); // Simula 1 segundo para carregar a primeira etapa
    });

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Carregando dados...");
        updateProgress();
      }, 2000); // Simula 2 segundos para a segunda etapa
    });

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Carregando dados...");
        updateProgress();
      }, 1500); // Simula 1.5 segundos para a terceira etapa
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
        Carregando dados... {progress}%
      </p>
      {/* Barra de carregamento com base no progress */}
      <div className="relative w-48 h-2 bg-gray-200 rounded overflow-hidden mt-4">
        <div
          className="absolute left-0 top-0 h-full bg-blue-600 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
      {loadingComplete && (
        <p className="text-green-600 mt-4">Carregamento concluído!</p>
      )}
    </div>
  );
};
