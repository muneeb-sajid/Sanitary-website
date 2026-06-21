# Sanitary.pk — React Landing Page

A fully self-contained React component for **Sanitary.pk**, a premium architectural hardware and sanitary ware e-commerce storefront targeting the Pakistani market. Converted from a pure HTML/Tailwind original into a modern React functional component.

---

## Preview Sections

| Section | Description |
|---|---|
| **Header** | Sticky nav with scroll-shrink effect and live cart counter |
| **Hero Banner** | Full-bleed image with overlay, headline, and CTA buttons |
| **Trust Badges** | Four animated icon cards (delivery, authenticity, returns, support) |
| **Browse Categories** | Hover-zoom image cards for Commodes, Basins, Showers, Kitchen Sinks |
| **New Arrivals** | Product grid with add-to-cart interaction |
| **Brand Scroller** | Infinite scrolling marquee of partner brand names |
| **Why Choose Us** | Split layout with USP list and showroom image |
| **Customer Reviews** | Three testimonial cards on a dark brand background |
| **Newsletter** | Email capture strip |
| **Footer** | Four-column layout with links, contact info, and map thumbnail |
| **WhatsApp FAB** | Fixed floating action button linking to WhatsApp |

---

## Getting Started
![Uploading image.png…]()

### Prerequisites

- React 17+ or React 18+
- No additional npm packages required

### Installation

1. Copy `SanitaryPK.jsx` into your project's component directory:

```
src/
└── components/
    └── SanitaryPK.jsx
```

2. Import and render it in your app:

```jsx
import SanitaryPK from './components/SanitaryPK';

function App() {
  return <SanitaryPK />;
}

export default App;
```

That's it — no additional configuration needed.

---

## Fonts & Icons

The component loads all required typefaces and icon sets via injected `<style>` tags pointing to Google Fonts CDN:

- **Playfair Display** (700) — display headings and brand name
- **Inter** (400, 500, 600, 700) — body text, labels, UI elements
- **Material Symbols Outlined** — all icons throughout the page

### Moving fonts to your global stylesheet (recommended for production)

To avoid injecting `@import` rules via JavaScript, remove the two `@import` lines from the `styles` constant in `SanitaryPK.jsx` and add them to your `index.css` or `public/index.html` instead:

**In `public/index.html`:**
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
```

---

## Component Structure

The file is a single default export with all data, styles, and UI co-located for portability.

```
SanitaryPK.jsx
│
├── colors {}            — Design token map (hex values)
├── styles ``            — Injected global CSS (animations, hover states, fonts)
│
├── products []          — New Arrivals product data
├── categories []        — Browse Categories data
├── brands []            — Scrolling brand strip data
├── reviews []           — Customer testimonials data
│
└── SanitaryPK()         — Main component
    ├── useState         — cartCount, scrolled, email, mobileMenuOpen
    ├── useEffect        — Scroll listener for header shrink
    └── JSX sections     — Header → Hero → ... → Footer
```

---

## Interactivity

| Feature | Implementation |
|---|---|
| Header shrinks on scroll | `useEffect` scroll listener toggles `scrolled` state |
| Cart counter | `useState(0)` incremented by each "Add to Cart" click |
| Hover animations | CSS classes: `.product-card`, `.category-card`, `.trust-badge` |
| Brand marquee | CSS `@keyframes scroll` animation on `.scrolling-strip` |
| Button hover effects | Inline `onMouseEnter` / `onMouseLeave` handlers |
| WhatsApp FAB scale | Inline hover handlers on the anchor element |

---

## Design Tokens

All colors are defined in the `colors` object at the top of the file for easy theming:

```js
const colors = {
  primary: "#002645",        // Deep navy — brand primary
  secondary: "#845400",      // Amber brown — accents, badges, CTAs
  secondaryContainer: "#fcb654",
  surface: "#fcf9f8",        // Off-white page background
  footerDark: "#111827",     // Near-black footer
  whatsappGreen: "#25D366",  // WhatsApp FAB
  // ...and more
};
```

---

## Customisation Guide

### Updating products

Edit the `products` array near the top of the file:

```js
const products = [
  {
    brand: "GROHE",
    name: "Essence New Basin Mixer Gold",
    price: "PKR 45,500",
    badge: "NEW",        // Optional — shows a pill badge on the card
    img: "https://..."
  },
  // ...
];
```

### Updating categories

Edit the `categories` array:

```js
const categories = [
  { name: "Commodes", count: "120+ Models", img: "https://..." },
  // ...
];
```

### Updating reviews

Edit the `reviews` array:

```js
const reviews = [
  {
    initials: "AS",
    name: "Ahmed Salman",
    role: "Homeowner, Lahore",
    text: '"Your review text here."'
  },
  // ...
];
```

### Changing the brand color

Update `primary` and `secondary` in the `colors` object:

```js
const colors = {
  primary: "#002645",   // Change to your brand color
  secondary: "#845400", // Change to your accent color
  // ...
};
```

---

## Browser Support

Works in all modern browsers that support:
- CSS custom animations (`@keyframes`)
- CSS Grid and Flexbox
- `position: sticky`
- Variable fonts (Material Symbols)

---






---

## License

This component is provided as a UI implementation. All product images are sourced from the original design file. Brand names (GROHE, TOTO, KOHLER, ROCA, etc.) belong to their respective owners and are used here for display purposes only.
