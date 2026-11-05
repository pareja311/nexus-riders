import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

interface Usuario {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

interface Props {
    usuarios: Usuario[];
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function Index({ usuarios = [], flash }: Props) {
    const handleRoleChange = (userId: number, newRole: string) => {
        router.patch(route('admin.usuarios.updateRole', userId), {
            role: newRole,
        });
    };

    return (
        <div className="min-h-screen bg-black text-purple-50 font-sans p-8">
            <Head title="Gestión de Usuarios - NEXUS RIDERS" />

            <div className="max-w-6xl mx-auto space-y-6">
                
                {/* Cabecera */}
                <div className="flex flex-wrap justify-between items-center gap-4 bg-zinc-950/90 border border-purple-500/40 p-6 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                    <div>
                        <h1 className="text-2xl font-black text-white uppercase tracking-wider">
                            👥 Gestión de <span className="text-purple-400">Usuarios y Roles</span>
                        </h1>
                        <p className="text-zinc-400 text-xs mt-1">
                            Administra los accesos y permisos de los usuarios registrados.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Link
                            href={route('cascos.index')}
                            className="bg-zinc-900 hover:bg-zinc-800 text-purple-300 border border-purple-500/40 px-4 py-2 rounded-xl text-xs font-bold transition"
                        >
                            📦 Gestión de Cascos
                        </Link>
                        <Link
                            href={route('tienda.index')}
                            className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-[0_0_10px_rgba(168,85,247,0.4)]"
                        >
                            🛒 Ir a la Tienda
                        </Link>
                    </div>
                </div>

                {/* Mensajes de Alerta */}
                {flash?.error && (
                    <div className="bg-red-950/80 border border-red-500/50 text-red-200 p-4 rounded-xl text-xs font-bold shadow">
                        ⚠️ {flash.error}
                    </div>
                )}
                {flash?.success && (
                    <div className="bg-purple-950/80 border border-purple-500/50 text-purple-200 p-4 rounded-xl text-xs font-bold shadow">
                        ✅ {flash.success}
                    </div>
                )}

                {/* Tabla de Usuarios */}
                <div className="bg-zinc-950/90 border border-purple-500/40 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="bg-purple-950/60 border-b border-purple-900/50 text-purple-200 uppercase text-xs font-bold">
                                    <th className="py-4 px-6">ID</th>
                                    <th className="py-4 px-6">Nombre</th>
                                    <th className="py-4 px-6">Email</th>
                                    <th className="py-4 px-6">Fecha Registro</th>
                                    <th className="py-4 px-6 text-center">Rol Actual</th>
                                    <th className="py-4 px-6 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-purple-900/30 text-zinc-300">
                                {usuarios.map((u) => (
                                    <tr key={u.id} className="hover:bg-purple-950/20 transition">
                                        <td className="py-4 px-6 font-mono text-xs text-purple-400 font-bold">
                                            #{u.id}
                                        </td>
                                        <td className="py-4 px-6 font-semibold text-white">
                                            {u.name}
                                        </td>
                                        <td className="py-4 px-6 text-zinc-400">
                                            {u.email}
                                        </td>
                                        <td className="py-4 px-6 text-xs text-zinc-500">
                                            {new Date(u.created_at).toLocaleDateString('es-CO')}
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <span
                                                className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                                                    u.role === 'admin'
                                                        ? 'bg-purple-950 text-purple-300 border-purple-500/60 shadow-[0_0_8px_rgba(168,85,247,0.4)]'
                                                        : 'bg-zinc-900 text-zinc-400 border-zinc-700'
                                                }`}
                                            >
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <select
                                                value={u.role}
                                                onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                                className="bg-zinc-900 text-purple-200 text-xs rounded-xl px-3 py-1.5 border border-purple-500/40 focus:outline-none focus:border-purple-400 shadow cursor-pointer font-bold"
                                            >
                                                <option value="cliente">Cliente 👤</option>
                                                <option value="admin">Administrador ⚡</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}