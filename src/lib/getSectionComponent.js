/**
 * Maps ACF page_components (acf_fc_layout) to React section components.
 * Accepts image/logo/src/icon as URL string or ACF object with .url.
 */

import React from 'react';
import PrimaryHero from '@/components/sections/PrimaryHero';
import SecondaryHero from '@/components/sections/SecondaryHero';
import WhoWeAre from '@/components/sections/WhoWeAre';
import MissionStatement from '@/components/sections/MissionStatement';
import VideoPlayer from '@/components/sections/VideoPlayer';
import GroupSnapshot from '@/components/sections/GroupSnapshot';
import GetHighlights from '@/components/sections/GetHighlights';
import OurJourney from '@/components/sections/OurJourney';
import UsefulLinks from '@/components/sections/UsefulLinks';
import Multimedia from '@/components/sections/Multimedia';
import ContactCard from '@/components/sections/ContactCard';
import JoinOurTeam from '@/components/sections/JoinOurTeam';
import OurPartners from '@/components/sections/OurPartners';
import Diversified from '@/components/sections/Diversified';
import FeaturedExperiences from '@/components/sections/FeaturedExperiences';
import DrivenByProgress from '@/components/sections/DrivenByProgress';
import TheExperiences from '@/components/sections/TheExperiences';
import ExperiencesGallery from '@/components/sections/ExperiencesGallery';
import SustainabilityInAction from '@/components/sections/SustainabilityInAction';
import { companyLogosData, ourPartnersData } from '@/data';

const LAYOUT_TO_COMPONENT = {
  'primary-hero': PrimaryHero,
  'secondary-hero': SecondaryHero,
  'mission-statement': MissionStatement,
  'video-player': VideoPlayer,
  'group-snapshot': GroupSnapshot,
  'our-partners': OurPartners,
  diversified: Diversified,
  'featured-experiences': FeaturedExperiences,
  'who-we-are': WhoWeAre,
  highlights: GetHighlights,
  'our-industries': GetHighlights,
  'our-journey': OurJourney,
  'driven-by-progress': DrivenByProgress,
  'the-experiences': TheExperiences,
  'experiences-gallery': ExperiencesGallery,
  'sustainability-in-action': SustainabilityInAction,
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
    case 'primary-hero': {
      const videoSrc = getUrl(section.video_src);
      const primaryButton = section.primary_button
        ? { label: section.primary_button.label ?? '', href: section.primary_button.href ?? '#' }
        : undefined;
      const secondaryButton = section.secondary_button
        ? { label: section.secondary_button.label ?? '', href: section.secondary_button.href ?? '#' }
        : undefined;
      return {
        Component,
        props: {
          content: {
            heading: section.heading ?? '',
            videoSrc: videoSrc ?? '',
            primaryButton,
            secondaryButton,
          },
        },
      };
    }

    case 'mission-statement':
      return {
        Component,
        props: {
          text: section.text ?? undefined,
          vectorType: section.vectorType ?? section.vector_type ?? 'vector1',
        },
      };

    case 'video-player':
      return {
        Component,
        props: {
          videoSrc: getUrl(section.video_src) ?? undefined,
          posterImage: getUrl(section.poster_image) ?? undefined,
        },
      };

    case 'group-snapshot': {
      const rawSlides = section.slides ?? [];
      const slides = rawSlides.map((s, i) => ({
        id: s.id ?? i,
        mainImage: getUrl(s.main_image),
        circleImage: getUrl(s.circle_image),
        badge: s.badge ?? '',
        title: s.title ?? '',
        description: typeof s.description === 'string' ? s.description : '',
      }));
      const companyLogos = Array.isArray(section.company_logos) && section.company_logos.length > 0
        ? section.company_logos.map((c) => {
            const logoObj = c.logo && typeof c.logo === 'object' ? c.logo : c;
            const url = getUrl(logoObj) ?? '';
            return { name: c.name ?? logoObj?.title ?? '', logo: url, width: 160, height: 100 };
          }).filter((c) => c.logo)
        : companyLogosData;
      return {
        Component,
        props: {
          slides,
          companyLogos,
        },
      };
    }

    case 'our-partners': {
      const staticPartners = ourPartnersData.partners ?? [];
      const apiLogos = Array.isArray(section.partners) ? section.partners : [];
      let partners = staticPartners;
      if (apiLogos.length > 0) {
        const merged = apiLogos.map((item, i) => {
          const logoUrl = getUrl(item.logo ?? item) ?? '';
          const fallback = staticPartners[i] ?? staticPartners[0] ?? { name: '', logo: '', width: 158, height: 41 };
          return {
            name: fallback.name,
            logo: logoUrl || fallback.logo,
            width: fallback.width ?? 158,
            height: fallback.height ?? 41,
          };
        }).filter((p) => p.logo);
        if (merged.length > 0) partners = merged;
      }
      return {
        Component,
        props: {
          badge: ourPartnersData.badge,
          title: ourPartnersData.title,
          partners,
        },
      };
    }

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

    case 'our-industries':
      return {
        Component,
        props: {
          title: section.title ?? undefined,
          variant: 'industry',
          items: (section.items ?? []).map((item, i) => ({
            id: item.id ?? i,
            image: getUrl(item.image),
            title: item.title ?? '',
            description: item.description ?? '',
            href: item.href ?? undefined,
          })),
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

    case 'diversified':
      return {
        Component,
        props: {
          title: section.title ?? undefined,
          image: getUrl(section.image) ?? undefined,
        },
      };

    case 'featured-experiences':
      return { Component, props: {} };

    case 'driven-by-progress': {
      const rawStats = section.stats ?? [];
      const stats = rawStats.map((stat) => ({
        icon: getUrl(stat.icon),
        value: stat.value ?? '',
        label: stat.label ?? '',
      })).filter((s) => s.icon);
      return {
        Component,
        props: {
          title: section.title ?? undefined,
          description: section.description ?? undefined,
          image: getUrl(section.image) ?? undefined,
          stats: stats.length > 0 ? stats : undefined,
        },
      };
    }

    case 'the-experiences':
      return {
        Component,
        props: {
          title: section.title ?? undefined,
          items: (section.items ?? []).map((item, i) => ({
            id: item.id ?? i,
            layout: item.layout ?? 'single',
            mainImage: getUrl(item.main_image ?? item.mainImage) ?? '',
            secondaryImage: item.secondary_image
              ? getUrl(item.secondary_image)
              : item.secondaryImage
                ? getUrl(item.secondaryImage)
                : undefined,
            title: item.title ?? '',
            description: item.description ?? '',
            buttonText: item.button_text ?? item.buttonText ?? '',
            buttonHref: item.button_href ?? item.buttonHref ?? '',
          })),
        },
      };

    case 'experiences-gallery':
      return {
        Component,
        props: {
          slides: (section.slides ?? []).map((slide, i) => ({
            id: slide.id ?? i,
            backgroundImage: getUrl(slide.background_image ?? slide.backgroundImage) ?? '',
            leftText: slide.left_text ?? slide.leftText ?? '',
            rightText: slide.right_text ?? slide.rightText ?? '',
          })).filter((s) => s.backgroundImage),
        },
      };

    case 'sustainability-in-action':
      return {
        Component,
        props: {
          title: section.title ?? undefined,
          backgroundImage: getUrl(section.background_image ?? section.backgroundImage) ?? undefined,
          cards: (section.cards ?? []).map((card, i) => ({
            id: card.id ?? i,
            title: card.title ?? '',
            image: getUrl(card.image) ?? '',
            href: card.href ?? '#',
          })).filter((c) => c.image),
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
