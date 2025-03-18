"use client";

import { useState, useEffect } from "react";
import { subscribeToProgress, subscribeToMessage } from "@/utils/loader/progressEmitter";
import { Novatrix } from "uvcanvas";
import { first } from "@/utils/loader/progressEmitter"

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Iniciando...");
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [loadingTime, setLoadingTime] = useState<string | null>(null);
  const [isFirstLoad, setIsFirstLoad] = useState(first);

  useEffect(() => {
    const startTime = performance.now();

    const unsubProgress = subscribeToProgress((p) => {
      setProgress(p);
      if (p >= 100) {
        const endTime = performance.now();
        setLoadingComplete(true);
        setLoadingTime(((endTime - startTime) / 1000).toFixed(2));
      }
    });

    const unsubMessage = subscribeToMessage((msg) => {
      setLoadingMessage(msg);
    });


    return () => {
      unsubProgress();
      unsubMessage();
    };
  }, []);

  return (
    <div className="fixed z-[999] flex flex-col items-center justify-center right-0 top-0 h-screen w-full bg-white">

      {isFirstLoad && (
        <div className="absolute inset-0 top-0 left-0 brightness-[180%] grayscale-[0] z-10 w-full h-full">
          <div className=" w-full h-full">
            <Novatrix />
          </div>
        </div>
      )}

      <div className="flex flex-col items-center z-20">
        <img
          src="/images/logos/observatorio_logo.png"
          alt="logo observatorio"
          className="animate-spin w-20 h-20 object-cover"
        />
        <p className="text-center text-gray-600 mt-2">
          {loadingMessage} {progress}%
        </p>
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
    </div>
  );
};
