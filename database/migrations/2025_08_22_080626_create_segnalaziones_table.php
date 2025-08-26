<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('segnalaziones', function (Blueprint $t) {
            $t->id();

            // Dati inquilino segnalato
            $t->string('cf_inquilino', 16);
            $t->string('nome_inquilino', 100)->nullable();
            $t->string('cognome_inquilino', 100)->nullable();
            $t->string('citta_prov', 150)->nullable();
            $t->string('periodo_locazione', 100)->nullable();   // es. "01/2023 - 06/2024"
            $t->string('tipo_contratto', 100)->nullable();
            $t->enum('motivo', ['morosita','sfratto','danni','altro']);
            $t->text('motivo_altro')->nullable();
            $t->integer('importo_cents')->default(0);           // importo in centesimi

            // Dati segnalante (riservati)
            $t->string('cf_segnalante', 16)->nullable();
            $t->string('nome_segnalante', 100)->nullable();
            $t->string('cognome_segnalante', 100)->nullable();
            $t->string('email_segnalante', 150)->nullable();
            $t->string('tel_segnalante', 20)->nullable();       // es. 320-123-4567
            $t->string('iban_segnalante', 34)->nullable();

            // Flag dichiarazione
            $t->boolean('dichiaro')->default(false);

            $t->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('segnalaziones');
    }
};
