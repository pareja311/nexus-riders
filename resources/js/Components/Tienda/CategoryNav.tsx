import React from 'react';

interface Props {
    categoriaSeleccionada: string;
    setCategoriaSeleccionada: (cat: string) => void;
}

export default function CategoryNav({ categoriaSeleccionada, setCategoriaSeleccionada }: Props) {
    const categorias = [
        { id: 'todos', label: 'TODOS LOS PRODUCTOS' },
        { id: 'cascos', label: '🪖 CASCOS' },
        { id: 'guantes', label: '🧤 GUANTES' },
        { id: 'accesorios', label: '⚙️ ACCESORIOS Y PARTES' },
    ];

    return (
        <nav className="bg-zinc-950/70 border-b border-purple-900/40 px-6 py-3 flex gap-6 overflow-x-auto text-sm font-bold tracking-wide">
            {categorias.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => setCategoriaSeleccionada(cat.id)}
                    className={`transition cursor-pointer ${
                        categoriaSeleccionada === cat.id
                            ? 'text-purple-400 border-b-2 border-purple-400 pb-1'
                            : 'text-zinc-400 hover:text-white'
                    }`}
                >
                    {cat.label}
                </button>
            ))}
        </nav>
    );
}