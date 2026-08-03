# Formel 1 Archiv - Abschlussprojekt

## Projektübersicht
Dies ist ein Abschlussprojekt zur Erstellung einer Formel-1-Archivwebseite. Die Anwendung soll historische Daten zu Fahrern, Teams und Grand Prix anzeigen sowie ein kurzes Quiz anbieten.

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
- Git-Repository initialisiert und zu GitHub gepusht (`https://github.com/Jackson7771/jack_begerock_abschlussarbeit`)
- `README.md` strukturiert und aktualisiert
- Routing mit `react-router-dom` eingerichtet (`src/App.jsx`, `src/main.jsx`)
- Ergast API Client hinzugefügt: `src/api/ergast.js`
- Seiten erstellt:
	- `src/pages/Home.jsx` (Startseite)
	- `src/pages/Drivers.jsx` (Fahrer-Übersicht)
	- `src/pages/Teams.jsx` (Teams-Übersicht)
	- `src/pages/Team.jsx` (Team-Detail: Fahrer eines Teams)
	- `src/pages/GP.jsx` (Grand Prix / Saisons Übersicht)
- Alle Änderungen committet und auf `origin/main` gepusht

Weiteres: In den nächsten Schritten werden Styling, Quiz-Funktion und Datenbank/Docker-Integration ergänzt.
