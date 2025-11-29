# CometVisu Website

Diese Website wird mit [Hugo](https://gohugo.io/) generiert und über GitHub Pages ausgeliefert.

## Lokale Entwicklung

### Voraussetzungen

- [Hugo Extended](https://gohugo.io/installation/) (Version 0.120.0 oder höher)

#### Installation auf verschiedenen Systemen

**macOS (Homebrew):**
```bash
brew install hugo
```

**Linux (Debian/Ubuntu):**
```bash
# Snap
sudo snap install hugo --channel=extended

# Oder als Download von GitHub Releases
wget https://github.com/gohugoio/hugo/releases/download/v0.136.0/hugo_extended_0.136.0_linux-amd64.deb
sudo dpkg -i hugo_extended_0.136.0_linux-amd64.deb
```

**Windows (Chocolatey):**
```bash
choco install hugo-extended
```

### Lokale Vorschau starten

```bash
# Im website Verzeichnis
cd website

# Entwicklungsserver starten
hugo server -D

# Oder mit Live-Reload und Draft-Posts
hugo server -D --navigateToChanged
```

Die Website ist dann unter `http://localhost:1313/` erreichbar.

### Produktion-Build erstellen

```bash
hugo --gc --minify
```

Die generierten Dateien befinden sich im `public/` Verzeichnis.

## Projektstruktur

```
website/
├── .github/
│   └── workflows/
│       └── website.yml    # GitHub Actions für automatisches Deployment
├── content/
│   └── _index.md          # Startseite Inhalt
├── layouts/
│   ├── _default/
│   │   └── baseof.html    # Basis-Template
│   └── index.html         # Homepage Layout
├── static/
│   ├── css/
│   │   └── style.css      # Haupt-Stylesheet
│   ├── js/
│   │   └── main.js        # JavaScript
│   └── images/
│       └── logo.svg       # Logo und Bilder
├── hugo.toml              # Hugo Konfiguration
└── README.md              # Diese Datei
```

## Deployment

Die Website wird automatisch über GitHub Actions deployed, wenn Änderungen in den `website/` Ordner gepusht werden.

### Manuelles Deployment

1. Stelle sicher, dass GitHub Pages für das Repository aktiviert ist
2. Setze die Source auf "GitHub Actions"
3. Push Änderungen auf den `main` oder `develop` Branch

## Bilder hinzufügen

Für Screenshots der CometVisu:

1. Erstelle Screenshots im PNG-Format
2. Lege sie in `static/images/` ab
3. Referenziere sie im HTML mit `{{ "images/screenshot.png" | relURL }}`

### Empfohlene Screenshot-Einstellungen

- **Tile-Demo**: 1920x1080px, dunkles Theme
- **Pure-Demo**: 1920x1080px, verschiedene Designs
- **Widgets**: 400x300px, einzelne Widget-Beispiele

## Anpassungen

### Farben ändern

Die Hauptfarben sind in `static/css/style.css` als CSS-Variablen definiert:

```css
:root {
    --primary: #4ecdc4;
    --secondary: #667eea;
    --accent: #f093fb;
    /* ... */
}
```

### Inhalte bearbeiten

Die Hauptseite ist in `layouts/index.html` definiert. Textänderungen können direkt dort vorgenommen werden.

Für mehrsprachige Inhalte nutze die Sprachkonfiguration in `hugo.toml`.

## Lizenz

Die Website-Inhalte unterliegen der gleichen Lizenz wie das CometVisu-Projekt (GPL-3.0).
