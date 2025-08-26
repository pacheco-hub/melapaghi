@extends('layouts.app')
@section('title', 'Home')


@section('banner')
    <!-- Banners Start -->
    <section class="banner" style="background-image: url('{{ asset('assets/img/banner-bg.png') }}')">
        <div class="laptop">
            <img src="{{ asset('assets/img/laptop-man.png') }}" class="man-lap" alt="">
        </div>

        @include('layouts.navbar') {{-- solo navbar --}}
        
        <!-- Banner Start -->
        <div class="hero-area">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-7">
                        <div class="banner-content">
                            <h1 class="head">Melapaghi - il portale per chi affitta con fiducia</h1>
                            <p class="text">
                                Tutela i tuoi diritti. Condividi esperienze. Difendi il valore della casa.
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="hero-form text-center">
                            <a href="{{ route( 'segnalazioni.create') }}" rel="noopener noreferrer" class="button button-1 mb-3">Segnala un inquilino</a>
                            <a href="{{ route('segnalazioni.consulta' ) }}" class="button button-1">Consulta la segnalazione</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
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



    <!-- About Us Start -->
    <section id="perche" class="about">
        <div class="sape">
            <img src="{{ asset('assets/img/about-bg.png') }}" class="about-sape" alt="">
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-10 m-auto">
                    <div class="upper-content text-center">
                        <h3 class="subtitle">Uno spazio sicuro per i proprietari</h3>
                        <h2 class="title">Perché nasce MELAPAGHI</h2>
                        <p class="text">
                            Affittare casa dovrebbe essere un’opportunità, non un rischio. MELAPAGHI nasce per aiutare i proprietari a proteggersi da inquilini morosi o scorretti, offrendo uno spazio trasparente dove segnalare situazioni critiche, leggere esperienze altrui e accedere a strumenti di tutela. Ogni segnalazione è verificata e pubblicata con criteri oggettivi, per affittare in modo più consapevole e sicuro.
                        </p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4">
                    <div class="about-photo">
                        <img src="{{ asset('assets/img/about-img.png') }}" alt="" class="about-img">
                    </div>
                </div>
                <div class="col-lg-7 offset-lg-1">
                    <div class="content">
                        <div class="compare-box">
                            <div class="tumb">
                                <img src="{{ asset('assets/img/about-icon-1.png') }}" alt="">
                            </div>
                            <div class="text-box">
                                <h3 class="subtitle">Condividi per prevenire</h3>
                                <p class="text">
                                    Condividere esperienze reali aiuta altri proprietari a evitare gli stessi errori.
                                </p>
                            </div>
                        </div>
                        <div class="compare-box">
                            <div class="tumb">
                                <img src="{{ asset('assets/img/about-icon-2.png') }}" alt="">
                            </div>
                            <div class="text-box">
                                <h3 class="subtitle">Affitta con più consapevolezza</h3>
                                <p class="text">
                                    Conoscere i rischi prima di affittare ti permette di fare scelte più sicure.
                                </p>
                            </div>
                        </div>
                        <div class="compare-box">
                            <div class="tumb">
                                <img src="{{ asset('assets/img/about-icon-3.png') }}" alt="">
                            </div>
                            <div class="text-box">
                                <h3 class="subtitle">Difendi il tuo investimento</h3>
                                <p class="text">
                                    Tutelare il tuo immobile significa proteggere anni di sacrifici e risparmi.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="cosaFacciamo" >
        <!-- Feature Start -->
        <div class="feature">
            <div class="container">
                <div class="row">
                    <div class="col-lg-10 m-auto">
                        <div class="upper-content text-center">
                            <h3 class="subtitle">Perché questo sito</h3>
                            <h2 class="title">Un supporto concreto per chi affitta</h2>
                            <p class="text">
                                Ogni anno migliaia di proprietari in Italia subiscono danni economici a causa di inquilini morosi, sfratti lunghi e immobili danneggiati. MELAPAGHI nasce per colmare un vuoto: quello della prevenzione e della condivisione di esperienze verificate.
                                Perché chi affitta ha il diritto di sapere, di prevenire, di difendersi.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="feature-box">
                            <div class="tumb">
                                <img src="{{ asset('assets/img/feature-icon-1.png') }}" alt="">
                            </div>
                            <div class="text-box">
                                <h3 class="subtitle">Informare</h3>
                                <p class="text">
                                    Aiutiamo i proprietari a conoscere i rischi attraverso dati, esperienze e strumenti pratici.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="feature-box">
                            <div class="tumb">
                                <img src="{{ asset('assets/img/feature-icon-2.png') }}" alt="">
                            </div>
                            <div class="text-box">
                                <h3 class="subtitle">Documentare</h3>
                                <p class="text">
                                    Ogni segnalazione è verificata con documenti reali: sentenze, decreti, contratti.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="feature-box">
                            <div class="tumb">
                                <img src="{{ asset('assets/img/feature-icon-3.png') }}" alt="">
                            </div>
                            <div class="text-box">
                                <h3 class="subtitle">Difendere</h3>
                                <p class="text">
                                    Creiamo una rete tra proprietari per difendersi da soli, legalmente e con trasparenza.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="feature-box">
                            <div class="tumb">
                                <img src="{{ asset('assets/img/feature-icon-4.png') }}" alt="">
                            </div>
                            <div class="text-box">
                                <h3 class="subtitle">Fiducia consapevole</h3>
                                <p class="text">
                                    MELAPAGHI è al fianco di chi affitta in buona fede. Perché la fiducia non deve essere cieca.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- How-use Start -->

    <section id="segnala">
        <div class="how-use">
            <div class="usesape">
                <img src="{{ asset('assets/img/use-bg.png') }}" class="usesape-img" alt="">
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="photo">
                            <img src="{{ asset('assets/img/use-img.png') }}" class="use-img" alt="">
                        </div>
                        <div class="video-box">
                            <div class="video-img">
                                <img src="{{ asset('assets/img/video-play-img.png') }}" alt="">
                                <a class="youtube-video mfp-iframe video-play-btn video-icon"
                                    href="https://www.youtube.com/watch?v=4DCTTrGjGU4">
                                    <i class="fas fa-play"></i>
                                </a>
                            </div>
                            <div class="video-text">
                                <p class="text">Watch Video Now</p>
                                <span><i class="far fa-clock"></i> 2:32 minutes</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="content">
                            <h3 class="subtitle">Uno strumento per i proprietari</h3>
                            <h2 class="title">Come funziona la segnalazione</h2>
                            <p class="text">Segnalare un inquilino moroso o scorretto è semplice e sicuro: MELAPAGHI verifica ogni segnalazione e la pubblica solo se documentata.</p>
                        </div>
                        <div class="use-box">
                            <div class="install">
                                <div class="tumb">
                                    <img src="{{ asset('assets/img/use-icon-1.png') }}" alt="">
                                </div>
                                <div class="text-box">
                                    <span>Step 1</span>
                                    <h4>Compila il modulo con i dati dell’inquilino</h4>
                                </div>
                            </div>
                            <div class="install">
                                <div class="tumb">
                                    <img src="{{ asset('assets/img/use-icon-2.png') }}" alt="">
                                </div>
                                <div class="text-box">
                                    <span>Step 2</span>
                                    <h4>Allega le prove (decreto, contratto, fatture…)</h4>
                                </div>
                            </div>
                            <div class="install">
                                <div class="tumb">
                                    <img src="{{ asset('assets/img/use-icon-3.png') }}" alt="">
                                </div>
                                <div class="text-box">
                                    <span>Step 3</span>
                                    <h4>Invia e attendi la verifica del team MELAPAGHI</h4>
                                </div>
                            </div>
                        </div>
                    <div class="install mt-4">
                            <div class="text-box text-center w-100">
                                <a href=" {{ route('segnalazioni.create')}}"  class="button button-1 w-100">Segnala un inquilino</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <!-- Update Start -->
    <section id="consulta">
        <div class="update">
            <div class="sape">
                <img src="{{ asset('assets/img/update-bg.png') }}" alt="" class="update-bg">
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-5">
                        <div class="phone">
                            <img src="{{ asset('assets/img/alert-phone.png') }}" alt="" class="phone-img">
                        </div>
                    </div>
                    <div class="col-lg-7 order-lg-last order-first">
                        <div class="content">
                            <h3 class="subtitle" style="color: #6a35ff">Verifica un nominativo</h3>
                            <h2 class="title mb-4">Consulta la segnalazione</h2>
                            <p class="text mb-5">
                                MELAPAGHI consente di verificare se un codice fiscale è stato segnalato, in modo completamente anonimo e riservato.
                                Non vengono mostrati dettagli: solo la presenza o l’assenza della segnalazione. Uno strumento utile per prevenire rischi prima di affittare.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-7 offset-lg-5">
                        <div class="alert-box">
                            <div class="icon">
                                <img src="{{ asset('assets/img/bal-bg.png') }}" alt="">
                                <img src="{{ asset('assets/img/bell.png') }}" alt="" class="bell">
                            </div>
                            <div class="text-box">
                                <h3 class="subtitle"></h3>
                                <p class="text">Verifica se un nominativo risulta segnalato all’interno dell’archivio MELAPAGHI. La consultazione è riservata e anonima.</p>
                            </div>
                        </div>
                        <div class="mt-4">
                            <a href="{{ route('segnalazioni.create') }}" class="button button-1 w-100">Consulta la segnalazione</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Faq Start -->
    <section id="faq">
        <div class="faq">
            <div class="sape">
                <img src="{{ asset('assets/img/question-bg.png') }}" alt="" class="faq-bg">
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="content">
                            <h3 class="subtitle">Domande frequenti</h3>
                            <h2 class="title">Dubbi su MELAPAGHI?</h2>
                            <p class="text">Qui trovi le risposte alle domande più comuni su come funziona il portale</p>
                        </div>
                    </div>
                    <div class="col-lg-9">
                        <div class="accordion" id="accordionExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingOne">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                        <img src="{{ asset('assets/img/faq-icon.png') }}" alt="" class="icon">
                                        Come funziona la segnalazione?
                                    </button>
                                </h2>
                                <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
                                    data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        Compili un modulo con i dati dell’inquilino, alleghi prove documentali e invii la segnalazione. Dopo una verifica, viene eventualmente pubblicata.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingTwo">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        <img src="{{ asset('assets/img/faq-icon.png') }}" alt="" class="icon">
                                        Chi può fare una segnalazione?
                                    </button>
                                </h2>
                                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                                    data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        Solo i proprietari direttamente coinvolti e in possesso di prove concrete (es. sfratti, sentenze, contratti).
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingThree">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        <img src="{{ asset('assets/img/faq-icon.png') }}" alt="" class="icon">
                                        Posso consultare l’archivio segnalazioni?
                                    </button>
                                </h2>
                                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                                    data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        Sì, inserendo il codice fiscale potrai sapere se un nominativo risulta segnalato. Non verranno mostrati dettagli.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingFour">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                        <img src="{{ asset('assets/img/faq-icon.png') }}" alt="" class="icon">
                                        La mia segnalazione resterà anonima?
                                    </button>
                                </h2>
                                <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour"
                                    data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        No. Il segnalante è identificato e legalmente responsabile delle dichiarazioni fornite, ai sensi di legge.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingFive">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                        <img src="{{ asset('assets/img/faq-icon.png') }}" alt="" class="icon">
                                        È previsto un contributo economico?
                                    </button>
                                </h2>
                                <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive"
                                    data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        Sì, pari al 10% della morosità dichiarata, da corrispondere solo dopo l'approvazione della segnalazione.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingSix">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                        <img src="{{ asset('assets/img/faq-icon.png') }}" alt="" class="icon">
                                        Le segnalazioni vengono sempre pubblicate?
                                    </button>
                                </h2>
                                <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix"
                                    data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        No. Ogni segnalazione è soggetta a verifica. Solo quelle con documenti validi vengono approvate e pubblicate.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="question">
                            <img src="{{ asset('assets/img/question-man.png') }}" alt="" class="question-man">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

        

    
@endsection