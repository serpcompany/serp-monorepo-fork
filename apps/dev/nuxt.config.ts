export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  extends: [
    '@serp/utils',
    '@serp/stripe',
    '@serp/tools',
    '@serp/types',
    '@serp/ui',
    '@serp/instrumentation'
  ],
  modules: [
    '@nuxt/ui-pro',
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    '@nuxt/content',
    'nuxt-multi-cache',
    'nuxt-security',
    'nuxt-link-checker',
    '@bg-dev/nuxt-s3'
  ],
  css: ['~/assets/css/main.css'],
  multiCache: {
    api: {
      enabled: true,
      prefix: '/__nuxt_multi_cache',
      authorization: process.env.CACHE_PURGE_API_KEY || 'xv12378asdfSDA123'
    }
  },
  stripe: {
    server: {
      key: process.env.STRIPE_SECRET_KEY,
      options: {}
    },
    client: {
      key: process.env.STRIPE_API_KEY,
      options: {}
    }
  },
  s3: {
    driver: 's3',
    bucket: process.env.CLOUDFLARE_R2_BUCKET,
    endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
    region: 'auto',
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_ACCESS_KEY
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
      cloudflareR2PublicUrl: process.env.CLOUDFLARE_R2_PUBLIC_URL,
      otelExporterEndpoint: process.env.OTEL_EXPORTER_ENDPOINT,
      siteName: process.env.NUXT_PUBLIC_SITE_NAME,
      domain: process.env.NUXT_PUBLIC_DOMAIN,
      siteUrl: process.env.NUXT_PUBLIC_URL,
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      useAuth: true,
      forCloudflare: false,
      environment: process.env.NODE_ENV,
      profileDropdownLinks: [
        [
          {
            label: 'Get Featured',
            icon: 'i-lucide-star',
            to: '/users/get-featured/',
            color: 'success'
          },
          {
            label: 'Submit',
            icon: 'i-lucide-plus',
            to: '/users/submit/company/'
          },
          {
            label: 'Billing',
            icon: 'i-lucide-credit-card',
            to: '/users/manage/billing/'
          }
        ]
      ],
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
          'https://*.serp.co'
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
          id: 'GTM-WVF43L4'
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
    host: 'https://serp.co'
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
        includeAppSources: true,
        exclude: ['/users/**']
      },
      company: {
        sources: ['/api/__sitemap__/company']
      },
      ['company-categories']: {
        sources: ['/api/__sitemap__/company-categories']
      },
      ['service-providers']: {
        sources: ['/api/__sitemap__/service-providers']
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
