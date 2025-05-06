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
        title: 'MCP Servers',
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
            slug: 'https://solutions.serp.co'
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
        href: 'https://serp.ly/@devinschumacher/twitter',
        icon: 'i-lucide-twitter'
      },
      {
        name: 'Facebook',
        href: 'https://serp.ly/@devinschumacher/facebook',
        icon: 'i-lucide-facebook'
      },
      {
        name: 'LinkedIn',
        href: 'https://serp.ly/@devinschumacher/linkedin',
        icon: 'i-lucide-linkedin'
      },
      {
        name: 'YouTube',
        href: 'https://serp.ly/@devinschumacher/youtube',
        icon: 'i-lucide-youtube'
      },
      {
        name: 'Github',
        href: 'https://serp.ly/@devinschumacher/github',
        icon: 'i-lucide-github'
      },
      {
        name: 'Instagram',
        href: 'https://serp.ly/@devinschumacher/instagram',
        icon: 'i-lucide-instagram'
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
        children: [{ label: 'Solutions', to: 'https://solutions.serp.co' }]
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
        children: [
          { label: 'Blog', to: '/blog/' },
          { label: 'Posts', to: '/posts/' }
        ]
      }
    ],
    submitOptions: [
      { label: 'Company', to: '/users/submit/company/' },
      { label: 'Software', to: '/users/submit/software/' },
      { label: 'Product', to: '/users/submit/product/' },
      { label: 'MCP Server', to: '/users/submit/mcp-server/' }
    ]
  }
});
