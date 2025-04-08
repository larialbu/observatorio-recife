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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Telas Salvas</h2>
      {drawings.length === 0 ? (
        <p>Nenhuma tela salva encontrada.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {drawings.map((drawing) => (
            <div key={drawing.id} className="border p-2 rounded shadow">
              {drawing.data?.thumbnail && (
                <img
                  src={drawing.data.thumbnail}
                  alt="Miniatura da cena"
                  className="mb-2 w-full h-32 object-cover rounded pointer-events-none select-none"
                />
              )}
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-sm truncate">{drawing.name}</h3>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleRename(drawing)}
                    className="text-xs text-blue-500 hover:underline"
                    title="Renomear"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(drawing)}
                    className="text-xs text-red-500 hover:underline"
                    title="Excluir"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                {new Date(drawing.updatedAt).toLocaleString()}
              </p>
              <button
                className="mt-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 w-full"
                onClick={() => onLoadDrawing(drawing)}
              >
                Carregar
              </button>
            </div>
          ))}
        </div>
      )}
      <button
        className="mt-4 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
        onClick={onClose}
      >
        Fechar Painel
      </button>
    </div>
  );
};

export default SavedDrawingsPanel;
