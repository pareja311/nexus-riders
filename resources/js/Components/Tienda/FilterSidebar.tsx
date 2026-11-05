import React from 'react';

interface Props {
    marcasDisponibles: string[];
    marcaSeleccionada: string;
    setMarcaSeleccionada: (marca: string) => void;
    precioMaximo: number;
    setPrecioMaximo: (precio: number) => void;
    onReset: () => void;
}

export default function FilterSidebar({
    marcasDisponibles,
    marcaSeleccionada,
    setMarcaSeleccionada,
    precioMaximo,
    setPrecioMaximo,
    onReset,
}: Props) {
    return (
        <aside className="space-y-6 bg-zinc-950/80 backdrop-blur-md p-6 rounded-2xl border border-purple-500/40 h-fit shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <div className="flex justify-between items-center border-b border-purple-900/50 pb-3">
                <h3 className="font-black text-white uppercase tracking-wider text-sm">Filtros</h3>
                <button
                    onClick={onReset}
                    className="text-xs text-purple-400 hover:underline cursor-pointer"
                >
                    Limpiar filtros
                </button>
            </div>

            {/* Filtro por Marca */}
            <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-3">Marca</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                    <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer hover:text-white">
                        <input
                            type="radio"
                            name="marca"
                            checked={marcaSeleccionada === 'todas'}
                            onChange={() => setMarcaSeleccionada('todas')}
                            className="accent-purple-600"
                        />
                        Todas las marcas
                    </label>
                    {marcasDisponibles.map((marca) => (
                        <label key={marca} className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer hover:text-white">
                            <input
                                type="radio"
                                name="marca"
                                checked={marcaSeleccionada === marca}
                                onChange={() => setMarcaSeleccionada(marca)}
                                className="accent-purple-600"
                            />
                            {marca}
                        </label>
                    ))}
                </div>
            </div>

            {/* Filtro por Precio Máximo */}
            <div className="border-t border-purple-900/50 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-2">Precio Máximo</h4>
                <input
                    type="range"
                    min="50000"
                    max="2000000"
                    step="50000"
                    value={precioMaximo}
                    onChange={(e) => setPrecioMaximo(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                />
                <div className="text-right text-xs font-black text-purple-400 mt-1">
                    ${precioMaximo.toLocaleString('es-CO')}
                </div>
            </div>
        </aside>
    );
}