# Formel 1 Archiv - Abschlussprojekt

## Projektübersicht
Dies ist ein Abschlussprojekt zur Erstellung einer Formel-1-Archivwebseite. Die Anwendung soll historische Daten zu Fahrern, Teams und Grand Prix anzeigen sowie ein kurzes Quiz anbieten.

## Inhaltsverzeichnis
- [Projektübersicht](#projektübersicht)
- [Sprint 1](#sprint-1)
- [Benötigte Technologien](#benötigte-technologien)
- [Grundidee](#grundidee)
- [Tag 1](#tag-1)
- [Tag 2](#tag-2)
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

Aktueller Stand

- API-getriebene Fahrer-Übersicht und Team-Übersicht
- Team-Detailseite mit aktueller Fahrer- und Ergebnisliste
- Fahrerprofilseite mit Rennergebnissen
- GP-Seite mit Saisonwahl und Rennkalender
- Quiz-Prototyp wird auf Punkte und mehrere Fragen erweitert

Nächste Schritte

- Styling weiter verfeinern (responsive Design)
- Quiz-Logik fertigstellen und erweitern
- Grand-Prix-Detailseiten und zusätzliche Historie-Sichten implementieren
- Dockerfile + `docker-compose.yml` für lokale Produktion und DB-Integration

## Tag 2
- API-Basis auf den richtigen Ergast-Pfad `https://api.jolpi.ca/ergast/f1` umgestellt
- Fahrer-Seite so gefiltert, dass nur die 22 Stammfahrer mit permanenter Startnummer angezeigt werden
- Fahrer-Detailseite mit Rennergebnissen hinzugefügt
- Grand Prix Historienseite mit Saison-Auswahl und Rennkalender implementiert
- Renn-Detailseite für einzelne GP-Runden eingebaut
- Quizseite erweitert: mehrere Fragen, Punktebewertung und Feedback
- README-Port-Hinweis ergänzt (`5173`, automatische Ausweichports `5174`/`5175`)

## Tag 3
- Problemen mit der Bildanzeige auf den Fahrer- und Teamseiten nachgegangen
- Bild-Utility mit Platzhaltern und Fallbacks ergänzt (`src/utils/imageMaps.js`)
- Team- und Fahrer-Karten mit Bildkomponenten ausgestattet
- Team-Detailseite um Logo und Fahrerbilder erweitert
- README aktualisiert und Projektstatus dokumentiert

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
Wenn dieser Port belegt ist, verwendet Vite automatisch den nächsten verfügbaren Port (z. B. `5174` oder `5175`).

## Docker
Eine einfache Docker-Integration ist geplant. Kurzbeschreibung:

- Dockerfile erstellen, das die App baut und in einem Webserver (z. B. `nginx`) ausliefert.
- Optional: Datenbank (z. B. PostgreSQL) im `docker-compose.yml` ergänzen.

## Weiteres Vorgehen
- Styling für Seiten ergänzen (`src/App.css`, `src/index.css`)
- Quiz-Seite und Datenbankintegration implementieren
- Dockerfile und `docker-compose.yml` erstellen

