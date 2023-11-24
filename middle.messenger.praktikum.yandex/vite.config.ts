import { defineConfig } from "vite"
import pugPlugin from "vite-plugin-pug"

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
  }
})