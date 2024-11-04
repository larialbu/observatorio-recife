"use client";

import "../styles/home/style.scss";
import "../styles/explore/style.scss";
import "../styles/boletim-economico/style.scss";

import { Header } from "@/components/home/Header";
import { SocialIconsContainer } from "@/components/home/SocialIconsContainer";
import { Footer } from "@/components/home/Footer";
import { NavBarHome } from "@/components/home/NavBarHome";
import { useState, useEffect } from "react";
import { ModalBoletim } from "@/components/ModalBoletim";

const BoletimEconomico = () => {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState<number>(currentYear);
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const years = [2022, 2023, 2024];
    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setIsLoading(true); // Iniciar o loading
        setSelectedYear(Number(event.target.value));
        setSelectedMonth(null);

        // Simular um tempo de carregamento para a animação
        setTimeout(() => {
            setIsLoading(false); // Finalizar o loading após o tempo simulado
        }, 500);
    };

    const handleOpenModal = (month: string) => {
        setSelectedMonth(month);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedMonth(null);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <NavBarHome simple />

            <div className="p-8 text-5xl font-bold text-black text-p">
                <p>OBSERVATÓRIO<br />ECONÔMICO DO RECIFE</p>
            </div>

            {/* Seleção de Ano */}
            <div className="flex justify-center mt-6">
                <select
                    onChange={handleYearChange}
                    className="p-2 border border-gray-300 rounded-lg"
                    value={selectedYear}
                >
                    <option value="" disabled>Selecione o Ano</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            {/* Exibição de Carregamento */}
            {isLoading ? (
                <div className="flex justify-center items-center mt-6">
                    <div className="loader"></div>
                </div>
            ) : (
                /* Exibição dos Meses */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8 mt-6 text-center">
                    {months.map((month) => (
                        <div
                            key={month}
                            onClick={() => handleOpenModal(month)}
                            className="p-4 bg-blue-600 text-white rounded-lg cursor-pointer"
                        >
                            {month}
                        </div>
                    ))}
                </div>
            )}

            {/* Modal para o Mês Selecionado */}
            {showModal && selectedMonth && (
                <ModalBoletim onClose={handleCloseModal}>
                    <h2 className="text-xl font-semibold mb-4">
                        Boletim Econômico - {selectedMonth} {selectedYear}
                    </h2>
                    <p>Ao clicar em "Baixar", será baixado um PDF contendo o relatório econômico completo, com as seguintes informações:</p>
                    <ul className="list-disc list-inside my-4 text-gray-700">
                        <li>Panorama Recife</li>
                        <li>Empregos</li>
                        <li>Empresas</li>
                        <li>PIB</li>
                        <li>IPCA</li>
                        <li>Ranking de Competitividade dos Municípios</li>
                        <li>Portos</li>
                        <li>Aeroportos</li>
                        <li>Balança Comercial</li>
                        <li>Capacidade de Pagamentos</li>
                    </ul>
                    <button
                        onClick={() => window.open("https://drive.google.com/drive/folders/1-CYzaNzd-voFZQHYOSgke_bfSagEsw_7", "_blank")}
                        className="mt-4 p-2 bg-blue-500 text-white rounded"
                    >
                        Baixar PDF
                    </button>
                    <button
                        onClick={handleCloseModal}
                        className="mt-4 ml-4 p-2 bg-gray-300 text-black rounded"
                    >
                        Fechar
                    </button>
                </ModalBoletim>
            )}

            <div className="mt-auto">
                <SocialIconsContainer />
                <Footer />
            </div>
        </div>
    );
};

export default BoletimEconomico;
