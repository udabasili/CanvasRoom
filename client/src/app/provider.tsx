import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';

import { AuthMainContext } from '@/lib/auth-context.tsx';
import SideDrawerContext from '@/lib/side-drawer-context.tsx';
import 'react-toastify/dist/ReactToastify.css';
import { SocketProvider } from '@/lib/socket-context.tsx';
import { ErrorProvider } from '@/lib/error-context.tsx';

type AppProviderProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <ErrorProvider>
        <SocketProvider>
          <AuthMainContext>
            <SideDrawerContext>
              <HelmetProvider>
                <QueryClientProvider client={queryClient}>
                  <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />
                  {children}
                </QueryClientProvider>
              </HelmetProvider>
            </SideDrawerContext>
          </AuthMainContext>
        </SocketProvider>
      </ErrorProvider>
    </ErrorBoundary>
  );
};
