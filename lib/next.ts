/**
 * Next.js specific initialization and utilities for sshclient-wasm
 * 
 * Usage:
 * import { initializeSSHClient, SSHClient } from 'sshclient-wasm/next';
 */

import { SSHClient, InitializationOptions } from './index';

export * from './index';

/**
 * Initialize SSH client with Next.js optimized defaults
 */
export async function initializeSSHClient(options: Partial<InitializationOptions> = {}): Promise<void> {
  const nextjsDefaults: InitializationOptions = {
    publicDir: '/',
    autoDetect: true,
    cacheBusting: process.env.NODE_ENV === 'development',
    timeout: 10000,
    ...options
  };

  return SSHClient.initialize(nextjsDefaults);
}

/**
 * Next.js configuration helpers
 */
export const NextJSConfig = {
  /**
   * Get recommended Next.js webpack configuration for WASM support
   */
  getWebpackConfig() {
    return {
      experiments: { 
        asyncWebAssembly: true,
        layers: true 
      }
    };
  },

  /**
   * Get recommended CORS headers for Next.js
   */
  getCORSHeaders() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        ],
      },
    ];
  },

  /**
   * Complete Next.js configuration object
   */
  getNextConfig(customConfig: any = {}) {
    return {
      webpack: (config: any) => {
        const wasmConfig = this.getWebpackConfig();
        config.experiments = { ...config.experiments, ...wasmConfig.experiments };
        
        // Allow custom webpack modifications
        if (customConfig.webpack) {
          return customConfig.webpack(config);
        }
        
        return config;
      },
      async headers() {
        const corsHeaders = this.getCORSHeaders();
        
        // Merge with custom headers if provided
        if (customConfig.headers) {
          const customHeaders = await customConfig.headers();
          return [...corsHeaders, ...customHeaders];
        }
        
        return corsHeaders;
      },
      ...customConfig
    };
  }
};

// Import React for the hook (conditional to avoid issues in non-React environments)
let React: any;
try {
  React = require('react');
} catch {
  // React not available, hook will not work but won't break the module
}

/**
 * React hook for SSH client initialization in Next.js
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

export default {
  initializeSSHClient,
  NextJSConfig,
  useSSHClient,
  SSHClient
};