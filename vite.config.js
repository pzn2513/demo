import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
  server: {
    host:'127.0.0.1',
    proxy:{
      '^/api(?:$|\\?.*|/.*)':{
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/v1': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    }
  }
});
