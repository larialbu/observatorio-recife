import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-[#151515] text-center px-4 gap-5">
      <h1 className="text-8xl font-extrabold">
        <span className="text-blueObs">4</span>
        <span className="text-orangeObs">0</span>
        <span className="text-greenObs">4</span>
      </h1>

      <img
        src="/images/404/404-IMG.png"
        alt="404 Not Found"
        className="w-4/5 max-w-md"
        draggable="false"
      />

      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-2xl font-semibold">Página não encontrada</h2>
          <p className="text-lg text-gray-400">
            Parece que você se perdeu! Não se preocupe, volte para a página inicial.
          </p>
        </div>

        <Link href="/" className="mt-6 relative group">
          <div className="relative inline-block px-8 py-4 font-medium text-lg text-white bg-gradient-to-br from-blue-500 to-blue-800 rounded-xl shadow-lg transform transition-transform duration-300 group-hover:scale-110">
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-800 blur-lg opacity-30 rounded-lg"></span>
          <span className="relative">Voltar para a Home</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
