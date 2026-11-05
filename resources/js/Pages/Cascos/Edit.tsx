import { Head, Link, useForm } from '@inertiajs/react';

interface Casco {
    id: number;
    nombre: string;
    marca: string;
    precio: number | string;
    stock: number;
    descripcion: string;
    imagen?: string;
}

interface Props {
    casco: Casco;
}

export default function Edit({ casco }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT', // Importante para simular PUT con archivos en Laravel/Inertia
        nombre: casco.nombre ?? '',
        marca: casco.marca ?? '',
        precio: casco.precio ?? '',
        stock: casco.stock ?? 0,
        descripcion: casco.descripcion ?? '',
        imagen: null as File | null,
    });

    function enviarFormulario(e: React.FormEvent) {
        e.preventDefault();
        post(route('cascos.update', casco.id));
    }

    return (
        <>
            <Head title="Editar casco" />

            <div className="min-h-screen bg-gray-950 px-6 py-10 text-white">
                <div className="mx-auto max-w-2xl">
                    <h1 className="mb-2 text-3xl font-bold">Editar casco</h1>
                    <p className="mb-8 text-gray-400">
                        Modifica los datos de {casco.nombre}.
                    </p>

                    <form onSubmit={enviarFormulario} className="space-y-5 rounded-xl border border-gray-800 bg-gray-900 p-6" encType="multipart/form-data">
                        <div>
                            <label className="mb-2 block text-sm font-medium">Nombre del casco</label>
                            <input
                                type="text"
                                value={data.nombre}
                                onChange={(e) => setData('nombre', e.target.value)}
                                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white"
                            />
                            {errors.nombre && <p className="mt-1 text-sm text-red-400">{errors.nombre}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">Marca</label>
                            <input
                                type="text"
                                value={data.marca}
                                onChange={(e) => setData('marca', e.target.value)}
                                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white"
                            />
                            {errors.marca && <p className="mt-1 text-sm text-red-400">{errors.marca}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">Precio en pesos colombianos</label>
                            <input
                                type="number"
                                min={0}
                                step="0.01"
                                value={data.precio}
                                onChange={(e) => setData('precio', e.target.value)}
                                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white"
                            />
                            {errors.precio && <p className="mt-1 text-sm text-red-400">{errors.precio}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">Unidades disponibles</label>
                            <input
                                type="number"
                                min={0}
                                value={data.stock}
                                onChange={(e) => setData('stock', Number(e.target.value))}
                                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white"
                            />
                            {errors.stock && <p className="mt-1 text-sm text-red-400">{errors.stock}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">Nueva imagen (opcional)</label>
                            {casco.imagen && (
                                <div className="mb-2 flex items-center gap-3">
                                    <img src={casco.imagen} alt={casco.nombre} className="h-16 w-16 object-cover rounded-lg border border-purple-500/40" />
                                    <span className="text-xs text-gray-400">Imagen actual</span>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('imagen', e.target.files ? e.target.files[0] : null)}
                                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500 cursor-pointer"
                            />
                            {errors.imagen && <p className="mt-1 text-sm text-red-400">{errors.imagen}</p>}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">Descripción</label>
                            <textarea
                                value={data.descripcion}
                                onChange={(e) => setData('descripcion', e.target.value)}
                                rows={4}
                                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white"
                            />
                            {errors.descripcion && <p className="mt-1 text-sm text-red-400">{errors.descripcion}</p>}
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-purple-600 px-5 py-3 font-semibold hover:bg-purple-500 disabled:opacity-50"
                            >
                                {processing ? 'Actualizando...' : 'Guardar cambios'}
                            </button>

                            <Link
                                href={route('cascos.index')}
                                className="rounded-lg bg-gray-700 px-5 py-3 hover:bg-gray-600"
                            >
                                Cancelar
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}