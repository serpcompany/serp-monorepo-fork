export default defineAppConfig({
  myLayer: {
    name: '@serp/ui'
  },
  ui: {
    button: {
      slots: {
        base: 'font-medium inline-flex items-center focus:outline-hidden disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors'
      },
      defaultVariants: {
        size: 'md',
        color: 'primary'
      }
    },
    textarea: {
      slots: {
        base: 'w-full border-0 placeholder:text-[var(--ui-text-dimmed)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors'
      }
    }
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
        items: Array<{
          text: string;
          slug: string;
        }>;
      }>;
    };
  }
}
