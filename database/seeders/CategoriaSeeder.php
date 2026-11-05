<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Categoria;

class CategoriaSeeder extends Seeder
{
    public function run(): void
    {
        $categorias = [
            ['nombre' => 'Cascos', 'slug' => 'cascos'],
            ['nombre' => 'Accesorios', 'slug' => 'accesorios'],
            ['nombre' => 'Guantes', 'slug' => 'guantes'],
            ['nombre' => 'Impermeables', 'slug' => 'impermeables'],
        ];

        foreach ($categorias as $categoria) {
            Categoria::create($categoria);
        }
    }
}