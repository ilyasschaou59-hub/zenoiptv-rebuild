# ZenoIPTV Blog Audit and SEO Content Plan

## Audit snapshot

- Reviewed the tracked project files and blog-related references in the repository history before editing.
- The project is a static HTML/CSS/vanilla JavaScript site. It has no framework, build step, CMS, or blog article template.
- `blog.html` is the only blog page. It currently displays an empty state; there are no article files or article URLs in the working tree or the reviewed Git history. The `blog/post-slug.html` URL in its HTML comment is a placeholder, not a published URL.
- Existing navigation/footer links point to `blog.html`. No links to individual old articles were found. The sitemap contains `blog.html` and no article URLs.
- `robots.txt` allows crawling. There is no blog-specific block.
- The public `www.zenoiptv.com` homepage and blog index are reachable. The public blog index is also empty, its sitemap has no article URLs, and `/blog/` returns 404. No legacy article URLs are evidenced in the local sitemap, the public sitemap, or the reviewed Git history. This does not rule out unlinked historical URLs or external backlinks.
- The public host redirects apex (`zenoiptv.com`) URLs to `www.zenoiptv.com`. Before this task, existing page canonicals, Open Graph URLs, structured-data URLs, site configuration, and sitemap used the apex host. With approval, those URL metadata/config values are now normalized to `www`; visible non-blog page content and commercial details were not changed.
- The README says this static site is **not deployed** and that a separate WordPress site has not been touched, despite the public domain currently serving content matching this codebase. The local changes have not been deployed, so the public blog remains empty until deployment. The repository and public sitemap do not provide a complete record of any historical, unlinked WordPress URLs or backlinks.
- The verified service details in this codebase are limited: plans for 1–4 devices and 1-, 3-, 6-, and 12-month terms; prices are in EUR; WhatsApp support uses a UK number. The site gives general device compatibility guidance. It does not substantiate US-specific availability, a free trial, channel counts, 4K delivery, encoder hardware, licensing, or any of the named third-party brands/platforms in the keyword list.
- Existing real internal destinations suitable for contextual links: `features.html`, `pricing.html`, `compatibility.html`, `faq.html`, `contact.html`, and `disclaimer.html`.

## Existing URL and migration record

| URL or pattern | Current evidence | Recommended treatment |
|---|---|---|
| `/blog.html` | Existing empty index, linked in site navigation/footer and listed in the public sitemap | Keep as the blog index and refresh its content. Its canonical URL uses the live `www` host. |
| `/blog/post-slug.html` | Example in an HTML comment only; no page or evidence of publication | Do not treat as an old URL or create a redirect for it. |
| Other `/blog/` article URLs | None found in local/public sitemaps or reviewed history; the public `/blog/` path returns 404 | Before deployment, check server logs, Search Console, and backlink data for any older URLs. Redirect only a real legacy URL to a genuinely equivalent new article; otherwise retain an appropriate 404/410. Do not redirect all removed URLs to the homepage. |

This static project has no redirect configuration. Any 301s for the separate live site must be planned and implemented at its actual host/platform by its owner, not simulated in this repository.

## Keyword intent record

The supplied labels below are preserved exactly. The parenthetical definitions are the supplied interpretations: I = Informational, C = Commercial, T = Transactional, N = Navigational. "Flag" means the text or label is ambiguous, appears mismatched to the wording, or needs entity verification; no label has been silently changed.

| # | Keyword | Supplied label | Initial classification / note |
|---:|---|:---:|---|
| 1 | troypoint | T | Named third-party brand/resource; transactional label may not match branded lookup intent. Verify before targeting. |
| 2 | iptv smarters pro | I | Named player/app lookup; informational label retained. |
| 3 | iptv service | C | Broad provider evaluation / purchase research. |
| 4 | best iptv | T | "Best" comparison wording often indicates commercial research; supplied T retained and flagged. |
| 5 | iptv encoder | C | Technical hardware/product research. |
| 6 | hdmi encoder for iptv | C | Technical hardware/product research. |
| 7 | iptv providers | C | Provider comparison / purchase research. |
| 8 | iptv subscription | C | Subscription evaluation / purchase research. |
| 9 | best iptv service | C | Provider comparison / purchase research. |
| 10 | iptv free trial | I | Informational evaluation; does not establish that ZenoIPTV offers a trial. |
| 11 | marinios iptv | C | Named service lookup; identity and current offer unverified. |
| 12 | guru iptv | N | Named entity/platform lookup; verify identity and official destination. |
| 13 | iptv reddit | T | Third-party community lookup; supplied T retained and flagged as potentially navigational/informational. |
| 14 | iptv-org | N | Named project/platform lookup; verify identity and official destination. |
| 15 | best iptv service 2026 | C | Time-sensitive comparison; requires current, transparent evidence and an update date. |
| 16 | iptv service provider | C | Provider selection / purchase research. |
| 17 | iptv usa | C | US-market provider research; do not imply ZenoIPTV has US-specific terms or availability. |
| 18 | best iptv provider | C | Provider comparison / purchase research. |
| 19 | iptv subscribe | C | Subscription conversion / order intent. |
| 20 | pro video instruments iptv | N | Named company/product lookup; identity and current catalog unverified. |
| 21 | veplayer iptv decoder | I | Named decoder/product lookup; identity and current specifications unverified. |
| 22 | internet televizia | I | Ambiguous wording; could be a typo, transliteration, or non-English query. Validate before targeting. |
| 23 | iptv 4k | I | 4K resolution / streaming compatibility information. |
| 24 | indian iptv | C | Region/content-market provider research; requires India-specific, current authorization/context checks. |
| 25 | smartiflix iptv | N | Named platform lookup; identity and official destination unverified. |
| 26 | best iptv player | C | Player-app comparison; distinguish player software from a content provider. |
| 27 | strong iptv | C | Ambiguous named service/product query; identity and intent unverified. |
| 28 | iptv subscription service | C | Provider/subscription evaluation. |
| 29 | best iptv in usa | C | US-market provider comparison; requires current verifiable evidence. |
| 30 | g2g iptv | T | Named service lookup; supplied T retained, but identity and intent need verification. |
| 31 | buy iptv subscription | C | Subscription conversion / order intent. |

## Proposed article clusters

Publish the evergreen guides first. Treat the year-specific comparison as a dated guide, not a ranking without evidence. Hold named-entity pages until the identities, official sources, and the site's editorial basis for discussing them are verified. No article should imply affiliation with or endorsement by a third party.

| # | Proposed title and slug | Primary keyword | Secondary keywords | Intent | Audience and purpose | Recommended internal links |
|---:|---|---|---|---|---|---|
| 1 | **How to Evaluate an IPTV Service in the USA: A Buyer’s Checklist** — `/blog/iptv-service-buying-checklist.html` | iptv service | iptv providers; iptv subscription; iptv service provider; iptv usa; iptv subscribe; iptv subscription service; buy iptv subscription | C | US readers evaluating a provider before purchase. Focus on identity, authorization, privacy, subscription terms, and purchase risk; state that the site does not verify US availability. | `faq.html`, `compatibility.html`, `disclaimer.html`, and the 2026 comparison worksheet. |
| 2 | **How to Compare the Best IPTV Services in 2026** — `/blog/best-iptv-services-2026.html` | best iptv service 2026 | best iptv service; best iptv (T, label retained); best iptv provider; best iptv in usa | C (with supplied T for "best iptv" flagged) | US readers comparing competing offers. Provide a repeatable evidence worksheet and distinguish verified details from unknowns; do not make unsupported rankings. | General buyer checklist, free-trial process, pricing and disclaimer, with clear EUR/non-US caveat on site pricing. |
| 3 | **IPTV Free Trials: What to Check Before You Sign Up** — `/blog/iptv-free-trial-checklist.html` | iptv free trial | Related trial/subscription terms only where natural | I | Readers evaluating trial offers. Explain what terms to check and why a trial is not proof of licensing or quality; do not claim a ZenoIPTV trial exists. | `terms.html`, `privacy-policy.html`, `faq.html`, `contact.html` (for site-specific questions only). |
| 4 | **IPTV Smarters Pro: What to Check Before Installing** — `/blog/iptv-player-apps-explained.html` | iptv smarters pro | best iptv player (general app-selection context) | I | Readers investigating an app name before installation. Explain listing/publisher/device checks and distinguish software from a content subscription; explicitly disclose that the current official listing and availability have not been independently verified. Hold VePlayer-specific claims for research. | `compatibility.html`, `disclaimer.html`. |
| 5 | **IPTV Encoders and HDMI Encoders: A Practical Buying Guide** — `/blog/iptv-hdmi-encoder-guide.html` | iptv encoder | hdmi encoder for iptv; pro video instruments iptv (named navigation term held pending verification) | C / N | Technical buyers learning when encoding hardware is relevant, which inputs/outputs and formats to verify, and how to confirm product specifications with manufacturers. Do not imply that ordinary viewers need an encoder or that a named vendor sells a particular product. | `features.html` only if contextually relevant; otherwise no forced service CTA. |
| 6 | **4K IPTV: Bandwidth, Device, and Content Checks** — `/blog/4k-iptv-checklist.html` | iptv 4k | None until verified query data supports more | I | Viewers diagnosing the playback chain and verifying a resolution claim. Focus on source, device, app, network, and stepwise testing rather than choosing a provider. No invented speed thresholds or ZenoIPTV 4K claims. | `compatibility.html` and the broad provider checklist for separate purchase questions. |
| 7 | **Indian IPTV in the USA: How to Check Language and Content Availability** — `/blog/indian-iptv-service-checklist.html` | indian iptv | None until verified query data supports more | C | US viewers checking particular Indian programming, audio/subtitle options, live/on-demand details, US availability, and device controls. Does not imply ZenoIPTV offers Indian content. | `compatibility.html`, `pricing.html` (EUR caveat), and the broad service evaluation checklist. |

### Research-only keyword cluster (no thin pages)

Do not create a page per named query or insert these names as unsupported examples. First verify the exact entity, official website, current status, actual search result intent, and whether a useful independent treatment is possible:

- Third-party resource/community lookups: **troypoint (T)**, **iptv reddit (T)**.
- Named service/platform lookups: **marinios iptv (C)**, **guru iptv (N)**, **iptv-org (N)**, **smartiflix iptv (N)**, **g2g iptv (T)**, **strong iptv (C)**.
- Named equipment/app lookups: **pro video instruments iptv (N)**, **veplayer iptv decoder (I)**.
- Ambiguous query: **internet televizia (I)**.

The intent labels above remain the user's initial labels. In particular, investigate whether the T labels for brand/community queries and the I label for "internet televizia" reflect actual US search intent before writing dedicated pages.

## Implementation and migration decisions

- Keep the existing `.html` URL convention, the shared design, and the existing navigation/footer. Use `https://www.zenoiptv.com` consistently for canonicals, Open Graph URLs, structured data, generated site URLs, robots sitemap reference, and sitemap locations because the public host redirects apex URLs to `www`.
- Add no redirects in this repository: no retired article URLs have been identified and the project has no redirect layer. Before deploying over the separate WordPress site, obtain its full URL/backlink inventory and make a one-to-one redirect/404/410 map.
- List only valid final-host URLs in the sitemap. Keep `/blog.html`; include each article only once. The non-blog pages' canonical host metadata has been normalized without changing their visible content.
- Use visible breadcrumbs and `BreadcrumbList` plus `BlogPosting` JSON-LD that match each page. Do not use review/rating structured data or unsupported author credentials.
- Keep time-sensitive and regional claims out until verified against authoritative, current sources. The site's existing EUR pricing, UK WhatsApp contact, and non-US-specific policy/content do not support US-market availability claims.

## Review refinements

The seven pages now have intentionally different page jobs: broad provider evaluation; a dated, evidence-based comparison worksheet; the before/during/after trial process; third-party app listing and provider separation; encoder system selection; 4K playback-chain diagnosis; and a US-oriented Indian-programming availability check. The named-app article discloses that current official listing details were not independently verified. Named entities that cannot be verified remain research-only, not standalone profiles.

All seven article links remain in the index and sitemap. Titles, descriptions, H1s, canonical URLs, visible dates, structured data, and internal links were reviewed for consistency. No article ranking, trial availability, pricing, channel access, performance, licensing, or affiliation claim was added without support.
