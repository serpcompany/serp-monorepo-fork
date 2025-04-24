export default defineAppConfig({
  myLayer: {
    name: '@serp/ui'
  },
  site: {
    socialLinks: [
      {
        name: 'Twitter',
        href: 'https://serp.ly/@moviestop/twitter',
        icon: 'i-lucide-twitter'
      },
      {
        name: 'Facebook',
        href: 'https://serp.ly/@moviestop/facebook',
        icon: 'i-lucide-facebook'
      },
      {
        name: 'LinkedIn',
        href: 'https://serp.ly/@moviestop/linkedin',
        icon: 'i-lucide-linkedin'
      },
      {
        name: 'YouTube',
        href: 'https://serp.ly/@moviestop/youtube',
        icon: 'i-lucide-youtube'
      },
      {
        name: 'Github',
        href: 'https://serp.ly/@moviestop/github',
        icon: 'i-lucide-github'
      },
      {
        name: 'Instagram',
        href: 'https://serp.ly/@moviestop/instagram',
        icon: 'i-lucide-instagram'
      },
      {
        name: 'SoundCloud',
        href: 'https://serp.ly/@moviestop/soundcloud',
        icon: 'i-lucide-external-link'
      }
    ],
    headerNavItems: [
      {
        label: 'Posts',
        children: [{ label: 'Posts', to: '/posts/' }]
      }
    ],
    footerColumns: [
      {
        title: 'Links',
        id: 1,
        slug: '',
        items: [{ text: 'Posts', slug: '/posts/' }]
      }
    ],
    legalLinks: [
      { text: 'Privacy', slug: '/legal/privacy-policy/' },
      { text: 'Terms', slug: '/legal/terms-conditions/' },
      { text: 'Affiliate Disclosure', slug: '/legal/affiliate-disclosure/' },
      { text: 'DMCA', slug: '/legal/dmca/' }
    ]
  }
});
