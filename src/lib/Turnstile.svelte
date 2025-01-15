<!-- Turnstile.svelte -->
<script>
  import { onMount } from 'svelte';

  // Props
  let siteKey = '0x4AAAAAAA2CdRwZ6LejdYrs'; // Cloudflare site key
  export let onVerify = (token) => {}; // Callback when verification is complete
  export let theme = 'light'; // light or dark
  export let size = 'normal'; // normal or compact
  
  let widgetId;
  let element;

  // Load Turnstile script
  onMount(() => {
    // Add script to head if not already present
    if (!document.querySelector('script[src*="turnstile"]')) {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = renderWidget;
    } else {
      renderWidget();
    }

    return () => {
      // Cleanup on component unmount
      if (widgetId) {
        turnstile.remove(widgetId);
      }
    };
  });

  function renderWidget() {
    // Wait for turnstile to be available
    const render = () => {
      if (window.turnstile) {
        widgetId = window.turnstile.render(element, {
          sitekey: siteKey,
          callback: onVerify,
          theme: theme,
          size: size
        });
      } else {
        setTimeout(render, 100);
      }
    };
    render();
  }
</script>

<div bind:this={element}></div>

<!-- Usage Example -->
<!--
<script>
  import Turnstile from './Turnstile.svelte';
  
  function handleVerify(token) {
    console.log('Verified with token:', token);
    // Send token to your backend for verification
  }
</script>

<Turnstile 
  siteKey="YOUR_SITE_KEY"
  onVerify={handleVerify}
  theme="light"
  size="normal"
/>
-->