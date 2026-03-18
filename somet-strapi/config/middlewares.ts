export default [
  // ... diğer middlewareler
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:', 'https://api.sometzihinsel.org'], // Yeni API adresin
          'img-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com', 'https://api.sometzihinsel.org'],
          'media-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com', 'https://api.sometzihinsel.org'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: [
        'https://www.sometzihinsel.org',
        'https://sometzihinsel.org',
        'https://somet-shpt.vercel.app',
        'http://localhost:3000',
        'https://api.sometzihinsel.org' // Backend'in kendi domaini
      ],
    },
  },
  // ... diğer middlewareler
];