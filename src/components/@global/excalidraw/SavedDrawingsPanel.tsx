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
  const { getAllDrawings } = useDrawingStore();
  const drawings = getAllDrawings().filter((drawing) => drawing.data != null);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Telas Salvas</h2>
      {drawings.length === 0 ? (
        <p>Nenhuma tela salva encontrada.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {drawings.map((drawing) => (
            <div key={drawing.id} className="border p-2 rounded shadow">
              <h3 className="font-semibold">{drawing.name}</h3>
              <p className="text-xs text-gray-500">
                {new Date(drawing.updatedAt).toLocaleString()}
              </p>
              <button
                className="mt-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
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
