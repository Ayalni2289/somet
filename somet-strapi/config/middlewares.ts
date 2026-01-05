export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true, // Bunu ekledik
      headers: '*',  // Tüm başlıklara izin ver (Authorization vs. için önemli)
      origin: [
        'https://somet-shpt.vercel.app', // DÜZELTİLDİ: Sondaki '/' kaldırıldı
        'http://localhost:3000',
        'https://somet-production.up.railway.app' // Kendi domainini de eklemek iyidir
      ],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];