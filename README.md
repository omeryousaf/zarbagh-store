# Zarbagh store

A website for buying kinnow (citrus) from **Zarbagh**. The home page is a marketing landing; the shop is where buyers pack a cart and send a packing slip on WhatsApp. There is no login, database, or payment on the site.

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

Live site: [https://zarbaghpk.com/](https://zarbaghpk.com/) (GitHub Pages custom domain). The github.io project URL may still exist, but the export is built for `/`, not `/zarbagh-store`.

Pushes to `main` build a static export on GitHub Actions and deploy to Pages. If the site is 404, open the repo **Settings → Pages** and set **Source** to **GitHub Actions**.

To enable **Send to Zarbagh on WhatsApp**, set the repo secret `NEXT_PUBLIC_ZARBAGH_WHATSAPP` (digits with country code, e.g. `923001234567`) and locally `NEXT_PUBLIC_ZARBAGH_WHATSAPP` in `.env.local`. Without it, Place order still builds the packing slip.

## What this slice includes

- Marketing home in the spirit of a farm shop: full-bleed grove hero, grower story, featured crates, then into the shop
- Catalogue of loose kilograms, gift and family crates, a juice crate, and an export-grade pack, with prices in PKR
- Cart with quantity edits and pack thumbnails
- Checkout: name, Pakistani mobile, optional email, city, address, rider note, and how they will settle
- Packing slip and WhatsApp send (see [issue #6](https://github.com/omeryousaf/zarbagh-store/issues/6))
- Empty cart, invalid form, and success states, on desktop and mobile
