# energiepraxis-kaiser-draft

Neue Startseite für **Energiepraxis Kaiser** – Dunkelfeld-Blutdiagnostik in Zürich-Oerlikon.
Design & Umsetzung: [Bilegflow](https://www.bilegflow.ch)

Statische Seite ohne Build-Schritt: reines HTML, CSS und JavaScript. Lato ist selbst gehostet, es werden keine Google-Server angefragt.

## Struktur

```
index.html                  Startseite (Desktop, Tablet und Handy in einer Datei)
assets/css/styles.css       Design-Tokens, Komponenten, Breakpoints
assets/js/main.js           Menü, Scroll-Story, Preis-Umschalter, Video, Buchungsleiste
assets/fonts/               Lato (WOFF2, SIL Open Font License)
assets/img/                 Bilder als WebP, Logo, Favicon, OG-Bild
assets/video/               Praxis-Video (720p, ca. 7.5 MB)
```

## Lokal ansehen

```bash
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

## Deployen

- **GitHub Pages:** Repo → Settings → Pages → Branch `main`, Ordner `/ (root)`.
- **Netlify / Vercel / Cloudflare Pages:** Repo verbinden. Es gibt keinen Build-Befehl, das Ausgabeverzeichnis ist `/`.

## Breakpoints

| Breite      | Gerät                                                        |
|-------------|--------------------------------------------------------------|
| > 1100 px   | Desktop                                                      |
| ≤ 1100 px   | Tablet quer: Burger-Menü, 2-spaltige Raster                  |
| ≤ 1023 px   | Tablet hoch                                                  |
| ≤ 760 px    | Scroll-Story mit klebender Bühne oben                        |
| ≤ 640 px    | Handy: wischbare Reihen, feste Buchungsleiste unten          |

## Vor dem Livegang offen

- [ ] FAQ: Angaben zu Krankenkasse/Zusatzversicherung und zur Vorbereitung (nüchtern?) von Titus einholen (`TODO` in `index.html`)
- [ ] Ablauf der Scroll-Story (Schritte 2 und 3) von Titus fachlich gegenlesen lassen
- [ ] Links «Ethische Richtlinien» und «Rechtliches» zeigen noch auf die alte WordPress-Seite. Seiten übernehmen oder Links anpassen.
- [ ] Domain/Canonical-URL und OG-Bild-Pfad prüfen, sobald die Seite live ist
- [ ] Optional: kurzen Videoloop direkt vom Mikroskop für den Hero aufnehmen und `dunkelfeld-live.webp` ersetzen
