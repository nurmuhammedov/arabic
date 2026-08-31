import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, type PluginOption } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

const isAnalyze = process.env.ANALYZE === 'true'

/**
 * Lets the API share the page's origin. A tunnel or a deployment terminates TLS
 * on one host, so the browser cannot reach the API on a port of its own.
 */
const API_PROXY = {
  '/api': { target: 'http://localhost:8080', changeOrigin: true },
}

/** Tunnels hand out a fresh subdomain each run, so the whole domain is allowed. */
const ALLOWED_HOSTS = ['.trycloudflare.com', '.ngrok-free.app', '.ngrok.io']

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Arab tili — lug‘at mashqi',
        short_name: 'Arab tili',
        description: 'Qur’on so‘zlarini o‘zaklari bilan yodlash mashqi',
        lang: 'uz',
        dir: 'ltr',
        theme_color: '#3b82f6',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          { src: 'android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        cleanupOutdatedCaches: true,
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          {
            urlPattern: /\/locales\/.*\.json$/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'locales' },
          },
          {
            urlPattern: /\/fonts\/.*\.(?:woff2?|ttf)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
    isAnalyze &&
      (visualizer({ filename: 'dist/stats.html', gzipSize: true, brotliSize: true }) as PluginOption),
  ].filter(Boolean),
  server: {
    host: true,
    port: 7070,
    open: false,
    proxy: API_PROXY,
    allowedHosts: ALLOWED_HOSTS,
  },
  preview: {
    host: true,
    port: 7070,
    proxy: API_PROXY,
    allowedHosts: ALLOWED_HOSTS,
  },
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
  build: {
    target: 'es2022',
    sourcemap: mode !== 'production',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          const has = (...names: string[]) => names.some((name) => id.includes(`node_modules/${name}/`))

          if (has('react', 'react-dom', 'react-router', 'react-router-dom', 'scheduler')) return 'react'
          if (id.includes('@radix-ui') || has('cmdk')) return 'radix'
          if (id.includes('@reduxjs') || has('react-redux') || id.includes('@tanstack/react-query')) return 'state'
          if (has('react-hook-form', 'zod') || id.includes('@hookform')) return 'forms'
          if (id.includes('i18next')) return 'i18n'
          if (id.includes('@tanstack/react-table')) return 'table'
          if (has('date-fns', 'react-day-picker')) return 'dates'
          if (has('lucide-react')) return 'icons'
          return 'vendor'
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@reduxjs/toolkit',
      'react-redux',
      '@tanstack/react-query',
      '@tanstack/react-table',
      'react-hook-form',
      'zod',
      'axios',
      'date-fns',
      'i18next',
      'react-i18next',
    ],
  },
}))
