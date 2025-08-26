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
    Schema::table('contatti', function (Blueprint $table) {
        $table->string('email', 150)->nullable()->change();
        $table->string('phone', 50)->nullable()->change();
    });
}


    /**
     * Reverse the migrations.
     */
   public function down(): void
{
    Schema::table('contatti', function (Blueprint $table) {
        $table->string('email', 150)->nullable(false)->change();
        $table->string('phone', 50)->nullable(false)->change();
    });
}
};
