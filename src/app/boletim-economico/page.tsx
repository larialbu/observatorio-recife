"use client";

import "../styles/home/style.scss";
import "../styles/explore/style.scss";
import "../styles/boletim-economico/style.scss";

import { Header } from "@/components/home/Header";
import { SocialIconsContainer } from "@/components/home/SocialIconsContainer";
import { Footer } from "@/components/home/Footer";
import { NavBarHome } from "@/components/home/NavBarHome";
import { useState } from "react";
import { ModalBoletim } from "@/components/ModalBoletim";

const boletins = [
    { name: "SDECTI - Edição 09 2023", link: "https://desenvolvimentoeconomico.recife.pe.gov.br/sites/default/files/2023-12/BASE%20BOLETIM%209%202023.pdf" },
    { name: "SDECTI - Edição 08 2023", link: "http://desenvolvimentoeconomico.recife.pe.gov.br/sites/default/files/2023-11/BASE%20PARA%20BOLETIM%208_0.pdf" },
    { name: "SDECTI - Edição 07 2023", link: "http://desenvolvimentoeconomico.recife.pe.gov.br/sites/default/files/2023-10/BOLTEIM%20EDI%C3%87%C3%83O%207%20ANO%202023%20VERS%C3%83O%20FINAL%20V1.pdf" },
    { name: "SDECTI - Edição 06 2023", link: "http://desenvolvimentoeconomico.recife.pe.gov.br/sites/default/files/2023-09/edi%C3%A7%C3%A3o%206%20boletim%20econ%C3%B4mico%202023.pdf" },
    { name: "SDECTI - Resumo Indicadores 1º Semestre de 2023", link: "http://desenvolvimentoeconomico.recife.pe.gov.br/sites/default/files/2023-07/indicadores%20econ%C3%B4micos%201%C2%BA%20Semestre%202023%20%281%29%20%281%29.pdf" },
    { name: "SDECTI - Edição 05 2023", link: "http://desenvolvimentoeconomico.recife.pe.gov.br/sites/default/files/2023-07/BOLETIM%20SDECTI%20-%20EDI%C3%87%C3%83O%205%202023.pdf" },
    { name: "SDECTI - Edição 04 2023", link: "http://desenvolvimentoeconomico.recife.pe.gov.br/sites/default/files/2023-06/BOLETIM%20ABRIL%202023%20.pdf" },
    { name: "SDECTI - Edição 03 2023", link: "http://desenvolvimentoeconomico.recife.pe.gov.br/sites/default/files/2023-05/Boletim%20Economico%20-%20Mar%C3%A7o%202023%20-%20A4.pdf" },
    { name: "SDECTI - Edição 02 2023", link: "http://desenvolvimentoeconomico.recife.pe.gov.br/sites/default/files/2023-03/Boletim%20Economico%20-%20Fevereiro%202023%20%281%29.pdf" },
    { name: "SDECTI - Edição 01 2023", link: "http://desenvolvimentoeconomico.recife.pe.gov.br/sites/default/files/2023-02/Boletim%20Economico%20-%20Janeiro%202023.pdf" },
    // ... outros boletins
];

const BoletimEconomico = () => {
    const [selectedBoletim, setSelectedBoletim] = useState<{ name: string, link: string } | null>(null);
    const [showModal, setShowModal] = useState(false);

    const handleBoletimChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const boletim = boletins.find(b => b.name === event.target.value) || null;
        setSelectedBoletim(boletim);
    };

    const handleOpenModal = () => {
        if (selectedBoletim) setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDownload = () => {
        if (selectedBoletim) {
            window.open(selectedBoletim.link, "_blank");
        }
    };

    return (
        <div className="flex flex-col min-h-screen items-center bg-gray-100">
            <Header />
            <NavBarHome simple />

            <div className="p-8 font-bold text-gray-800 w-[90%] text-3xl sm:text-5xl mt-4 pl-0 sm:pl-8">
                <p>OBSERVATÓRIO<br />ECONÔMICO DO RECIFE</p>
            </div>

            <div className="flex flex-col items-center mt-10 mb-10 bulletin-content">
                {/* Título da Seção de Download */}
                <div className="text-3xl font-semibold text-blue-700 text-center mb-3">
                    <p>Consultar o Boletim Econômico</p>
                </div>

                {/* Instrução Discreta */}
                <p className="text-center text-gray-600 mb-6 text-sm">
                    Selecione o boletim desejado e clique em "Consultar" para acessar o relatório.
                </p>

                {/* Seleção de Boletim */}
                <div className="flex w-[90%] justify-center mb-6">
                    <select
                        onChange={handleBoletimChange}
                        className="p-3 w-[100%] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        value={selectedBoletim?.name || ""}
                    >
                        <option value="" disabled>Selecione o Boletim</option>
                        {boletins.map((boletim) => (
                            <option key={boletim.name} value={boletim.name}>
                                {boletim.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Botão de Download */}
                <div className="p-8 mt-4 text-center">
                    <button
                        onClick={handleOpenModal}
                        className={`px-8 py-4 ${selectedBoletim ? "bg-blue-600" : "bg-gray-400"} text-white text-lg font-semibold rounded-lg shadow-md ${selectedBoletim ? "hover:bg-blue-700" : "cursor-not-allowed"}`}
                        disabled={!selectedBoletim}
                    >
                        Consultar Relatório Econômico
                    </button>
                </div>
            </div>

            {/* Modal para o Relatório */}
            {showModal && selectedBoletim && (
                <ModalBoletim onClose={handleCloseModal}>
                    <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
                        {selectedBoletim.name}
                    </h2>
                    <p className="text-lg text-gray-700 text-center mb-4">
                        Clique em "Consultar" para obter o PDF do relatório completo.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={handleDownload}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                            Consultar PDF
                        </button>
                        <button
                            onClick={handleCloseModal}
                            className="px-6 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
                        >
                            Fechar
                        </button>
                    </div>
                </ModalBoletim>
            )}

            <div className="mt-auto w-full">
                <SocialIconsContainer />
                <Footer />
            </div>
        </div>
    );
};

export default BoletimEconomico;
