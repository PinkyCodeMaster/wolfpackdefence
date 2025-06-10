import { ThemeProvider } from '../theme/theme-provider';
import { Toaster } from 'sonner';
import React from 'react';

export default function RootProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster richColors position='top-center' />
        </ThemeProvider>
    )
}
