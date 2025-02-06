"use client";
import { useState, useEffect } from "react";

// Simulação de função para carregar dados do backend
const fetchData = async () => {
  const response = await fetch("/api/data"); // Substitua pelo seu endpoint real
  const data = await response.json();
  return data;
};

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0); // Progresso de 0 a 100%
  const [loadingComplete, setLoadingComplete] = useState(false); // Indica se o carregamento terminou
  const [loadingMessage, setLoadingMessage] = useState("Iniciando carregamento...");

  useEffect(() => {
    const loadData = async () => {
      try {
        const totalSteps = 4; // Número total de etapas
        let currentStep = 0;

        // Atualiza o progresso com base nas etapas reais
        const updateProgress = (percentage, message) => {
          currentStep++;
          const newProgress = Math.floor((currentStep / totalSteps) * 100);
          setProgress(newProgress);
          setLoadingMessage(message);

          if (currentStep === totalSteps) {
            setLoadingComplete(true);
          }
        };

        // Carregar dados do backend (real)
        await fetchData();
        updateProgress(25, "Carregando dados do backend...");

        // Simulando o carregamento de uma imagem (real)
        const image = new Image();
        image.src = "/images/your-image.jpg"; // Substitua com o caminho real da imagem
        image.onload = () => {
          updateProgress(50, "Carregando imagem...");
        };

        // Carregamento de outros recursos assíncronos, se necessário
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula um carregamento adicional
        updateProgress(75, "Carregando mais dados...");

        // Finalizando carregamento
        updateProgress(100, "Finalizando carregamento...");

      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setProgress(100); // Define progresso como 100% em caso de erro
      }
    };

    loadData();
  }, []); // O useEffect roda apenas uma vez, quando o componente é montado

  return (
    <div className="fixed z-50 flex flex-col items-center justify-center right-0 top-0 h-screen w-full bg-white">
      {/* Logo girando */}
      <img
        src="/images/logos/observatorio_logo.png"
        alt="logo observatorio"
        className="animate-spin w-20 h-20 object-cover"
      />
      <p className="text-center text-gray-600 mt-2">{loadingMessage}</p>
      {/* Barra de carregamento com base no progresso */}
      <div className="relative w-48 h-2 bg-gray-200 rounded overflow-hidden mt-4">
        <div
          className="absolute left-0 top-0 h-full bg-blue-600 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-center text-gray-600 mt-2">{progress}%</p>
      {loadingComplete && (
        <p className="text-green-600 mt-4">Carregamento concluído!</p>
      )}
    </div>
  );
};
