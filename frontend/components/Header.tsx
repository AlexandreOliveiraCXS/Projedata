'use client';

import { useMenu } from '@/contexts/MenuContext';

export function Header() {
  const { toggleMenu } = useMenu();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-slate-800 text-white shadow-lg z-50">
      <div className="h-full flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 hover:bg-slate-700 rounded-lg transition-colors"
            aria-label="Abrir menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold">Projedata</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-semibold text-sm">
            👤
          </div>
        </div>
      </div>
    </header>
  );
}
