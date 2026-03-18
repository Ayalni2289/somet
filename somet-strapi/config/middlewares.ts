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
          'https://www.sometzihinsel.org',
          'https://somet-shpt.vercel.app',
          'http://localhost:3000',
          'http://72.62.88.106:1337', // VPS IP adresini de güvenli listeye ekle
          // Diğer güvenilir kaynakları da buraya ekleyebilirsiniz
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