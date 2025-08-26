<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SegnalazioneFile extends Model
{
    protected $fillable = ['segnalazione_id','original_name','path','mime','size_bytes'];

    public function segnalazione()
    {
        return $this->belongsTo(Segnalazione::class);
    }
}
