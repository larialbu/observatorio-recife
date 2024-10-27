import Link from "next/link";
import Image from "next/image";

export const CardsSection = () => {
  return (
    <div className="flex flex-wrap justify-center mt-16 mb-16">
      {" "}
      {/* Mudança para flex-wrap */}
      <Link href="/observatorio/panorama">
        <div className="bg-white rounded-lg shadow-md p-4 m-2 flex flex-col items-center cursor-pointer w-80">
          {" "}
          {/* Largura fixa e margem */}
          <Image src="/home.png" alt="Icon 1" width={50} height={50} />
          <h2 className="mt-2 font-semibold">Título do Card 1</h2>
          <p>Texto fictício para descrever o card 1.</p>
          <button className="mt-2 bg-blue-900 text-white rounded py-1 px-3">
            Ver mais
          </button>{" "}
          {/* Botão azul */}
        </div>
      </Link>
      <Link href="/observatorio/panorama">
        <div className="bg-white rounded-lg shadow-md p-4 m-2 flex flex-col items-center cursor-pointer w-80">
          {" "}
          {/* Largura fixa e margem */}
          <Image src="/calendar.png" alt="Icon 2" width={50} height={50} />
          <h2 className="mt-2 font-semibold">Título do Card 2</h2>
          <p>Texto fictício para descrever o card 2.</p>
          <button className="mt-2 bg-blue-900 text-white rounded py-1 px-3">
            Ver mais
          </button>{" "}
          {/* Botão azul */}
        </div>
      </Link>
      <Link href="/observatorio/panorama">
        <div className="bg-white rounded-lg shadow-md p-4 m-2 flex flex-col items-center cursor-pointer w-80">
          {" "}
          {/* Largura fixa e margem */}
          <Image src="/student.png" alt="Icon 3" width={50} height={50} />
          <h2 className="mt-2 font-semibold">Título do Card 3</h2>
          <p>Texto fictício para descrever o card 3.</p>
          <button className="mt-2 bg-blue-900 text-white rounded py-1 px-3">
            Ver mais
          </button>
        </div>
      </Link>
    </div>
  );
};
