import React from 'react';
import { useCart } from '@/Context/CartContext';

export default function CartDrawer() {
    const { items, isOpen, closeCart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

    if (!isOpen) return null;

    const formattedTotal = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0,
    }).format(totalPrice);

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Fondo oscuro traslúcido para cerrar al hacer clic afuera */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                onClick={closeCart}
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-md bg-zinc-950 border-l border-purple-900/60 text-white p-6 flex flex-col justify-between shadow-[0_0_35px_rgba(168,85,247,0.25)]">
                    
                    {/* Encabezado */}
                    <div>
                        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                            <h2 className="text-xl font-extrabold uppercase tracking-wider flex items-center gap-2">
                                🛒 Tu Carrito <span className="text-sm font-semibold text-purple-400">({totalItems})</span>
                            </h2>
                            <button
                                onClick={closeCart}
                                className="text-zinc-400 hover:text-white text-2xl font-bold transition-colors p-1"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Lista de productos */}
                        <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                            {items.length === 0 ? (
                                <div className="text-center py-12 text-zinc-500">
                                    <p className="text-4xl mb-3">🏍️</p>
                                    <p className="text-sm">Tu carrito está vacío.</p>
                                </div>
                            ) : (
                                items.map((item) => {
                                    const itemPrice = typeof item.precio === 'string' ? parseFloat(item.precio) : item.precio;
                                    const formattedItemPrice = new Intl.NumberFormat('es-CO', {
                                        style: 'currency',
                                        currency: 'COP',
                                        maximumFractionDigits: 0,
                                    }).format(itemPrice * item.cantidad);

                                    return (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between gap-4 bg-zinc-900 border border-purple-900/40 rounded-xl p-3 shadow-sm"
                                        >
                                            <img
                                                src={item.imagen || '/img/placeholder.jpg'}
                                                alt={item.nombre}
                                                className="w-16 h-16 object-contain rounded-md bg-zinc-950 p-1 border border-zinc-800"
                                            />

                                            <div className="flex-1">
                                                <h4 className="text-sm font-bold text-white line-clamp-1">{item.nombre}</h4>
                                                <p className="text-xs text-purple-400 font-semibold mt-0.5">{formattedItemPrice}</p>

                                                {/* Controles de cantidad */}
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                                                        className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center font-bold text-xs"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-xs font-semibold px-1">{item.cantidad}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                                                        className="w-6 h-6 rounded bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center font-bold text-xs"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-zinc-500 hover:text-red-400 text-xs font-semibold p-1"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* Resumen y Botón Finalizar */}
                    <div className="border-t border-zinc-800 pt-4 space-y-4">
                        <div className="flex justify-between items-center text-lg font-extrabold">
                            <span>Total:</span>
                            <span className="text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">{formattedTotal}</span>
                        </div>

                        <button
                            disabled={items.length === 0}
                            className={`w-full py-3 rounded-xl font-black uppercase tracking-wider transition-all duration-300 ${
                                items.length > 0
                                    ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] active:scale-95'
                                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                            }`}
                        >
                            Finalizar Compra
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}