@extends('layouts.app')
@section('title', 'Contatti')


@section('banner')
    <!-- Banners Start -->
    <section id="contact" class="banner contact" style="background-image: url('assets/img/about-us-bg.jpg')">
        <div class="bubble">
            <img src="assets/img/bubble.png" alt="" class="bubble-img">
        </div>

        @include('layouts.navbar') {{-- solo navbar --}}

        <!-- Banner Start -->
        <div class="hero-area">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="banner-content">
                            <h2 class="title">Contattaci</h2>
                            <p class="text">Siamo a disposizione per rispondere a qualsiasi domanda o dubbio su MELAPAGHI. Scrivici e ti ricontatteremo al più presto.</p>
                        </div>
                        <div class="contact-info">
                            <div class="info-box one">
                                <div class="icon">
                                    <img src="assets/img/mail.png" alt="" class="pic">
                                </div>
                                <p class="text">Email</p>
                                <span>info@melapaghi.it</span>
                            </div>
                            <div class="info-box two">
                                <div class="icon">
                                    <img src="assets/img/phone.png" alt="" class="pic">
                                </div>
                                <p class="text">Telefono</p>
                                <span>+39 045 1234567</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5 offset-lg-1">
                        <div id="react-contatti"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Banner End -->
    </section>
@endsection


@section('content')

    <!-- Faq Start -->
    <section>
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

  