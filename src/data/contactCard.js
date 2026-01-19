/**
 * ContactCard - Test Data
 */
export const contactCardData = {
  title: 'Contact Card',
  contactType: 'Press Contact',
  name: 'María Fernanda López',
  position: 'Director of Corporate Communications',
  email: 'press@mayanprincess.hn',
  phone: '+504 2200-5500 ext. 340',
  website: 'www.mayanprincess.hn',
  address: '1234 Aviation Way, Tegucigalpa, Honduras',
  image: '/imagenes/contact-person.jpg',
  socialLinks: [
    { name: 'Instagram', icon: '/iconos/social/instagram.svg', href: 'https://instagram.com/mayanprincess' },
    { name: 'X', icon: '/iconos/social/x.svg', href: 'https://twitter.com/mayanprincess' },
    { name: 'WhatsApp', icon: '/iconos/social/whatsapp.svg', href: 'https://wa.me/50422005500' },
    { name: 'Facebook', icon: '/iconos/social/facebook.svg', href: 'https://facebook.com/mayanprincess' },
    { name: 'YouTube', icon: '/iconos/social/youtube.svg', href: 'https://youtube.com/mayanprincess' },
    { name: 'LinkedIn', icon: '/iconos/social/linkedin.svg', href: 'https://linkedin.com/company/mayanprincess' },
  ],
};

// Variantes de contacto para diferentes propósitos
export const contactCardVariants = {
  press: contactCardData,
  sales: {
    title: 'Contact Card',
    contactType: 'Sales Contact',
    name: 'Carlos Mendoza',
    position: 'Director of Sales',
    email: 'sales@mayanprincess.hn',
    phone: '+504 2200-5500 ext. 350',
    website: 'www.mayanprincess.hn',
    address: 'West Bay, Roatán, Honduras',
    image: '/imagenes/contact-sales.jpg',
    socialLinks: contactCardData.socialLinks,
  },
  support: {
    title: 'Contact Card',
    contactType: 'Customer Support',
    name: 'Ana García',
    position: 'Customer Service Manager',
    email: 'support@mayanprincess.hn',
    phone: '+504 2200-5500 ext. 100',
    website: 'www.mayanprincess.hn',
    address: 'West Bay, Roatán, Honduras',
    image: '/imagenes/contact-support.jpg',
    socialLinks: contactCardData.socialLinks,
  },
};
