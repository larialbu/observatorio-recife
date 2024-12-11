export const ShowPercentages = ({
  showPercentage,
  setShowPercentage,
}: {
  showPercentage: boolean;
  setShowPercentage: (val: boolean) => void;
}) => {
  return (
    <div className="text-center  button-container">
      <button
        onClick={() => setShowPercentage(!showPercentage)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {showPercentage ? "Ocultar Porcentagens" : "Mostrar Porcentagens"}
      </button>
    </div>
  );
};
