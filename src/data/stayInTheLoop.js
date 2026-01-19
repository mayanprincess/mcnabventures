/**
 * StayInTheLoop - Test Data
 */
export const stayInTheLoopData = {
  title: 'Stay in the Loop',
  viewAllUrl: '/news',
  items: [
    {
      id: 1,
      category: 'Galaxy Wave',
      title: 'Galaxy Wave Expands Service Between Roatán and Utila',
      date: 'September 24, 2025',
      image: '/imagenes/news-1.jpg',
      href: '/news/galaxy-wave-expands-service',
    },
    {
      id: 2,
      category: 'Galaxy Wave',
      title: 'Updated Departure Times for the Holiday Season',
      date: 'October 15, 2025',
      image: '/imagenes/news-2.jpg',
      href: '/news/updated-departure-times',
    },
    {
      id: 3,
      category: 'CM Airlines',
      title: 'Schedule Adjustments During Weather Conditions',
      date: 'November 10, 2025',
      image: '/imagenes/news-3.jpg',
      href: '/news/schedule-adjustments',
    },
    {
      id: 4,
      category: 'Mayan Princess',
      title: 'Top Things to Do When You Arrive in Roatán',
      date: 'November 10, 2025',
      image: '/imagenes/news-4.jpg',
      href: '/news/top-things-roatan',
    },
    {
      id: 5,
      category: 'CM Airlines',
      title: 'New Routes Coming Soon',
      date: 'December 1, 2025',
      image: '/imagenes/news-5.jpg',
      href: '/news/new-routes',
    },
  ],
};

// Versión alternativa con título "Latest News"
export const latestNewsData = {
  ...stayInTheLoopData,
  title: 'Latest News',
};
