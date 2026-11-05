import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useCart } from '@/Context/CartContext';

interface Props {
    busqueda: string;
    setBusqueda: (val: string) => void;
}

export default function StoreHeader({ busqueda, setBusqueda }: Props) {
    const { totalItems, openCart } = useCart();

    // Obtenemos el usuario autenticado desde los props globales de Inertia
    const { auth } = usePage<any>().props;
    const user = auth?.user;

    return (
        <>
            {/* Topbar Anuncios */}
            <div className="bg-purple-900/90 backdrop-blur-sm text-purple-100 text-xs py-2 px-4 text-center font-bold tracking-wider uppercase border-b border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                🔥 ¡ENVÍOS GRATIS EN COMPRAS SUPERIORES A $150.000! • CASCOS CERTIFICADOS DOT Y ECE
            </div>

            {/* Navbar Principal */}
            <header className="bg-zinc-950/90 backdrop-blur-md border-b border-purple-900/50 sticky top-0 z-50 py-4 px-6 flex flex-wrap justify-between items-center gap-4">
                
                {/* Logo con enlace al Inicio */}
                <Link href={route('tienda.index')} className="text-2xl font-black tracking-wider text-white uppercase flex items-center gap-2 hover:opacity-90 transition">
                    🏍️ NEXUS<span className="text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">RIDERS</span>
                </Link>

                {/* Buscador Global */}
                <div className="flex-1 max-w-xl mx-auto">
                    <input
                        type="text"
                        placeholder="Buscar cascos, marcas, accesorios..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full bg-zinc-900/90 text-purple-100 text-sm rounded-xl px-4 py-2.5 border border-purple-500/40 focus:outline-none focus:border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)] transition"
                    />
                </div>

                {/* Acciones e Información de Usuario */}
                <div className="flex items-center gap-4">
                    
                    {/* Botón Carrito */}
                    <button
                        onClick={openCart}
                        className="relative bg-zinc-900/90 hover:bg-zinc-800 text-purple-300 px-4 py-2 rounded-xl text-sm font-bold transition border border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.2)] flex items-center gap-2 cursor-pointer"
                    >
                        🛒 Carrito
                        {totalItems > 0 && (
                            <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full font-black animate-pulse">
                                {totalItems}
                            </span>
                        )}
                    </button>

                    {/* Menú de Autenticación / Admin */}
                    {user ? (
                        <div className="flex items-center gap-3 border-l border-purple-900/50 pl-4">
                            {/* Accesos rápidos de Administrador */}
                            {user.role === 'admin' && (
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={route('cascos.index')}
                                        className="bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-500/50 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                                    >
                                        📦 Productos
                                    </Link>
                                    <Link
                                        href={route('admin.usuarios.index')}
                                        className="bg-purple-900 hover:bg-purple-800 text-purple-200 border border-purple-400/50 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                                    >
                                        👥 Usuarios
                                    </Link>
                                </div>
                            )}

                            {/* Nombre del Usuario */}
                            <span className="text-xs font-bold text-zinc-300 hidden sm:inline">
                                👤 {user.name}
                            </span>

                            {/* Botón Salir */}
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="text-xs text-red-400 hover:text-red-300 font-bold transition cursor-pointer"
                            >
                                Salir
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-xs font-bold border-l border-purple-900/50 pl-4">
                            <Link 
                                href={route('login')} 
                                className="text-purple-300 hover:text-white px-3 py-2 transition"
                            >
                                Iniciar Sesión
                            </Link>
                            <Link 
                                href={route('register')} 
                                className="bg-purple-600 hover:bg-purple-500 text-white px-3.5 py-2 rounded-xl border border-purple-300/30 transition shadow-[0_0_10px_rgba(168,85,247,0.4)]"
                            >
                                Registrarse
                            </Link>
                        </div>
                    )}

                </div>
            </header>
        </>
    );
}