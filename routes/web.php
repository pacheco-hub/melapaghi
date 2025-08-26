<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SegnalazioniController;
use App\Http\Controllers\ContattiController;

/*
|--------------------------------------------------------------------------
| Pagine pubbliche (solo Blade)
|--------------------------------------------------------------------------
*/
Route::view('/', 'index')->name('home');

Route::view('/segnala', 'segnalazioni.segnala')
    ->name('segnalazioni.create');

Route::view('/consulta', 'segnalazioni.consulta')
    ->name('segnalazioni.consulta');

Route::view('/contatti', 'contatti.contatti')
    ->name('contatti');

/*
|--------------------------------------------------------------------------
| Azioni Segnalazioni (controller)
|--------------------------------------------------------------------------
*/
Route::controller(SegnalazioniController::class)
    ->name('segnalazioni.')
    ->group(function () {
        Route::post('/segnalazioni', 'store')->name('store');
        Route::post('/segnalazioni/check', 'check')->name('check'); // puoi aggiungere ->middleware('throttle:20,1')
    });

Route::post('/contatti', [ContattiController::class, 'store'])->name('contatti.store');