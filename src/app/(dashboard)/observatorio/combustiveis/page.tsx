"use client";

import { useRouter, useSearchParams } from "next/navigation";

import GeralCombustiveis from "./components/GeralCombustiveis";
import ComparativoCombustiveis from "./components/ComparativoCombustiveis";
import RegionalCombustiveis from "./components/RegionalCombustiveis";
import EstadualCombustiveis from "./components/EstadualCombustiveis";
import MunicipalCombustiveis from "./components/MunicipalCombustiveis";

const tabs = [
  {
    key: "geral",
    label: "ANP Geral",
    activeClass: "bg-gradient-to-r from-orange-500 to-orange-700 text-white",
  },
  {
    key: "comparativo",
    label: "Comparativo",
    activeClass: "bg-gradient-to-r from-blue-500 to-blue-700 text-white",
  },
  {
    key: "regional",
    label: "Regional",
    activeClass: "bg-gradient-to-r from-orange-500 to-orange-700 text-white",
  },
  {
    key: "estadual",
    label: "Estadual",
    activeClass: "bg-gradient-to-r from-purple-500 to-purple-700 text-white",
  },
  {
    key: "municipal",
    label: "Municipal",
    activeClass: "bg-gradient-to-r from-rose-500 to-rose-700 text-white",
  },
];

export default function CombustiveisPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") || "geral";

  function handleNavigation(tab: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (tab === "geral") {
      params.delete("tab");
    } else {
      params.set("tab", tab);
    }

    const query = params.toString();

    router.push(query ? `/observatorio/combustiveis?${query}` : "/observatorio/combustiveis");
  }

  function renderContent() {
    switch (activeTab) {
      case "comparativo":
        return <ComparativoCombustiveis />;

      case "regional":
        return <RegionalCombustiveis />;

      case "estadual":
        return <EstadualCombustiveis />;

      case "municipal":
        return <MunicipalCombustiveis />;

      case "geral":
      default:
        return <GeralCombustiveis />;
    }
  }

  return (
    <main className="min-h-screen dark:bg-[#0B1117]">
      <section
        className="relative min-h-[540px] overflow-hidden bg-cover bg-center bg-no-repeat px-6 pb-10 pt-[250px] md:px-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,247,251,0.86), rgba(245,247,251,0.92)), url('/images/banner/aeroportos_banner.avif')",
        }}
      >
        <div className="w-full">
          <h1 className="mb-10 text-center text-4xl font-extrabold tracking-tight text-[#0b1b34] dark:text-white md:text-5xl">
            Preços de Combustíveis
          </h1>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  onClick={() => handleNavigation(tab.key)}
                  className={`h-[52px] rounded-lg px-6 py-3 text-lg font-bold shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02] ${
                    isActive
                      ? tab.activeClass
                      : "bg-gray-300 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-[125px] px-6 pb-10 md:px-10">
        <div className="w-full">{renderContent()}</div>
      </section>
    </main>
  );
}