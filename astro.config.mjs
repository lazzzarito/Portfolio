// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import { VitePWA } from 'vite-plugin-pwa';

// https://astro.build/config
export default defineConfig({
  site: 'https://1azarito.dev',
  compressHTML: true,
  vite: {
    plugins: [tailwindcss(), VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'placeholder.jpeg', 'robots.txt'],
      manifest: {
        name: '1azarito | Dev Portfolio',
        short_name: '1azarito',
        description: 'Portfolio of 1azarito — Web developer and frontend specialist.',
        theme_color: '#0A0A0A',
        background_color: '#0A0A0A',
        display: 'minimal-ui',
        icons: [
          {
            src: '/favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,webp,ico,jpeg,jpg,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      }
    })]
  },
  integrations: [icon(), sitemap()]
});
