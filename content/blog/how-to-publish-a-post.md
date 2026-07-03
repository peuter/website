---
title: "How to Publish a New Blog Post"
date: 2026-07-03
description: "A short guide for maintainers on how to add new blog posts, including release announcements, to this website."
category: "Guide"
tags: ["guide", "maintenance"]
---

New posts live in `content/blog/` as Markdown files. Here is the quick workflow:

## 1. Create the files

Add one file per language, sharing the same base filename so Hugo links them as translations:

```
content/blog/my-post-slug.md      # English (default language)
content/blog/my-post-slug.de.md   # German
```

## 2. Add front matter

```yaml
---
title: "CometVisu 1.2.0 Released"
date: 2026-08-15
description: "A short teaser text shown on the blog overview page."
category: "Release"
tags: ["release", "changelog"]
---
```

- `category` is shown as a small badge on the post (e.g. `Release`, `News`, `Guide`, `Tip`).
- `tags` are shown at the bottom of the post header and are useful for future filtering.
- `date` controls the sort order on the blog overview page (newest first).

## 3. Write the content

Everything below the front matter is regular Markdown – headings, lists, code blocks, links and images all work as usual.

## 4. Preview locally

```bash
hugo server --port 1313 --bind 0.0.0.0
```

Then open `http://localhost:1313/blog/` (English) or `http://localhost:1313/de/blog/` (German) to check the result.

That's it – once merged and deployed, the new post automatically shows up at the top of the blog overview.
