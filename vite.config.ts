import { defineConfig } from "vite"
import pugPlugin from "vite-plugin-pug"

import { resolve } from 'path'

export default defineConfig({
  plugins: [pugPlugin()],
  css: {
    preprocessorOptions: {
      less: {
        math: "always",
        relativeUrls: true,
        javascriptEnabled: true
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'src/pages/auth/index.html'),
        chats: resolve(__dirname, 'src/pages/chat/index.html'),
        profile: resolve(__dirname, 'src/pages/profile/index.html'),
        page404: resolve(__dirname, 'src/pages/404/index.html'),
        page500: resolve(__dirname, 'src/pages/500/index.html'),
      },
    }
  }
})
