# Zarbagh store

A first-slice website for buying kinnow (citrus) from **Zarbagh**. The home page is a marketing landing; the shop is where buyers browse packs, add quantities to a cart, and confirm an order on-screen. There is no login, database, or payment — the confirmation stays in the browser.

Open this folder in Cursor or VS Code:

**File → Open Folder** → `/Users/omeryousuf/Documents/PRODUCTS/ZARBAGH/zarbagh-store`

Then:

```bash
npm install
npm run dev
```

The app listens on `0.0.0.0:4321` so phones on the same LAN can open it.

## Routes

- [http://localhost:4321/](http://localhost:4321/) — landing (hero, grove story, featured packs, values)
- [http://localhost:4321/shop](http://localhost:4321/shop) — catalogue, cart, checkout

On the LAN: `http://<your-lan-ip>:4321/` and `http://<your-lan-ip>:4321/shop`.

## GitHub Pages

Live site: [https://omeryousaf.github.io/zarbagh-store/](https://omeryousaf.github.io/zarbagh-store/)

Pushes to `main` build a static export on GitHub Actions and deploy to Pages (project path `/zarbagh-store`). If the site is 404, open the repo **Settings → Pages** and set **Source** to **GitHub Actions**.

## What this slice includes

- Marketing home in the spirit of a farm shop: full-bleed grove hero, grower story, featured crates, trust row, then into the shop
- Catalogue of loose kilograms, gift and family crates, a juice crate, and an export-grade pack, with prices in PKR
- Cart with quantity edits
- Checkout form: name, Pakistani mobile number, delivery address (quantities come from the cart)
- Empty cart, invalid form, and success confirmation states, on desktop and mobile
