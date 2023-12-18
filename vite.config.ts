import { defineConfig } from 'vite';

import { resolve } from 'path';
import vitePluginPugPrecompile from './vite-plugin-pug-precompile';

export default defineConfig({
  plugins: [vitePluginPugPrecompile()],
  css: {
    preprocessorOptions: {
      less: {
        math: 'always',
        relativeUrls: true,
        javascriptEnabled: true,
      },
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
  },
  publicDir: resolve(__dirname, 'public'),
});
