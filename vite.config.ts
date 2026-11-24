
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    root: 'web',
    envDir: process.cwd(),
    plugins: [react()],

  resolve: {
    alias: [
      {
        find: /^react-native$/,
        replacement: 'react-native-web',
      },
      {
        find: '@env',
        replacement: path.resolve(__dirname, 'web/env.web.ts'),
      },
      {
        find: /^react-native-progress$/,
        replacement: path.resolve(__dirname, 'web/progress.web.tsx'),
      },
      {
        find: /^@react-native-community\/datetimepicker$/,
        replacement: path.resolve(__dirname, 'web/DateTimePicker.web.tsx'),
      },
    ],

    extensions: [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      '.mjs',
      '.js',
      '.mts',
      '.ts',
      '.jsx',
      '.tsx',
      '.json',
    ],
  },

    define: {
      __WEB_ENV__: JSON.stringify(env),
    },

    server: {
      port: 5173,
      host: '0.0.0.0',
    },

    build: {
      outDir: '../dist',
      emptyOutDir: true,
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
        resolveExtensions: [
          '.web.tsx',
          '.web.ts',
          '.web.jsx',
          '.web.js',
          '.mjs',
          '.js',
          '.mts',
          '.ts',
          '.jsx',
          '.tsx',
          '.json',
        ],
      },
    },
  };
});
