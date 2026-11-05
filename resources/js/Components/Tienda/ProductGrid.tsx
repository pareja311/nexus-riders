import React from 'react';
import ProductCard, { Producto } from './ProductCard';

interface Props {
    productos: Producto[];
    orden: string;
    setOrden: (ord: string) => void;
}

export default function ProductGrid({ productos, orden, setOrden }: Props) {
    return (
        <section className="space-y-6">
            {/* Cabecera con contador y selector de orden */}
            <div className="bg-zinc-950/80 backdrop-blur-md border border-purple-500/40 px-6 py-4 rounded-2xl shadow-[0_0_15px_rgba(168,85,247,0.15)] flex flex-wrap justify-between items-center gap-4">
                <span className="text-zinc-300 text-sm font-semibold">
                    Mostrando <span className="text-purple-400 font-bold">{productos.length}</span> resultados
                </span>

                <div className="flex items-center gap-2 text-sm">
                    <span className="text-zinc-400 text-xs">Ordenar por:</span>
                    <select
                        value={orden}
                        onChange={(e) => setOrden(e.target.value)}
                        className="bg-zinc-900 text-purple-200 text-xs rounded-xl px-3 py-2 border border-purple-500/40 focus:outline-none focus:border-purple-400 shadow cursor-pointer"
                    >
                        <option value="recientes">Más recientes</option>
                        <option value="precio-asc">Precio: Menor a Mayor</option>
                        <option value="precio-desc">Precio: Mayor a Menor</option>
                        <option value="nombre">Nombre (A - Z)</option>
                    </select>
                </div>
            </div>

            {/* Grid o Mensaje de vacio */}
            {productos.length === 0 ? (
                <div className="bg-zinc-950/80 backdrop-blur-md border border-purple-500/40 rounded-2xl p-16 text-center shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                    <span className="text-6xl block mb-3">🔍</span>
                    <h3 className="text-xl font-bold text-white mb-2">No se encontraron productos</h3>
                    <p className="text-zinc-400 text-sm">Prueba ajustando los filtros de búsqueda, marca o precio.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {productos.map((producto) => (
                        <ProductCard key={producto.id} producto={producto} />
                    ))}
                </div>
            )}
        </section>
    );
}