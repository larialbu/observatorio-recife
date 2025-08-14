import React, { useState } from "react";
import { faqs } from "./Faqs";

export const FaqSection: React.FC = () => {
  const [openFaqs, setOpenFaqs] = useState<boolean[]>(
    faqs.map(() => false)
  );

  const toggleFaq = (index: number) => {
    const newOpenFaqs = [...openFaqs];
    newOpenFaqs[index] = !newOpenFaqs[index];
    setOpenFaqs(newOpenFaqs);
  };

  return (
    <section className="py-16 w-full dark:bg-[#0C1B2B] px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-10">
          Perguntas Frequentes
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaqs[index];

            return (
              <div
                key={index}
                onClick={() => toggleFaq(index)}
                className="
                  bg-white
                  dark:bg-gray-900
                  rounded-lg
                  shadow
                  p-4 md:p-6
                  cursor-pointer
                  transition-transform
                  hover:-translate-y-1
                "
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-base md:text-lg font-semibold text-gray-800 dark:text-white mr-4">
                    {faq.question}
                  </span>
                  <span className="text-[#0155AE] dark:text-[#EC6625] flex-shrink-0">
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