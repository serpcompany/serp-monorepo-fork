export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  extends: [
    '@serp/utils',
    '@serp/stripe',
    '@serp/tools',
    '@serp/types',
    '@serp/ui'
  ],
  modules: [
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    'nuxt-multi-cache',
    'nuxt-security',
    'nuxt-link-checker'
  ],
  ui: {
    colorMode: true
  },
  multiCache: {
    data: {
      enabled: true
    },
    api: {
      enabled: true,
      prefix: '/__nuxt_multi_cache',
      authorization: process.env.CACHE_PURGE_API_KEY || 'xv12378asdfSDA123'
    }
  },
  uiPro: {
    license: process.env.NUXT_UI_PRO_LICENSE
  },
  tsConfig: {
    compilerOptions: {
      baseUrl: '.',
      paths: {
        '@/*': ['src/*']
      },
      types: ['vitest/globals', '']
    }
  },
  runtimeConfig: {
    public: {
      siteName: process.env.NUXT_PUBLIC_SITE_NAME,
      domain: process.env.NUXT_PUBLIC_DOMAIN,
      siteUrl: process.env.NUXT_PUBLIC_URL,
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      useAuth: true,
      environment: process.env.NODE_ENV,
      forCloudflare: false,
      copyrightText: '© SERP'
    }
  },
  app: {
    head: {
      title: process.env.NUXT_PUBLIC_SITE_NAME,
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        ...(process.env.ROBOTS_ENV === 'staging'
          ? [{ name: 'robots', content: 'noindex' }]
          : [])
      ]
    }
  },
  security: {
    strict: true,
    rateLimiter: false,
    headers: {
      contentSecurityPolicy: {
        'style-src': ["'self'", "'unsafe-inline'"],
        'img-src': [
          "'self'",
          'data:',
          'https:',
          'https://static.cloudflareinsights.com',
          'https://www.youtube.com',
          'https://*.youtube.com',
          'https://www.youtube-nocookie.com',
          'https://*.youtube-nocookie.com',
          'https://www.googletagmanager.com',
          'https://*.googletagmanager.com',
          'https://pagead2.googlesyndication.com',
          'https://*.googlesyndication.com',
          'https://googleads.g.doubleclick.net',
          'https://*.doubleclick.net',
          'https://*.googleapis.com',
          'https://*.google-analytics.com',
          'https://serp.ly',
          'https://*.serp.ly',
          'https://serp.ai',
          'https://*.serp.ai',
          'https://serp.co',
          'https://*.serp.co'
        ],
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          'https://static.cloudflareinsights.com',
          'https://www.youtube.com',
          'https://*.youtube.com',
          'https://www.youtube-nocookie.com',
          'https://*.youtube-nocookie.com',
          'https://www.googletagmanager.com',
          'https://*.googletagmanager.com',
          'https://pagead2.googlesyndication.com',
          'https://*.googlesyndication.com',
          'https://googleads.g.doubleclick.net',
          'https://*.doubleclick.net',
          'https://*.googleapis.com',
          'https://*.google-analytics.com',
          'https://serp.ly',
          'https://*.serp.ly',
          'https://serp.ai',
          'https://*.serp.ai',
          'https://serp.co',
          'https://*.serp.co'
        ],
        'script-src-elem': [
          "'self'",
          "'unsafe-inline'",
          'https://static.cloudflareinsights.com',
          'https://www.youtube.com',
          'https://*.youtube.com',
          'https://www.youtube-nocookie.com',
          'https://*.youtube-nocookie.com',
          'https://www.googletagmanager.com',
          'https://*.googletagmanager.com',
          'https://pagead2.googlesyndication.com',
          'https://*.googlesyndication.com',
          'https://googleads.g.doubleclick.net',
          'https://*.doubleclick.net',
          'https://*.googleapis.com',
          'https://*.google-analytics.com',
          'https://serp.ly',
          'https://*.serp.ly',
          'https://serp.ai',
          'https://*.serp.ai',
          'https://serp.co',
          'https://*.serp.co',
          'https://embed.tawk.to',
          'https://*.adtrafficquality.google'
        ],
        'connect-src': ["'self'", 'https:', 'ws:'],
        'frame-src': [
          'https://static.cloudflareinsights.com',
          'https://www.youtube.com',
          'https://*.youtube.com',
          'https://www.youtube-nocookie.com',
          'https://*.youtube-nocookie.com',
          'https://www.googletagmanager.com',
          'https://*.googletagmanager.com',
          'https://pagead2.googlesyndication.com',
          'https://*.googlesyndication.com',
          'https://googleads.g.doubleclick.net',
          'https://*.doubleclick.net',
          'https://*.googleapis.com',
          'https://*.google-analytics.com',
          'https://serp.ly',
          'https://*.serp.ly',
          'https://serp.ai',
          'https://*.serp.ai',
          'https://serp.co',
          'https://*.serp.co'
        ],
        'default-src': ["'self'"]
      },
      permissionsPolicy: {
        'picture-in-picture': [
          'self',
          '"https://www.youtube-nocookie.com"',
          '"https://www.youtube.com"'
        ],
        fullscreen: [
          'self',
          '"https://www.youtube-nocookie.com"',
          '"https://www.youtube.com"'
        ]
      },
      crossOriginEmbedderPolicy: 'unsafe-none'
    },
    ssg: {
      hashStyles: false
    }
  },
  $production: {
    scripts: {
      registry: {
        googleTagManager: {
          id: 'GTM-M4ZSK3X'
        },
        googleAdsense: {
          client: 'ca-pub-2343633734899216', // infisical-scan:ignore
          autoAds: true
        }
      }
    }
  },
  $development: {
    security: {
      headers: {
        contentSecurityPolicy: false
      }
    }
  },
  schemaOrg: {
    identity: 'Organization',
    host: 'https://serp.ai'
  },
  experimental: {
    defaults: {
      nuxthref: {
        trailingSlash: 'append'
      }
    }
  },
  site: {
    url: process.env.NUXT_PUBLIC_URL,
    name: process.env.NUXT_PUBLIC_SITE_NAME,
    trailingSlash: true
  },
  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './assets/icons'
      }
    ]
  },
  image: {
    format: ['webp']
  },

  htmlValidator: {
    usePrettier: false,
    failOnError: true,
    logLevel: 'verbose'
  },
  linkChecker: {
    failOnError: true,
    report: {
      html: true
    }
  },
  ogImage: {
    enabled: false
  },
  sitemap: {
    defaults: {
      lastmod: new Date().toISOString(),
      priority: 0.5,
      changefreq: 'weekly'
    },
    sitemaps: {
      modules: {
        includeAppSources: true
      },
      company: {
        sources: ['/api/__sitemap__/company']
      },
      ['company-categories']: {
        sources: ['/api/__sitemap__/company-categories']
      },
      posts: {
        sources: ['/api/__sitemap__/posts']
      },
      ['post-categories']: {
        sources: ['/api/__sitemap__/post-categories']
      },
      glossary: {
        sources: ['/api/__sitemap__/glossary']
      },
      blog: {
        sources: ['/api/__sitemap__/blog']
      },
      ['mcp-servers']: {
        sources: ['/api/__sitemap__/mcp-servers']
      },
      ['mcp-servers-categories']: {
        sources: ['/api/__sitemap__/mcp-servers-categories']
      }
    }
  }
});
