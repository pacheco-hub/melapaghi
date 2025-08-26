# MELAPAGHI

MELAPAGHI è un portale pensato per i proprietari immobiliari che desiderano tutelarsi da inquilini morosi o scorretti.  
L’obiettivo è creare uno spazio condiviso, trasparente e sicuro, dove i proprietari possano:

- Segnalare inquilini che hanno causato danni economici o comportamenti scorretti.
- Consultare l’archivio delle segnalazioni per verificare un nominativo (es. tramite codice fiscale).
- Informarsi su rischi, tutele e strumenti utili per affittare con maggiore consapevolezza.

Il progetto è realizzato con **Laravel** (per la parte back-end) e **React** (per componenti interattivi lato front-end).

---

## Tecnologie principali

- **Laravel 11** – framework PHP per la gestione del back-end, rotte, validazioni e interazioni con il database.
- **MySQL** – database per la persistenza dei dati (segnalazioni, utenti, contatti).
- **React 18** – per i componenti dinamici dell’interfaccia (es. form interattivi, validazioni live, filtri FAQ).
- **Bootstrap 5** – per la parte grafica e responsive design.
- **Vite** – bundler per gestire e compilare asset moderni (JS, React, CSS).

---

## Funzionalità

- **Segnala un inquilino**: form guidato con possibilità di allegare documenti a supporto.
- **Consulta segnalazioni**: verifica rapida e anonima di un nominativo.
- **Contatti**: form per comunicare con lo staff del portale.
- **FAQ**: sezione dinamica con filtro di ricerca (gestito in React).
- **UI responsive**: design ottimizzato per desktop e dispositivi mobili.

---

## Struttura del progetto

- `/app` → logica back-end Laravel (controller, model, request).
- `/resources/views` → viste Blade principali.
- `/resources/js/components` → componenti React (es. form contatti, consulta, navbar smart).
- `/database/migrations` → gestione schema database.
- `/public` → assets pubblici (immagini, css, js compilato).

---

## Requisiti

- PHP >= 8.2
- Composer
- Node.js & npm
- MySQL

---

## Installazione

Clona la repository:
```bash
git clone https://github.com/pacheco-hub/melapaghi.git
cd melapaghi
```

Installa le dipendenze PHP:
```bash
composer install
```

Installa le dipendenze JS:
```bash
npm install
```

Copia il file `.env.example` in `.env` e configura il database:
```bash
cp .env.example .env
```

Genera la key:
```bash
php artisan key:generate
```

Esegui le migrazioni:
```bash
php artisan migrate
```

Avvia i server di sviluppo:
```bash
php artisan serve
npm run dev
```

---

## Licenza e Proprietà

Questo progetto è di proprietà di **Andilab S.r.l.**  
Tutti i diritti sono riservati. Non è un progetto open-source e non può essere copiato, modificato o distribuito senza autorizzazione scritta di Andilab S.r.l.

Il progetto è stato sviluppato da **Kevin Pacheco** per conto di Andilab S.r.l.
Per i dettagli completi, vedere il file LICENSE.