# Dokani — Public Website (GitHub Pages)

This is the public, static site for দোকানী (Dokani). It hosts:

- `index.html` — Home page
- `privacy.html` — Privacy Policy (বাংলা / English)
- `terms.html` — Terms of Use (বাংলা / English)

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. In the GitHub repo: **Settings → Pages**.
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: `main` (or your default), folder **`/site`**
4. Save. After a minute or two the site is live at:
   `https://<your-username>.github.io/<repo-name>/`

> If you prefer the site at the repo root, move the contents of `site/` to the repository root and select the root folder instead.

`.nojekyll` is included so GitHub Pages serves the files as-is without Jekyll processing.

## Content sources

- Privacy Policy: `Dokani_Privacy_Policy.md` (placeholders filled: contact email/phone/date, location feature described as shop location/address)
- Terms of Use: `lib/core/l10n/ext/app_strings_ext_static.dart` (`tu_*` keys), Bengali + English

If you update the appstrings or the policy markdown, edit the matching sections in `site/privacy.html` / `site/terms.html` and keep both languages in sync using the `data-bn` / `data-en` attributes.

## How bilingual works

Every translatable element has both `data-bn` and `data-en` attributes. `site.js` reads the visitor's choice (persisted in `localStorage`) and swaps `textContent`. The header toggle (বাংলা / EN) switches instantly.
