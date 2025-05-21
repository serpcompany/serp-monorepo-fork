// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true }
  modules: ['@nuxt/eslint', 'nuxt-posthog'],
  posthog: {
    apiKey: process.env.POSTHOG_API_KEY,
    apiHost: 'https://app.posthog.com',
    sessionRecording: false,
    enableInDevMode: true
  },
  sourcemap: {
    client: true
  },
  hooks: {
    'nitro:build:public-assets': async () => {
      console.log('Running PostHog sourcemap injection...');
      try {
        const { execSync } = await import('child_process');
        execSync("posthog-cli sourcemap inject --directory '.output/public'", {
          stdio: 'inherit'
        });
        console.log('PostHog sourcemap injection completed successfully');
      } catch (error) {
        console.error('PostHog sourcemap injection failed:', error);
      }
    }
  }
});
