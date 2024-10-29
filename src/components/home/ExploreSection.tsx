"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoadingScreen } from "./LoadingScreen";

export const ExploreSection = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Função para lidar com o clique no botão de explorar
  const handleNavigation = () => {
    setLoading(true);
    router.push("/explorar");
  };

  return (
    <div className="w-full flex flex-col mt-[5em] items-center justify-center explore-content section-content">
      <div className="text-content w-[80%] max-w-[800px] p-4">
        <div className="title-content">
          <div className="text-2xl sm:text-3xl lg:text-4xl mb-5 font-bold __title">
            <p>Explorar mais</p>
          </div>
          <div className="description-content">
            <div className="__description">
              <p className="font-semibold mb-1 lg:text-[19px]">
                Busca mais informações nos detalhes e quer estar por dentro de
                tudo?
              </p>
              <p className="text-justify text-[14px] sm:text-[16px] lg:text-[18px]">
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
          className="lg:text-[18px] __button"
          onClick={handleNavigation}
          disabled={loading}
        >
          Explorar
        </button>
      </div>
    </div>
  );
};
