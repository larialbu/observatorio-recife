interface BundleErrorScreenProps {
  error: string;
}

export function BundleErrorScreen({ error }: BundleErrorScreenProps) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-6 py-4 rounded-lg max-w-md mx-4">
        <h3 className="font-bold text-lg mb-2">Erro ao carregar dados</h3>
        <p className="mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  );
}