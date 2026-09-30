---
name: translate-posts
description: "Use whenever creating, editing, or translating a Jekyll post in _posts/: produce and maintain its Portuguese and English pair, metadata, links, and language-specific routes."
---

# Bilingual Blog Posts

Use this workflow for every new post and whenever an existing post is substantively edited. The published blog has Portuguese and English editions; never publish a new article in only one language.

## Pairing convention

- Keep the Portuguese source at `_posts/YYYY-MM-DD-<slug>.md` and preserve its existing permalink when updating an older post.
- Create its English counterpart at `_posts/YYYY-MM-DD-<slug>-en.md` with the same publication date.
- Portuguese URLs use `/blog/<slug>`; English URLs use `/en/blog/<english-slug>`.
- Add `lang: pt` or `lang: en`, the same `translation_key` to both files, and a reciprocal `translation_url` to each file. Use the Portuguese permalink as the stable translation key.
- Preserve existing layout, date, images, tags, and other relevant front matter in both versions. Translate the title, description, headings, prose, captions, and link labels; keep code, URLs, product names, and quoted source material accurate.

## Translation practice

- Translate for clear, idiomatic English while preserving the author's point, tone, uncertainty, examples, and structure.
- Do not add claims, update historical statements, omit sections, or silently correct the author's argument. Flag ambiguity rather than guessing.
- Preserve Markdown structure, code blocks, image markup, citations, and external links. Translate meaningful image alt text and link labels; keep URLs unchanged.
- Review the English post against the Portuguese source for omitted paragraphs, broken links, and terminology consistency.
- If a post reproduces or translates substantial third-party material, do not create another full translation unless the user confirms the rights or license. Instead, write an original concise English summary, credit and link the original author and source, and link the Portuguese post.

## Validation

- Confirm both files have reciprocal `translation_url` values and the same `translation_key` and date.
- Confirm each post has a unique permalink and the correct language metadata.
- Run `npm run build`; inspect `/blog/` and `/en/blog/` to confirm each listing contains only its own language and links to the corresponding post URLs.
