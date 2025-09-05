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
          entry: resolve(__dirname, 'lib/index.ts'),
          name: 'SSHClient',
          fileName: (format) => `index.${format === 'es' ? 'esm' : format}.js`,
          formats: ['es', 'cjs']
        },
        rollupOptions: {
          external: [],
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