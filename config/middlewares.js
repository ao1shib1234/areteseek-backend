module.exports = [
  'strapi::logger',
  'strapi::errors',
  { name: 'strapi::security', config: { contentSecurityPolicy: { useDefaults: true } } },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: ['http://localhost:3000', 'http://localhost:3001']
    }
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
