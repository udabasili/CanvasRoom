import React from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {HelmetProvider} from "react-helmet-async";
import {ErrorBoundary} from "react-error-boundary";


type AppProviderProps = {
    children: React.ReactNode
}

const queryClient = new QueryClient()


export const AppProvider = ({children}: AppProviderProps) => {
    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <HelmetProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </HelmetProvider>
        </ErrorBoundary>
    )
}