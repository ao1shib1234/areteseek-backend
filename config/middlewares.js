const DEFAULT_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://areteseek-frontend.vercel.app',
  'https://yuy-precision.com',
  'https://www.yuy-precision.com',
];

const extraOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const allowedOrigins = [...new Set([...DEFAULT_ORIGINS, ...extraOrigins])];

module.exports = [
  'strapi::logger',
  'strapi::errors',
  { name: 'strapi::security', config: { contentSecurityPolicy: { useDefaults: true } } },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: (ctx) => {
        const requestOrigin = ctx.request.header.origin;
        if (requestOrigin && /^https:\/\/areteseek-frontend-[a-z0-9-]+\.vercel\.app$/.test(requestOrigin)) {
          return [...allowedOrigins, requestOrigin];
        }
        return allowedOrigins;
      },
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
