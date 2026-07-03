---
title: "So veröffentlicht ihr einen neuen Blogbeitrag"
date: 2026-07-03
description: "Eine kurze Anleitung für Maintainer, wie neue Blogbeiträge – z.B. Release-Ankündigungen – auf dieser Website ergänzt werden."
category: "Guide"
tags: ["guide", "maintenance"]
---

Neue Beiträge liegen als Markdown-Dateien in `content/blog/`. So geht ihr vor:

## 1. Dateien anlegen

Legt pro Sprache eine Datei mit demselben Basisnamen an, damit Hugo sie als Übersetzungen verknüpft:

```
content/blog/mein-beitrag.md      # Englisch (Standardsprache)
content/blog/mein-beitrag.de.md   # Deutsch
```

## 2. Frontmatter ausfüllen

```yaml
---
title: "CometVisu 1.2.0 veröffentlicht"
date: 2026-08-15
description: "Ein kurzer Teaser-Text, der auf der Blog-Übersicht angezeigt wird."
category: "Release"
tags: ["release", "changelog"]
---
```

- `category` wird als kleines Badge auf dem Beitrag angezeigt (z.B. `Release`, `News`, `Guide`, `Tip`).
- `tags` werden am Ende des Beitragskopfs angezeigt und sind nützlich für eine spätere Filterfunktion.
- `date` bestimmt die Sortierung auf der Blog-Übersicht (neueste zuerst).

## 3. Inhalt schreiben

Alles unterhalb des Frontmatters ist normales Markdown – Überschriften, Listen, Codeblöcke, Links und Bilder funktionieren wie gewohnt.

## 4. Lokal testen

```bash
hugo server --port 1313 --bind 0.0.0.0
```

Öffnet anschließend `http://localhost:1313/blog/` (Englisch) bzw. `http://localhost:1313/de/blog/` (Deutsch), um das Ergebnis zu prüfen.

Fertig – nach dem Merge und Deployment erscheint der neue Beitrag automatisch oben in der Blog-Übersicht.
