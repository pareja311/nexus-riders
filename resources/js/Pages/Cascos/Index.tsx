import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ cascos = [] }: { cascos?: any[] }) {
    // Estados para controlar la posición del cursor e iluminación del fondo
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    function eliminarCasco(id: number) {
        if (confirm('¿Seguro que deseas eliminar este casco?')) {
            router.delete(route('cascos.destroy', id));
        }
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div 
            className="min-h-screen bg-black text-white px-6 py-10 font-sans relative overflow-hidden selection:bg-purple-600 selection:text-white"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Head title="Administrar cascos" />

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

            {/* CONTENIDO PRINCIPAL DE LA PÁGINA (Encima del fondo) */}
            <div className="relative z-10 mx-auto max-w-6xl">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-wider text-white">
                            Catálogo de cascos <span className="text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">(Admin)</span>
                        </h1>
                        <p className="mt-2 text-zinc-400 text-sm">
                            Administra los productos de tu tienda desde este panel.
                        </p>
                    </div>

                    <Link
                        href={route('cascos.create')}
                        className="rounded-xl bg-purple-600 px-5 py-3 font-bold hover:bg-purple-500 transition shadow-[0_0_12px_rgba(168,85,247,0.5)] border border-purple-300/30 active:scale-95"
                    >
                        + Agregar casco
                    </Link>
                </div>

                {cascos.length === 0 ? (
                    <div className="rounded-2xl border border-purple-500/40 bg-zinc-950/80 backdrop-blur-md p-10 text-center shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                        <p className="text-lg font-bold text-white">Todavía no hay cascos registrados.</p>
                        <p className="mt-2 text-zinc-400 text-sm">
                            Agrega tu primer producto para comenzar.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-2xl border border-purple-500/40 bg-zinc-950/80 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-purple-950/40 text-purple-300 border-b border-purple-900/50 uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="p-4">Nombre</th>
                                    <th className="p-4">Marca</th>
                                    <th className="p-4">Precio</th>
                                    <th className="p-4">Stock</th>
                                    <th className="p-4">Acciones</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-purple-900/30 text-sm">
                                {cascos.map((casco) => (
                                    <tr key={casco.id} className="hover:bg-purple-900/10 transition-colors">
                                        <td className="p-4 font-bold">
                                            <Link
                                                href={route('cascos.show', casco.id)}
                                                className="text-white hover:text-purple-400 transition-colors"
                                            >
                                                {casco.nombre}
                                            </Link>
                                        </td>
                                        <td className="p-4 text-zinc-300">{casco.marca}</td>
                                        <td className="p-4 font-bold text-purple-300">
                                            {Number(casco.precio).toLocaleString('es-CO', {
                                                style: 'currency',
                                                currency: 'COP',
                                                maximumFractionDigits: 0,
                                            })}
                                        </td>
                                        <td className="p-4 text-zinc-300">{casco.stock}</td>
                                        <td className="p-4">
                                            <div className="flex gap-4 font-semibold text-xs">
                                                <Link
                                                    href={route('cascos.edit', casco.id)}
                                                    className="text-purple-400 hover:text-purple-300 transition-colors"
                                                >
                                                    Editar
                                                </Link>

                                                <button
                                                    onClick={() => eliminarCasco(casco.id)}
                                                    className="text-red-400 hover:text-red-300 transition-colors"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}