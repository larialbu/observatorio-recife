import React, { useState } from "react";

export const FaqSection: React.FC = () => {
  // Perguntas e respostas
  const faqs = [
    {
      question: "Qual o objetivo principal do Observatório Econômico do Recife?",
      answer:
        "O Observatório visa analisar, monitorar e compartilhar dados econômicos e sociais do Recife, auxiliando gestores públicos, empreendedores e a sociedade civil nas tomadas de decisão.",
    },
    {
      question: "Quem pode acessar os dados e relatórios produzidos?",
      answer:
        "Todos! Nossa plataforma é aberta a qualquer pessoa interessada: estudantes, investidores, pesquisadores e cidadãos que queiram entender melhor o panorama econômico do Recife.",
    },
    {
      question: "Como são coletados os dados que aparecem aqui?",
      answer:
        "Os dados são obtidos por meio de fontes oficiais, parcerias institucionais e também de pesquisas de campo realizadas pela equipe do Observatório.",
    },
  ];

  // Estado para controlar quais FAQs estão abertas
  const [openFaqs, setOpenFaqs] = useState<boolean[]>(
    // Todos fechados inicialmente
    faqs.map(() => false)
  );

  // Função para trocar o estado (abre/fecha)
  const toggleFaq = (index: number) => {
    const newOpenFaqs = [...openFaqs];
    newOpenFaqs[index] = !newOpenFaqs[index];
    setOpenFaqs(newOpenFaqs);
  };

  return (
    <section className="py-16 w-full dark:bg-[#0C1B2B] px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-10">
          Perguntas Frequentes
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaqs[index]; // se estiver true, mostra a resposta

            return (
              <div
                key={index}
                onClick={() => toggleFaq(index)} // clique no card todo
                className="
                  bg-white
                  dark:bg-gray-900
                  rounded-lg
                  shadow
                  p-6
                  cursor-pointer
                  transition-transform
                  hover:-translate-y-1
                "
              >
                {/* Cabeçalho: Pergunta + Ícone */}
                <div className="flex justify-between items-center w-full">
                  <span className="text-lg font-semibold text-gray-800 dark:text-white">
                    {faq.question}
                  </span>
                  <span className="text-[#0155AE] dark:text-[#EC6625] ml-2">
                    {/* Se isOpen for true, mostramos ícone "chevron up", caso contrário "chevron down" */}
                    {isOpen ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 15l-6-6-6 6" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    )}
                  </span>
                </div>

                {/* Resposta - com transição de altura/opacidade */}
                <div
                  className={`
                    mt-4 text-gray-600 dark:text-gray-400
                    transition-all duration-300 ease-in-out
                    overflow-hidden
                    ${isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}
                  `}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
