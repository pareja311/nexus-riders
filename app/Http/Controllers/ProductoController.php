<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Casco;
use App\Models\Categoria;
use Inertia\Inertia;

class ProductoController extends Controller
{
    public function index()
    {
        // 1. Obtener los productos estándar (con su categoría cargada)
        $productos = Producto::with('categoria')->latest()->get();

        // 2. Obtener los cascos agregados desde el panel de administración (/cascos)
        $cascos = Casco::latest()->get();

        // 3. Mapear los cascos para que tengan exactamente la misma estructura que un Producto en React
        $cascosMapeados = $cascos->map(function ($casco) {
            return [
                'id' => 'casco_' . $casco->id, // ID único para evitar colisión
                'nombre' => $casco->nombre,
                'descripcion' => $casco->descripcion ?? '',
                'precio' => $casco->precio,
                'stock' => $casco->stock,
                'marca' => $casco->marca,
                'imagen_url' => $casco->imagen ?? '/img/productos/casco1.webp',
                'categoria' => [
                    'id' => 1,
                    'nombre' => 'Cascos',
                    'slug' => 'cascos',
                ],
            ];
        });

        // 4. Fusionar la colección de productos y cascos administrados
        $catalogoCompleto = $productos->concat($cascosMapeados);

        return Inertia::render('Tienda/Index', [
            'productos' => $catalogoCompleto,
            'categorias' => Categoria::all(),
        ]);
    }

    // --- NUEVO MÉTODO SHOW PARA SOPORTAR AMBAS TABLAS ---
    public function show($id)
    {
        // Verificamos si el ID empieza con 'casco_' (viene de la tabla cascos)
        if (str_starts_with($id, 'casco_')) {
            $realId = str_replace('casco_', '', $id);
            $cascoModel = Casco::findOrFail($realId);

            $casco = [
                'id' => 'casco_' . $cascoModel->id,
                'nombre' => $cascoModel->nombre,
                'descripcion' => $cascoModel->descripcion ?? '',
                'precio' => $cascoModel->precio,
                'stock' => $cascoModel->stock,
                'marca' => $cascoModel->marca,
                'imagen_url' => $cascoModel->imagen ?? '/img/productos/casco1.webp',
            ];
        } else {
            // Si es un ID normal, lo buscamos en la tabla productos
            $productoModel = Producto::with('categoria')->findOrFail($id);

            $casco = [
                'id' => $productoModel->id,
                'nombre' => $productoModel->nombre,
                'descripcion' => $productoModel->descripcion ?? '',
                'precio' => $productoModel->precio,
                'stock' => $productoModel->stock,
                'marca' => $productoModel->marca,
                'imagen_url' => $productoModel->imagen_url ?? '/img/productos/casco1.webp',
            ];
        }

        // Retornamos los datos a la vista de detalle de Inertia
        return Inertia::render('Cascos/Show', [
            'casco' => $casco
        ]);
    }
}