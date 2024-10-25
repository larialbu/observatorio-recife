"use client"; // Isto garantirá que o componente seja executado no lado do cliente

import Link from "next/link";
import { useRouter } from "next/navigation"; // Novo import para o App Router
import { useState } from "react";
import { LoadingScreen } from "./LoadingScreen";

export const ExploreSection = () => {
  const router = useRouter(); // Correto para o App Router
  const [loading, setLoading] = useState(false);

  // Função para lidar com o clique no botão de explorar
  const handleNavigation = () => {
    setLoading(true); // Definir o estado de carregamento para true
    router.push("/list/events"); // Redirecionar para a página de eventos
  };

  return (
    <div className="w-full flex flex-col mt-5 items-center justify-center explore-content section-content">
      <div className="text-content w-[80%] max-w-[800px] p-4">
        <div className="title-content">
          <div className="text-3xl mb-3 font-bold __title">
            <p>Explorar mais</p>
          </div>
          <div className="description-content">
            <div className="__description">
              <p className="font-semibold mb-1">
                Busca mais informações nos detalhes e quer estar por dentro de
                tudo?
              </p>
              <p className="text-justify">
                Não fique por fora do cenário econômico do Recife, navegue pelo
                observatório e descubra como anda a movimentação do emprego,
                consulte o PIB, veja o cenário das empresas, entre outros!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="button-content">
        {loading ? <LoadingScreen /> : ""}
        <button
          className="__button"
          onClick={handleNavigation}
          disabled={loading}
        >
          Explorar
        </button>
      </div>
    </div>
  );
};
