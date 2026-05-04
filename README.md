# Sibar — login dimostrativo (POC)

Sito statico di sola dimostrazione: **nessun backend**, **nessuna autenticazione reale**. Usare solo per presentazioni o test UX.

Sostituire nei file sorgente il placeholder di tracciamento `ACTIVITY-CODE` con il codice attività / ticket interno.

## Uso in locale

Aprire [`index.html`](index.html) nel browser (doppio clic o “Apri con…”).

## Pubblicazione su GitHub Pages

### Opzione A — Repository dedicato (più semplice)

1. Creare un nuovo repository vuoto su GitHub.
2. Copiare **solo** il contenuto della cartella `DEMO/` nella **root** del repository (così `index.html` è in radice).
3. In **Settings → Pages**: Source = **Deploy from a branch**, Branch = `main` (o `master`), cartella **`/ (root)`**.
4. L’URL sarà del tipo `https://<utente>.github.io/<repo>/`.

### Opzione B — Monorepo (questo progetto sotto `Sardegna/`)

È incluso il workflow [`.github/workflows/deploy-demo-pages.yml`](../.github/workflows/deploy-demo-pages.yml) che, su push del branch `main`, pubblica la cartella `DEMO/` sul branch **`gh-pages`**.

1. Inizializzare git nel workspace (se non già fatto) e fare push su GitHub con branch predefinito **`main`**.
2. In **Settings → Pages**: Source = **Deploy from a branch**, Branch = **`gh-pages`**, cartella **`/ (root)`**.
3. Attendere il completamento dell’azione **Deploy DEMO to GitHub Pages** nella tab Actions.

Se il branch predefinito non si chiama `main`, aggiornare il file del workflow di conseguenza.

## Note

- `robots` è impostato su `noindex` nelle pagine HTML; per ambienti pubblici valutare ulteriori restrizioni.
- Non usare questo mock per raccogliere credenziali reali.
