export default function Timeline() {
    return (
      <section className="bg-gray-50 dark:bg-gray-800 py-16 px-6">
        {/* Keyframes e classe para animação de entrada pela esquerda */}
        <style>
          {`
            @keyframes slideInLeft {
              0% {
                opacity: 0;
                transform: translateX(-20px);
              }
              100% {
                opacity: 1;
                transform: translateX(0);
              }
            }
            .animate-slideInLeft {
              animation: slideInLeft 0.8s ease-in-out forwards;
            }
          `}
        </style>
  
        <div className="max-w-6xl mx-auto">
          {/* Título e descrição */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
              Nossa Jornada
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
              Confira os marcos importantes da nossa história.
            </p>
          </div>
  
          {/* Linha do tempo */}
          <ol className="relative border-l border-gray-200 dark:border-gray-700">
            {/* ITEM 2023 */}
            <li className="pb-10 relative">
              <div
                className="
                  group 
                  p-4 
                  rounded-md 
                  hover:bg-gray-100 
                  dark:hover:bg-gray-900 
                  transition-all 
                  duration-300 
                  ease-in-out 
                  animate-slideInLeft
                "
              >
                {/* Bolinha (marcador) */}
                <span
                  className="
                    absolute 
                    -left-4 
                    top-6 
                    flex 
                    items-center 
                    justify-center 
                    w-8 h-8 
                    bg-blue-100 
                    rounded-full 
                    ring-4 
                    ring-white 
                    dark:ring-gray-800 
                    dark:bg-blue-900
                    group-hover:scale-110 
                    transition-transform 
                    duration-300 
                    ease-in-out
                  "
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 10a8 8 0 1116 0A8 8 0 012 10z" />
                  </svg>
                </span>
                {/* Conteúdo do item */}
                <h3 className="ml-6 text-xl font-semibold text-gray-800 dark:text-white">
                  2023
                </h3>
                <p className="mt-2 ml-6 text-gray-600 dark:text-gray-400">
                  A Secretaria de Desenvolvimento Econômico do Recife firma
                  parceria com a Faculdade Senac para a criação de um
                  Observatório Econômico.
                </p>
              </div>
            </li>
  
            {/* ITEM 2024 */}
            <li className="pb-10 relative">
              <div
                className="
                  group 
                  p-4 
                  rounded-md 
                  hover:bg-gray-100 
                  dark:hover:bg-gray-900 
                  transition-all 
                  duration-300 
                  ease-in-out
                  animate-slideInLeft
                "
              >
                <span
                  className="
                    absolute 
                    -left-4 
                    top-6 
                    flex 
                    items-center 
                    justify-center 
                    w-8 h-8 
                    bg-blue-100 
                    rounded-full 
                    ring-4 
                    ring-white 
                    dark:ring-gray-800 
                    dark:bg-blue-900 
                    group-hover:scale-110 
                    transition-transform 
                    duration-300 
                    ease-in-out
                  "
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 10a8 8 0 1116 0A8 8 0 012 10z" />
                  </svg>
                </span>
                <h3 className="ml-6 text-xl font-semibold text-gray-800 dark:text-white">
                  2024
                </h3>
                <p className="mt-2 ml-6 text-gray-600 dark:text-gray-400">
                  Lançamento do Observatório Econômico do Recife em parceria com a
                  Faculdade Senac.
                </p>
              </div>
            </li>
  
            {/* ITEM 2025 */}
            <li className="pb-10 relative">
              <div
                className="
                  group 
                  p-4 
                  rounded-md 
                  hover:bg-gray-100 
                  dark:hover:bg-gray-900 
                  transition-all 
                  duration-300 
                  ease-in-out
                  animate-slideInLeft
                "
              >
                <span
                  className="
                    absolute 
                    -left-4 
                    top-6 
                    flex 
                    items-center 
                    justify-center 
                    w-8 h-8 
                    bg-blue-100 
                    rounded-full 
                    ring-4 
                    ring-white 
                    dark:ring-gray-800 
                    dark:bg-blue-900 
                    group-hover:scale-110 
                    transition-transform 
                    duration-300 
                    ease-in-out
                  "
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 10a8 8 0 1116 0A8 8 0 012 10z" />
                  </svg>
                </span>
                <h3 className="ml-6 text-xl font-semibold text-gray-800 dark:text-white">
                  2025
                </h3>
                <p className="mt-2 ml-6 text-gray-600 dark:text-gray-400">
                  O projeto do Observatório Econômico do Recife foi ampliado com
                  novas funcionalidades e análises de impacto, fortalecendo sua
                  capacidade de fornecer dados estratégicos e insights para
                  apoiar o desenvolvimento econômico da cidade.
                </p>
              </div>
            </li>
  
            {/* ITEM EXTRA (Exemplo de continuação) */}
            {/* 
            <li className="pb-10 relative">
              <div
                className="
                  group 
                  p-4 
                  rounded-md 
                  hover:bg-gray-100 
                  dark:hover:bg-gray-900 
                  transition-all 
                  duration-300 
                  ease-in-out
                  animate-slideInLeft
                "
              >
                <span
                  className="
                    absolute 
                    -left-4 
                    top-6 
                    flex 
                    items-center 
                    justify-center 
                    w-8 h-8 
                    bg-blue-100 
                    rounded-full 
                    ring-4 
                    ring-white 
                    dark:ring-gray-800 
                    dark:bg-blue-900 
                    group-hover:scale-110 
                    transition-transform 
                    duration-300 
                    ease-in-out
                  "
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 10a8 8 0 1116 0A8 8 0 012 10z" />
                  </svg>
                </span>
                <h3 className="ml-6 text-xl font-semibold text-gray-800 dark:text-white">
                  2026
                </h3>
                <p className="mt-2 ml-6 text-gray-600 dark:text-gray-400">
                  Seu texto aqui...
                </p>
              </div>
            </li>
            */}
          </ol>
        </div>
      </section>
    );
  }
  