'use client';

import { useState } from 'react';

interface InsumoUtilizado {
    insumoId: string;
    insumoNome: string;
    quantidade: number;
}

interface Produto {
    id: string;
    nome: string;
    valor: number;
    estoque: number;
    insumos: InsumoUtilizado[];
}

export function CadastroProduto() {
    const insumosDisponiveis = [
        { id: '1', nome: 'Parafuso M4' },
        { id: '2', nome: 'Porca M4' },
        { id: '3', nome: 'Arruela' },
        { id: '4', nome: 'Placa de Metal' },
    ];

    const [produtos, setProdutos] = useState<Produto[]>([
        {
            id: '1',
            nome: 'Produto A',
            valor: 99.99,
            estoque: 50,
            insumos: [],
        },
        {
            id: '2',
            nome: 'Produto B',
            valor: 149.99,
            estoque: 30,
            insumos: [],
        },
    ]);

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<Omit<Produto, 'id'>>({
        nome: '',
        valor: 0,
        estoque: 0,
        insumos: [],
    });

    const [selectedInsumo, setSelectedInsumo] = useState('');
    const [quantidade, setQuantidade] = useState(1);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'valor' || name === 'estoque' ? parseFloat(value) || 0 : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProduto: Produto = {
            id: Date.now().toString(),
            ...formData,
        };
        setProdutos([...produtos, newProduto]);
        setFormData({
            nome: '',
            valor: 0,
            estoque: 0,
            insumos: [],
        });
        setSelectedInsumo('');
        setQuantidade(1);
        setShowForm(false);
    };

    const handleUpdateStock = (id: string) => {
        setFormData(prev => {
            const produto = produtos.find(p => p.id === id);
            return produto ? {
                nome: produto.nome,
                valor: produto.valor,
                estoque: produto.estoque,
                insumos: produto.insumos
            } : prev;
        });
        setShowForm(true);
    };

    const handleDelete = (id: string) => {
        setProdutos(produtos.filter((produto) => produto.id !== id));
    };

    return (
        <div className="flex flex-col h-full gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Cadastro de Produto
                </h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    {showForm ? 'Cancelar' : 'Novo Produto'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
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
                                placeholder="Nome do produto"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Preço (R$)
                            </label>
                            <input
                                type="number"
                                name="valor"
                                value={formData.valor}
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

                    {/* Seção de Insumos */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Composição do Produto</h3>

                        {/* Adicionar Insumo */}
                        <div className="flex gap-3 mb-4">
                            <div className="flex-1">
                                <select
                                    value={selectedInsumo}
                                    onChange={(e) => setSelectedInsumo(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                >
                                    <option value="">Selecione um insumo</option>
                                    {insumosDisponiveis
                                        .filter(ins => !formData.insumos.some(i => i.insumoId === ins.id))
                                        .map(insumo => (
                                            <option key={insumo.id} value={insumo.id}>{insumo.nome}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="w-32">
                                <input
                                    type="number"
                                    min="1"
                                    value={quantidade}
                                    onChange={(e) => setQuantidade(parseInt(e.target.value) || 1)}
                                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                    placeholder="Qtd"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    if (selectedInsumo) {
                                        const insumo = insumosDisponiveis.find(i => i.id === selectedInsumo);
                                        if (insumo) {
                                            setFormData(prev => ({
                                                ...prev,
                                                insumos: [...prev.insumos, {
                                                    insumoId: insumo.id,
                                                    insumoNome: insumo.nome,
                                                    quantidade: quantidade
                                                }]
                                            }));
                                            setSelectedInsumo('');
                                            setQuantidade(1);
                                        }
                                    }
                                }}
                                disabled={!selectedInsumo}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                            >
                                + Adicionar
                            </button>
                        </div>

                        {/* Lista de Insumos Adicionados */}
                        {formData.insumos.length > 0 && (
                            <div className="space-y-2 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Insumos necessários:</p>
                                {formData.insumos.map((insumo, index) => (
                                    <div key={index} className="flex items-center justify-between bg-white dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700">
                                        <div className="flex items-center gap-3">
                                            <span className="text-slate-900 dark:text-white font-medium">{insumo.insumoNome}</span>
                                            <span className="text-sm text-slate-600 dark:text-slate-400">x {insumo.quantidade}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    insumos: prev.insumos.filter((_, i) => i !== index)
                                                }));
                                            }}
                                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                                        >
                                            Remover
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Salvar Produto
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
                            <th className="px-4 py-3 text-left font-semibold">Insumos</th>
                            <th className="pr-7 py-3 text-right font-semibold">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-600">
                        {produtos.map((produto) => (
                            <tr
                                key={produto.id}
                                className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                            >
                                <td className="px-4 py-3 text-slate-900 dark:text-slate-100">{produto.nome}</td>
                                <td className="px-4 py-3 text-slate-900 dark:text-slate-100">
                                    R$ {produto.valor.toFixed(2)}
                                </td>
                                <td className="px-4 py-3 text-slate-900 dark:text-slate-100">{produto.estoque}</td>
                                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                                    {produto.insumos.length > 0 ? (
                                        <div className="text-xs space-y-1">
                                            {produto.insumos.slice(0, 1).map((ins, idx) => (
                                                <div key={idx}>
                                                    {ins.insumoNome} (x{ins.quantidade})
                                                </div>
                                            ))}
                                            {produto.insumos.length > 1 && (
                                                <div className="text-slate-400 italic">
                                                    +{produto.insumos.length - 1} outros
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="text-slate-400 italic">Sem insumos</span>
                                    )}
                                </td>
                                <td className="flex gap-4 justify-end pr-2 py-3">
                                    <button
                                        onClick={() => handleUpdateStock(produto.id)}
                                        className="text-yellow-600 hover:text-yellow-800 font-medium"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(produto.id)}
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

            {produtos.length === 0 && !showForm && (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                    Nenhum produto cadastrado
                </div>
            )}
        </div>
    );
}
