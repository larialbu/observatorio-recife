import React, { useState } from "react";
import { Card } from "@/components/explorar/Card";
import { Popup } from "@/components/explorar/Popup";

export const CardsContainer: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
    const [suggestions, setSuggestions] = useState<{ title: string, banner:string; detailedDescription: string, name: string}[]>([]);

    const cardsData = [
        {
            banner: "/images/banners/aeroporto_banner.png",
            title: "Movimentação dos aeroportos",
            logo: "/images/logos/partners/anac_logo.png",
            description: "Explore a decolagem das tendências no tráfego aéreo!",
            detailedDescription: "A movimentação dos aeroportos abrange dados sobre o fluxo de passageiros, carga e operações aéreas, proporcionando uma visão sobre o crescimento e as variações no setor de aviação civil.",
            route: "/observatorio/aeroportos?tab=geral",
            name: "Aeroportos",
        },
        {
            banner: "/images/banners/porto_recife_banner.png",
            title: "Movimentação dos Portos",
            logo: "/images/logos/partners/porto_recife_logo.png",
            description: "Cheque as movimentações dos portos!",
            detailedDescription: "A movimentação dos portos inclui informações sobre carga, descarga e o tráfego de navios, refletindo a dinâmica do comércio exterior e a importância econômica do setor portuário.",
            route: "/observatorio/portos",
            name: "Portos",
        },
        {
            banner: "/images/banners/ipca_banner.png",
            title: "IPCA - Índice Nacional de Preços ao Consumidor Amplo",
            logo: "/images/logos/partners/ibge_logo.png",
            description: "Fique por dentro da variação dos valores!",
            detailedDescription: "O IPCA é um índice que mede a inflação oficial do Brasil, calculado mensalmente pelo IBGE, considerando os preços de uma cesta básica de bens e serviços em diversas regiões do país.",
            route: "/observatorio/ipca",
            name: "IPCA",
        },
        {
            banner: "/images/banners/balanca_comercial_banner.png",
            title: "Balança Comercial",
            logo: "/images/logos/partners/comex_stat_logo.png",
            description: "Explore os bastidores da balança comercial: o que entra e sai do Brasil!",
            detailedDescription: "A balança comercial reflete a diferença entre exportações e importações do Brasil, sendo um indicador importante da saúde econômica e das relações comerciais com o resto do mundo.",
            route: "/observatorio/balanca-comercial?tab=geral",
            name: "Balança Comercial",
        },
        {
            banner: "/images/banners/ranking_banner.png",
            title: "Ranking de Competitividade dos Municípios",
            logo: "/images/logos/partners/clp_logo.png",
            description: "Descubra quais municípios estão no topo da competitividade!",
            detailedDescription: "O Ranking de Competitividade dos Municípios analisa aspectos como infraestrutura, capital humano e inovação, destacando os municípios mais preparados para o desenvolvimento econômico.",
            route: "/observatorio/ranking-municipios?tab=geral",
            name: "Ranking",
        },
        {
            banner: "/images/banners/empresas_banner.png",
            title: "Empresas da cidade do Recife",
            logo: "/images/logos/partners/prefeitura_recife_logo.png",
            description: "Revele o potencial das empresas recifenses com análises sólidas!",
            detailedDescription: "As empresas de Recife englobam setores diversos, desde tecnologia até serviços, desempenhando um papel crucial na economia local e gerando oportunidades para o desenvolvimento da região.",
            route: "/observatorio/empresas",
            name: "Empresas",
        },
        {
            banner: "/images/banners/empregos_banner.png",
            title: "Variação e atividade dos empregos",
            logo: "/images/logos/partners/novo_caged_logo.png",
            description: "Explore a dinâmica das variações e atividades no mercado de trabalho!",
            detailedDescription: "Os dados sobre empregos abrangem a criação e extinção de vagas em diferentes setores, oferecendo uma visão sobre o comportamento do mercado de trabalho e a estabilidade econômica.",
            route: "/observatorio/empregos",
            name: "Empregos",
        },
        {
            banner: "/images/banners/pib_banner.png",
            title: "PIB - Produto Interno Bruto",
            logo: "/images/logos/partners/ibge_logo.png",
            description: "Desvende o PIB: o termômetro da economia!",
            detailedDescription: "O PIB representa o valor total de bens e serviços produzidos em uma região em um período específico, servindo como principal indicador do crescimento econômico e da prosperidade.",
            route: "/observatorio/pib",
            name: "PIB",
        },
        {
            banner: "/images/banners/capacidade-de-pagamento-banner.png",
            title: "CAPAG - Capacidade de Pagamentos",
            logo: "/images/logos/partners/tesouro-nacional-logo.png",
            description: "Verifique a saúde financeira e a confiabilidade de pagamentos do município.",
            detailedDescription: "Capacidade de pagamento é a capacidade de uma pessoa ou empresa cumprir com suas obrigações financeiras. É um critério usado para avaliar a viabilidade de uma pessoa ou empresa honrar com suas dívidas, despesas e outros compromissos. ",
            route: "/observatorio/capag",
            name: "CAPAG",
        },
    ];

    const filteredCards = cardsData.filter((card) =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getSuggestions = (currentIndex: number) => {
        const otherCards = cardsData.filter((_, index) => index !== currentIndex);
        const shuffled = otherCards.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    };

    const openPopup = (index: number) => {
        setSelectedCardIndex(index);
        setSuggestions(getSuggestions(index));
    };

    const closePopup = () => setSelectedCardIndex(null);

    const handleNavigate = (direction: "prev" | "next") => {
        if (selectedCardIndex === null) return;
        const newIndex =
            direction === "prev"
                ? (selectedCardIndex + cardsData.length - 1) % cardsData.length
                : (selectedCardIndex + 1) % cardsData.length;
        setSelectedCardIndex(newIndex);
        setSuggestions(getSuggestions(newIndex));
    };

    const handleSuggestionClick = (index: number) => {
        setSelectedCardIndex(index);
        setSuggestions(getSuggestions(index));
    };

    return (
        <div className="max-w-[calc(3*400px+10*5px)] mx-auto">
            <div className="flex justify-center my-10">
                <label className="flex flex-col w-[70%] dark:text-white">
                    Pesquise aqui:
                    <input
                        type="text"
                        placeholder="Pesquise por título ou descrição..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mt-[5px] p-2 border border-gray-300 rounded w-full dark:bg-[#0C1B2B] focus:outline-none dark:hover:border-[#C5DFFF] dark:focus:border-white focus:ring-1 focus:ring-[#C5DFFF]"
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
                            onButtonClick={() => openPopup(index)}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 text-center mt-8">Nenhum resultado encontrado para a sua pesquisa.</p>
                )}
            </div>

            {selectedCardIndex !== null && (
                <Popup
                    card={cardsData[selectedCardIndex]}
                    onClose={closePopup}
                    onNavigate={handleNavigate}
                    onSuggestionClick={(index) => handleSuggestionClick(cardsData.findIndex(card => card.name === suggestions[index].name))}
                    suggestions={suggestions}
                    route={cardsData[selectedCardIndex].route} // Passa a rota do card selecionado               
                    />
            )}
        </div>
    );
};
