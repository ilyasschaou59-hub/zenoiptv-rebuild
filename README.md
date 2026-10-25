# ZenoIPTV website

Static website for **zenoiptv.com**. It is built with plain HTML5, CSS3 and vanilla JavaScript. There is no build step, framework or dependency.

> Status: **not deployed**. No GitHub, Vercel, DNS or hosting changes have been made. The existing WordPress site has not been touched.

## Structure

```
index.html              Homepage
features.html           Features
pricing.html            Pricing (cards + full comparison table)
compatibility.html      Device compatibility
faq.html                FAQ (accordion + FAQPage structured data)
contact.html            Contact (form opens the visitor's email app)
blog.html               Blog index (empty state, no posts yet)
privacy-policy.html     Privacy policy
terms.html              Terms of service
disclaimer.html         Disclaimer
404.html                Not-found page (noindex, uses root-relative paths)
robots.txt
sitemap.xml
assets/
  css/style.css         Shared stylesheet (design tokens at the top)
  js/config.js          Editable configuration: prices, currency, support email
  js/main.js            Shared script: menu, accordion, pricing, contact form
  img/favicon.svg       Favicon / logo mark
```

## Editing prices

Edit **`assets/js/config.js`** only. Every price on the site is generated from the `plans` array. That covers the homepage cards, pricing cards, comparison table, the "Plans from…" line, the contact-form plan list and the pricing structured data.

```js
{ id: "2-devices", devices: 2, prices: { "1m": 36, "3m": 63, "6m": 81, "12m": 118 } }
```

Per-month equivalents and "save X compared with paying monthly" figures are calculated automatically from these numbers.

Prices are rendered with JavaScript. Visitors without JavaScript see a message asking them to email support for the price list.

## Editing shared header / footer

The header and footer appear in each HTML file, so a change to navigation or the footer must be made in **every** `.html` file. Use find-and-replace across the folder. `404.html` uses root-relative links (`/pricing.html`) so it works at any URL depth. All other pages use relative links.

## Contact form

There is no server-side form handler. The form validates the input and then opens the visitor's email app with a pre-filled message to `support@zenoiptv.com`. The page states clearly that **nothing is sent until the visitor presses Send in their email app**. It never shows a "message sent" confirmation.

To use a real form backend later, replace the `initContactForm` submit handler in `assets/js/main.js`. Only show a success message after the backend confirms receipt, and update the privacy policy.

## SEO

- Each page has a unique `<title>`, meta description, canonical URL and Open Graph tags.
- Structured data: `Organization` + `WebSite` (home), `BreadcrumbList` (inner pages), `FAQPage` (FAQ) and `Service` with an `OfferCatalog` (pricing, generated from `config.js`).
- `sitemap.xml` lists all indexable pages. `404.html` is `noindex` and excluded.
- Canonical URLs use the `.html` form, e.g. `https://zenoiptv.com/pricing.html`. If you enable clean URLs on the host later (e.g. Vercel `cleanUrls`), update the canonicals, `og:url`, internal links and the sitemap to match.

## Local preview

Open `index.html` directly in a browser, or serve the folder:

```
npx serve .
```

`404.html` uses root-relative paths, so it only renders styled when served from a web server, not via `file://`.

## Before going live — checklist

Content that needs the owner's confirmation:

- [ ] **Legal pages** (privacy policy, terms, disclaimer) are general drafts. Have them reviewed by a qualified legal professional. Add the legal entity name, address, governing law and a refund/cancellation policy as required for your jurisdiction.
- [ ] **Compatibility page**: confirm that the listed device types are ones you actually support.
- [ ] **FAQ / features**: confirm the ordering flow (order via email → support replies with payment and setup steps) matches how you actually work.
- [ ] **Prices** are provisional. Confirm them in `config.js`.
- [ ] Decide whether "devices" means simultaneous connections, and say so explicitly on the pricing page and FAQ if it does.
- [ ] **Blog** has no posts. Consider adding `noindex` to `blog.html` until articles exist, or add articles and list them in `sitemap.xml`.
- [ ] If you add analytics, cookies or a form backend, update the privacy policy (it currently says the site uses none).
- [ ] Plan **301 redirects** from the existing WordPress URLs to the new URLs before switching hosting, to preserve search rankings.
- [ ] Optionally add a 1200×630 social sharing image and `og:image` tags.

Must remain unchanged during migration: the `support@zenoiptv.com` mailbox and all existing DNS records (especially MX/email records).
