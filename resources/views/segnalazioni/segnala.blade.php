@extends('layouts.app')
@section('title', 'Segnala')
    
@section('banner')
    <!-- Banners Start -->
    <section class="banner rate" style="background-image: url('assets/img/banner-bg.png')">
        
        @include('layouts.navbar') {{-- solo navbar --}}
        
        <div class="hero-area">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-7 ">
                        <div class="banner-content">
                            <h2 class="title">Segnala un inquilino</h2>
                            <p class="text">
                                Aiutaci a rendere il mercato delle locazioni più sicuro e trasparente. Compila il modulo per segnalare comportamenti scorretti, morosità o danni documentati.
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
                        <h2 class="title">Invia una segnalazione documentata</h2>
                        <p class="text">
                            Compila il modulo sottostante solo se disponi di prove concrete e documentabili. Ogni segnalazione sarà verificata.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="react-segnala"></div>

   
@endsection

  