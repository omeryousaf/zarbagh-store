# Zarbagh website design framework

Source of truth: the five directions below. This file only says how they apply on the site (color, type, layout, graphics, identity). It does not add a different brand system.

## Directions

**Warm, earthy base**  
A natural kraft tone reflects the produce's origin and keeps it organic. Grown, not manufactured.

**Orange & green palette**  
Connects freshness with citrus and gives the brand a distinct shelf presence.

**Consistent identity system**  
Designed to stay recognisable across formats — from bulk crates to gifts.

**Citrus graphic**  
An immediate visual association with the product itself, before a word is read.

**Clean, restrained layout**  
Keeps the packaging minimal with premium outlook rather than overly decorative or busy for distinctive identity.

---

## Color

Start from the warm, earthy base. Pages sit on a natural kraft / paper field (cream, kraft, soil-brown text) so the site reads as grown produce, not a manufactured consumer brand.

Orange and green do the shelf work:

- **Orange** is citrus and action — primary buttons, price emphasis, fruit marks, the shop CTA.
- **Green** is freshness and grove — foliage in the hero, “our groves” atmosphere, not a second loud brand color.

Do not add extra accent families. If something needs to stand out, use orange on kraft, or green as atmosphere behind the citrus graphic. White is packing paper, not a sterile lab background.

## Type

Type follows the clean, restrained layout. One sans family is enough (the site’s Geist). Headlines are large and plain; body is readable and quiet. No display scripts, no stacked decorative fonts, no slogan treatments that compete with the citrus graphic.

Hierarchy is weight and size only. The words name the fruit and the pack; they do not ornament the brand.

## Layout

Treat every screen like packaging: minimal, premium outlook, not busy.

- Few columns. Wide margins. One job per band (hero, story, featured packs, values, catalogue, cart).
- Landing (`/`): full-bleed grove, short story, three featured packs, a short values row, one shop CTA. Stop there.
- Shop (`/shop`): catalogue and cart. No extra marketing modules.
- Prefer empty kraft over extra cards, badges, banners, or patterns.

If a block starts to look decorative, remove it.

## Graphics

The citrus graphic is the identity mark: fruit first, word second.

Use the crate / box side artwork — not a substitute illustration. It is the immediate visual association with the product itself, before a word is read.

- **Source (do not replace):** `images/Box Side Graphic.jpeg` at the git root `/Users/omeryousuf/Documents/PRODUCTS/ZARBAGH/zarbagh-store/images/`
- **Served on the site:** copy at `public/images/box-side-graphic.jpeg` → URL `/images/box-side-graphic.jpeg` (Next.js only serves static files from `public/`)

It appears as the crate face on the landing hero, the grove story panel, featured packs, and shop product cards. Keep it as-is — no other product image. The hero grove wash is atmosphere only; it must not add invented fruit.

## Identity

One system across formats — bulk crates, gift crates, landing, shop, header, footer.

Same kraft base, same orange/green, same citrus graphic, same restrained type. Grade and pack size may change (kilo, family crate, juice crate, export crate); the identity does not.

Recognisable means: a gift crate and a 20 kg juice crate still look like Zarbagh, and `/` and `/shop` still look like the same packer.
