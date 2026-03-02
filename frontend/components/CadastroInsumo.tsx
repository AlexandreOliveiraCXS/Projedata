'use client';

import { useState } from 'react';

interface Insumo {
    id: string;
    nome: string;
    preco: number;
    estoque: number;
}

export function CadastroInsumo() {
    const [insumos, setInsumos] = useState<Insumo[]>([
        {
            id: '1',
            nome: 'Parafuso M4',
            preco: 0.5,
            estoque: 1000,
        },
        {
            id: '2',
            nome: 'Porca M4',
            preco: 0.3,
            estoque: 1500,
        }, {
            id: '3',
            nome: 'Parafuso M4',
            preco: 0.5,
            estoque: 1000,
        },
        {
            id: '4',
            nome: 'Porca M4',
            preco: 0.3,
            estoque: 1500,
        }, {
            id: '5',
            nome: 'Parafuso M4',
            preco: 0.5,
            estoque: 1000,
        },
        {
            id: '6',
            nome: 'Porca M4',
            preco: 0.3,
            estoque: 1500,
            }, {
            id: '7',
            nome: 'Parafuso M4',
            preco: 0.5,
            estoque: 1000,
        },
        {
            id: '8',
            nome: 'Porca M4',
            preco: 0.3,
            estoque: 1500,
        }, {
            id: '9',
            nome: 'Parafuso M4',
            preco: 0.5,
            estoque: 1000,
        },
        {
            id: '10',
            nome: 'Porca M4',
            preco: 0.3,
            estoque: 1500,
        }, {
            id: '11',
            nome: 'Parafuso M4',
            preco: 0.5,
            estoque: 1000,
        },
        {
            id: '12',
            nome: 'Porca M4',
            preco: 0.3,
            estoque: 1500,
        }, {
            id: '13',
            nome: 'Parafuso M4',
            preco: 0.5,
            estoque: 1000,
        }, {
            id: '14',
            nome: 'Parafuso M4',
            preco: 0.5,
            estoque: 1000,
        },
        {
            id: '15',
            nome: 'Porca M4',
            preco: 0.3,
            estoque: 1500,
        }, {
            id: '16',
            nome: 'Parafuso M4',
            preco: 0.5,
            estoque: 1000,
        },
        {
            id: '17',
            nome: 'Porca M4',
            preco: 0.3,
            estoque: 1500,
        }, {
            id: '18',
            nome: 'Parafuso M4',
            preco: 0.5,
            estoque: 1000,
        },
        {
            id: '19',
            nome: 'Porca M4',
            preco: 0.3,
            estoque: 1500,
        },
    ]);

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<Omit<Insumo, 'id'>>({
        nome: '',
        preco: 0,
        estoque: 0,
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'preco' || name === 'estoque' ? parseFloat(value) || 0 : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newInsumo: Insumo = {
            id: Date.now().toString(),
            ...formData,
        };
        setInsumos([...insumos, newInsumo]);
        setFormData({
            nome: '',
            preco: 0,
            estoque: 0,
        });
        setShowForm(false);
    };

    const handleUpdateStock = (id: string) => {
         setFormData(prev => {
            const insumo = insumos.find(i => i.id === id);
            return insumo ? { nome: insumo.nome, preco: insumo.preco, estoque: insumo.estoque } : prev;
        });
        setShowForm(true);
    };

    const handleDelete = (id: string) => {
        setInsumos(insumos.filter((insumo) => insumo.id !== id));
    };

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Cadastro de Insumo
                </h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    {showForm ? 'Cancelar' : 'Novo Insumo'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Nome
                            </label>
                            <input
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                placeholder="Nome do insumo"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Preço (R$)
                            </label>
                            <input
                                type="number"
                                name="preco"
                                value={formData.preco}
                                onChange={handleInputChange}
                                step="0.01"
                                required
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Estoque
                            </label>
                            <input
                                type="number"
                                name="estoque"
                                value={formData.estoque}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Salvar Insumo
                    </button>
                </form>
            )}
            <div className="flex-1 overflow-auto">
                <table className="w-full text-sm">
                    <thead className="bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold">Nome</th>
                            <th className="px-4 py-3 text-left font-semibold">Preço</th>
                            <th className="px-4 py-3 text-left font-semibold">Estoque</th>
                            <th className="pr-7 py-3 text-right font-semibold">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-600">
                        {insumos.map((insumo) => (
                            <tr
                                key={insumo.id}
                                className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                            >
                                <td className="px-4 py-3 text-slate-900 dark:text-slate-100">{insumo.nome}</td>
                                <td className="px-4 py-3 text-slate-900 dark:text-slate-100">
                                    R$ {insumo.preco.toFixed(2)}
                                </td>
                                <td className="px-4 py-3 text-slate-900 dark:text-slate-100">{insumo.estoque}</td>
                                <td className="flex gap-4 justify-end pr-2 py-3">
                                    <button
                                        onClick={() => handleUpdateStock(insumo.id)}
                                        className="text-yellow-600 hover:text-yellow-800 font-medium"
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={() => handleDelete(insumo.id)}
                                        className="text-red-600 hover:text-red-800 font-medium"
                                    >
                                        Deletar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {insumos.length === 0 && !showForm && (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                    Nenhum insumo cadastrado
                </div>
            )}
        </div>
    );
}
