import Image from "next/image";

const UserCard = ({ type, data, year, color }: { type: string, data: any[], year: string, color: string }) => {
  // Variáveis para armazenar o total de passageiros e o número de registros
  let totalPassageiros = 0;
  let totalRegistros = 0;

  if (type === "Média de passageiros por ano") {
    data.forEach((item: any) => {
      const passageiros = Number(item["PASSAGEIRO"]) || 0;
      const ano = item["ANO"];
      const aeroporto = item["AEROPORTO NOME"];

      // filtra por ano e por Recife
      if (ano === year && aeroporto.toLowerCase().includes("recife")) {
        totalPassageiros += passageiros;
        totalRegistros += 1;
      }
    });
  }

  // Calcular a média de passageiros
  const mediaPassageiros = totalRegistros > 0 ? totalPassageiros / totalRegistros : 0;

  return (
    <div className="rounded-2xl p-4 flex-1 min-w-[130px]" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-[#0155AE]">
          Recife - {year}
        </span>
        <Image src="/more.png" alt="More options" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4 text-white">
        {Math.round(mediaPassageiros).toLocaleString()} {/* Média arredondada e formatada */}
      </h1>
      <h2 className="capitalize text-sm font-medium text-white">{type}</h2>
    </div>
  );
};

export default UserCard;
