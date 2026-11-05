import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import { CartProvider } from '@/Context/CartContext';
import CartDrawer from '@/Components/CartDrawer';

// Componentes Modulares
import StoreHeader from '@/Components/Tienda/StoreHeader';
import CategoryNav from '@/Components/Tienda/CategoryNav';
import FilterSidebar from '@/Components/Tienda/FilterSidebar';
import ProductGrid from '@/Components/Tienda/ProductGrid';

interface Categoria {
    id: number;
    nombre: string;
    slug: string;
}

interface Producto {
    id: number | string;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    marca: string;
    imagen_url: string;
    imagen?: string;
    categoria: Categoria;
}

interface Props {
    productos: Producto[];
    categorias: Categoria[];
}

function TiendaContent({ productos = [] }: Props) {
    const [busqueda, setBusqueda] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('todos');
    const [marcaSeleccionada, setMarcaSeleccionada] = useState<string>('todas');
    const [precioMaximo, setPrecioMaximo] = useState<number>(2000000);
    const [orden, setOrden] = useState<string>('recientes');

    // Estado del cursor para la luz neón de fondo
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const marcasDisponibles = useMemo(() => {
        const setMarcas = new Set(productos.map((p) => p.marca).filter(Boolean));
        return Array.from(setMarcas);
    }, [productos]);

    const productosFiltrados = useMemo(() => {
        return productos
            .filter((prod) => {
                const coincideBusqueda =
                    prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                    prod.descripcion?.toLowerCase().includes(busqueda.toLowerCase());

                const coincideCategoria =
                    categoriaSeleccionada === 'todos' ||
                    prod.categoria?.slug === categoriaSeleccionada ||
                    prod.categoria?.nombre.toLowerCase() === categoriaSeleccionada.toLowerCase();

                const coincideMarca = marcaSeleccionada === 'todas' || prod.marca === marcaSeleccionada;
                const coincidePrecio = Number(prod.precio) <= precioMaximo;

                return coincideBusqueda && coincideCategoria && coincideMarca && coincidePrecio;
            })
            .sort((a, b) => {
                if (orden === 'precio-asc') return Number(a.precio) - Number(b.precio);
                if (orden === 'precio-desc') return Number(b.precio) - Number(a.precio);
                if (orden === 'nombre') return a.nombre.localeCompare(b.nombre);
                return 0;
            });
    }, [productos, busqueda, categoriaSeleccionada, marcaSeleccionada, precioMaximo, orden]);

    return (
        <div
            className="min-h-screen bg-black text-purple-50 flex flex-col font-sans selection:bg-purple-600 selection:text-white relative overflow-hidden"
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Head title="NEXUS RIDERS - Tienda Oficial" />

            {/* Fondo Cyberpunk Interactivo */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(168, 85, 247, 0.25) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(168, 85, 247, 0.25) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px',
                    }}
                />
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
                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[50%] bg-purple-600/20 rounded-full blur-[130px]" />
                <div className="absolute bottom-[-15%] left-[-10%] w-[50%] h-[40%] bg-purple-500/15 rounded-full blur-[110px]" />
            </div>

            {/* Contenido Principal */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <StoreHeader busqueda={busqueda} setBusqueda={setBusqueda} />
                <CategoryNav
                    categoriaSeleccionada={categoriaSeleccionada}
                    setCategoriaSeleccionada={setCategoriaSeleccionada}
                />

                <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <FilterSidebar
                        marcasDisponibles={marcasDisponibles}
                        marcaSeleccionada={marcaSeleccionada}
                        setMarcaSeleccionada={setMarcaSeleccionada}
                        precioMaximo={precioMaximo}
                        setPrecioMaximo={setPrecioMaximo}
                        onReset={() => {
                            setCategoriaSeleccionada('todos');
                            setMarcaSeleccionada('todas');
                            setPrecioMaximo(2000000);
                            setBusqueda('');
                        }}
                    />

                    <div className="lg:col-span-3">
                        <ProductGrid
                            productos={productosFiltrados}
                            orden={orden}
                            setOrden={setOrden}
                        />
                    </div>
                </main>

                <footer className="bg-zinc-950/90 border-t border-purple-900/40 mt-16 py-8 text-center text-xs text-zinc-500">
                    <p>© 2026 NEXUS RIDERS - Todos los derechos reservados.</p>
                </footer>
            </div>

            <CartDrawer />
        </div>
    );
}

export default function Index(props: Props) {
    return (
        <CartProvider>
            <TiendaContent {...props} />
        </CartProvider>
    );
}