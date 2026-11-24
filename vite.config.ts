
import { defineConfig, loadEnv, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const fixDropdownPickerJsx = {
  name: 'fix-dropdown-picker-jsx',
  enforce: 'pre' as const,

  async transform(code: string, id: string) {
    if (
      !id.includes('/node_modules/react-native-dropdown-picker/') ||
      !id.endsWith('.js')
    ) {
      return null;
    }

    let transformedCode = code;

    if (id.endsWith('/src/themes/index.js')) {
      transformedCode = `
        import LightTheme from './light/index.js';
        import DarkTheme from './dark/index.js';

        export default {
          DEFAULT: 'LIGHT',
          LIGHT: LightTheme,
          DARK: DarkTheme
        };
      `;
    } else if (
      id.endsWith('/src/themes/light/index.js') ||
      id.endsWith('/src/themes/dark/index.js')
    ) {
      transformedCode = `
        import ArrowDownIcon from './icons/arrow-down.png';
        import ArrowUpIcon from './icons/arrow-up.png';
        import TickIcon from './icons/tick.png';
        import CloseIcon from './icons/close.png';

        ${code
          .replace("require('./icons/arrow-down.png')", "{ uri: ArrowDownIcon }")
          .replace("require('./icons/arrow-up.png')", "{ uri: ArrowUpIcon }")
          .replace("require('./icons/tick.png')", "{ uri: TickIcon }")
          .replace("require('./icons/close.png')", "{ uri: CloseIcon }")}
      `;
    }

    return transformWithEsbuild(transformedCode, id, {
      loader: 'jsx',
      jsx: 'automatic',
    });
  },
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    root: 'web',

    plugins: [
      fixDropdownPickerJsx,
      react(),
    ],

    resolve: {
      extensions: [
        '.web.mjs',
        '.mjs',
        '.web.js',
        '.js',
        '.web.ts',
        '.ts',
        '.web.jsx',
        '.jsx',
        '.web.tsx',
        '.tsx',
        '.json',
      ],

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
          find: 'react-native-progress',
          replacement: path.resolve(__dirname, 'web/progress.web.tsx'),
        },
        {
          find: '@react-native-community/datetimepicker',
          replacement: path.resolve(
            __dirname,
            'web/DateTimePicker.web.tsx'
          ),
        },
        {
          find: /^react-native-vector-icons\/(.*)$/,
          replacement: path.resolve(__dirname, 'node_modules/react-native-vector-icons/$1'),
        },
        {
          find: /^react-native\/Libraries\/Utilities\/codegenNativeComponent(\.js)?$/,
          replacement: path.resolve(__dirname, 'web/stubs/codegenNativeComponent.js'),
        },
        {
          find: /^react-native\/Libraries\/Utilities\/codegenNativeCommands(\.js)?$/,
          replacement: path.resolve(__dirname, 'web/stubs/codegenNativeCommands.js'),
        },
        {
          find: /^react-native\/Libraries\/ReactNative\/AppContainer(\.js)?$/,
          replacement: path.resolve(__dirname, 'web/stubs/AppContainer.js'),
        },
        // íconos (react-native-paper los pide por esta ruta)
        {
          find: /^react-native-vector-icons\/(.*)$/,
          replacement: '@expo/vector-icons/$1',
        },
      ],
    },

    optimizeDeps: {
      esbuildOptions: {
        resolveExtensions: ['.web.js', '.web.ts', '.web.tsx', '.js', '.ts', '.tsx', '.jsx'],
        loader: { '.js': 'jsx' },
      },
    },

    define: {
      __DEV__: JSON.stringify(mode !== 'production'),
      'process.env': JSON.stringify(env),
    },

    server: {
      host: '0.0.0.0',
      port: Number(process.env.PORT) || 5173,
      allowedHosts: [
        'shyamashramapp-production.up.railway.app',
      ],
    },

    preview: {
      host: '0.0.0.0',
      port: Number(process.env.PORT) || 4173,
      allowedHosts: [
        'shyamashramapp-production.up.railway.app',
      ],
    },

    build: {
      outDir: '../dist',
      emptyOutDir: true,
    },
  };
});
