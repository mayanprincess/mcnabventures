# McNab Ventures - Data Map

Este documento describe todos los componentes y sus respectivos endpoints de contenido para el CMS.

---

## 📋 Índice de Componentes

### Layout (Estáticos - No requieren API)
- [Header](#header) ⚡ Estático
- [Footer](#footer) ⚡ Estático

### Sections (Requieren API)
- [PrimaryHero](#primaryhero)
- [SecondaryHero](#secondaryhero)
- [MissionStatement](#missionstatement)
- [VideoPlayer](#videoplayer)
- [GroupSnapshot](#groupsnapshot)
- [OurPartners](#ourpartners)
- [FeaturedExperiences](#featuredexperiences)
- [StayInTheLoop](#stayintheloop)
- [Diversified](#diversified)
- [JoinOurTeam](#joinourteam)
- [WhoWeAre](#whoweare)
- [OurJourney](#ourjourney)
- [GetHighlights](#gethighlights)
- [Multimedia](#multimedia)
- [ContactCard](#contactcard)
- [UsefulLinks](#usefullinks)
- [DrivenByProgress](#drivenbyprogress)
- [OurIndustries](#ourindustries) (usa GetHighlights con variant="industry")

---

## Layout Components (Estáticos)

> ⚡ **Nota:** Los componentes de layout (Header y Footer) usan datos estáticos hardcodeados directamente en el componente. No requieren conexión a API.

### Header

**Descripción:** Navegación principal del sitio con logo y menú.

**Estado:** ⚡ ESTÁTICO (no requiere API)

**Datos hardcodeados en el componente:**
```javascript
// Logos
logo: '/logos/Logo.svg'
logoWhite: '/logos/mcnab_logo_white.svg'

// Navegación
navigationItems: [
  { label: 'About Us', href: '/about-us' },
  { label: 'Group', href: '/group' },
  { label: 'Our Impact', href: '/our-impact' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Careers', href: '/careers' },
]
```

---

### Footer

**Descripción:** Pie de página con logo, columnas de enlaces y redes sociales.

**Estado:** ⚡ ESTÁTICO (no requiere API)

**Datos hardcodeados en el componente:**
```javascript
// Logos y vectores
logo: '/logos/mcnab_logo_text.svg'
logoLarge: '/logos/mcnab_logo.svg'
vector1: '/logos/footer_vector_1.svg'
vector2: '/logos/footer_vector_2.svg'

// Enlaces About Us
aboutUsLinks: [
  { label: 'Our Story', url: '/about-us' },
  { label: 'Leadership', url: '/leadership' },
  { label: 'Mission & Values', url: '/mission' },
  { label: 'Sustainability', url: '/sustainability' },
]

// Enlaces Company
companyLinks: [
  { label: 'Tourism', url: '/industries/tourism' },
  { label: 'Aviation', url: '/industries/aviation' },
  { label: 'Energy', url: '/industries/energy' },
  { label: 'Real Estate', url: '/industries/real-estate' },
]

// Enlaces Careers
careersLinks: [
  { label: 'Open Positions', url: '/careers' },
  { label: 'Benefits', url: '/careers/benefits' },
  { label: 'Culture', url: '/careers/culture' },
  { label: 'Internships', url: '/careers/internships' },
]

// Redes sociales
socialLinks: [
  { platform: 'linkedin', url: 'https://linkedin.com/company/mcnabventures' },
  { platform: 'twitter', url: 'https://twitter.com/mcnabventures' },
  { platform: 'facebook', url: 'https://facebook.com/mcnabventures' },
]
```

---

## Section Components (Requieren API)

### PrimaryHero

**Descripción:** Hero principal con video de fondo, título y botones de acción.

**Colección:** `primary_hero`

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

**Campos:**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| heading | string (multiline) | ✅ | Título principal (soporta saltos de línea con \n) |
| video_src | file | ✅ | Video de fondo (MP4) |
| primary_button.label | string | ✅ | Texto del botón primario |
| primary_button.href | string | ✅ | URL del botón primario |
| secondary_button.label | string | ❌ | Texto del botón secundario |
| secondary_button.href | string | ❌ | URL del botón secundario |

---

### SecondaryHero

**Descripción:** Hero secundario con imagen de fondo o diseño vectorial.

**Colección:** `group_hero`

```json
{
  "hero_image": "file (image)",
  "heading": "string",
  "link_label": "string",
  "link_url": "string",
  "use_vector_design": "boolean"
}
```

**Campos:**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| hero_image | file | ❌ | Imagen de fondo (si use_vector_design es false) |
| heading | string | ✅ | Título principal |
| link_label | string | ❌ | Texto del botón CTA |
| link_url | string | ❌ | URL del botón CTA |
| use_vector_design | boolean | ✅ | Si es true, usa diseño vectorial en lugar de imagen |

---

### MissionStatement

**Descripción:** Declaración de misión con texto destacado.

**Colección:** `mission_statement`

```json
{
  "text_before_highlight_1": "string",
  "highlight_1": "string",
  "text_before_highlight_2": "string",
  "highlight_2": "string",
  "text_before_highlight_3": "string",
  "highlight_3": "string",
  "text_after": "string"
}
```

**Campos:**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| text_before_highlight_1 | string | ✅ | Texto antes del primer highlight |
| highlight_1 | string | ✅ | Primer texto resaltado (turquoise) - ej: "our region" |
| text_before_highlight_2 | string | ✅ | Texto antes del segundo highlight |
| highlight_2 | string | ✅ | Segundo texto resaltado - ej: "our people" |
| text_before_highlight_3 | string | ✅ | Texto antes del tercer highlight |
| highlight_3 | string | ✅ | Tercer texto resaltado - ej: "our communities" |
| text_after | string | ✅ | Texto final después de los highlights |

**Alternativa simplificada:**
```json
{
  "content": "string (rich text/markdown)"
}
```

---

### VideoPlayer

**Descripción:** Reproductor de video con controles personalizados y poster.

**Colección:** `featured_video`

```json
{
  "video_src": "file (video/mp4)",
  "poster_image": "file (image)"
}
```

**Campos:**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| video_src | file | ✅ | Archivo de video (MP4) |
| poster_image | file | ✅ | Imagen de preview/thumbnail antes de reproducir |

---

### GroupSnapshot

**Descripción:** Slider con información de grupos/industrias y logos de empresas.

**Colección:** `group_snapshots` (slides) + `company_logos` (logos)

**Slides:**
```json
{
  "id": "string",
  "main_image": "file (image)",
  "circle_image": "file (image)",
  "badge": "string",
  "title": "string",
  "description": "string",
  "highlights": ["string", "string", "string"]
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

**Campos Slides:**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| main_image | file | ✅ | Imagen principal del slide |
| circle_image | file | ✅ | Imagen circular superpuesta |
| badge | string | ✅ | Etiqueta/badge del slide (ej: "Group Snapshot") |
| title | string | ✅ | Título del grupo/industria |
| description | string | ✅ | Descripción breve |
| highlights | array[string] | ✅ | Lista de empresas/puntos destacados |

**Campos Company Logos:**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| name | string | ✅ | Nombre de la empresa |
| logo | file | ✅ | Logo de la empresa (SVG preferido) |
| width | number | ❌ | Ancho sugerido en px |
| height | number | ❌ | Alto sugerido en px |

---

### OurPartners

**Descripción:** Sección de partners con logos.

**Colección:** `partners`

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

**Campos:**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| badge | string | ✅ | Etiqueta (ej: "Our Partners") |
| title | string | ✅ | Título de la sección |
| partners | array | ✅ | Lista de partners |
| partners.name | string | ✅ | Nombre del partner |
| partners.logo | file | ✅ | Logo del partner |
| partners.width | number | ❌ | Ancho sugerido |
| partners.height | number | ❌ | Alto sugerido |

---

### FeaturedExperiences

**Descripción:** Grid bento de experiencias destacadas con imágenes y textos.

**Colección:** `featured_experiences`

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
      "background_color": "string (navy | gold | turquoise | sand)",
      "text_color": "string (white | navy)",
      "grid_column": "string",
      "grid_row": "string"
    }
  ]
}
```

**Campos:**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| title | string | ✅ | Título de la sección |
| description | string | ✅ | Descripción de la sección |
| grid_items | array | ✅ | Items del grid |
| grid_items.type | enum | ✅ | Tipo: image, text, icon |
| grid_items.image | file | ❌ | Imagen (si type=image) |
| grid_items.text | string | ❌ | Texto (si type=text) |
| grid_items.icon | file | ❌ | Icono SVG (si type=icon) |
| grid_items.background_color | string | ❌ | Color de fondo: navy, gold, turquoise, sand |
| grid_items.text_color | string | ❌ | Color del texto: white, navy |
| grid_items.grid_column | string | ✅ | Posición en columna CSS Grid (ej: "1 / 3") |
| grid_items.grid_row | string | ✅ | Posición en fila CSS Grid (ej: "1 / 2") |

---

### StayInTheLoop

**Descripción:** Carrusel de noticias/artículos.

**Colección:** `news_articles`

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

**Campos:**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| section_title | string | ✅ | Título de la sección (ej: "Stay in the Loop" o "Latest News") |
| view_all_url | string | ✅ | URL del botón "View All News" |
| items | array | ✅ | Lista de artículos/noticias |
| items.category | string | ✅ | Categoría del artículo |
| items.title | string | ✅ | Título del artículo |
| items.date | date | ✅ | Fecha de publicación |
| items.image | file | ✅ | Imagen del artículo |
| items.href | string | ✅ | URL del artículo |

---

### Diversified

**Descripción:** Sección con imagen grande y título superpuesto.

**Colección:** `diversified_section`

```json
{
  "title": "string",
  "image": "file (image)"
}
```

**Campos:**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| title | string | ✅ | Título superpuesto sobre la imagen |
| image | file | ✅ | Imagen de fondo (se aplica gradiente blanco automático) |

---

### JoinOurTeam

**Descripción:** CTA para unirse al equipo con imagen de fondo.

**Colección:** `join_our_team`

```json
{
  "title": "string",
  "description": "string",
  "button_text": "string",
  "button_href": "string",
  "image": "file (image)"
}
```

**Campos:**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| title | string | ✅ | Título (ej: "Join Our Team") |
| description | string | ✅ | Descripción/subtítulo |
| button_text | string | ✅ | Texto del botón CTA |
| button_href | string | ✅ | URL del botón CTA |
| image | file | ✅ | Imagen de fondo |

---

### WhoWeAre

**Descripción:** Sección "Quiénes Somos" con logo y texto descriptivo.

**Colección:** `who_we_are`

```json
{
  "badge": "string",
  "title_part_1": "string",
  "title_highlight": "string",
  "description": "string",
  "logo": "file (image)"
}
```

**Campos:**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| badge | string | ✅ | Etiqueta superior (ej: "WHO WE ARE") |
| title_part_1 | string | ✅ | Primera parte del título (color navy) |
| title_highlight | string | ✅ | Parte destacada del título (color turquoise) |
| description | string | ✅ | Párrafo descriptivo |
| logo | file | ✅ | Logo de la empresa/resort |

---

### OurJourney

**Descripción:** Acordeón expandible con historia/valores de la empresa.

**Colección:** `our_journey`

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

**Campos:**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| title | string | ✅ | Título de la sección (ej: "Our Journey") |
| default_open | string | ❌ | ID del item abierto por defecto |
| items | array | ✅ | Lista de items del acordeón |
| items.id | string | ✅ | Identificador único del item |
| items.title | string | ✅ | Título del item (ej: "History", "Our Team") |
| items.content | string | ✅ | Contenido expandible del item |

---

### GetHighlights

**Descripción:** Carrusel de highlights/características destacadas. Soporta dos variantes de diseño.

**Colección:** `highlights`

**Props del componente:**
| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| title | string | "Get the highlights." | Título de la sección |
| items | array | - | Lista de items |
| variant | string | "default" | Variante: `"default"` o `"industry"` |

**Variante `default`** - Cards con imagen rectangular:
```json
{
  "title": "string",
  "items": [
    {
      "id": "string",
      "image": "file (image)",
      "title": "string",
      "description": "string"
    }
  ]
}
```

**Variante `industry`** - Cards con imagen circular y botón:
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

**Campos (variante default):**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| title | string | ✅ | Título de la sección |
| items | array | ✅ | Lista de highlights |
| items.image | file | ✅ | Imagen del highlight (rectangular) |
| items.title | string | ✅ | Título corto (bold) |
| items.description | string | ✅ | Descripción del highlight |

**Campos adicionales (variante industry):**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| items.href | string | ✅ | URL del botón "Explore" |

---

### OurIndustries

**Descripción:** Carrusel de industrias. Usa el componente GetHighlights con `variant="industry"`.

**Colección:** `industries`

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

**Campos:**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| title | string | ✅ | Título de la sección (ej: "Our Industries") |
| items | array | ✅ | Lista de industrias |
| items.title | string | ✅ | Nombre de la industria (turquoise) |
| items.image | file | ✅ | Imagen circular de la industria |
| items.description | string | ✅ | Descripción breve |
| items.href | string | ✅ | URL del botón "Explore" |

**Uso en componente:**
```jsx
<GetHighlights 
  title={ourIndustriesData.title}
  items={ourIndustriesData.items}
  variant="industry"
/>
```

---

### Multimedia

**Descripción:** Galería de fotos y videos con tabs.

**Colección:** `multimedia_photos` + `multimedia_videos`

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

**Campos Photos:**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| src | file | ✅ | Imagen de la galería |
| alt | string | ✅ | Texto alternativo |
| size | enum | ✅ | Tamaño: large, tall, medium, small |

**Campos Videos:**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| thumbnail | file | ✅ | Imagen thumbnail del video |
| video_url | string | ✅ | URL del video (YouTube, Vimeo, etc.) |
| alt | string | ✅ | Descripción del video |
| size | enum | ✅ | Tamaño: large, tall, medium, small |

---

### ContactCard

**Descripción:** Tarjeta de contacto con información y redes sociales.

**Colección:** `contact_cards`

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

**Campos:**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| title | string | ✅ | Título de la tarjeta |
| contact_type | string | ✅ | Tipo de contacto (ej: "Press Contact") |
| name | string | ✅ | Nombre del contacto |
| position | string | ✅ | Cargo/posición |
| email | string | ✅ | Email de contacto |
| phone | string | ✅ | Teléfono de contacto |
| website | string | ❌ | Sitio web |
| address | string | ❌ | Dirección física |
| image | file | ✅ | Imagen lateral |
| social_links | array | ❌ | Redes sociales |
| social_links.name | string | ✅ | Nombre de la red social |
| social_links.icon | file | ✅ | Icono de la red social |
| social_links.href | string | ✅ | URL del perfil |

---

### UsefulLinks

**Descripción:** Grid de enlaces útiles con iconos.

**Colección:** `useful_links`

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

**Campos:**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| title | string | ✅ | Título de la sección (default: "Useful Links") |
| links | array | ✅ | Lista de enlaces |
| links.label | string | ✅ | Texto del enlace |
| links.href | string | ✅ | URL del enlace |
| links.icon | file | ✅ | Icono del enlace (SVG preferido) |

---

### DrivenByProgress

**Descripción:** Sección de estadísticas con imagen destacada y métricas de la empresa.

**Colección:** `driven_by_progress`

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

**Campos:**
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| title | string | ✅ | Título principal (ej: "Driven by Progress") |
| description | string | ✅ | Descripción/subtítulo |
| image | file | ✅ | Imagen destacada principal |
| stats | array | ✅ | Lista de estadísticas (4 items recomendados) |
| stats.icon | file | ✅ | Icono de la estadística (SVG con gradiente dorado) |
| stats.value | string | ✅ | Valor numérico o porcentaje |
| stats.label | string | ✅ | Etiqueta descriptiva |

---

## 📊 Resumen de Colecciones

| Colección | Tipo | Descripción |
|-----------|------|-------------|
| `primary_hero` | single | Hero principal (homepage) |
| `group_hero` | collection | Heroes secundarios (por página) |
| `mission_statement` | single | Declaración de misión |
| `featured_video` | single | Video destacado |
| `group_snapshots` | collection | Slides del GroupSnapshot |
| `company_logos` | collection | Logos de empresas |
| `partners` | collection | Partners/aliados |
| `featured_experiences` | single | Grid de experiencias |
| `news_articles` | collection | Artículos de noticias |
| `diversified_section` | single | Sección Diversified |
| `join_our_team` | single | CTA de carreras |
| `who_we_are` | single | Sección "Quiénes Somos" |
| `our_journey` | single | Acordeón de historia |
| `highlights` | collection | Items de highlights |
| `multimedia_photos` | collection | Fotos de galería |
| `multimedia_videos` | collection | Videos de galería |
| `contact_cards` | collection | Tarjetas de contacto |
| `useful_links` | single | Enlaces útiles |
| `driven_by_progress` | single | Estadísticas y métricas de la empresa |
| `industries` | collection | Industrias (usa GetHighlights variant="industry") |

---

## 🔗 Relaciones entre Colecciones

```
pages (homepage, about-us, group, etc.)
├── primary_hero OR group_hero
├── mission_statement
├── featured_video
├── group_snapshots
│   └── company_logos
├── partners
├── featured_experiences
├── news_articles
├── diversified_section
├── join_our_team
├── who_we_are
├── our_journey
├── highlights
├── multimedia_photos
├── multimedia_videos
├── contact_cards
├── useful_links
├── driven_by_progress
└── industries
```

---

## 📝 Notas de Implementación

1. **Archivos de imagen:** Soportar JPG, PNG, WebP, SVG
2. **Archivos de video:** Soportar MP4 (H.264)
3. **Textos multilínea:** Campos que soportan `\n` para saltos de línea
4. **Rich text:** Considerar soporte de Markdown para descripciones largas
5. **Colores:** Los valores de color son: `navy`, `gold`, `turquoise`, `sand`, `white`
6. **Responsive:** Las imágenes deben tener variantes para diferentes tamaños de pantalla
