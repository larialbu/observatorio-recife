import React, { useState } from "react";
import { Card } from "@/components/explorar/Card";

export const CardsContainer: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const cardsData = [
        {
            banner: "/images/banners/ipca_banner.png",
            title: "IPCA - Índice Nacional de Preços ao Consumidor Amplo",
            logo: "/images/logos/partners/ibge_logo.png",
            description: "Fique por dentro da variação dos valores!"
        },
        {
            banner: "/images/banners/porto_recife_banner.png",
            title: "Movimentação dos Portos",
            logo: "/images/logos/partners/porto_recife_logo.png",
            description: "Cheque as movimentações dos portos!"
        },
        {
            banner: "/images/banners/aeroporto_banner.png",
            title: "Movimentação dos aeroportos",
            logo: "/images/logos/partners/anac_logo.png",
            description: "Explore a decolagem das tendências no tráfego aéreo!"
        },
        {
            banner: "/images/banners/balanca_comercial_banner.png",
            title: "Balança Comercial",
            logo: "/images/logos/partners/comex_stat_logo.png",
            description: "Explore os bastidores da balança comercial: o que entra e sai do Brasil!"
        },
        {
            banner: "/images/banners/ranking_banner.png",
            title: "Ranking de Competitividade dos Municípios",
            logo: "/images/logos/partners/clp_logo.png",
            description: "Descubra quais municípios estão no topo da competitividade!"
        },
        {
            banner: "/images/banners/empresas_banner.png",
            title: "Empresas da cidade do Recife",
            logo: "/images/logos/partners/prefeitura_recife_logo.png",
            description: "Revele o potencial das empresas recifenses com análises sólidas!"
        },
        {
            banner: "/images/banners/empregos_banner.png",
            title: "Variação e atividade dos empregos",
            logo: "/images/logos/partners/novo_caged_logo.png",
            description: "Explore a dinâmica das variações e atividades no mercado de trabalho!"
        },
        {
            banner: "/images/banners/pib_banner.png",
            title: "PIB - Produto Interno Bruto",
            logo: "/images/logos/partners/ibge_logo.png",
            description: "Desvende o PIB: o termômetro da economia!"
        },
    ];

    const filteredCards = cardsData.filter((card) =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-center my-10">
                <label className="flex flex-col w-[70%]">
                    Pesquise aqui:
                    <input
                        type="text"
                        placeholder="Pesquise por título ou descrição..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border border-gray-300 rounded w-full"
                    />
                </label>
            </div>

            <div className="flex flex-wrap justify-evenly gap-4 cards-container">
                {filteredCards.length > 0 ? (
                    filteredCards.map((card, index) => (
                        <Card
                            key={index}
                            banner={card.banner}
                            title={card.title}
                            logo={card.logo}
                            description={card.description}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 text-center mt-8">Nenhum resultado encontrado para a sua pesquisa.</p>
                )}
            </div>
        </div>
    );
};
