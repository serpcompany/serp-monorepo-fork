export default defineAppConfig({
  myLayer: {
    name: '@serp/ui'
  },
  ui: {
    button: {
      slots: {
        base: 'rounded-none font-medium inline-flex items-center focus:outline-hidden disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors'
      },
      defaultVariants: {
        size: 'md',
        color: 'primary'
      }
    },
    textarea: {
      slots: {
        base: 'w-full rounded-none border-0 placeholder:text-[var(--ui-text-dimmed)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors'
      }
    }
  },
  // Site configuration
  site: {
    // Social media links for the footer
    socialLinks: [
      {
        name: 'Twitter',
        href: 'https://serp.ly/@serp/twitter',
        icon: 'i-lucide-twitter'
      },
      {
        name: 'Facebook',
        href: 'https://serp.ly/@serp/facebook',
        icon: 'i-lucide-facebook'
      },
      {
        name: 'LinkedIn',
        href: 'https://serp.ly/@serp/linkedin',
        icon: 'i-lucide-linkedin'
      },
      {
        name: 'YouTube',
        href: 'https://serp.ly/@serp/youtube',
        icon: 'i-lucide-youtube'
      },
      {
        name: 'Github',
        href: 'https://serp.ly/@serp/github',
        icon: 'i-lucide-github'
      },
      {
        name: 'Instagram',
        href: 'https://serp.ly/@serp/instagram',
        icon: 'i-lucide-instagram'
      }
    ],
    // Legal links for the footer
    legalLinks: [
      { text: 'Privacy', slug: '/legal/privacy-policy/' },
      { text: 'Terms', slug: '/legal/terms-conditions/' },
      { text: 'Affiliate Disclosure', slug: '/legal/affiliate-disclosure/' },
      { text: 'DMCA', slug: '/legal/dmca/' }
    ],
    // Header navigation items
    headerNavItems: [
      {
        label: 'Companies',
        children: [{ label: 'Companies', to: '/products/' }]
      },
      {
        label: 'MCP',
        children: [{ label: 'MCP Servers', to: '/mcp/servers/' }]
      },
      {
        label: 'Solutions',
        children: [{ label: 'Solutions', to: '/solutions/' }]
      },
      {
        label: 'Tools',
        children: [
          { label: 'Tools', to: '/tools/' },
          { label: 'Combine CSVs', to: '/tools/combine-csv-files/' },
          { label: 'JSON to CSV', to: '/tools/convert-json-to-csv/' },
          { label: 'Character Counter', to: '/tools/count-characters/' },
          { label: 'Paragraph Counter', to: '/tools/paragraph-counter/' }
        ]
      },
      {
        label: 'Glossary',
        children: [{ label: 'Glossary', to: '/glossary/' }]
      },
      {
        label: 'Blog',
        children: [{ label: 'Posts', to: '/posts/' }]
      }
    ],
    // Footer columns configuration
    footerColumns: [
      {
        title: 'Software',
        id: 1,
        slug: '/products/',
        items: [
          { text: 'Categories', slug: '/products/best/' },
          { text: 'Cloud GPUs', slug: '/products/best/cloud-gpu-providers/' }
        ]
      },
      {
        title: 'MCP Severs',
        id: 2,
        slug: '/mcp/servers/',
        items: [
          {
            text: 'Categories',
            slug: '/mcp/servers/categories/'
          }
        ]
      },
      {
        title: 'Resources',
        id: 3,
        slug: '',
        items: [
          { text: 'Blog', slug: '/blog/' },
          { text: 'Glossary', slug: '/glossary/' },
          { text: 'Tools', slug: '/tools/' }
        ]
      },
      {
        title: 'Brand',
        id: 4,
        slug: '',
        items: [
          {
            text: 'About',
            slug: '/about/'
          },
          {
            text: 'Solutions',
            slug: '/solutions/'
          },
          {
            text: 'Contact',
            slug: '#'
          }
        ]
      }
    ]
  }
});

declare module '@nuxt/schema' {
  interface AppConfigInput {
    myLayer?: {
      name?: string;
    };
    site?: {
      socialLinks?: Array<{
        name: string;
        href: string;
        icon: string;
      }>;
      legalLinks?: Array<{
        text: string;
        slug: string;
      }>;
      headerNavItems?: Array<{
        label: string;
        children: Array<{
          label: string;
          to: string;
        }>;
      }>;
      footerColumns?: Array<{
        title: string;
        id: number;
        slug: string;
        items: Array<any>;
      }>;
    };
  }
}
