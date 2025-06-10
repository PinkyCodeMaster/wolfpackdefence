import MainHeader from "@/components/layout/main-header";
import React from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header>
                <MainHeader />
            </header>
            <main className="min-h-screen">
                {children}
            </main>
            <footer className="bg-gray-100 text-center py-4">
                <p className="text-sm text-gray-600">© 2023 Your Company. All rights reserved.</p>
            </footer>
        </>
    )
}
