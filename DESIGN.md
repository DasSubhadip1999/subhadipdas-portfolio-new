---
name: Subhadip Das Portfolio
description: A painted Bengal bazaar street where every section is a hand-lettered enamel shop board.
colors:
  limewash-wall: "#eef3f4"
  limewash-shadow: "#dfe7e9"
  board-ink: "#15130f"
  enamel-white: "#fffaf0"
  chrome-yellow: "#ffc72c"
  sindoor-vermilion: "#c8321f"
  peacock-teal: "#00796b"
  leaf-green: "#2e7d32"
  ultramarine: "#1f4fa3"
  rani-pink: "#c2185b"
  tin-metal: "#8a949a"
typography:
  display:
    fontFamily: "Yatra One, serif"
    fontSize: "clamp(3.2rem, 12vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Yatra One, serif"
    fontSize: "clamp(2.4rem, 6vw, 4.2rem)"
    fontWeight: 400
    lineHeight: 0.95
  title:
    fontFamily: "Yatra One, serif"
    fontSize: "2.25rem"
    fontWeight: 400
    lineHeight: 1
  lead:
    fontFamily: "Hind, system-ui, sans-serif"
    fontSize: "clamp(1.35rem, 2.4vw, 1.75rem)"
    fontWeight: 600
    lineHeight: 1.375
  body:
    fontFamily: "Hind, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Hind, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    letterSpacing: "0.16em"
  bangla:
    fontFamily: "Galada, serif"
    fontSize: "clamp(1.6rem, 4vw, 2.4rem)"
    fontWeight: 400
rounded:
  tag: "4px"
  plaque: "6px"
  board: "7px"
spacing:
  board-inset: "9px"
  section: "7rem"
  chain: "44px"
components:
  plaque-primary:
    backgroundColor: "{colors.board-ink}"
    textColor: "{colors.chrome-yellow}"
    rounded: "{rounded.plaque}"
    padding: "12px 24px"
    height: "48px"
  plaque-secondary:
    backgroundColor: "{colors.peacock-teal}"
    textColor: "{colors.enamel-white}"
    rounded: "{rounded.plaque}"
    padding: "12px 24px"
    height: "48px"
  board-yellow:
    backgroundColor: "{colors.chrome-yellow}"
    textColor: "{colors.board-ink}"
    rounded: "{rounded.board}"
  board-vermilion:
    backgroundColor: "{colors.sindoor-vermilion}"
    textColor: "{colors.enamel-white}"
    rounded: "{rounded.board}"
  tag:
    textColor: "currentColor"
    rounded: "{rounded.tag}"
    padding: "4px 10px"
---

# Design System: Subhadip Das Portfolio

## Overview

**Creative North Star: "The Bazaar Street"**

The page is a lime-washed wall in a Bengal market lane, hung with enamel tin signboards. Every section is a board on two chains, lettered by a sign painter, in the saturated colours real shopfronts use. The visitor walks down the street. Boards swing when the page scrolls, a section sign lights up and takes a rubber stamp when reached, and the stamps add up to XP in a passport.

Density alternates like a real street: big lettered boards with a lot of wall between them, then a dense rack of tin tags. Type does the decorating. There are no stock illustrations; lettering, painted borders, rivets, chains and bunting are the whole ornament vocabulary.

**Key Characteristics:**
- Cool limewash ground, never cream.
- Full palette: six enamel colours each own whole boards, not accents.
- Sign-painter display lettering with a hard drop shade in a darker tone of the board.
- Boards hang on chains and move with real spring physics.
- A rubber stamp marks what has been visited.

## Colors

A full-palette street: each enamel colour paints entire boards against a cool wall.

### Primary
- **Chrome Yellow** (#ffc72c): the name sign, Enquiry sign, rate-card focus, toasts, Bug Bash board. Always carries ink lettering.
- **Sindoor Vermilion** (#c8321f): the role ribbon, Workshops sign, stamps, the danger-warm accent in tags and progress.

### Secondary
- **Peacock Teal** (#00796b): Langoor board, In Stock sign, Enquiry board, secondary plaques.
- **Ultramarine** (#1f4fa3): Stalls sign, rate-card numerals, the white board's painted border.
- **Leaf Green** (#2e7d32) and **Rani Pink** (#c2185b): further boards in the rotation.

### Neutral
- **Limewash Wall** (#eef3f4) fading to **Limewash Shadow** (#dfe7e9): the page ground, with a fixed noise texture.
- **Board Ink** (#15130f): all text on light boards, nav rule, footer ground. Never pure black.
- **Enamel White** (#fffaf0): lettering on dark boards and the white board ground.
- **Tin Metal** (#8a949a): chains, hooks, rails, rivets.

### Named Rules
**The Whole Board Rule.** A colour is spent on a whole board or plaque, never scattered as small accents on a neutral card.

**The Ink Pairing Rule.** Yellow and white boards take Board Ink lettering; vermilion, teal, green, ultramarine and pink take Enamel White. These pairings hold 4.5:1 or better.

## Typography

**Display Font:** Yatra One (with serif fallback)
**Body Font:** Hind (with system-ui fallback)
**Bengali:** Galada, for the bilingual name line

**Character:** Yatra One is drawn from Indian sign-painting and truck lettering, so it carries the world on its own. Hind is a sturdy Indian humanist sans that stays quiet and readable under it.

### Hierarchy
- **Display** (400, clamp(3.2rem, 12vw, 6rem), 0.95): the name on the shop sign only.
- **Headline** (400, clamp(2.4rem, 6vw, 4.2rem), 0.95): employer names and section signs.
- **Title** (400, 2.25rem, 1): small board titles (Rate card, Schooling, Chai break?).
- **Lead** (Hind 600, clamp(1.35rem, 2.4vw, 1.75rem), 1.375): the opening line of a section, max 40ch.
- **Body** (Hind 400, 1.125rem, 1.625): paragraphs and bullets, max 58–62ch.
- **Label** (Hind 700, 0.875rem, 0.16em, uppercase): plain-language captions under signs and fact labels.

### Named Rules
**The Painter's Shade Rule.** Display lettering carries `text-shadow: 0.055em 0.06em 0 var(--shade)`, where the shade is a darker tone of the board. This is the world's native device, not a costume shadow.

**The Caption Below Rule.** A sign's plain-language label sits under its lettering, never above it as an eyebrow.

## Layout

Single scrolling page in six sections (Shopfront, Proprietor, Workshops, Stalls, Stock, Enquiry), each separated by a strip of paper bunting. The container is centred at 1240px max with 16 / 24 / 32px gutters. Sections use 5rem vertical padding on phones and 7rem from `sm` up. Boards reserve their chain length (36–64px) as top space so the hooks never collide with content above. Desktop uses a 12-column split (7/5 or 8/4) with boards offset left and right; everything stacks to one column below `lg`. Project boards run 3 / 2 / 1 columns.

## Elevation & Depth

Depth is physical: boards hang a few centimetres off a wall and cast a soft shadow onto it. Nothing floats on glass.

### Shadow Vocabulary
- **Board cast** (`inset 0 1px 0 rgb(255 255 255 / .35), inset 0 -2px 0 rgb(0 0 0 / .12), 0 22px 34px -16px rgb(30 45 55 / .42), 0 6px 10px -4px rgb(30 45 55 / .2)`): every enamel board.
- **Plaque lift** (`0 10px 18px -10px rgb(30 45 55 / .55), 0 3px 4px rgb(0 0 0 / .16)`): plaque buttons; hover raises 2px, press drops 2px.

### Named Rules
**The Lit Sign Rule.** Section signs start dim (`saturate(.35) brightness(.93)`) and light to full colour with the stamp when reached.

## Shapes

Tin boards have barely-softened corners (7px), a painted inner border inset 9px (2.5px stroke) and four rivets. Plaques are 6px with a triple-ring painted edge. Tags are 4px with a 1.5px painted outline. Stamps are the only circles.

## Components

### Plaque (button)
- **Shape:** gently squared (6px), 48px minimum height.
- **Primary:** Board Ink ground, Chrome Yellow lettering (Download resume).
- **Secondary:** Peacock Teal ground, Enamel White lettering (Make an enquiry).
- **States:** hover lifts 2px on ease-out-expo (0.18s); active presses 2px; focus is a 3px ink outline offset 3px.

### Enamel board (container)
- **Corner Style:** 7px with painted inner border and rivets.
- **Background:** one tone class per board (`tone-yellow`, `tone-vermilion`, `tone-teal`, `tone-green`, `tone-blue`, `tone-pink`, `tone-white`, `tone-ink`).
- **Motion:** hangs from two chains; a spring (stiffness 120, damping 5) swings it from scroll velocity and cursor position. Reduced motion holds it still.

### Tin tag
- **Style:** translucent ground, 1.5px outline in the board's text colour, 0.8rem bold.
- **Skill rack variant:** a full mini board hung from a rail; selected state turns `tone-ink`.

### Navigation
- Limewash bar with a 3px ink rule, the yellow SD plaque on the left, section links that invert to ink-on-yellow on hover with a vermilion visited dot, then the passport (ink plaque with level and XP) and the sound toggle on the right. Below `lg`, links collapse into a menu.

### Rubber stamp (signature)
- Vermilion double-ring SVG with ring text, ink-roughened by an SVG displacement filter, multiply-blended, landing with a spring at -14°.

### Two-sided project board (signature)
- Front: badge, lettered name, tagline, four tech tags. Back: screenshot, points, all tech, links. Turns on Y with a spring; reduced motion swaps faces without rotation.

## Do's and Don'ts

### Do:
- **Do** give every new section a hanging sign with a plain-language caption below it.
- **Do** paint whole boards in one enamel tone and pair text per the Ink Pairing Rule.
- **Do** let lettering carry the decoration; reuse chains, rivets, bunting and stamps before inventing ornaments.
- **Do** keep every motion behind `prefers-reduced-motion`.

### Don't:
- **Don't** warm the wall toward cream or parchment; the ground stays cool limewash (#eef3f4).
- **Don't** put an uppercase eyebrow label above a heading.
- **Don't** use zero-blur block shadows on boxes; the only hard shadow is the painter's shade on lettering.
- **Don't** use pure black (#000) for text or grounds; use Board Ink (#15130f).
- **Don't** use emoji or Unicode glyphs as icons; icons come from lucide at one stroke weight.
