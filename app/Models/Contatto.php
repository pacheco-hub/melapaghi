<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contatto extends Model
{
   protected $table = 'contatti';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'message',
    ];
}
