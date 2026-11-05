import React from 'react';
import { Link } from '@inertiajs/react';
import { useCart } from '@/Context/CartContext';

export interface Producto {
    id: number | string;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    marca: string;
    imagen_url: string;
    imagen?: string;
    categoria?: {
        id: number;
        nombre: string;
        slug: string;
    };
}

interface Props {
    producto: Producto;
}

export default function ProductCard({ producto }: Props) {
    const { addToCart } = useCart();

    return (
        <div className="bg-zinc-950/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(168,85,247,0.15)] border border-purple-500/30 hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] transition duration-300 flex flex-col justify-between group">
            <div>
                <Link href={route('productos.show', producto.id)} className="block">
                    <div className="relative aspect-square bg-white flex items-center justify-center p-4 overflow-hidden border-b border-purple-900/40">
                        <img
                            src={producto.imagen || producto.imagen_url || '/img/placeholder.jpg'}
                            alt={producto.nombre}
                            className="w-full h-full object-contain group-hover:scale-105 transition duration-500"
                        />
                        {producto.categoria && (
                            <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-purple-300 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-purple-500/40 shadow-[0_0_8px_rgba(168,85,247,0.3)]">
                                {producto.categoria.nombre}
                            </span>
                        )}
                    </div>
                    <div className="p-4">
                        <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold block">
                            {producto.marca}
                        </span>
                        <h3 className="text-base font-bold mt-1 text-white group-hover:text-purple-300 transition line-clamp-1">
                            {producto.nombre}
                        </h3>
                        <p className="text-zinc-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                            {producto.descripcion}
                        </p>
                    </div>
                </Link>
            </div>

            <div className="p-4 border-t border-purple-900/40 flex items-center justify-between">
                <span className="text-lg font-black text-white drop-shadow-[0_0_6px_rgba(168,85,247,0.5)]">
                    ${Number(producto.precio).toLocaleString('es-CO')}
                </span>

                <button
                    onClick={() =>
                        addToCart({
                            id: producto.id,
                            nombre: producto.nombre,
                            precio: producto.precio,
                            imagen: producto.imagen || producto.imagen_url,
                            stock: producto.stock || 10,
                        })
                    }
                    className="bg-purple-600 hover:bg-purple-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-[0_0_12px_rgba(168,85,247,0.5)] active:scale-95 border border-purple-300/30 cursor-pointer"
                >
                    Añadir 🛒
                </button>
            </div>
        </div>
    );
}