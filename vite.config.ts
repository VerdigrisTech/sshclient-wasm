import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    // Development server configuration - serve all examples
    return {
      root: './', // Use project root
      server: {
        port: 5173,
        open: '/examples/' // Open examples directory listing
      },
      publicDir: 'public', // Serve files from public directory
      resolve: {
        alias: {
          '/lib': resolve(__dirname, 'lib')
        }
      }
    };
  } else {
    // Build configuration
    return {
      build: {
        lib: {
          entry: {
            index: resolve(__dirname, 'lib/index.ts'),
            next: resolve(__dirname, 'lib/next.ts'),
            vite: resolve(__dirname, 'lib/vite.ts'),
            react: resolve(__dirname, 'lib/react.ts')
          },
          name: 'SSHClient',
          fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'esm' : format}.js`,
          formats: ['es', 'cjs']
        },
        rollupOptions: {
          external: ['react', 'vue'],
          output: {
            exports: 'named'
          }
        },
        sourcemap: true,
        outDir: 'dist'
      },
      plugins: [
        dts({
          include: ['lib/**/*.ts'],
          outDir: 'dist'
        })
      ],
      test: {
        globals: true,
        environment: 'jsdom'
      }
    };
  }
});