import Image from "next/image";

const UserCard = ({ type }: { type: string }) => {
  // Define uma cor baseada no tipo
  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "Usuarios":
        return "#0155AE"; // Azul
      case "Voos":
        return "#EC6625"; // Laranja
      case "Empregabilidade":
        return "#52B348"; // Verde
      case "Ações":
        return "#0155AE"; // Verde claro como alternativa
      default:
        return "#0155AE"; // Laranja claro como fallback
    }
  };

  const backgroundColor = getBackgroundColor(type);

  return (
    <div className="rounded-2xl p-4 flex-1 min-w-[130px]" style={{ backgroundColor }}>
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-[#0155AE]">
          2024/25
        </span>
        <Image src="/more.png" alt="More options" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">1,234</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
    </div>
  );
};

export default UserCard;
