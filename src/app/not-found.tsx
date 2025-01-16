import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-blue-800 text-white text-center px-4">
      {/* Título do Erro */}
      <h1 className="text-9xl font-extrabold">404</h1>

      {/* Imagem */}
      <img
        src="/images/404/404-IMG.png"
        alt="404 Not Found"
        className="w-1/3 max-w-sm my-6"
        draggable="false"
      />

      {/* Mensagem de Erro */}
      <h2 className="text-2xl font-semibold">Página não encontrada</h2>
      <p className="mt-2 text-lg text-gray-300">
        Parece que você se perdeu! Não se preocupe, volte para a página inicial.
      </p>

      {/* Botão Estilizado */}
      <Link href="/" className="mt-6 relative group">
        <div className="relative inline-block px-8 py-4 font-bold text-lg text-white bg-gradient-to-r from-[#EC6625] to-[#f0933b] rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-110">
        <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 blur-lg opacity-30 rounded-lg"></span>
        <span className="relative">Voltar para a Home</span>
        </div>
      </Link>
    </div>
  );
};

export default Custom404;
