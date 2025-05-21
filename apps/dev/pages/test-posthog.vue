<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">PostHog Testing</h1>
    <p class="mb-4">Use the buttons below to test PostHog functionality</p>
    
    <UButton @click="captureEvent" color="blue" class="mr-2">Capture Event</UButton>
    <UButton @click="captureError" color="red">Capture Error</UButton>
    
    <div class="mt-4">
      <h2 class="text-xl font-semibold">Console Output</h2>
      <p class="text-sm text-gray-500">Check browser console to see results</p>
    </div>
  </div>
</template>

<script setup>
// Use the PostHog composable
const posthog = usePostHog();

const captureEvent = () => {
  try {
    // Use the composable instance directly
    posthog.capture('test_event', { 
      source: 'test-page',
      timestamp: new Date().toISOString()
    });
    console.log('Event sent to PostHog');
  } catch (error) {
    console.error('Error sending event to PostHog:', error);
  }
};

const captureError = () => {
  try {
    // Create a test error
    const testError = new Error('Test error for PostHog');
    testError.stack = new Error().stack;
    
    // Log it to console
    console.error('Test error object:', testError);
    
    // Capture with PostHog
    posthog.capture('error_event', {
      error_message: testError.message,
      error_stack: testError.stack
    });
    
    // Use exception capture if available
    if (typeof posthog.captureException === 'function') {
      posthog.captureException(testError);
      console.log('Exception captured with posthog.captureException()');
    } else {
      console.warn('posthog.captureException method not available');
    }
    
    console.log('Error sent to PostHog');
  } catch (error) {
    console.error('Error sending error to PostHog:', error);
  }
};
</script>