import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { fileURLToPath, URL } from 'node:url';

// `npm run build`          → production build for any static host (Vercel, Netlify, …)
// `npm run build:preview`  → single-file build for sandboxed previews (in-memory routing,
//                             relative paths, JS/CSS inlined). See .env.artifact.
export default defineConfig(({ mode }) => {
  const demo = mode === 'artifact';
  return {
    base: demo ? './' : '/',
    plugins: [react(), ...(demo ? [viteSingleFile({ removeViteModuleLoader: true })] : [])],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    build: {
      outDir: demo ? 'dist-artifact' : 'dist',
      target: 'es2020',
      cssCodeSplit: !demo,
      rollupOptions: demo
        ? undefined
        : {
            output: {
              manualChunks: {
                react: ['react', 'react-dom', 'react-router-dom'],
                motion: ['framer-motion'],
                supabase: ['@supabase/supabase-js'],
              },
            },
          },
    },
  };
});
