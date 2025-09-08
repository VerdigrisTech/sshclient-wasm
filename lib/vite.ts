/**
 * Vite specific initialization and utilities for sshclient-wasm
 * 
 * Usage:
 * import { initializeSSHClient, SSHClient } from 'sshclient-wasm/vite';
 */

import { SSHClient, InitializationOptions } from './index';

export * from './index';

/**
 * Initialize SSH client with Vite optimized defaults
 */
export async function initializeSSHClient(options: Partial<InitializationOptions> = {}): Promise<void> {
  // Safe import.meta.env access - avoid TypeScript errors by using try/catch
  let isDev = false;
  try {
    // This will work in Vite environments where import.meta.env is available
    isDev = (globalThis as any).import?.meta?.env?.DEV === true;
  } catch {
    // Fallback or in non-Vite environments
    isDev = false;
  }

  const viteDefaults: InitializationOptions = {
    publicDir: '/',
    autoDetect: true,
    cacheBusting: isDev,
    timeout: 10000,
    ...options
  };

  return SSHClient.initialize(viteDefaults);
}

/**
 * Vite configuration helpers
 */
export const ViteConfig = {
  /**
   * Get recommended Vite server configuration for WASM support
   */
  getServerConfig() {
    return {
      headers: {
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
      },
      // Ensure WASM files are served with correct MIME type
      middlewares: []
    };
  },

  /**
   * Get recommended Vite build configuration for WASM support
   */
  getBuildConfig() {
    return {
      target: 'esnext',
      rollupOptions: {
        output: {
          // Ensure WASM files are handled properly
          assetFileNames: (assetInfo: any) => {
            if (assetInfo.name?.endsWith('.wasm')) {
              return '[name][extname]';
            }
            return '[name].[hash][extname]';
          }
        }
      }
    };
  },

  /**
   * Get recommended Vite optimizeDeps configuration
   */
  getOptimizeDepsConfig() {
    return {
      exclude: ['sshclient-wasm']
    };
  },

  /**
   * Complete Vite configuration object
   */
  getViteConfig(customConfig: any = {}) {
    const serverConfig = this.getServerConfig();
    const buildConfig = this.getBuildConfig();
    const optimizeDepsConfig = this.getOptimizeDepsConfig();

    return {
      server: {
        ...serverConfig,
        ...customConfig.server
      },
      build: {
        ...buildConfig,
        ...customConfig.build
      },
      optimizeDeps: {
        ...optimizeDepsConfig,
        ...customConfig.optimizeDeps
      },
      ...customConfig
    };
  }
};

/**
 * React hook for SSH client initialization in Vite
 */
export function useSSHClient(options: Partial<InitializationOptions> = {}) {
  if (!React) {
    throw new Error('React is not available. Please install React to use useSSHClient.');
  }

  const [isInitialized, setIsInitialized] = React.useState(false);
  const [initError, setInitError] = React.useState(null as Error | null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;

    initializeSSHClient(options)
      .then(() => {
        if (mounted) {
          setIsInitialized(true);
          setInitError(null);
        }
      })
      .catch((error: Error) => {
        if (mounted) {
          setInitError(error);
          setIsInitialized(false);
        }
      })
      .finally(() => {
        if (mounted) {
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [JSON.stringify(options)]);

  return { isInitialized, initError, isLoading };
}

/**
 * Vue composition API composable for SSH client initialization
 */
export function useSSHClientVue(options: Partial<InitializationOptions> = {}) {
  let Vue: any;
  try {
    Vue = require('vue');
  } catch {
    throw new Error('Vue is not available. Please install Vue to use useSSHClientVue.');
  }

  const isInitialized = Vue.ref(false);
  const initError = Vue.ref(null as Error | null);
  const isLoading = Vue.ref(true);

  Vue.onMounted(async () => {
    try {
      await initializeSSHClient(options);
      isInitialized.value = true;
      initError.value = null;
    } catch (error) {
      initError.value = error as Error;
      isInitialized.value = false;
    } finally {
      isLoading.value = false;
    }
  });

  return { 
    isInitialized: Vue.readonly(isInitialized), 
    initError: Vue.readonly(initError), 
    isLoading: Vue.readonly(isLoading) 
  };
}

// Import React for the hook (conditional to avoid issues in non-React environments)
let React: any;
try {
  React = require('react');
} catch {
  // React not available, hook will not work but won't break the module
}

export default {
  initializeSSHClient,
  ViteConfig,
  useSSHClient,
  useSSHClientVue,
  SSHClient
};