import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="flex text-white">
            <div className="w-full h-full relative __background">
            <div className="flex items-center absolute logo-container">
                <img src="/images/logos/prefeitura_recife_logo_white.png"/>
            </div>
            <div className="w-full h-full absolute __blue-filter"></div>
            <div className="h-full absolute right-10 flex __lines">
                <div className="__line item1"></div>
                <div className="__line item2"></div>
                <div className="__line item3"></div>
            </div>
            </div>
            <div className="absolute pl-4 text-content">
            <div className="title-container">
                <div className="__title">
                <p>Secretaria de Desenvolvimento Econômico</p>
                </div>
            </div>
            <div className="flex description-content">
                <div className="left-column description-column">
                <div className="flex flex-col __rows">
                    <div className="flex items-center __row item1">
                    <div className="__icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.3308 15.9402L15.6608 14.6101C15.8655 14.403 16.1092 14.2384 16.3778 14.1262C16.6465 14.014 16.9347 13.9563 17.2258 13.9563C17.517 13.9563 17.8052 14.014 18.0739 14.1262C18.3425 14.2384 18.5862 14.403 18.7908 14.6101L20.3508 16.1702C20.5579 16.3748 20.7224 16.6183 20.8346 16.887C20.9468 17.1556 21.0046 17.444 21.0046 17.7351C21.0046 18.0263 20.9468 18.3146 20.8346 18.5833C20.7224 18.8519 20.5579 19.0954 20.3508 19.3L19.6408 20.02C19.1516 20.514 18.5189 20.841 17.8329 20.9541C17.1469 21.0672 16.4427 20.9609 15.8208 20.6501C10.4691 17.8952 6.11008 13.5396 3.35083 8.19019C3.03976 7.56761 2.93414 6.86242 3.04914 6.17603C3.16414 5.48963 3.49384 4.85731 3.99085 4.37012L4.70081 3.65015C5.11674 3.23673 5.67937 3.00464 6.26581 3.00464C6.85225 3.00464 7.41488 3.23673 7.83081 3.65015L9.40082 5.22021C9.81424 5.63615 10.0463 6.19871 10.0463 6.78516C10.0463 7.3716 9.81424 7.93416 9.40082 8.3501L8.0708 9.68018C8.95021 10.8697 9.91617 11.9926 10.9608 13.04C11.9994 14.0804 13.116 15.04 14.3008 15.9102L14.3308 15.9402Z"/>
                        </svg>
                    </div>
                    <p className="__description">+55 (81) 3355-7130/3355-7129</p>
                    </div>
                    <div className="flex items-center __row item2">
                    <div className="__icon">
                        <svg viewBox="3 0 18 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22,5V9L12,13,2,9V5A1,1,0,0,1,3,4H21A1,1,0,0,1,22,5ZM2,11.154V19a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V11.154l-10,4Z"/>
                        </svg>
                    </div>
                        <a href="mailto:desenvolvimento@recife.pe.gov.br">
                            <p className="__description">desenvolvimento@recife.pe.gov.br</p>
                        </a>
                    </div>
                    <div className="flex items-center __row item3">
                    <div className="__icon">
                    <svg viewBox="10 -50 500 600" xmlns="http://www.w3.org/2000/svg">
                        <path d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"/>
                    </svg>
                    </div>
                    <a href="https://desenvolvimentoeconomico.recife.pe.gov.br/" target="_blank">
                        <p className="__description">desenvolvimentoeconomico.recife.pe.gov.br</p>
                    </a>
                    </div>
                </div>
                </div>
                <div className="right-column description-column">
                <div className="flex flex-col __rows">
                    <div className="flex items-center __row item1">
                    <div className="__icon">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                        <g>
                        <path d="M50,10.417c-15.581,0-28.201,12.627-28.201,28.201c0,6.327,2.083,12.168,5.602,16.873L45.49,86.823   c0.105,0.202,0.21,0.403,0.339,0.588l0.04,0.069l0.011-0.006c0.924,1.278,2.411,2.111,4.135,2.111c1.556,0,2.912-0.708,3.845-1.799   l0.047,0.027l0.179-0.31c0.264-0.356,0.498-0.736,0.667-1.155L72.475,55.65c3.592-4.733,5.726-10.632,5.726-17.032   C78.201,23.044,65.581,10.417,50,10.417z M49.721,52.915c-7.677,0-13.895-6.221-13.895-13.895c0-7.673,6.218-13.895,13.895-13.895   s13.895,6.222,13.895,13.895C63.616,46.693,57.398,52.915,49.721,52.915z"/>
                        </g>
                    </svg>
                    </div>
                    <p className="__description">Rua do Brum, 123 - 3º andar - Empresarial Maurício<br/>Brandão Mattos - Bairro do Recife, Recife-PE</p>
                    </div>
                    <div className="flex items-center __row item2">
                    <div className="__icon">
                    <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="-10 0 80 64">
                        <path d="M32,0C14.328,0,0,14.328,0,32s14.328,32,32,32s32-14.328,32-32S49.672,0,32,0z M42.844,42.844  c-1.566,1.566-4.168,1.488-5.734-0.078l-7.934-7.934c-0.371-0.367-0.664-0.812-0.867-1.305C28.105,33.039,28,32.523,28,32V16  c0-2.211,1.789-4,4-4s4,1.789,4,4v14.344l6.859,6.859C44.426,38.77,44.406,41.281,42.844,42.844z"/>
                    </svg>
                    </div>
                    <p className="__description">8h às 18h (Segunda a sexta-feira)</p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </footer>
      )
}