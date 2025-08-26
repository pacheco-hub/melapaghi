<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Segnalazione extends Model
{
    protected $fillable = [
        'cf_inquilino','nome_inquilino','cognome_inquilino','citta_prov',
        'periodo_locazione','tipo_contratto','motivo','motivo_altro',
        'importo_cents','cf_segnalante','nome_segnalante','cognome_segnalante',
        'email_segnalante','tel_segnalante','iban_segnalante','dichiaro'
    ];

    public function files()
    {
        return $this->hasMany(SegnalazioneFile::class);
    }
}
