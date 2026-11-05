<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Casco extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'marca',
        'precio',
        'stock',
        'descripcion',
        'imagen',
    ];
}