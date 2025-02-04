"use client";
import { useState, useEffect } from "react";

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0); // Estado para o progresso (0 a 100%)
  const [loadingComplete, setLoadingComplete] = useState(false); // Indica se o carregamento terminou

  useEffect(() => {
    const loadData = async () => {
      try {
        // Lista de funções assíncronas que carregam os dados
        const dataLoaders = [
          async () => await loadAeroportoData(),
          async () => await loadBalancaComercialData(),
          async () => await loadIpcaData(),
          async () => await loadRankingData(),
        ];

        const totalLoaders = dataLoaders.length; // Total de carregamentos
        let completedLoaders = 0; // Contador de carregamentos concluídos

        // Função para atualizar o progresso após cada carregamento
        const updateProgress = () => {
          completedLoaders++;
          const currentProgress = Math.floor((completedLoaders / totalLoaders) * 100);
          setProgress(currentProgress);

          if (completedLoaders === totalLoaders) {
            setLoadingComplete(true);
          }
        };

        // Executa todas as funções de carregamento sequencialmente
        for (const loader of dataLoaders) {
          await loader(); // Aguarda a conclusão do carregamento
          updateProgress(); // Atualiza o progresso
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setProgress(100); // Define progresso como 100% em caso de erro
      }
    };

    loadData();
  }, []);

  // Funções simuladas para carregar os dados
  const loadAeroportoData = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Dados de Aeroporto carregados");
        resolve();
      }, 2000); // Simula um carregamento de 2 segundos
    });
  };

  const loadBalancaComercialData = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Dados de Balança Comercial carregados");
        resolve();
      }, 3000); // Simula um carregamento de 3 segundos
    });
  };

  const loadIpcaData = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Dados de IPCA carregados");
        resolve();
      }, 2500); // Simula um carregamento de 2.5 segundos
    });
  };

  const loadRankingData = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Dados de Ranking carregados");
        resolve();
      }, 1500); // Simula um carregamento de 1.5 segundos
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