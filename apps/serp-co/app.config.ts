export default defineAppConfig({
  myLayer: {
    name: '@serp/ui'
  },
  site: {
    footerColumns: [
      {
        title: 'Software',
        slug: '/products/',
        items: [
          { text: 'Categories', slug: '/products/best/' },
          { text: 'Cloud GPUs', slug: '/products/best/cloud-gpu-providers/' }
        ]
      },
      {
        title: 'Providers',
        slug: '/services/',
        items: [
          {
            text: 'Services',
            slug: '/services/'
          }
        ]
      },
      {
        title: 'MCP',
        slug: '/mcp/servers/',
        items: [
          {
            text: 'MCP Servers',
            slug: '/mcp/servers/'
          },
          {
            text: 'Categories',
            slug: '/mcp/servers/categories/'
          }
        ]
      },
      {
        title: 'Categories',
        items: [
          {
            text: 'Products',
            slug: '/products/best/'
          },
          {
            text: 'Providers',
            slug: '/services/best/'
          },
          {
            text: 'MCP Servers',
            slug: '/mcp/servers/categories/'
          }
        ]
      },
      {
        title: 'Resources',
        items: [
          { text: 'Blog', slug: '/blog/' },
          { text: 'Glossary', slug: '/glossary/' },
          { text: 'Tools', slug: '/tools/' }
        ]
      }
    ],
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
    legalLinks: [
      { text: 'About', slug: '/about/' },
      { text: 'Solutions', slug: '/solutions/' },
      { text: 'Contact', slug: '#' },
      { text: 'Privacy', slug: '/legal/privacy-policy/' },
      { text: 'Terms', slug: '/legal/terms-conditions/' },
      { text: 'Affiliate Disclosure', slug: '/legal/affiliate-disclosure/' },
      { text: 'DMCA', slug: '/legal/dmca/' }
    ],
    headerNavItems: [
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
        label: 'Content',
        children: [
          { label: 'Glossary', to: '/glossary/' },
          { label: 'Blog', to: '/blog/' },
          { label: 'Posts', to: '/posts/' }
        ]
      },
      {
        label: 'Reviews',
        children: [
          { label: 'Products', to: '/products/' },
          { label: 'Service Providers', to: '/services/' }
        ]
      },
      {
        label: 'MCP',
        children: [{ label: 'MCP Servers', to: '/mcp/servers/' }]
      }
    ],
    submitOptions: [
      { label: 'Product', to: '/users/submit/product/' },
      { label: 'Service', to: '/users/submit/product/' }
      // { label: 'MCP Server', to: '/users/submit/mcp-server/' }
    ]
  }
});
