<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    // Muestra la lista de usuarios
    public function index()
    {
        $usuarios = User::select('id', 'name', 'email', 'role', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Usuarios/Index', [
            'usuarios' => $usuarios,
        ]);
    }

    // Cambia el rol del usuario
    public function updateRole(Request $request, $id)
    {
        $request->validate([
            'role' => 'required|in:admin,cliente',
        ]);

        $usuario = User::findOrFail($id);
        
        // Evitar que el admin se quite el rol a sí mismo por accidente
        if (auth()->id() === $usuario->id && $request->role !== 'admin') {
            return back()->with('error', 'No puedes quitarte el rol de administrador a ti mismo.');
        }

        $usuario->role = $request->role;
        $usuario->save();

        return back()->with('success', 'Rol actualizado correctamente.');
    }
}