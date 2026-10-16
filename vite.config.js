import { defineConfig } from 'vite';

export default defineConfig({
  // חובה עבור GitHub Pages כדי שהנתיבים יטענו בהצלחה מתוך שם המאגר
  base: '/Mergivolve-Worlds-of-Evolution/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
