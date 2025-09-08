/**
 * React specific utilities for sshclient-wasm
 * 
 * Usage:
 * import { useSSHClient, SSHClient } from 'sshclient-wasm/react';
 */

import { SSHClient, InitializationOptions, SSHSession, Transport, ConnectionOptions, SSHClientCallbacks } from './index';

export * from './index';

// Import React with error handling
let React: any;
try {
  React = require('react');
} catch {
  throw new Error('React is not available. Please install React to use sshclient-wasm/react.');
}

/**
 * React hook for SSH client initialization
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

    SSHClient.initialize(options)
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
 * React hook for managing SSH connections
 */
export function useSSHConnection() {
  if (!React) {
    throw new Error('React is not available. Please install React to use useSSHConnection.');
  }

  const [session, setSession] = React.useState(null as SSHSession | null);
  const [connectionState, setConnectionState] = React.useState('idle' as 'idle' | 'connecting' | 'connected' | 'error' | 'disconnected');
  const [connectionError, setConnectionError] = React.useState(null as Error | null);

  const connect = React.useCallback(async (
    options: ConnectionOptions, 
    transport: Transport, 
    callbacks?: SSHClientCallbacks
  ) => {
    setConnectionState('connecting');
    setConnectionError(null);

    try {
      const enhancedCallbacks: SSHClientCallbacks = {
        ...callbacks,
        onStateChange: (state) => {
          setConnectionState(state === 'connected' ? 'connected' : 'connecting');
          callbacks?.onStateChange?.(state);
        }
      };

      const newSession = await SSHClient.connect(options, transport, enhancedCallbacks);
      setSession(newSession);
      setConnectionState('connected');
      return newSession;
    } catch (error) {
      setConnectionError(error as Error);
      setConnectionState('error');
      throw error;
    }
  }, []);

  const disconnect = React.useCallback(async () => {
    if (session) {
      try {
        await session.disconnect();
        setSession(null);
        setConnectionState('disconnected');
      } catch (error) {
        setConnectionError(error as Error);
        setConnectionState('error');
        throw error;
      }
    }
  }, [session]);

  const send = React.useCallback(async (data: Uint8Array) => {
    if (!session) {
      throw new Error('No active SSH session');
    }
    return session.send(data);
  }, [session]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (session) {
        session.disconnect().catch(console.error);
      }
    };
  }, [session]);

  return {
    session,
    connectionState,
    connectionError,
    connect,
    disconnect,
    send
  };
}

/**
 * Higher-order component for SSH client initialization
 */
export function withSSHClient<P extends object>(
  Component: any, 
  options: Partial<InitializationOptions> = {}
) {
  if (!React) {
    throw new Error('React is not available. Please install React to use withSSHClient.');
  }

  return React.forwardRef((props: P, ref: any) => {
    const { isInitialized, initError, isLoading } = useSSHClient(options);

    if (isLoading) {
      return React.createElement('div', null, 'Initializing SSH client...');
    }

    if (initError) {
      return React.createElement('div', null, `SSH initialization error: ${initError.message}`);
    }

    if (!isInitialized) {
      return React.createElement('div', null, 'SSH client not initialized');
    }

    return React.createElement(Component, { ...props, ref });
  });
}

/**
 * React context for SSH client
 */
export const SSHClientContext = React?.createContext ? React.createContext(null as {
  isInitialized: boolean;
  initError: Error | null;
  isLoading: boolean;
} | null) : null;

/**
 * SSH client provider component
 */
export function SSHClientProvider({ 
  children, 
  options = {} 
}: { 
  children: any; 
  options?: Partial<InitializationOptions>;
}) {
  if (!React) {
    throw new Error('React is not available. Please install React to use SSHClientProvider.');
  }

  const sshState = useSSHClient(options);

  return React.createElement(
    SSHClientContext.Provider,
    { value: sshState },
    children
  );
}

/**
 * Hook to use SSH client context
 */
export function useSSHClientContext() {
  if (!React) {
    throw new Error('React is not available. Please install React to use useSSHClientContext.');
  }

  const context = React.useContext(SSHClientContext);
  if (!context) {
    throw new Error('useSSHClientContext must be used within an SSHClientProvider');
  }
  return context;
}

export default {
  useSSHClient,
  useSSHConnection,
  withSSHClient,
  SSHClientProvider,
  SSHClientContext,
  useSSHClientContext,
  SSHClient
};