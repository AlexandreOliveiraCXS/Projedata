'use client';

import { Sidebar } from '@/components/Sidebar';
import { CadastroInsumo } from '@/components/CadastroInsumo';
import { CadastroProduto } from '@/components/CadastroProduto';
import { useState } from 'react';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'insumo' | 'produto'>('insumo');

  return (
    <div className="flex pt-16 h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <Sidebar onNavigate={setCurrentPage} />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 h-[calc(100vh-8rem)]">
            
            {currentPage === 'insumo' ? <CadastroInsumo /> : <CadastroProduto />}
          </div>
        </div>
      </main>
    </div>
  );
}
