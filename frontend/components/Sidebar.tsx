'use client';

import Link from 'next/link';
import { useMenu } from '@/contexts/MenuContext';
import { useState } from 'react';

interface SidebarProps {
    onNavigate?: (page: 'insumo' | 'produto') => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
    const { isOpen, closeMenu } = useMenu();
    const [activePage, setActivePage] = useState<'insumo' | 'produto'>('insumo');

    const handleNavClick = (page: 'insumo' | 'produto') => {
        setActivePage(page);
        onNavigate?.(page);
        closeMenu();
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={closeMenu}
                    aria-hidden="true"
                />
            )}

            <aside
                className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 transform bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:relative lg:top-0 lg:h-screen lg:translate-x-0 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <nav className="p-6 space-y-4">
                    <div className="space-y-2">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 py-2">
                            Cadastros
                        </h3>

                        <button
                            onClick={() => handleNavClick('insumo')}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${activePage === 'insumo'
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-slate-200 hover:bg-slate-800'
                                }`}
                        >
                            Cadastro de Insumo
                        </button>

                        <button
                            onClick={() => handleNavClick('produto')}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${activePage === 'produto'
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-slate-200 hover:bg-slate-800'
                                }`}
                        >
                            Cadastro de Produto
                        </button>
                    </div>
                </nav>
            </aside>
        </>
    );
}
