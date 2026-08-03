# Formel 1 Archiv - Abschlussprojekt

## Projektübersicht
Dies ist ein Abschlussprojekt zur Erstellung einer Formel-1-Archivwebseite. Die Anwendung soll historische Daten zu Fahrern, Teams und Grand Prix anzeigen sowie ein kurzes Quiz anbieten.

## Inhaltsverzeichnis
- [Projektübersicht](#projektübersicht)
- [Sprint 1](#sprint-1)
- [Benötigte Technologien](#benötigte-technologien)
- [Grundidee](#grundidee)
- [Tag 1](#tag-1)
- [Installation](#installation)
- [Lokal starten](#lokal-starten)
- [Docker](#docker)
- [Weiteres Vorgehen](#weiteres-vorgehen)

## Sprint 1
- Anforderungen auflisten
- Grundidee für die Webseite definieren
- Umsetzung starten
- Webseite fertigstellen
- Docker-Anbindung planen

## Benötigte Technologien
- HTTP
- HTML
- CSS
- JavaScript
- API
- React
- Datenbank
- Docker
- AWS

## Grundidee
- Formel-1-Archiv erstellen
- Geschichten zu Fahrern und Teams darstellen
- Grand Prix Historie anzeigen
- Kurzes Quiz integrieren
- Docker-Container mit Datenbank
- AWS-Anbindung

## Tag 1
## Tag 1 — Zusammenfassung der ersten Schritte

- Repository initialisiert und auf GitHub gepusht: https://github.com/Jackson7771/jack_begerock_abschlussarbeit
- `README.md` strukturiert, Inhaltsverzeichnis und Installationshinweise ergänzt
- Client-seitiges Routing mit `react-router-dom` eingerichtet (`src/App.jsx`, `src/main.jsx`)
- Ergast API Client implementiert: `src/api/ergast.js` (Treiber, Konstrukteure, Rennen)
- Seiten und Komponenten hinzugefügt:
	- `src/pages/Home.jsx` — Startseite / Prototyp-Karten
	- `src/pages/Drivers.jsx` — Fahrer-Übersicht (aktuelles Feld)
	- `src/pages/Teams.jsx` — Teams / Konstrukteure
	- `src/pages/Team.jsx` — Team-Detail (Fahrer eines Teams)
	- `src/pages/GP.jsx` — Grand-Prix / Saisons Übersicht
	- `src/pages/Quiz.jsx` — einfacher Quiz-Prototyp
- Basis-Styling für Layout und Karten in `src/App.css`
- Prototyp lokal getestet; Dev-Server läuft typischerweise unter `http://localhost:5174/` (Port kann variieren)
- Alle Änderungen committet und auf `origin/main` gepusht

Nächste Schritte

- Styling weiter verfeinern (responsive Design)
- Quiz-Logik erweitern (Fragenbank, Punkte)
- Grand-Prix-Detailseiten und Team-Historie implementieren
- Dockerfile + `docker-compose.yml` für lokale Produktion und DB-Integration


## Installation
Voraussetzung: `node` und `npm` installiert.

1. Repository klonen (falls noch nicht lokal):

```bash
git clone https://github.com/Jackson7771/jack_begerock_abschlussarbeit.git
cd jack_begerock_abschlussarbeit
```

2. Abhängigkeiten installieren:

```bash
npm install
```

## Lokal starten
Entwicklungsserver starten:

```bash
npm run dev
```

Die App ist dann standardmäßig unter `http://localhost:5173` erreichbar.

## Docker
Eine einfache Docker-Integration ist geplant. Kurzbeschreibung:

- Dockerfile erstellen, das die App baut und in einem Webserver (z. B. `nginx`) ausliefert.
- Optional: Datenbank (z. B. PostgreSQL) im `docker-compose.yml` ergänzen.

## Weiteres Vorgehen
- Styling für Seiten ergänzen (`src/App.css`, `src/index.css`)
- Quiz-Seite und Datenbankintegration implementieren
- Dockerfile und `docker-compose.yml` erstellen

