<style>
.logo-white {
    filter: brightness(0) invert(1);
}
</style>
<!-- Main-menu Strat -->
<div class="mein-menu">
    <nav class="navbar navbar-expand-lg navbar-light ">
        <div class="container">
            <a class="navbar-brand" href="{{ route('home') }}">
                <img src="{{ asset('assets/img/logo.png') }}" class="logo logo-white" alt="logo" style="height: 65px;">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="{{ url('/#perche') }}">Perché Melapaghi</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ url('/#cosaFacciamo') }}">Cosa facciamo</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ url('/#segnala') }}">Segnala</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ url('/#consulta') }}">Consulta</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ url('/#faq') }}">FAQ</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('contatti') }}">Contatti</a>
                    </li>
                    <li class="nav-item">
                        <a href="{{ route('segnalazioni.create') }}" class="btn btn-warning btn rounded-pill">Segnala</a>
                    </li>
                    <li style="margin-left: 10px;" class="nav-item">
                        <a href="{{ route('segnalazioni.consulta') }}" class="btn btn-outline-light btn rounded-pill">Consulta</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</div>
