import React from 'react';
import Link from 'next/link';

export function MaintenancePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <img src="/images/404/bug-fix.svg" alt=""  className='mb-4 w-1/4'/>
      <h1 className="text-4xl font-bold mb-4">Página em Manutenção</h1>
      <p className="text-md text-center max-w-lg mb-8">
        Desculpe o transtorno. Esta página está temporariamente indisponível enquanto trabalhamos para melhorá-la.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Por favor, volte mais tarde.
      </p>
      <Link href="/" className="mt-8 bg-blue-600 p-2 rounded text-white transition-all hover:bg-blue-800">
        Voltar para a Página Inicial
      </Link>
    </div>
  );
}