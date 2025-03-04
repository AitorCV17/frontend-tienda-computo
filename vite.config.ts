import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import history from 'connect-history-api-fallback'

export default defineConfig({
  // Usamos base: '/' para rutas absolutas
  base: '/',
  plugins: [
    vue(),
    {
      // Plugin de fallback
      name: 'history-fallback',
      configureServer(server) {
        server.middlewares.use(
          history({
            disableDotRule: true,
            rewrites: [
              // Ignora assets con extensión .js, .css, etc.
              {
                from: /\/.*\.(?:js|css|png|jpg|jpeg|svg|gif|woff2|ttf|map)$/,
                to: (ctx) => ctx.parsedUrl.pathname
              },
              // Reescribe todo lo demás a /index.html
              {
                from: /^(?!.*\.\w+$).*/,
                to: '/index.html'
              }
            ]
          })
        )
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
