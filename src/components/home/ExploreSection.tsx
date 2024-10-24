import Link from "next/link";

export const ExploreSection = () => {
    return (
        <div className="w-full flex flex-col mt-5 items-center justify-center explore-content section-content">
            <div className="text-content w-[80%] max-w-[800px] p-4">
                <div className="title-content">
                    <div className="text-3xl mb-3 font-bold __title">
                        <p>Explorar mais</p>
                    </div>
                    <div className="description-content">
                        <div className="__description">
                            <p className='font-semibold mb-1'>Busca mais informações nos detalhes e quer estar por dentro de tudo?</p>
                            <p className='text-justify'>
                                Não fique por fora do cenário econômico do Recife, navegue
                                pelo observatório e descubra como anda a movimentação do
                                emprego, consulte o PIB, veja o cenário das empresas, entre
                                outros!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="button-content">
                <Link href="/list/events">
                    <button className="__button">Explorar</button>
                </Link>
            </div>
        </div>
    )
}