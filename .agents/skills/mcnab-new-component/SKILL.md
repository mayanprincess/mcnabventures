---
name: mcnab-new-component
description: >
  Guía completa para crear un nuevo componente de sección en McNab Ventures,
  desde el ACF en WordPress hasta producción en Vercel. Usar cuando el usuario
  pida "crear un nuevo componente", "agregar una nueva sección", "nuevo bloque ACF"
  o cualquier variante de añadir contenido manejado por WordPress.
metadata:
  author: mcnab-ventures
  version: "1.0.0"
  argument-hint: <NombreComponente> <acf-layout-kebab-case>
---

# McNab Ventures — Skill: Crear Componente Nuevo (End-to-End)

Este skill cubre los **5 pasos** para añadir una sección nueva, desde el CMS hasta
que el cambio llega a producción vía Vercel ISR.

---

## Contexto del proyecto

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 16 App Router, React 19 |
| CMS | WordPress REST API + ACF PRO (Railway) |
| Imágenes | Cloudinary → custom `imageLoader.js` |
| Estilos | Tailwind CSS 4 |
| Paquetes | pnpm |
| ISR | `revalidate: 60` segundos |

**Flujo de datos:**

```
WordPress ACF Flexible Content
  └── GET /wp-json/wp/v2/pages?acf_format=standard&slug={slug}
        └── page.acf.page_components[]
              └── { acf_fc_layout: 'my-section', ...fields }
                    └── getSectionComponent() → <MySection ...props />
```

---

## PASO 1 — WordPress: crear el layout ACF

> Hacer esto ANTES de escribir código React para poder copiar los nombres exactos
> de campos.

1. Ir al WP Dashboard → **Custom Fields → Field Groups → page_components**.
2. En el campo `page_components` (tipo Flexible Content) → **Add Layout**.
3. Nombrar el layout en **kebab-case** (e.g. `my-new-section`).  
   ⚠️ Este nombre es la clave en `acf_fc_layout`; no se puede cambiar después sin
   actualizar `getSectionComponent.js`.
4. Añadir los sub-campos necesarios. Convenciones de nombres:

   | Tipo de campo | Nombre ACF (snake_case) | Prop React (camelCase) |
   |---------------|------------------------|------------------------|
   | Texto | `title` | `title` |
   | Textarea / Rich text | `description` | `description` |
   | Imagen | `image` | `image` |
   | Imagen (array) | `items[].image` | `items[].image` |
   | URL | `button_href` | `buttonHref` |
   | Booleano | `is_active` | `isActive` |
   | Repeater | `items` | `items` |

5. Asignar el Field Group a la **página correcta** (o a todas las páginas).
6. Guardar y publicar. Verificar con curl:

```bash
curl "https://mcnabventures.up.railway.app/wp-json/wp/v2/pages?acf_format=standard&slug=<page-slug>&_embed" | jq '.[] | .acf.page_components[] | select(.acf_fc_layout == "my-new-section")'
```

---

## PASO 2 — Fallback data (`src/data/myNewSection.js`)

Cada componente necesita datos estáticos de respaldo. Se usan cuando:
- WordPress no tiene contenido para esa sección todavía.
- El API falla durante el build.
- La página nunca queda en blanco.

**Crear** `src/data/myNewSection.js`:

```js
/**
 * MyNewSection — Static fallback data
 * Mirrors the shape expected by the MyNewSection component props.
 */
export const myNewSectionData = {
  title: 'Default Title',
  description: 'Default description text.',
  // items example:
  items: [
    {
      id: 1,
      image: '/fallback/placeholder.jpg',
      title: 'Item One',
      href: '#',
    },
  ],
};
```

**Regla:** La forma del objeto debe ser 1:1 con los props del componente.

**Registrar en el barrel** `src/data/index.js`:

```js
export { myNewSectionData } from './myNewSection';
```

---

## PASO 3 — Componente React (`src/components/sections/MyNewSection.js`)

### Template base

```jsx
'use client'; // ← SOLO si el componente necesita estado, eventos o hooks del browser

import Image from 'next/image';
import Link from 'next/link';
import { myNewSectionData } from '@/data';
import { useScrollAnimation, animations, getDelay } from '@/hooks/useScrollAnimation';

/**
 * MyNewSection
 * acf_fc_layout: my-new-section
 *
 * Props:
 *   title       {string}   - Título principal
 *   description {string}   - Descripción
 *   image       {string}   - URL de imagen (Cloudinary o WP)
 *   items       {Array}    - Lista de items (ver shape en data/myNewSection.js)
 */
export default function MyNewSection({
  title       = myNewSectionData.title,
  description = myNewSectionData.description,
  image       = myNewSectionData.image,
  items       = myNewSectionData.items,
}) {
  const { ref: scrollRef, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section
      ref={scrollRef}
      className={`w-full py-16 sm:py-20 lg:py-[100px] bg-white ${animations.fadeUp(isVisible)}`}
    >
      <div className="w-[90%] max-w-[1200px] mx-auto">

        {/* --- Header --- */}
        <div className="mb-10 text-center">
          <h2 className="font-literata-light text-navy text-[36px] lg:text-[48px] leading-tight tracking-[-1px]">
            {title}
          </h2>
          {description ? (
            <p className="font-work-sans-medium text-navy/80 text-[18px] mt-4 max-w-2xl mx-auto">
              {description}
            </p>
          ) : null}
        </div>

        {/* --- Items grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={item.id ?? i}
              className={`
                flex flex-col rounded-2xl overflow-hidden bg-sand
                transition-all duration-700 ease-out
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
              style={getDelay(i, 100)}
            >
              {item.image ? (
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.title ?? ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  />
                </div>
              ) : null}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-literata-medium text-navy text-[20px] mb-2">
                  {item.title}
                </h3>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="mt-auto inline-flex items-center gap-2 text-turquoise font-work-sans-medium text-[15px] hover:underline"
                  >
                    Ver más →
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
```

### Reglas de componente

| Regla | Detalle |
|-------|---------|
| `'use client'` | Solo si usa `useState`, `useEffect`, event handlers, o `useScrollAnimation` |
| Server Component | Si solo renderiza HTML estático con props, omitir `'use client'` |
| Imagen siempre con `next/image` | Usar `fill` para imágenes de tamaño desconocido, `width/height` para dimensiones fijas |
| Fallback en cada prop | `prop = fallbackData.prop` en la firma de la función |
| Animaciones | `useScrollAnimation` + `animations.*` + `getDelay` para stagger |
| Fuentes | Ver tabla abajo |
| Colores | Solo clases de brand, ver tabla abajo |

### Fuentes disponibles

| Clase Tailwind | Uso |
|----------------|-----|
| `font-literata-light` | Headings H1/H2 principales |
| `font-literata-medium` | H3, subheadings |
| `font-work-sans-medium` | Body text, labels, párrafos |
| `font-work-sans-extrabold` | Badges, énfasis, CTAs |
| `font-fustat-medium` | Textos de impacto (alias de Work Sans) |
| `font-fustat-extrabold` | Botones principales |

### Colores de brand

| Token | Hex | Uso típico |
|-------|-----|------------|
| `navy` `#005B7F` | Texto principal, fondos primarios |
| `turquoise` `#00BFB3` | Acentos, highlights, links |
| `gold` `#CB9763` | CTAs primarios, botones |
| `sand` `#D6D2C4` | Fondos secundarios, cards |
| `white` `#ffffff` | Texto sobre fondos oscuros |
| `bg-gold-gradient` | — | Botones premium |

### Notas de imagen

```jsx
// Imagen de tamaño desconocido (fill parent)
<div className="relative aspect-video">
  <Image src={src} alt="..." fill className="object-cover" sizes="90vw" />
</div>

// Imagen con dimensiones fijas
<Image src={src} alt="..." width={400} height={300} className="object-cover rounded-xl" />

// Cloudinary → el imageLoader aplica f_auto,q_auto automáticamente
// WP / otras URLs → Next.js /_next/image en quality 85
```

---

## PASO 4 — Registrar en `getSectionComponent.js`

Editar `src/lib/getSectionComponent.js`:

### 4a. Importar el componente (al tope del archivo)

```js
import MyNewSection from '@/components/sections/MyNewSection';
```

### 4b. Agregar al mapa `LAYOUT_TO_COMPONENT`

```js
const LAYOUT_TO_COMPONENT = {
  // ...existing entries...
  'my-new-section': MyNewSection,
};
```

### 4c. Agregar el `case` en el `switch`

```js
case 'my-new-section':
  return {
    Component,
    props: {
      title:       section.title       ?? undefined,
      description: section.description ?? undefined,
      image:       getUrl(section.image) ?? undefined,
      items: (section.items ?? []).map((item, i) => ({
        id:    item.id    ?? i,
        image: getUrl(item.image) ?? undefined,
        title: item.title ?? '',
        href:  item.href  ?? undefined,
      })),
    },
  };
```

### Helpers disponibles en getSectionComponent.js

| Helper | Firma | Qué hace |
|--------|-------|----------|
| `getUrl(v)` | `(string \| ACFImageObj) → string \| undefined` | Normaliza imagen ACF (string o `{url,width,height,alt}`) |
| `stripHtml(html)` | `string → string` | Elimina etiquetas HTML |
| `parseHighlightContent(html)` | `string → {title, description}` | Parsea `<strong>Title.</strong> Desc` |

### Patrón para imágenes de ACF

```js
// ACF puede devolver:
//   Format 1: "https://res.cloudinary.com/..."        (string)
//   Format 2: { url: "https://...", width: 800, ... } (objeto)
// getUrl() maneja ambos:
image: getUrl(section.image) ?? undefined,
```

---

## PASO 5 — Verificar y hacer deploy

### 5a. Desarrollo local

```bash
pnpm dev
# Abrir http://localhost:3000/<page-slug>
```

Si necesitas ver cambios de WP en tiempo real sin cache:

```js
// src/lib/wp.js — temporalmente durante desarrollo
const res = await fetch(url, { next: { revalidate: 0 }, ...options });
```

### 5b. Verificar API de WordPress

```bash
# Verificar que el layout aparece en el JSON
curl "https://mcnabventures.up.railway.app/wp-json/wp/v2/pages?acf_format=standard&slug=<page-slug>&_embed" \
  | jq '.[] | .acf.page_components[] | select(.acf_fc_layout == "my-new-section")'
```

### 5c. Build de producción local

```bash
pnpm build
# Si hay error de build de sección nueva:
rm -rf .next && pnpm build
```

### 5d. Deploy a Vercel

```bash
git add .
git commit -m "feat: add MyNewSection component (my-new-section ACF layout)"
git push
```

Vercel hace el deploy automáticamente desde `master`/`main`.

### 5e. Confirmar en producción

- Visitar la URL en producción.
- Primera visita post-deploy: SSR → se cachea.
- Siguientes 60 segundos: se sirve desde caché.
- Tras 60 segundos: ISR revalida en background al próximo request.

---

## Checklist completo

```
WORDPRESS
[ ] Layout ACF creado con nombre kebab-case
[ ] Sub-campos creados con nombre snake_case
[ ] Field group asignado a la página correcta
[ ] Contenido de prueba añadido en WP
[ ] Verificado via curl que acf_fc_layout aparece en JSON

CÓDIGO
[ ] src/data/myNewSection.js  — fallback data creado
[ ] src/data/index.js         — export añadido al barrel
[ ] src/components/sections/MyNewSection.js — componente creado
[ ] getSectionComponent.js    — import añadido
[ ] getSectionComponent.js    — LAYOUT_TO_COMPONENT entry añadida
[ ] getSectionComponent.js    — case en switch con prop mapping añadido

VERIFICACIÓN
[ ] pnpm dev — componente renderiza con datos de WP
[ ] pnpm dev — componente renderiza con fallback data (sin WP)
[ ] pnpm build — sin errores de build
[ ] git push  — Vercel deploy exitoso
[ ] URL producción — sección visible y correcta
```

---

## Ejemplo completo mínimo (referencia rápida)

### `src/data/announcementBanner.js`
```js
export const announcementBannerData = {
  message: 'Stay tuned for our latest news.',
  ctaLabel: 'Learn More',
  ctaHref: '/news',
};
```

### `src/components/sections/AnnouncementBanner.js`
```jsx
import Link from 'next/link';
import { announcementBannerData } from '@/data';

export default function AnnouncementBanner({
  message  = announcementBannerData.message,
  ctaLabel = announcementBannerData.ctaLabel,
  ctaHref  = announcementBannerData.ctaHref,
}) {
  return (
    <section className="w-full bg-navy py-6">
      <div className="w-[90%] max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-work-sans-medium text-white text-[18px]">{message}</p>
        <Link
          href={ctaHref}
          className="bg-gold text-white px-6 py-3 rounded-full font-fustat-extrabold text-[15px] hover:bg-gold/90 transition-colors"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
```

### `getSectionComponent.js` — diff mínimo
```js
// Import
import AnnouncementBanner from '@/components/sections/AnnouncementBanner';

// LAYOUT_TO_COMPONENT
'announcement-banner': AnnouncementBanner,

// switch case
case 'announcement-banner':
  return {
    Component,
    props: {
      message:  section.message  ?? undefined,
      ctaLabel: section.cta_label ?? undefined,
      ctaHref:  section.cta_href  ?? undefined,
    },
  };
```

---

## Errores frecuentes y soluciones

| Síntoma | Causa | Solución |
|---------|-------|----------|
| Sección no aparece en la página | `acf_fc_layout` no coincide con la key en `LAYOUT_TO_COMPONENT` | Verificar que son idénticos (case-sensitive, kebab-case exacto) |
| Props son `undefined` | Campo ACF en WP usa snake_case pero el `case` espera otro nombre | Usar curl para ver el JSON real y ajustar el mapping |
| Imagen no carga | URL de WP en lugar de Cloudinary | `getUrl()` siempre normaliza; asegurar que `src` no sea vacío |
| Build falla con `Cannot find module` | Import del componente nuevo no agregado | Agregar `import` al tope de `getSectionComponent.js` |
| Fallback no se muestra | Export no añadido a `src/data/index.js` | Agregar la línea de export al barrel |
| Componente usa hook pero no tiene `'use client'` | Hook de React en Server Component | Añadir `'use client'` como primera línea del componente |
| `acf: false` en JSON de WP | ACF REST API no habilitada | Activar en WP Dashboard → Custom Fields → Settings → REST API |
