import React, { useState } from 'react';
import { Head } from '@inertiajs/react';

interface Categoria {
    id: number;
    nombre: string;
    slug: string;
}

interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    marca: string;
    imagen_url: string;
    categoria: Categoria;
}

interface Props {
    productos: Producto[];
    categorias: Categoria[];
}

export default function Index({ productos = [], categorias = [] }: Props) {
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);
    const [busqueda, setBusqueda] = useState('');

    const productosFiltrados = productos.filter((prod) => {
        const coincideCategoria = categoriaSeleccionada
            ? prod.categoria?.id === categoriaSeleccionada
            : true;
        const coincideBusqueda = prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            prod.descripcion?.toLowerCase().includes(busqueda.toLowerCase());
        return coincideCategoria && coincideBusqueda;
    });

    return (
        <div className="min-h-screen bg-black text-purple-50 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
            <Head title="Tienda de Motos - Catálogo" />

            {/* Topbar Banner Neón Morado */}
            <div className="bg-purple-900 text-purple-100 text-xs py-2 px-4 text-center font-bold tracking-wider uppercase border-b border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                🔥 ¡ENVÍOS GRATIS EN COMPRAS MAYORES A $150.000! CASCOS CERTIFICADOS DOT Y ECE
            </div>

            {/* Header / Navbar */}
            <header className="bg-zinc-950/90 backdrop-blur-md border-b border-purple-900/50 sticky top-0 z-50 py-4 px-6 flex justify-between items-center">
                <h1 className="text-2xl font-black tracking-wider text-white uppercase flex items-center gap-2">
                    🏍️ MOTO<span className="text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">STORE</span>
                </h1>

                {/* Buscador central */}
                <div className="flex-1 max-w-md hidden sm:block mx-4">
                    <input
                        type="text"
                        placeholder="Buscar cascos, guantes, chaquetas..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full bg-zinc-900/90 text-purple-100 text-sm rounded-xl px-4 py-2 border border-purple-500/40 focus:outline-none focus:border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)] transition"
                    />
                </div>

                <div className="space-x-4 flex items-center">
                    <a href="/login" className="text-purple-200 hover:text-purple-400 transition text-sm font-semibold">Iniciar Sesión</a>
                    <a href="/register" className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl text-sm font-bold transition shadow-[0_0_12px_rgba(168,85,247,0.5)] border border-purple-300/30">Registrarse</a>
                </div>
            </header>

            {/* Contenido Principal */}
            <main className="max-w-7xl mx-auto px-4 py-10 flex-1 w-full">
                <div className="flex items-center justify-between mb-8 bg-zinc-950 border border-purple-500/40 px-6 py-4 rounded-2xl shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                    <h2 className="text-xl font-black text-white uppercase tracking-wider">Catálogo de Cascos y Accesorios</h2>
                    <span className="text-zinc-400 text-sm">
                        Mostrando <span className="text-purple-400 font-bold">{productosFiltrados.length}</span> productos
                    </span>
                </div>

                {productosFiltrados.length === 0 ? (
                    <div className="bg-zinc-950 border border-purple-500/40 rounded-2xl p-16 text-center shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                        <span className="text-6xl block mb-3">🏍️</span>
                        <h3 className="text-xl font-bold text-white mb-2">No se encontraron productos</h3>
                        <p className="text-zinc-400 text-sm">Intenta buscar con otro término.</p>
                    </div>
                ) : (
                    {/* Grid de Productos */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {productosFiltrados.map((producto) => (
                            <div key={producto.id} className="bg-zinc-950 rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(168,85,247,0.15)] border border-purple-500/30 hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] transition duration-300 flex flex-col justify-between group">
                                <div>
                                    <div className="relative aspect-square bg-white flex items-center justify-center p-4 overflow-hidden border-b border-purple-900/40">
                                        <img 
                                            src={producto.imagen_url || 'https://via.placeholder.com/300'} 
                                            alt={producto.nombre} 
                                            className="w-full h-full object-contain group-hover:scale-105 transition duration-500"
                                        />
                                        <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-purple-300 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-purple-500/40 shadow-[0_0_8px_rgba(168,85,247,0.3)]">
                                            {producto.categoria?.nombre}
                                        </span>
                                    </div>
                                    <div className="p-4">
                                        <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold block">
                                            Marca: {producto.marca}
                                        </span>
                                        <h3 className="text-base font-bold mt-1 text-white group-hover:text-purple-300 transition line-clamp-1">{producto.nombre}</h3>
                                        <p className="text-zinc-400 text-xs mt-2 line-clamp-2 leading-relaxed">{producto.descripcion}</p>
                                    </div>
                                </div>

                                <div className="p-4 border-t border-purple-900/40 flex items-center justify-between">
                                    <span className="text-lg font-black text-white drop-shadow-[0_0_6px_rgba(168,85,247,0.5)]">
                                        ${Number(producto.precio).toLocaleString('es-CO')}
                                    </span>
                                    <button className="bg-purple-600 hover:bg-purple-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-[0_0_12px_rgba(168,85,247,0.5)] active:scale-95 border border-purple-300/30">
                                        Añadir 🛒
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-zinc-950 border-t border-purple-900/40 mt-16 py-8 text-center text-xs text-zinc-500">
                <p>© 2026 MotoStore - Todos los derechos reservados. Pasión por las dos ruedas.</p>
            </footer>
        </div>
    );
}