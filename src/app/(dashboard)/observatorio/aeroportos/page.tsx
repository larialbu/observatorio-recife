  "use client";

  import React, {useState, useEffect} from "react";
  import { useSearchParams, useRouter } from "next/navigation";
  import { useDashboard } from "@/context/DashboardContext";
  import { LoadingScreen } from "@/components/home/LoadingScreen";
  import Geral from "./(geral)/geral";
  import Comparativo from "./(comparativo)/comparativo";
  import Embarque from "./(embarque)/embarque";
  import AenaPage from "./(aena)/aena";

  const AeroportosPage = () => {
    const searchParams = useSearchParams();
    const { filters, isLoading, data } = useDashboard();
    console.log('iaikkkk',data[0]?.data)
    const [activeTab, setActiveTab] = useState<string>("geral");
    const router = useRouter();

    if (isLoading) return <LoadingScreen />;


      const tab = searchParams.get("tab");
      console.log(tab)
      if (tab && tab !== activeTab) {
        setActiveTab(tab);
      }

    const renderContent = () => {
      switch (activeTab) {
        case "geral":
          return <Geral data={data[0]?.data} />;
        case "comparativo":
          return <Comparativo data={data[0]?.data} />;
        case "embarque":
          return <Embarque data={data[0]?.data} />;
        case "aena":
          return < AenaPage />;
        default:
          return <Geral data={data[0]?.data} />;
      }
    };

    const handleNavigation = (tab: string) => {
      console.log('settando a tab:', tab)
      setActiveTab(tab);
      router.replace(`?tab=${tab}`);
    };
  
    return (
      <div className="p-6 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8 tracking-wide">
          Movimentação de Aeroportos
        </h1>
  
        <div className="flex justify-center gap-6 mb-8 flex-wrap">
          <button
            onClick={() => handleNavigation("geral")}
            className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
              activeTab === "geral"
                ? "bg-gradient-to-r from-orange-500 to-orange-700 text-white"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            Resumo Geral
          </button>
          <button
            onClick={() => handleNavigation("comparativo")}
            className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[300px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
              activeTab === "comparativo"
                ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            Comparativo
          </button>
          <button
            onClick={() => handleNavigation("embarque")}
            className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
              activeTab === "embarque"
                ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            Embarque/Desembarque
          </button>
          <button
            onClick={() => handleNavigation("aena")}
            className={`px-6 py-3 rounded-lg flex-1 sm:flex-0 min-w-[250px] max-w-[350px] text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg ${
              activeTab === "aena"
                ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            <i>AENA</i>
          </button>
        </div>
  
        {renderContent()}
      </div>
    );
  };

  export default AeroportosPage;
