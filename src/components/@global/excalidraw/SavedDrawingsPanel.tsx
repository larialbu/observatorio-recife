import React from "react";
import { useDrawingStore } from "./context/drawingStoreContext";
import type { IDrawing } from "./drawingStore";

interface SavedDrawingsPanelProps {
  onLoadDrawing: (drawing: IDrawing) => void;
  onClose: () => void;
}

const SavedDrawingsPanel: React.FC<SavedDrawingsPanelProps> = ({
  onLoadDrawing,
  onClose,
}) => {
  const {
    getAllDrawings,
    saveDrawing,
    deleteCurrentDrawing,
  } = useDrawingStore();

  const drawings = getAllDrawings().filter((d) => d.data != null);

  const handleRename = async (drawing: IDrawing) => {
    const newName = prompt("Novo nome da tela:", drawing.name);
    if (newName && newName.trim() !== "") {
      const updated = { ...drawing, name: newName, updatedAt: Date.now() };
      await saveDrawing(updated, drawing.data);
    }
  };

  const handleDelete = async (drawing: IDrawing) => {
    const confirmed = confirm(`Excluir "${drawing.name}"?`);
    if (confirmed) {
      await deleteCurrentDrawing(drawing.id);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-white min-h-full rounded-b-lg">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
        Telas Salvas
      </h2>

      {drawings.length === 0 ? (
        <p className="text-center text-gray-500">Nenhuma tela salva encontrada.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {drawings.map((drawing) => (
            <div
              key={drawing.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group"
            >
              {drawing.data?.thumbnail && (
                <img
                  src={drawing.data.thumbnail}
                  alt="Miniatura da cena"
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}

              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800 truncate w-5/6">
                    {drawing.name}
                  </h3>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleRename(drawing)}
                      className="text-blue-500 hover:text-blue-700 text-sm transition-transform hover:scale-110"
                      title="Renomear"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(drawing)}
                      className="text-red-500 hover:text-red-700 text-sm transition-transform hover:scale-110"
                      title="Excluir"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  {new Date(drawing.updatedAt).toLocaleString()}
                </p>

                <button
                  onClick={() => onLoadDrawing(drawing)}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition duration-200"
                >
                  Carregar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <button
          onClick={onClose}
          className="bg-gray-700 hover:bg-gray-800 text-white font-medium px-6 py-2 rounded-lg transition duration-200"
        >
          Fechar Painel
        </button>
      </div>
    </div>
  );
};

export default SavedDrawingsPanel;
