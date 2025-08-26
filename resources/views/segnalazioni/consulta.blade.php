@extends('layouts.app')
@section('title', 'Consulta')
    
@section('banner')
    <!-- Banners Start -->
    <section class="banner rate" style="background-image: url('assets/img/banner-bg.png')">
        
        @include('layouts.navbar') {{-- solo navbar --}}
        
        <div class="hero-area">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-7 ">
                        <div class="banner-content">
                            <h2 class="title">Consulta segnalazioni</h2>
                            <p class="text">
                                Verifica se un inquilino risulta segnalato inserendo il codice fiscale. Accedi anche al modulo per richiedere i dettagli, se disponibili.
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="alert-pic">
                            <img src="assets/img/alert-pic.png" alt="" class="alertphoto">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </section>
    <!-- Banner End -->
@endsection


@section('content')
    <!-- preloader area start -->
    <div class="preloader" id="preloader">
        <div class="loader loader-1">
            <div class="loader-outter"></div>
            <div class="loader-inner"></div>
        </div>
    </div>
    <!-- preloader area end -->

    <!-- Rate-tracker Start -->    
    <div class="rate-tracker">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3">
                    <div class="content">
                        <h2 class="title">Consulta le segnalazioni</h2>
                        <p class="text">
                            Inserisci il codice fiscale per controllare se sono presenti segnalazioni. Puoi inoltre inoltrare una richiesta per visualizzare i dati completi.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div style="margin-top: -35px;" id="react-consulta"></div>
    

   
@endsection

 