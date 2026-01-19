# McNab Ventures - Data Map

Endpoints de contenido para el CMS/Backend.

---

## Componentes Estáticos (No requieren API)

- **Header** - Navegación hardcodeada
- **Footer** - Enlaces y redes sociales hardcodeados

---

## Colecciones API

### PrimaryHero

```json
{
  "heading": "string",
  "video_src": "file (video/mp4)",
  "primary_button": {
    "label": "string",
    "href": "string"
  },
  "secondary_button": {
    "label": "string",
    "href": "string"
  }
}
```

---

### SecondaryHero

```json
{
  "image": "file (image)",
  "heading": "string",
  "linkLabel": "string",
  "linkUrl": "string",
  "useVectorDesign": "boolean"
}
```

**Variantes de diseño:**
- `useVectorDesign: false` - Imagen de fondo con texto overlay
- `useVectorDesign: true` - Diseño con barras curvas turquesa

---

### MissionStatement

```json
{
  "text": "string",
  "highlights": ["string", "string", "..."]
}
```

**Uso:** El texto completo se pasa en `text` y las palabras/frases a resaltar en turquesa se pasan en el array `highlights`.

---

### VideoPlayer

```json
{
  "video_src": "file (video/mp4)",
  "poster_image": "file (image)"
}
```

---

### GroupSnapshot

**Slides:**
```json
{
  "id": "string",
  "main_image": "file (image)",
  "circle_image": "file (image)",
  "badge": "string",
  "title": "string",
  "description": "string",
  "highlights": ["string"]
}
```

**Company Logos:**
```json
{
  "name": "string",
  "logo": "file (image/svg)",
  "width": "number",
  "height": "number"
}
```

---

### OurPartners

```json
{
  "badge": "string",
  "title": "string",
  "partners": [
    {
      "name": "string",
      "logo": "file (image/svg)",
      "width": "number",
      "height": "number"
    }
  ]
}
```

---

### FeaturedExperiences

```json
{
  "title": "string",
  "description": "string",
  "grid_items": [
    {
      "type": "image | text | icon",
      "image": "file (if type=image)",
      "text": "string (if type=text)",
      "icon": "file (if type=icon)",
      "background_color": "navy | gold | turquoise | sand",
      "text_color": "white | navy",
      "grid_column": "string",
      "grid_row": "string"
    }
  ]
}
```

---

### StayInTheLoop

```json
{
  "section_title": "string",
  "view_all_url": "string",
  "items": [
    {
      "id": "string",
      "category": "string",
      "title": "string",
      "date": "date",
      "image": "file (image)",
      "href": "string"
    }
  ]
}
```

---

### Diversified

```json
{
  "title": "string",
  "image": "file (image)"
}
```

---

### JoinOurTeam

```json
{
  "title": "string",
  "description": "string",
  "button_text": "string",
  "button_href": "string",
  "image": "file (image)"
}
```

---

### WhoWeAre

```json
{
  "badge": "string",
  "title_part_1": "string",
  "title_highlight": "string",
  "description": "string",
  "logo": "file (image)"
}
```

---

### OurJourney

```json
{
  "title": "string",
  "default_open": "string",
  "items": [
    {
      "id": "string",
      "title": "string",
      "content": "string"
    }
  ]
}
```

---

### GetHighlights

```json
{
  "title": "string",
  "items": [
    {
      "id": "string",
      "image": "file (image)",
      "title": "string",
      "description": "string",
      "href": "string"
    }
  ]
}
```

---

### OurIndustries

```json
{
  "title": "string",
  "items": [
    {
      "id": "string",
      "title": "string",
      "image": "file (image)",
      "description": "string",
      "href": "string"
    }
  ]
}
```

---

### Multimedia

**Photos:**
```json
{
  "id": "string",
  "src": "file (image)",
  "alt": "string",
  "size": "large | tall | medium | small"
}
```

**Videos:**
```json
{
  "id": "string",
  "thumbnail": "file (image)",
  "video_url": "string",
  "alt": "string",
  "size": "large | tall | medium | small"
}
```

---

### ContactCard

```json
{
  "title": "string",
  "contact_type": "string",
  "name": "string",
  "position": "string",
  "email": "string",
  "phone": "string",
  "website": "string",
  "address": "string",
  "image": "file (image)",
  "social_links": [
    {
      "name": "string",
      "icon": "file (image/svg)",
      "href": "string"
    }
  ]
}
```

---

### UsefulLinks

```json
{
  "title": "string",
  "links": [
    {
      "label": "string",
      "href": "string",
      "icon": "file (image/svg)"
    }
  ]
}
```

---

### DrivenByProgress

```json
{
  "title": "string",
  "description": "string",
  "image": "file (image)",
  "stats": [
    {
      "icon": "file (image/svg)",
      "value": "string",
      "label": "string"
    }
  ]
}
```

---

### ExperiencesGallery

```json
{
  "slides": [
    {
      "id": "number",
      "backgroundImage": "file (image)",
      "leftText": "string",
      "rightText": "string"
    }
  ]
}
```

---

### SustainabilityInAction

```json
{
  "title": "string",
  "backgroundImage": "file (image)",
  "cards": [
    {
      "id": "number",
      "title": "string",
      "image": "file (image)",
      "href": "string"
    }
  ]
}
```

---

### TheExperiences

```json
{
  "title": "string",
  "items": [
    {
      "id": "number",
      "layout": "single | two-images",
      "mainImage": "file (image)",
      "secondaryImage": "file (image, optional)",
      "circularImage": "file (image, optional)",
      "title": "string",
      "description": "string",
      "buttonText": "string",
      "buttonHref": "string"
    }
  ]
}
```

**Layout types:**
- `single`: Imagen panorámica full width con contenido abajo
- `two-images`: Imagen portrait (255x450) + imagen landscape (635x450), gap 125px, soporta reverse automático

---

## Resumen de Colecciones

| Colección | Tipo |
|-----------|------|
| `primary_hero` | single |
| `group_hero` | collection |
| `mission_statement` | single |
| `featured_video` | single |
| `group_snapshots` | collection |
| `company_logos` | collection |
| `partners` | collection |
| `featured_experiences` | single |
| `news_articles` | collection |
| `diversified_section` | single |
| `join_our_team` | single |
| `who_we_are` | single |
| `our_journey` | single |
| `highlights` | collection |
| `industries` | collection |
| `multimedia_photos` | collection |
| `multimedia_videos` | collection |
| `contact_cards` | collection |
| `useful_links` | single |
| `driven_by_progress` | single |
| `experiences_gallery` | collection |
| `sustainability` | single |
| `the_experiences` | single |