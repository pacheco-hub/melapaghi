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
        Schema::create('segnalazione_files', function (Blueprint $t) {
            $t->id();
            $t->foreignId('segnalazione_id')->constrained('segnalaziones')->cascadeOnDelete();
            $t->string('original_name');
            $t->string('path');           // es. storage path
            $t->string('mime', 100)->nullable();
            $t->unsignedBigInteger('size_bytes')->default(0);
            $t->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('segnalazione_files');
    }
};
