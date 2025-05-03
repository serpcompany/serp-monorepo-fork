export default defineAppConfig({
  myLayer: {
    name: '@serp/ui'
  },
  site: {
    footerColumns: [
      {
        title: 'Links',
        items: [{ text: 'Posts', slug: '/posts/' }]
      }
    ],
    socialLinks: [
      {
        name: 'Twitter',
        href: 'https://serp.ly/@serpwiki/twitter',
        icon: 'i-lucide-twitter'
      },
      {
        name: 'Facebook',
        href: 'https://serp.ly/@serpwiki/facebook',
        icon: 'i-lucide-facebook'
      },
      {
        name: 'LinkedIn',
        href: 'https://serp.ly/@serpwiki/linkedin',
        icon: 'i-lucide-linkedin'
      },
      {
        name: 'YouTube',
        href: 'https://serp.ly/@serpwiki/youtube',
        icon: 'i-lucide-youtube'
      },
      {
        name: 'Github',
        href: 'https://serp.ly/@serpwiki/github',
        icon: 'i-lucide-github'
      },
      {
        name: 'Instagram',
        href: 'https://serp.ly/@serpwiki/instagram',
        icon: 'i-lucide-instagram'
      }
    ],
    legalLinks: [
      { text: 'About', slug: '/about/' },
      { text: 'Solutions', slug: 'https://solutions.serp.co' },
      { text: 'Contact', slug: '#' },
      { text: 'Privacy', slug: '/legal/privacy-policy/' },
      { text: 'Terms', slug: '/legal/terms-conditions/' },
      { text: 'Affiliate Disclosure', slug: '/legal/affiliate-disclosure/' },
      { text: 'DMCA', slug: '/legal/dmca/' }
    ],
    headerNavItems: [
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
          { label: 'Service Providers', to: '/service-providers/' }
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
