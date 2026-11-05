<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $guarded = [];

    // Agrega esta relación que es la que está pidiendo el controlador
    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }
}