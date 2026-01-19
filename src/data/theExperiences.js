export const theExperiencesData = {
  title: 'The Experiences',
  items: [
    {
      id: 1,
      layout: 'single', // full width panoramic image
      mainImage: '/imagenes/featured1.jpg',
      title: 'Beachfront Gateways',
      description: 'Escape to our collection of beachfront retreats designed for comfort, culture, and connection.',
      buttonText: 'Explore Hospitality',
      buttonHref: '/experiences/hospitality',
    },
    {
      id: 2,
      layout: 'two-images', // small portrait left, large landscape right with content below
      mainImage: '/imagenes/featured2.jpg', // diver image (small portrait)
      secondaryImage: '/imagenes/featured5.jpg', // beach with kayaks (large landscape)
      title: 'From Land to Sea',
      description: 'Experience Roatán\'s vibrant reefs, nature trails, and local treasures — guided by our expert tour partners.',
      buttonText: 'View Adventures',
      buttonHref: '/experiences/adventures',
    },
    {
      id: 3,
      layout: 'two-images', // uses isReversed automatically (index 2 = reversed)
      mainImage: '/imagenes/featured1.jpg', // surfboards ROATAN sign (small portrait)
      secondaryImage: '/imagenes/experiencesgallery.jpg', // airport/pier image (large landscape)
      title: 'Discover Roatán',
      description: 'From flights to island transfers, we make it seamless to explore everything Roatán has to offer.',
      buttonText: 'See Travel Options',
      buttonHref: '/experiences/travel',
    },
    {
      id: 4,
      layout: 'two-images',
      mainImage: '/imagenes/featured2.jpg',
      secondaryImage: '/imagenes/featured2.jpg',
      title: 'Fuel for Our Island',
      description: 'Powering homes, businesses, and progress with innovative, sustainable energy.',
      buttonText: 'Learn More',
      buttonHref: '/experiences/energy',
    },
    {
      id: 5,
      layout: 'two-images',
      mainImage: '/imagenes/featured1.jpg',
      secondaryImage: '/imagenes/featured1.jpg',
      title: 'Sustainable Fishing',
      description: 'Our commitment to responsible fishing practices helps sustain marine ecosystems and local livelihoods.',
      buttonText: 'Learn More',
      buttonHref: '/experiences/fishing',
    },
  ],
};
