import React from 'react';
import Link from 'next/link';

export function MaintenancePage({ backLink }: { backLink: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <img src="/images/404/bug-fix.svg" alt="Ícone de um bug sendo corrigido" className="mb-4 w-3/4 sm:w-1/2 md:w-1/4" />
      <h1 className="text-4xl font-bold mb-4 text-center">Página em Manutenção</h1>
      <div className="flex flex-col items-center gap-2">
        <p className="text-md text-center max-w-lg">
          Desculpe o transtorno. Esta página está temporariamente indisponível enquanto trabalhamos para melhorá-la.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Por favor, volte mais tarde.
        </p>
      </div>
      <Link href={backLink} className="mt-8 bg-blue-600 p-2 pr-4 rounded text-white transition-all hover:bg-blue-800 flex items-center hover:transform hover:-translate-x-1">
        <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g data-name="Layer 2">
            <g data-name="arrow-ios-back">
              <rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"/>
                <path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"/>
              </g>
          </g>
        </svg>
        Voltar
      </Link>
    </div>
  );
}