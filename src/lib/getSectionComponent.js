/**
 * Maps ACF page_components (acf_fc_layout) to React section components.
 * Accepts image/logo/src/icon as URL string or ACF object with .url.
 */

import React from 'react';
import SecondaryHero from '@/components/sections/SecondaryHero';
import WhoWeAre from '@/components/sections/WhoWeAre';
import GetHighlights from '@/components/sections/GetHighlights';
import OurJourney from '@/components/sections/OurJourney';
import UsefulLinks from '@/components/sections/UsefulLinks';
import Multimedia from '@/components/sections/Multimedia';
import ContactCard from '@/components/sections/ContactCard';
import JoinOurTeam from '@/components/sections/JoinOurTeam';

const LAYOUT_TO_COMPONENT = {
  'secondary-hero': SecondaryHero,
  'who-we-are': WhoWeAre,
  highlights: GetHighlights,
  'our-journey': OurJourney,
  'useful-links': UsefulLinks,
  multimedia: Multimedia,
  'contact-card': ContactCard,
  'join-our-team': JoinOurTeam,
};

/**
 * Strip HTML tags and trim
 */
function stripHtml(html) {
  if (!html || typeof html !== 'string') return '';
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Parse ACF highlight item content (e.g. "<strong>Title.</strong> Description")
 * into { title, description }.
 */
function parseHighlightContent(content) {
  if (!content || typeof content !== 'string') return { title: '', description: '' };
  const strongMatch = content.match(/<strong>([^<]*)<\/strong>\s*/i);
  const title = strongMatch ? strongMatch[1].replace(/\.\s*$/, '').trim() : '';
  const description = content
    .replace(/<strong>[^<]*<\/strong>\s*/i, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return { title, description };
}

/**
 * Get image URL from ACF value: string URL or object with .url.
 */
function getUrl(v) {
  if (v == null) return undefined;
  if (typeof v === 'string') return v;
  if (typeof v === 'object' && v !== null && typeof v.url === 'string') return v.url;
  return undefined;
}

/**
 * Transform ACF section object into props for our section components.
 * @param {object} section - One item from acf.page_components (has acf_fc_layout)
 * @returns {{ Component: React.ComponentType, props: object } | null}
 */
export function getSectionConfig(section) {
  if (!section || !section.acf_fc_layout) return null;
  const layout = section.acf_fc_layout;
  const Component = LAYOUT_TO_COMPONENT[layout];
  if (!Component) return null;

  switch (layout) {
    case 'secondary-hero':
      return {
        Component,
        props: {
          image: getUrl(section.image),
          heading: section.heading ?? undefined,
          linkLabel: section.linkLabel ?? undefined,
          linkUrl: section.linkUrl ?? undefined,
          useVectorDesign: section.useVectorDesign ?? false,
        },
      };

    case 'who-we-are':
      return {
        Component,
        props: {
          badge: section.badge ?? undefined,
          titlePart1: section.title_part_1 ?? undefined,
          description: section.description ?? undefined,
          logo: getUrl(section.logo),
        },
      };

    case 'highlights':
      return {
        Component,
        props: {
          title: section.title ?? undefined,
          items: (section.items ?? []).map((item, i) => {
            const { title: t, description: d } = parseHighlightContent(item.content);
            return {
              id: item.id ?? i,
              image: getUrl(item.image),
              title: t,
              description: d,
            };
          }),
        },
      };

    case 'our-journey':
      return {
        Component,
        props: {
          title: section.title ?? undefined,
          defaultOpen: section.default_open ?? undefined,
          items: (section.items ?? []).map((item) => ({
            id: String(item.id ?? item.title ?? ''),
            title: item.title ?? '',
            content: typeof item.content === 'string' ? item.content : '',
          })),
        },
      };

    case 'useful-links':
      return {
        Component,
        props: {
          links: (section.links ?? []).map((link) => ({
            label: link.label ?? '',
            href: link.href ?? '#',
            icon: getUrl(link.icon),
          })),
        },
      };

    case 'multimedia': {
      const rawPhotos = (section.photos ?? [])
        .map((p, i) => ({
          id: (p.id != null && p.id !== '') ? p.id : (p.src?.id ?? p.src?.ID ?? i),
          src: getUrl(p.src),
          alt: (p.alt ?? p.src?.alt ?? '') || '',
          size: p.size ?? 'medium',
        }))
        .filter((p) => p.src && String(p.src).trim() !== '');
      // When API sends all "medium", assign sizes by index so the masonry grid shows all images
      const hasVariety = rawPhotos.some((p) => p.size !== 'medium');
      const sizeByIndex = ['large', 'small', 'small', 'medium', 'tall', 'small', 'small', 'medium', 'tall', 'small'];
      const photos = hasVariety
        ? rawPhotos
        : rawPhotos.map((p, i) => ({ ...p, size: sizeByIndex[i] || 'small' }));
      return {
        Component,
        props: {
          photos,
          videos: Array.isArray(section.videos) ? section.videos : [],
        },
      };
    }

    case 'contact-card':
      return {
        Component,
        props: {
          title: section.title ?? undefined,
          contactType: section.contact_type ?? undefined,
          name: section.name ?? undefined,
          position: section.position ?? undefined,
          email: section.email ?? undefined,
          phone: section.phone ?? undefined,
          website: section.website ?? undefined,
          address: section.address ?? undefined,
          image: getUrl(section.image),
          socials: (section.social_links ?? []).map((link) => ({
            name: link.name ?? '',
            href: link.href ?? '#',
            icon: getUrl(link.icon),
          })),
        },
      };

    case 'join-our-team':
      return {
        Component,
        props: {
          title: section.title ?? undefined,
          description: section.description ?? undefined,
          buttonText: section.button_text ?? undefined,
          buttonHref: section.button_href ?? undefined,
          image: getUrl(section.image),
        },
      };

    default:
      return null;
  }
}

/**
 * Return a React element for the given ACF section (for use in page render).
 * Image fields can be URL strings or ACF objects with .url.
 * @param {object} section - One item from acf.page_components
 * @param {number} index - Index for key
 * @param {string} [pageSlug] - Optional page slug so key is unique per page (fixes client nav reuse)
 * @returns {React.ReactElement | null}
 */
export function getSectionComponent(section, index, pageSlug) {
  const config = getSectionConfig(section);
  if (!config) return null;
  const { Component, props } = config;
  const key = pageSlug ? `${pageSlug}-${index}` : index;
  return React.createElement(Component, { key, ...props });
}
