<!doctype html>
<html class="no-js" lang="it">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>@yield('title', 'MELAPAGHI')</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!--=== CSS ===-->
    <link rel="stylesheet" href="{{ asset('assets/css/normalize.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/font-awesome-5.10.2.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/plugin/owl.carousel.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/plugin/magnific-popup.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/plugin/nice-select.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/responsive.css') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('apple-touch-icon.png') }}">

   <meta name="csrf-token" content="{{ csrf_token() }}">
   @viteReactRefresh
   @vite(['resources/js/react-app.jsx'])

    
    @stack('styles')
</head>
<body>

    @yield('banner')

    {{-- Scroll to Top --}}
    <div id="scrollUp" title="Scroll To Top">
        <i class="fas fa-arrow-up"></i>
    </div>

    {{-- Contenuto dinamico --}}
    @yield('content')

    @include('layouts.footer')

    

    {{-- JS --}}
    <script src="{{ asset('assets/js/jquery.min.js') }}"></script>
    <script src="{{ asset('assets/js/proper-min.js') }}"></script>
    <script src="{{ asset('assets/js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('assets/js/plugin/waypoint.min.js') }}"></script>
    <script src="{{ asset('assets/js/plugin/owl.carousel.min.js') }}"></script>
    <script src="{{ asset('assets/js/plugin/jquery.rcounter.js') }}"></script>
    <script src="{{ asset('assets/js/plugin/jquery.magnific-popup.min.js') }}"></script>
    <script src="{{ asset('assets/js/plugin/jquery.nice-select.min.js') }}"></script>
    <script src="{{ asset('assets/js/main.js') }}"></script>
    @stack('scripts')
</body>
</html>
