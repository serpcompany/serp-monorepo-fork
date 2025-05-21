export default defineNuxtPlugin(() => {
  const posthog = usePostHog();

  // Expose PostHog to window for direct access in components
  if (typeof window !== 'undefined') {
    window.posthog = posthog;
  }

  return {
    provide: {
      posthog
    }
  };
});

// Add global type definition for PostHog on window
declare global {
  interface Window {
    posthog: unknown;
  }
}
