<?php

namespace App\Http\Controllers;

use App\Models\Casco;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CascoController extends Controller
{
    public function index()
    {
        return Inertia::render('Cascos/Index', [
            'cascos' => Casco::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Cascos/Create');
    }

    public function store(Request $request)
    {
        $datos = $request->validate([
            'nombre' => 'required|string|max:255',
            'marca' => 'required|string|max:255',
            'precio' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'descripcion' => 'nullable|string',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,webp,jfif|max:2048',
        ]);

        if ($request->hasFile('imagen')) {
            $file = $request->file('imagen');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('img/productos'), $filename);
            $datos['imagen'] = '/img/productos/' . $filename;
        } else {
            $datos['imagen'] = null;
        }

        Casco::create($datos);

        return redirect()->route('cascos.index');
    }

    public function show(Casco $casco)
    {
        return Inertia::render('Cascos/Show', [
            'casco' => $casco,
        ]);
    }

    public function edit(Casco $casco)
    {
        return Inertia::render('Cascos/Edit', [
            'casco' => $casco,
        ]);
    }

    public function update(Request $request, Casco $casco)
    {
        $datos = $request->validate([
            'nombre' => 'required|string|max:255',
            'marca' => 'required|string|max:255',
            'precio' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'descripcion' => 'nullable|string',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,webp,jfif|max:2048',
        ]);

        if ($request->hasFile('imagen')) {
            $file = $request->file('imagen');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('img/productos'), $filename);
            $datos['imagen'] = '/img/productos/' . $filename;
        } else {
            unset($datos['imagen']);
        }

        $casco->update($datos);

        return redirect()->route('cascos.index');
    }

    public function destroy(Casco $casco)
    {
        $casco->delete();

        return redirect()->route('cascos.index');
    }
}