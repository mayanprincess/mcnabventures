# McNab Ventures Brand Guide

## Typography

### Fonts from Google Fonts

| Usage | Font | Weights | Tailwind Class |
|-------|------|---------|----------------|
| **Heading** | Literata (Serif) | Light (300), Medium (500) | `font-literata-light`, `font-literata-medium` |
| **Subheading** | Literata Medium | Medium (500) | `font-literata-medium` |
| **Content/Body** | Work Sans | Medium (500) | `font-work-sans-medium` |
| **Snaps** | Work Sans | ExtraBold (800) | `font-work-sans-extrabold` |

**Note:** Fustat is not available on Google Fonts. We're using **Work Sans** as a modern alternative with similar characteristics.

### Font Usage Examples

```jsx
// Heading - Literata Light
<h1 className="font-literata-light text-5xl">Main Heading</h1>

// Heading - Literata Medium
<h2 className="font-literata-medium text-3xl">Section Heading</h2>

// Subheading - Literata Medium
<h3 className="font-literata-medium text-xl">Subheading</h3>

// Body/Content - Work Sans Medium
<p className="font-work-sans-medium">Regular body text content.</p>

// Snaps/Emphasis - Work Sans ExtraBold
<span className="font-work-sans-extrabold text-2xl">BOLD STATEMENT</span>
```

---

# McNab Ventures Color Palette

## Brand Colors

| Color | Hex | Tailwind Class |
|-------|-----|----------------|
| **Navy** (Dark Blue) | `#005B7F` | `bg-navy`, `text-navy`, `border-navy` |
| **Turquoise** | `#00BFB3` | `bg-turquoise`, `text-turquoise`, `border-turquoise` |
| **Sand** | `#D6D2C4` | `bg-sand`, `text-sand`, `border-sand` |
| **Gold** | `#CB9763` | `bg-gold`, `text-gold`, `border-gold` |
| **White** | `#ffffff` | `bg-white`, `text-white`, `border-white` |

## Gold Gradient

Use the custom class: `.bg-gold-gradient`

Gradient stops:
- Start: `#C58427`
- Mid 1: `#DDB154` (25%)
- Mid 2: `#E8C568` (50%)
- Mid 3: `#DDB154` (75%)
- Mid 4: `#C68529` (85%)
- End: `#FAF3B2` (100%)

## Usage Examples

### Background Colors
```jsx
<div className="bg-navy">Navy background</div>
<div className="bg-turquoise">Turquoise background</div>
<div className="bg-sand">Sand background</div>
<div className="bg-gold">Gold background</div>
<div className="bg-gold-gradient">Gold gradient background</div>
```

### Text Colors
```jsx
<h1 className="text-navy">Navy text</h1>
<p className="text-turquoise">Turquoise text</p>
<span className="text-gold">Gold text</span>
```

### Border Colors
```jsx
<div className="border border-navy">Navy border</div>
<div className="border-2 border-turquoise">Turquoise border</div>
```

### Combined Usage
```jsx
<div className="bg-navy text-white border-t-4 border-gold">
  Navy background with white text and gold border
</div>

<button className="bg-turquoise text-white hover:bg-navy transition-colors">
  Button with turquoise background
</button>

<div className="bg-gold-gradient text-white p-8">
  Element with gold gradient background
</div>
```

## Color Psychology

- **Navy (#005B7F)**: Trust, stability, professionalism
- **Turquoise (#00BFB3)**: Tropical, refreshing, calming
- **Sand (#D6D2C4)**: Warmth, natural, beach
- **Gold (#CB9763)**: Luxury, premium, elegance
- **Gold Gradient**: Premium luxury, high-end appeal
