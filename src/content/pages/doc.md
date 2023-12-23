---
title: Dokumentation Website AE30 
---

# Wie erstelle/bearbeite ich ein Projekt?

Projekte können auf zwei Arten angelegt bzw verwaltet werden:

1. [Projekte anlegen mit CMS (Content Managment System)](#projekte-anlegenbearbeiten-mit-cms):

2. [Projekte manuell anlegen mit .md (Markdown) Datei)](#projekte-manuell-anlegenbearbeiten):
    - die [Projekt Felder Daten Beschreibung](#projekt-felder-daten-beschreibung) oder [hier](projekt_felder_beschreibung.md) als Datei hilft das Projekt "richtig" anzulgen.

# Projekte anlegen/bearbeiten mit CMS
> gehe: [zum CMS](/admin) oder [CMS Prjekte](/admin#/collections/projects)

Login Daten sind beim Administrator bzw. Sekritariat hinterlegt.

- Der Bereich [Projekte](/admin#/collections/projects) im CMS zeigt eine Liste aller Projekte an
- Ein Klick auf das jeweilige Projekt öffnet einen Editor mit allen möglichen Feldern.
- Optionale Felder sind entsprechen (Optional) im Editor markiert
- `>` - Symbole können mit Klick aufgeklappt werden
- Felder die mehrere Datensätze beinhalten können, zum Beispiel Fotos/Pläne haben einen entsprechenden `fotos hinzufügen +` Button.
- Datensätze die ein `==` Symbol mittig haben, können mit Drag- and Drop neu angeordnet bzw verschoben werden.
- Das `x` Symbol löscht ensprechend Datensätze
- Der Langtext hat einen eingebauten *Rich Text* Editor mit dem Markdown formatierungen wie *italic*, **bold**, Überschriften etc. erstellt werden können. Im Editor das `+` Symbol ermöglicht auch das einfügen von Bildern im Lauftext. Der Editor kann ensprechend dem Schieberegler auch auf den `Markdown Modus` umgeschaltet werden, siehe [ Markdown Syntax ](https://www.markdownguide.org/cheat-sheet/).
- Eine genauere Beschreibung der notwendigen Inhalte ist in [Projekt Felder Daten Beschreibung](#projekt-felder-daten-beschreibung) oder [hier](projekt_felder_beschreibung.md) als Datei aufrufbar
- Bilder können im ensprechenden Bereich nach hinzufügen eines Datensatzes mit dem Link `Wähle ein Bild` auf den Website Server geladen, oder aus der Galerie ausgewählt werden.
 
# Projekte manuell anlegen/bearbeiten
Alle Projekte sind im Ordner `src/content/projekte/*.md` als [Markdown Dateien](https://de.wikipedia.org/wiki/Markdown) abgelegt.
- Leere Vorlage: [projekt_leer.md](projekt_leer.md)
- Felder Beschreibung Vorlage: [projekt_felder_beschreibung.md](projekt_felder_beschreibung.md)
- Ausgefülle Vorlage Demo Projekte: [projekt_demo.md](projekt_demo.md)

>  Solange die Seite mit Inhalt gefüllt wird kann [mir](mailto:flo@schwegel.at) gerne einfachheitshalber ein Ordner(Zip o.ä) pro Projekt [zugesandt werden](mailto:flo@schwegel.at): Dieser muss die ensprechende .md Datei und Fotos/Grafiken bzw Pläne beinhalten. Bitte auch die nachfolgenden Hinweise beachten!
 
### Allgemeine Hinweise: 
- `.md`- Dateien sind in einen Felderblock (eingegrezt durch drei Minus zeichen `---`) und einen Text Block (nach dem zweiten `---`) gegliedert.
- Der Dateiname der `.md` - Datei ist ausschlagegebend für die URL (zb.: "demo.md" ist erreichbar unter [https://ae30.at/arge/demo](/arge/demo) )
- Der Dateiname und das erste Feld `title` sollte gleich sein. Bei Projekt Erstellung via CMS wird die Datei entsprechend dem Feld automatisch benannt.
- Einrückungen von der linken Seite im Felder Block `--- ... ---` sind wichtig!
- Strings (Zeichenketten) müssen in Anführungszeichen stehen insb. Zahlen (Datum und NFL) zb.: `"2023"` oder `"Titel Projekt"`
- Für jedes Projekt steht eine Foto Galiere (Fotos) und eine Plan Galerie zur Verfügung. Der Button `P` wechselt entsprechend die Ansicht. 
- Archivierte Projekte `archived: true` werden in der Galerie nicht mehr angezeigt, können jedoch weiterhin über die URL erreicht werden; kann auch als Präsentationsmedium (Website als PDF/Powerpoint Ersatz) genutzt werden

### Bilder/Grafiken/Pläne Hinweise  
- Bilder/Pläne müssen im Ordner `/src/assets/media/` liegen; Upload ist mittels [CMS](/admin) oder GIT möglich
- Felder die [hier](projekt_felder_beschreibung.md) mit `(bleibt leer)` gekennzeichnet sind, bleiben leer, sie sind "Überschriften" für die Felder danach
- folgende Bildformate werden unterstützt: `.jpg`,` .jpeg`,` .png`,` .avif`,` .webp`; *NICHT unterstützt* `.pdfs`!
- alle Bilder/Pläne werden automatisch von der Website optimiert (möglichst kleine Dateigröße und Weboptimiertes Format, um Ladezeiten gering zu halten);
  d.h: lieber zu große Bilder, als zu kleine, Optimierungsarbeiten sind vorher *nicht* notwendig;
  Das Internet bzw. das Layout ist auch relativ Proportionen unabhängig (verschiedene Ausgabegeräte PC, Handy)

### Beschreibung Hinweise  
- Der Laufttext (Projektbeschreibung) am Ende der Datei ist [Markdown Format (.md)](https://www.markdownguide.org/cheat-sheet/) zu verfassen. Dieses ist ein Format um Text zu formatieren (ohne MS Word) und automatisch auf der Website korrekt darzustellen. Auch Bilder können hinzugefügt werden.

# Projekt Felder Daten Beschreibung
> siehe auch: [projekt_felder_beschreibung.md](projekt_felder_beschreibung.md)


```
---
title: Kurztitel, aus dem die URL generiert wird; zb.: "tuw_ba" erreichbar unter "ae30.at/arge/tuw_ba" - benötigt
title_l: Eigentlicher Titel des Projekts; zb.: "TU Wien - Bauteil BA" - benötigt
title_zzl: (optional) zusätzlicher Untertitel zb.: "Chemiehochhaus" oder "Science Center - Halle 227"
archived: (optional) entweder "true" oder "false"; wenn nichts angegeben dann "false"
widehigh: (optional) eine dieser optionen: "normal", "extra breit", "extra hoch"; wenn nichts angegeben dann "normal"; ändert ensprechend die Darstellung auf der Galerie Startseite
publishDate: (in diesem Format anzugeben) zb.: "01 Jan 2023" - benötigt für Sortierung
category: (auswählbar: arge, kg, wp, zk) - benötigt für Projekt Kategorie zuordnung
project_keys: (bleibt leer)
  year: (Projektstart Jahr) zb.:"2021" - benötigt für Sortierung
  year2: (Projektschluss Jahr) zb.:"2023" - benötigt für Sortierung
  area: (Nutzfläche in m² gerundet; ohne Einheit, als ganze Zahl) zb.:"3000" - benötigt für Sortierung
  tags: (bleibt leer; jeder Tag (=Typologie) steht in einer neuen Zeile mit Minus, Leerzeichen "- " davor); - benötigt für Sortierung - alle Auswahlmöglichkeiten sind hier aufgezählt; mehrere Möglich, mindestens eine: 
    - Öffentlich
    - Privat
    - Universität
    - Labor
    - Büro
    - Wohnbau
    - Außenraum
    - Ausstellungsraum
    - Geschäft/Shop
    - wohnen
    - lernen
    - arbeiten
titleimg:(bleibt leer) hier jeweils 'titleimg.jpg' mit dem Dateinamen ersetzen;
  img: /src/assets/media/titleimg.jpg
  alt: Eine klare Bildbeschreibung ist aus vielerlei Gründen wichtig und essentiell (Suchmaschienenoptimierung, Bildtitel, etc.)
fotos: (bleibt leer) die nachfolgenden beiden Zeilen "- foto:" und "alt:" können wiederholt werden um mehrere Fotos hinzuzufügen
  - foto: /src/assets/media/fotos.jpg
    alt: Eine klare Bildbeschreibung ist aus vielerlei Gründen wichtig und essentiell (Suchmaschienenoptimierung, Bildtitel, etc.)
plans: (bleibt leer) die nachfolgenden beiden Zeilen "- plan:" und "alt:" können wiederholt werden um mehrere Pläne/Grafiken hinzuzufügen
  - plan: /src/assets/media/plan.jpg
    alt: Eine klare Bildbeschreibung ist aus vielerlei Gründen wichtig und essentiell (Suchmaschienenoptimierung, Bildtitel, etc.)
---
Text Projet Beschreibung im [Markdown Format (.md) :](https://www.markdownguide.org/cheat-sheet/) 
```

# Wie Projekt Galerie(n) verwalten

- Die im Projekt angegebene Kategorie ordnet das Projekt automatisch entsprechend einem Architekten zu:
    - `/`: [Alle Projekte](/)
    - `arge`: Projekte der [ARGE](/arge)
    - `kg`: Projekte von [Arch DI Gerhard Kratochwil](/kg)
    - `wp`: Projekte von [Arch DI Peter Waldbauer](/wp)    
    - `zk`: Projekte von [Arch DI Klaus Zeinitzer](/zk)    

- Die Filter in der Galerie können ein- / ausgeschaltet werden. Siehe [Einstellungen](#welche-einstellungen-können-sonst-vorgenommen-werden).
- Projekte werden standardmäßig alphabetisch sortiert. Im CMS Bereich **Einstellungen -> Gallerie Priorität Reihenfolge** können Projekte via Drag- and Drop manuell sortiert werden

# Wie bearbeite ich andere Seiten?

> gehe: [zum CMS](/admin) oder [CMS Seiten](/admin#/collections/pages)

Alle Seiten sind im Ordner `src/content/pages/` abgelegt.

Wie auch *Projekte* können *Seiten* mit dem [CMS](/admin) oder manuell (.md Files) bearbeitet werden. Diese folgen jedoch keiner einheitlichen Syntax mehr. 

- [Impressum](impressum) & [Über uns](about) haben nur einen `title` und ein `titleimg` im Felderblock. Und bestehen hauptsächlich aus einem Markdown Lauftext Inhalt.

- Die Team Seite besteht aus verschiedenen Bereichen und entsprechenden Feldern. Wichtig sind die Felder für einzelne Mitarbeiter. Mitarbeiter liegen als Datensätze wie unten beschrieben vor. Alle Felder sind optional (ausgenommen der Name). So ist es einfach Mitarbeiter beispielsweise als *aktiv*, *ehemalig* oder *ausgeblendet* zu seten, bzw Details hinzuzufügen. Hier ein beispielhafter Mitarbeiter, wie er in der `team.md` Datei aussieht:

```
  - name: Max Mustermann
    mode:
      archived: true
      highlighted: false
      former: false
    details:
      - description: Geburtstag
        detail: 01.01.1988
      - description: Aufgabenbereich
        detail: Vorzeigemitarbeiter
    img: /src/assets/media/portrait_placeholder.jpg
```

# Welche Einstellungen sonst vorgenommen werden?

> gehe: [zum CMS](/admin) oder [CMS Einstellungen](/admin#/collections/settings)

Die Drei Dateien im Ordner src/content/settings beinhalten weitere Einstellungsmöglichkeiten:

### Einstellungen
- **Website Titel:** sollte wahrscheinlich nicht geändert werden
- **Seitenbeschreibung:** sollte wahrscheinlich nicht geändert werden
- **Hauptmenü:** Hier kann der Link und der Linktext zu anderen Websitebereichen im Hauptmenü angepasst werden
- **Filter :** Hier können die Filter in den Galerien aus bzw. eingeschaltet werden 

### Galerie Priorität Reihenfolge
- Projekte werden standardmäßig alphabetisch sortiert.
- Im CMS Bereich **Einstellungen -> Gallerie Priorität Reihenfolge** können Projekte via Drag- and Drop manuell sortiert werden.
- Projekte werden NICHT automatisch zur Liste hinzugefügt, werden also nachdem die Reihenfolge hier beachtet wurde, wieder standardsmäßig alphabetisch sortiert.

### Haupt-Kategorien
Das sind die Hauptkategorien, die sich theoretisch anpassen lassen. Jedoch müssen alle Projekte im Kategorie Feld enstsprechend angepasst werden, sollten hier Änderungen gemacht werden. Nur mit Vorsicht ändern!

