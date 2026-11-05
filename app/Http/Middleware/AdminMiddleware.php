<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Maneja una petición entrante.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Verificamos si el usuario está autenticado (auth()->check())
        // 2. Verificamos si su columna 'role' en la base de datos es igual a 'admin'
        if (auth()->check() && auth()->user()->role === 'admin') {
            // Si cumple ambas condiciones, lo dejamos pasar a la siguiente ruta
            return $next($request);
        }

        // Si NO es admin, lo reorientamos a la tienda con un mensaje de alerta
        return redirect()->route('tienda.index')->with('error', 'Acceso restringido solo para administradores.');
    }
}