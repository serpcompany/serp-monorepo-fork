export default defineAppConfig({
  myLayer: {
    name: '@serp/ui'
  },
  ui: {
    colors: {
      neutral: 'gray'
    },
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
