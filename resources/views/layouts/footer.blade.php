 <!-- Footer Start -->
    <div class="footer">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="subcribe-box" style="background: url('{{ asset('assets/img/subscribe-bg.png') }}');">
                        <h3 class="subcribe">Resta aggiornato su novità, strumenti e consigli utili per chi affitta</h3>
                        <div class="form-group">
                            <form action="">
                                <input type="email" class="form-control " placeholder="Inserisci la tua email" name="email">
                                <button class="button-1">Iscriviti</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row align-items-center">
                <div class="col-lg-3">
                    <div class="footer-box">
                        <a href="#"><img class="logo" src="{{ asset('assets/img/logo.png') }}" alt=""> </a>
                    </div>
                </div>
                <div class="col-lg-9">
                    <div class="footer-box">
                        <ul class="footer-link">
                            <li><a href="{{ url('/#cosaFacciamo') }}">Cosa facciamo</a></li>
                            <li>|</li>
                            <li><a href="{{ url('/#perche') }}">Perché MELAPAGHI</a></li>
                            <li>|</li>
                            <li><a href="{{ url('/#faq') }}">FAQ</a></li>
                            <li>|</li>
                            <li><a href="{{ route('contatti') }}">Contatti</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col-12">
                    <div class="raka"></div>
                </div>
                <div class="col-md-6">
                    <div class="footer-bottom">
                        <p class="text">Copyright &copy; <a href="#">MELAPAGHI</a> | <a href="#">2025</a> </p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="footer-bottom">
                        <div class="social-style">
                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                            <a href="#"><i class="fab fa-skype"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>