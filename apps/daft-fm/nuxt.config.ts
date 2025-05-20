export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  extends: [
    '@serp/utils',
    '@serp/tools',
    '@serp/types',
    '@serp/ui'
  ],
  modules: [
    '@nuxt/ui-pro',
    '@nuxtjs/html-validator',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxtjs/seo',
    'nuxt-multi-cache',
    'nuxt-security',
    '@nuxt/scripts',
    'nuxt-link-checker'
  ],
  css: ['~/assets/css/main.css'],
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
  ui: {
    colorMode: true
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
      environment: process.env.NODE_ENV,
      forCloudflare: false,
      copyrightText: '© DAFT FM'
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
          'https://*.doubleclick.net',
          'https://*.google-analytics.com',
          'https://*.googleapis.com',
          'https://googleads.g.doubleclick.net'
        ],
        'script-src': [
          "'self'",
          "'unsafe-inline'",
          'https://static.cloudflareinsights.com',
          'https://*.doubleclick.net',
          'https://*.googletagmanager.com',
          'https://*.google-analytics.com',
          'https://*.googleapis.com',
          'https://googleads.g.doubleclick.net'
        ],
        'script-src-elem': [
          "'self'",
          "'unsafe-inline'",
          'https://static.cloudflareinsights.com',
          'https://www.youtube.com',
          'https://www.youtube-nocookie.com',
          'https://www.googletagmanager.com',
          'https://googleads.g.doubleclick.net'
        ],
        'connect-src': [
          "'self'",
          'https:',
          'ws:',
          'https://*.doubleclick.net',
          'https://*.google-analytics.com',
          'https://*.googleapis.com',
          'https://googleads.g.doubleclick.net'
        ],
        'frame-src': [
          'https://www.youtube-nocookie.com',
          'https://www.youtube.com',
          'https://*.serp.ly',
          'https://*.serp.ai',
          'https://*.serp.co',
          'https://googleads.g.doubleclick.net'
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
          id: 'GTM-NC8CG9R'
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
  sitemap: {
    enabled: false
  },
  robots: {
    enabled: false
  },
  schemaOrg: {
    identity: 'Organization',
    host: 'https://daft.fm'
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
  }
});
