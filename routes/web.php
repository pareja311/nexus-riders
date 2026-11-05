<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\CascoController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Página principal
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Dashboard privado
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Perfil del usuario
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// --- TIENDA PÚBLICA ---
// Catálogo principal de la tienda
Route::get('/tienda', [ProductoController::class, 'index'])->name('tienda.index');

// Detalle de un producto de la tienda pública
Route::get('/tienda/productos/{id}', [ProductoController::class, 'show'])->name('productos.show');


// --- ADMINISTRACIÓN DE CASCOS ---
// Aquí el resource maneja TODAS las rutas de administración incluyendo /cascos/{casco} (show, edit, update, destroy, etc.)
Route::resource('cascos', CascoController::class);

// Rutas de autenticación
require __DIR__.'/auth.php';

// --- ADMINISTRACIÓN (Protegido solo para ADMIN) ---
Route::middleware(['auth', \App\Http\Middleware\AdminMiddleware::class])->group(function () {
    Route::resource('cascos', CascoController::class);

    // Rutas para la gestión de usuarios y roles
    Route::get('/admin/usuarios', [UserController::class, 'index'])->name('admin.usuarios.index');
    Route::patch('/admin/usuarios/{id}/role', [UserController::class, 'updateRole'])->name('admin.usuarios.updateRole');
});

// --- GRUPO PROTEGIDO PARA EL ADMINISTRADOR ---
Route::middleware(['auth', 'admin'])->group(function () {
    
    // Gestión de Cascos / Productos
    Route::resource('cascos', CascoController::class);

    // Gestión de Usuarios y Roles
    Route::get('/admin/usuarios', [UserController::class, 'index'])->name('admin.usuarios.index');
    Route::patch('/admin/usuarios/{id}/role', [UserController::class, 'updateRole'])->name('admin.usuarios.updateRole');
});