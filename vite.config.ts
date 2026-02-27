// import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import { miaodaDevPlugin } from 'miaoda-sc-plugin';
import { defineConfig, PluginOption } from 'vite';

export default defineConfig({
  base: '/HGPACI-Website/', // 👈 REQUIRED for GitHub Pages
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: 'named',
        namedExport: 'ReactComponent',
      },
    }),
    miaodaDevPlugin() as PluginOption ,
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
