/**
 * SecondaryHero - Test Data
 * 
 * Nota: Este componente obtiene datos por ID desde PocketBase.
 * Estos son datos de ejemplo para diferentes páginas.
 */
export const secondaryHeroData = {
  // Hero para página About Us
  aboutUs: {
    id: 'about-us-hero',
    heroImage: '/imagenes/about-hero.jpg',
    heading: 'Building a Legacy in Central America',
    linkLabel: 'Learn More',
    linkUrl: '/about-us/story',
    useVectorDesign: false,
  },
  // Hero para página Group
  group: {
    id: 'group-hero',
    heroImage: '/imagenes/group-hero.jpg',
    heading: 'Our Companies',
    linkLabel: 'Explore All',
    linkUrl: '/group/companies',
    useVectorDesign: false,
  },
  // Hero con diseño vectorial
  vectorDesign: {
    id: 'vector-hero',
    heroImage: null,
    heading: 'Innovation Meets Tradition',
    linkLabel: 'Discover More',
    linkUrl: '/innovation',
    useVectorDesign: true,
  },
};
