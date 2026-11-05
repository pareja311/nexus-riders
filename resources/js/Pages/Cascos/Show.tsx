import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import { CartProvider, useCart } from '@/Context/CartContext';
import CartDrawer from '@/Components/CartDrawer';

interface Casco {
    id: number | string;
    nombre: string;
    marca: string;
    precio: number | string;
    stock: number;
    descripcion?: string;
    imagen?: string;
    imagen_url?: string;
}

interface Props {
    casco: Casco;
}

function ShowContent({ casco }: Props) {
    const { addToCart, totalItems, openCart } = useCart();

    // Estados para controlar el movimiento del cursor sobre la cuadrícula
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const formattedPrice = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0,
    }).format(Number(casco.precio));

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div 
            className="min-h-screen bg-black text-white p-6 sm:p-12 font-sans relative overflow-hidden selection:bg-purple-600 selection:text-white"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Head title={casco.nombre} />

            {/* CAPA DE FONDO: Cuadrícula Interactiva con Luz Neón que sigue el cursor */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* Patrón de líneas de la cuadrícula */}
                <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(168, 85, 247, 0.25) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(168, 85, 247, 0.25) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Resplandor interactivo seguidor del cursor */}
                {isHovered && (
                    <div 
                        className="absolute pointer-events-none transition-opacity duration-300 rounded-full blur-[90px]"
                        style={{
                            width: '450px',
                            height: '450px',
                            left: `${mousePosition.x - 225}px`,
                            top: `${mousePosition.y - 225}px`,
                            background: 'rgba(168, 85, 247, 0.35)',
                        }}
                    />
                )}

                {/* Ambientación fija cyberpunk de fondo */}
                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[50%] bg-purple-600/20 rounded-full blur-[130px]" />
                <div className="absolute bottom-[-15%] left-[-10%] w-[50%] h-[40%] bg-purple-500/15 rounded-full blur-[110px]" />
            </div>

            {/* CONTENIDO PRINCIPAL */}
            <div className="relative z-10 max-w-5xl mx-auto">
                
                {/* Navbar superior con acceso al carrito y retroceso inteligente */}
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors font-semibold text-sm cursor-pointer bg-transparent border-none p-0"
                    >
                        &larr; Volver
                    </button>

                    <button
                        onClick={openCart}
                        className="relative bg-zinc-900/90 hover:bg-zinc-800 text-purple-300 px-4 py-2 rounded-xl text-sm font-bold transition border border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.2)] flex items-center gap-2"
                    >
                        🛒 Carrito
                        {totalItems > 0 && (
                            <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full font-black animate-pulse">
                                {totalItems}
                            </span>
                        )}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-zinc-950/80 backdrop-blur-md border border-purple-500/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_25px_rgba(168,85,247,0.15)]">
                    
                    {/* Imagen del Casco */}
                    <div className="flex items-center justify-center bg-white rounded-xl p-4 border border-purple-900/40 aspect-square overflow-hidden">
                        <img
                            src={casco.imagen || casco.imagen_url || '/img/placeholder.jpg'}
                            alt={casco.nombre}
                            className="max-h-96 w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* Información del Casco */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <span className="text-xs uppercase tracking-widest text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full bg-purple-950/40 font-bold">
                                {casco.marca}
                            </span>

                            <h1 className="text-3xl font-black mt-4 mb-2 text-white tracking-wide">
                                {casco.nombre}
                            </h1>

                            <div className="text-3xl font-black text-purple-400 mb-6 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
                                {formattedPrice}
                            </div>

                            <p className="text-zinc-300 leading-relaxed mb-6 border-t border-purple-900/40 pt-4 text-sm">
                                {casco.descripcion || 'Sin descripción disponible para este producto.'}
                            </p>
                        </div>

                        {/* Stock y Botón de Acción */}
                        <div className="space-y-4 border-t border-purple-900/40 pt-6">
                            <div className="flex justify-between items-center text-sm text-zinc-400">
                                <span>Disponibilidad:</span>
                                <span className={casco.stock > 0 ? "text-green-400 font-medium" : "text-red-400 font-medium"}>
                                    {casco.stock > 0 ? `${casco.stock} unidades en stock` : 'Agotado'}
                                </span>
                            </div>

                            <button
                                disabled={casco.stock <= 0}
                                onClick={() =>
                                    addToCart({
                                        id: casco.id,
                                        nombre: casco.nombre,
                                        precio: casco.precio,
                                        imagen: casco.imagen || casco.imagen_url,
                                        stock: casco.stock || 10,
                                    })
                                }
                                className={`w-full py-3.5 px-6 rounded-xl font-black tracking-wider uppercase transition-all duration-300 shadow-lg ${
                                    casco.stock > 0
                                        ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] active:scale-95 border border-purple-300/30'
                                        : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                                }`}
                            >
                                {casco.stock > 0 ? 'Añadir al Carrito 🛒' : 'Agotado'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cajón Desplegable del Carrito */}
            <CartDrawer />
        </div>
    );
}

// Envolvemos la vista en el proveedor global del carrito
export default function Show(props: Props) {
    return (
        <CartProvider>
            <ShowContent {...props} />
        </CartProvider>
    );
}