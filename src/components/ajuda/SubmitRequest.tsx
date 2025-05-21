import React from "react";

const SubmitRequest: React.FC = () => {

  return (
    <section className="py-16 px-8 bg-[#f7f8f9] dark:bg-[#1d2b3d] w-full">
      <div className="max-w-[1120px] m-auto">
        <div className="bg-white dark:bg-[#0C1B2B] rounded-xl flex flex-col-reverse items-center lg:items-start lg:flex-row lg:justify-between">
            <div className="py-12 px-12 leading-[1.1] lg:pr-0 flex flex-col items-center lg:items-start lg:w-[40%]">
                <div className="flex flex-col text-center lg:text-left">
                    <h3 className="mb-4 font-bold text-[28px] text-gray-800 dark:text-gray-200">Não achou o que estava procurando?</h3>
                    <span className="mb-12 text-gray-600 dark:text-gray-400">Quer conversar com alguém do suporte? Estamos aqui para você. Você pode enviar uma solicitação abaixo, conversar conosco ou nos ligar.</span>
                </div>
                <a href="mailto:desenvolvimento@recife.pe.gov.br" target="_blank" className="py-3 px-5 bg-[#EC6625] rounded-[7px] cursor-pointer size-fit text-white font-semibold shadow-lg hover:bg-[#ce5a21] hover:scale-105">Fale com a gente!</a>
            </div>
            <div className="flex w-[50%] md:w-[40%] lg:w-[35%]">
                <img src="images/svgs/Thinking face-cuate.svg" alt="" />
            </div>
        </div>
      </div>
    </section>
  );
};

export default SubmitRequest;