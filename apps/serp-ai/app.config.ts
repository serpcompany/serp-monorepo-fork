export default defineAppConfig({
  myLayer: {
    name: '@serp/ui'
  },
  site: {
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
          { text: 'Glossary', slug: '/glossary/' }
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
            slug: 'https://serp.co/solutions/'
          },
          {
            text: 'Contact',
            slug: '#'
          }
        ]
      }
    ],
    socialLinks: [
      {
        name: 'Twitter',
        href: 'https://serp.ly/@serpai/twitter',
        icon: 'i-lucide-twitter'
      },
      {
        name: 'Facebook',
        href: 'https://serp.ly/@serpai/facebook',
        icon: 'i-lucide-facebook'
      },
      {
        name: 'LinkedIn',
        href: 'https://serp.ly/@serpai/linkedin',
        icon: 'i-lucide-linkedin'
      },
      {
        name: 'YouTube',
        href: 'https://serp.ly/@serpai/youtube',
        icon: 'i-lucide-youtube'
      },
      {
        name: 'Github',
        href: 'https://serp.ly/@serpai/github',
        icon: 'i-lucide-github'
      },
      {
        name: 'Instagram',
        href: 'https://serp.ly/@serpai/instagram',
        icon: 'i-lucide-instagram'
      },
      {
        name: 'SoundCloud',
        href: 'https://serp.ly/@serpai/',
        icon: 'i-lucide-external-link'
      }
    ],
    legalLinks: [
      { text: 'Privacy', slug: '/legal/privacy-policy/' },
      { text: 'Terms', slug: '/legal/terms-conditions/' },
      { text: 'Affiliate Disclosure', slug: '/legal/affiliate-disclosure/' },
      { text: 'DMCA', slug: '/legal/dmca/' }
    ],
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
        label: 'Glossary',
        children: [{ label: 'Glossary', to: '/glossary/' }]
      },
      {
        label: 'Blog',
        children: [{ label: 'Posts', to: '/posts/' }]
      }
    ]
  }
});
