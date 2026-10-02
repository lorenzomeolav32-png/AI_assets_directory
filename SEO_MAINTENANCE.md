# SEO_MAINTENANCE.md — AI Assets Directory

> Checklist operativo de mantenimiento SEO. Marca las casillas y añade una línea al
> **log** cada vez que hagas una pasada, para saber qué se hizo y cuándo toca la
> siguiente. Complementa a `SEGUIMIENTO.md` (estado general del proyecto), no lo
> sustituye.

---

## 0. Cómo usarlo

1. Cada semana/mes/trimestre, abre este archivo y repasa la checklist correspondiente.
2. Desmarca las casillas al empezar el ciclo siguiente (o duplica la sección si
   prefieres ir acumulando historial — lo que te resulte más cómodo).
3. Añade una fila en **§4 Log de pasadas** con la fecha y lo que hiciste.
4. Cuando el campo `reviewBy` de un artículo (ver §3) venga vencido, revísalo de
   verdad (no solo cambies la fecha) y actualiza su `updated` + `reviewBy` en el
   frontmatter del `.md`.

**Recordatorios automáticos:** `.github/workflows/seo-reminders.yml` abre un issue
en GitHub (asignado a ti) cada semana/mes/trimestre con el checklist correspondiente
y el estado de `reviewBy`. GitHub te notifica por email/app al asignarte el issue —
no hace falta que revises este archivo por iniciativa propia. Para probarlo sin
esperar al cron, lánzalo manualmente desde la pestaña *Actions* → *SEO maintenance
reminders* → *Run workflow*. El chequeo de `reviewBy` también se puede correr en
local con `npm run check:review`.

**Sync automático con el repo awesome-list:** `.github/workflows/sync-awesome-list.yml`
regenera y pushea `README.md` de `awesome-claude-skills-mcp-servers` cada vez que
cambia `content/assets/**` en `main`. Necesita un secret una sola vez:

1. GitHub → tu avatar → *Settings* → *Developer settings* → *Personal access tokens*
   → *Fine-grained tokens* → *Generate new token*.
2. *Repository access* → *Only select repositories* → elige
   `awesome-claude-skills-mcp-servers` (no `AI_assets_directory`).
3. *Permissions* → *Repository permissions* → *Contents* → **Read and write**. Nada más.
4. Genera el token y cópialo (solo se muestra una vez).
5. En el repo `AI_assets_directory` → *Settings* → *Secrets and variables* → *Actions* →
   *New repository secret* → nombre `AWESOME_REPO_TOKEN`, pega el valor, guarda.

El token nunca debe pegarse en el chat ni guardarse en el repo — solo como secret
de GitHub Actions. Ponle una expiración (90-180 días) y recuerda regenerarlo cuando
caduque, o el workflow empezará a fallar en el paso de checkout del repo awesome.

---

## 1. Checklist semanal (~15-20 min)

- [ ] ¿Se publicó al menos 1 asset/artículo nuevo esta semana? (cadencia de contenido)
- [ ] Revisar **Google Search Console** → Coverage: ¿hay errores de crawl/indexación nuevos?
- [ ] Revisar Search Console → Performance: ¿alguna query nueva entrando en el top 20?
- [ ] Comprobar que la home y 2-3 páginas de categoría cargan bien (sin 500/401 — ver
  riesgo del gate en `middleware.ts`, debe seguir sin `SITE_GATE_USER`/`PASSWORD` en prod).
- [ ] Si tocó algún asset con `source` a GitHub: comprobar que el link no esté roto/movido.

## 2. Checklist mensual (~1-2 h)

- [ ] Lanzar Lighthouse/PageSpeed Insights sobre home + 2 categorías + 1 ficha de asset.
  Anotar los 4 scores y el LCP en el log (§4).
- [ ] Search Console → exportar queries de los últimos 28 días. Identificar **near-misses**
  (posición 5-15, con impresiones) y reforzar esa página (título, contenido, enlaces internos).
- [ ] Revisar backlinks nuevos (Search Console → Links, o Ahrefs/SEMrush free tier).
- [ ] Comprobar que `sitemap.xml` sigue reflejando todo el contenido nuevo (es dinámico,
  pero confirma que no falta ninguna categoría/asset tras cambios de esquema).
- [ ] Progreso de la promoción activa: ¿algún post en HN/PH/Reddit/awesome-list este mes?

## 3. Checklist trimestral (~medio día)

- [ ] Repasar la tabla de `reviewBy` (abajo) y **refrescar de verdad** cualquier artículo
  vencido: cifras/modelos desactualizados, links muertos, secciones que ya no aplican.
- [ ] Auditoría de contenido: ¿algún asset "verified" dejó de instalarse como está descrito?
  ¿algún repo se archivó/eliminó?
- [ ] Revisar la taxonomía de categorías: ¿sigue teniendo sentido con el catálogo actual?
- [ ] Comprobar Core Web Vitals de campo (CrUX, si ya hay tráfico suficiente) en Search
  Console → Core Web Vitals, no solo el lab data de Lighthouse.
- [ ] Repasar el plan de comparativas "X vs Y" / colecciones curadas: ¿qué 2-3 se escriben
  el próximo trimestre?
- [ ] Actualizar `SEGUIMIENTO.md` con el resumen del trimestre si hubo cambios de fase.

---

## 4. Log de pasadas

| Fecha | Tipo | Qué se hizo | Próxima acción |
|---|---|---|---|
| 2026-09-15 | Setup | Auditoría SEO inicial (Lighthouse: SEO 100, Best Practices 100, Accessibility 98, Performance 92, LCP 3.1s). Fixes aplicados: animación del hero (LCP), jerarquía de headings del footer, aria-label del buscador. Añadido campo `reviewBy` al esquema de contenido. | Primera pasada mensual: re-lanzar Lighthouse y confirmar que el LCP bajó de 3.1s. |
| 2026-09-15 | Backlinks | Repo `awesome-claude-skills-mcp-servers` publicado y verificado con `awesome-lint`. Cross-link añadido: footer del sitio + post de blog anunciando la lista. | Añadir topics `awesome`/`awesome-list` en GitHub (manual), luego promoción (Show HN / Product Hunt / Reddit). |

---

## 5. Tabla de `reviewBy` (contenido con fecha de revisión)

Los artículos "rápidos" (rankings/comparativas de modelos concretos) se revisan cada
~2 meses porque el panorama cambia rápido. Los "evergreen" (explicativos, tutoriales,
manifiesto) cada ~6 meses.

| Artículo | Tipo | `date` | `reviewBy` | Revisado |
|---|---|---|---|---|
| [blog] chinese-ai-changing-the-game | rápido | 2026-09-07 | 2026-11-07 | ⬜ |
| [blog] claude-fable-5-1-model-ranking | rápido | 2026-09-12 | 2026-11-12 | ⬜ |
| [blog] deepseek-harness-the-future | rápido | 2026-09-07 | 2026-11-07 | ⬜ |
| [blog] gpt-6-astra-vs-claude-fable-5-1 | rápido | 2026-09-13 | 2026-11-13 | ⬜ |
| [blog] gpt-6-astra-what-actually-changed | rápido | 2026-09-07 | 2026-11-07 | ⬜ |
| [blog] is-grok-really-more-powerful | rápido | 2026-09-07 | 2026-11-07 | ⬜ |
| [learn] what-is-a-deepseek-harness-and-how-to-install-it | rápido | 2026-09-07 | 2026-11-07 | ⬜ |
| [learn] what-are-ai-workflows-and-how-to-install-one | rápido | 2026-09-18 | 2026-11-18 | ⬜ |
| [learn] what-are-copilot-agents-and-how-to-install-one | rápido | 2026-09-18 | 2026-11-18 | ⬜ |
| [learn] what-are-cursor-rules-and-how-to-install-one | rápido | 2026-09-18 | 2026-11-18 | ⬜ |
| [blog] ai-price-cuts-cost-per-task-not-sticker-price | rápido | 2026-09-24 | 2026-11-24 | ⬜ |
| [blog] prompt-engineering-examples-ai-agents | evergreen | 2026-09-14 | 2027-03-14 | ⬜ |
| [blog] seo-skills-for-ai-agents-2026 | evergreen | 2026-09-14 | 2027-03-14 | ⬜ |
| [blog] why-a-curated-directory | evergreen | 2026-08-24 | 2027-02-24 | ⬜ |
| [blog] why-skills-and-agents-matter-in-agentic-ai | evergreen | 2026-09-07 | 2027-03-07 | ⬜ |
| [blog] we-open-sourced-the-list-as-an-awesome-list | evergreen | 2026-09-15 | 2027-03-15 | ⬜ |
| [learn] claude-skills-vs-mcp-servers | evergreen | 2026-08-20 | 2027-02-20 | ⬜ |
| [learn] how-to-install-a-claude-skill | evergreen | 2026-08-22 | 2027-02-22 | ⬜ |
| [learn] what-are-claude-skills | evergreen | 2026-08-18 | 2027-02-18 | ⬜ |
| [learn] what-makes-a-good-ai-prompt | evergreen | 2026-09-14 | 2027-03-14 | ⬜ |
| [blog] how-to-create-a-custom-ai-skill | evergreen | 2026-09-18 | 2027-03-18 | ⬜ |
| [blog] design-skills-for-ai-agents-2026 | evergreen | 2026-10-02 | 2027-04-02 | ⬜ |
| [blog] how-we-vet-a-skill-before-listing-it | evergreen | 2026-10-02 | 2027-04-02 | ⬜ |
| [blog] open-source-mcp-servers-that-are-paid-services | evergreen | 2026-10-02 | 2027-04-02 | ⬜ |

> El campo `reviewBy` ya vive en el frontmatter de cada `.md` (`content/blog/`,
> `content/learn/`) y en el esquema de Velite (`velite.config.ts`). Todo artículo nuevo
> debe llevarlo desde el principio: rápido → `date + 2 meses`, evergreen → `date + 6 meses`.
>
> Al revisar un artículo: `npm run review:mark -- <slug>` mueve `reviewBy` y marca la fila
> como ✅. Si además cambiaste el contenido, añade `--changed`: pone `updated: hoy`, que es
> la fecha "Updated" que ve el lector. Sin cambios de contenido, no uses `--changed`.

---

## 6. Referencia rápida — qué mirar dónde

- **Indexación / errores de crawl / queries** → Google Search Console.
- **Performance / Core Web Vitals (lab)** → `npx lighthouse <url>` o PageSpeed Insights.
- **Core Web Vitals (campo real)** → Search Console → Core Web Vitals (necesita tráfico).
- **Backlinks** → Search Console → Links (gratis) o SEMrush/Ahrefs free tier.
- **Contenido desactualizado** → tabla de `reviewBy` en este archivo.
