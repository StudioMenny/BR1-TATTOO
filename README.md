# BR1 Tattoo Studio — sito web

## Come pubblicarlo su GitHub Pages

1. Carica **tutto il contenuto di questa cartella** nella radice del repository
   (i file .html devono stare al primo livello, non dentro un'altra cartella).
2. Settings → Pages → Source: branch `main`, cartella `/ (root)`.
3. Attendi 1–2 minuti e apri l'indirizzo che GitHub ti mostra.

## Struttura

- `index.html` — home
- `galleria.html` — portfolio con filtri per stile
- `stili.html` — stili e calcolatore di preventivo
- `studio.html` — lo studio, igiene, orari
- `cura.html` — guarigione e FAQ
- `contatti.html` — modulo di prenotazione e mappa
- `legale.html` — note legali, privacy e cookie
- `css/style.css` — tutta la grafica
- `js/main.js` — animazioni, filtri, preventivo, modulo
- `img/` — foto dei lavori + immagini panoramiche degli hero
- `favicon.png`, `apple-touch-icon.png` — icona del sito
- `og-preview.jpg` — immagine che appare quando si condivide il link

## Da fare una volta online

Nei 7 file .html sostituisci `og-preview.jpg` con l'indirizzo completo del nuovo repository, esempio:

    <meta property="og:image" content="https://utente.github.io/repository/og-preview.jpg">

Serve solo per l'anteprima su Facebook e LinkedIn. Su WhatsApp e Telegram funziona già.

## Dati da aggiornare

Orari, tariffe, testi su "Chi tatua" e la P.IVA (00000000000, nel footer e in legale.html) sono di esempio: vanno sostituiti con quelli reali.
