"use client";

import { useState, useEffect } from "react";

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0); // 0 a 100%

  useEffect(() => {
    // Função que faz o fetch e atualiza progress
    const fetchWithProgress = async () => {
      try {
        // Exemplo: buscando de /api/data
        const response = await fetch("/api/data");

        // Tenta ler o Content-Length
        const contentLength = response.headers.get("Content-Length");

        // Se não tiver Content-Length, ainda fazemos a leitura,
        // mas não poderemos atualizar "progress" precisamente.
        if (!contentLength) {
          // Lê todo o corpo para simular "100%" ao final
          await response.blob();
          setProgress(100);
          return;
        }

        const total = parseInt(contentLength, 10);
        let loaded = 0;

        // Lê o body como stream
        const reader = response.body?.getReader();
        if (!reader) {
          // Se não der para ler (ambiente SSR ou algo similar), finalize
          setProgress(100);
          return;
        }

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            // Fim do stream: 100%
            setProgress(100);
            break;
          }
          loaded += value.length;
          // Atualiza % (loaded/total * 100)
          setProgress(Math.floor((loaded / total) * 100));
        }

        // Aqui você trataria o "value" final (transformar em JSON, por exemplo)
      } catch (error) {
        console.error("Erro no fetch:", error);
        // Em caso de erro, exibir algo ou encerrar a tela
        setProgress(100);
      }
    };

    fetchWithProgress();
  }, []);

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
    </div>
  );
};
