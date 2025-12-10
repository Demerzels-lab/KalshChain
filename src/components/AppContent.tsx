'use client';

import { useLoading } from '@/contexts/LoadingContext';
import { WalletProvider } from '@/providers/WalletProvider';
import { Navbar } from '@/components/Navbar';
import { InteractiveBackground } from '@/components/InteractiveBackground';

export function AppContent({ children }: { children: React.ReactNode }) {
  const { isLoading } = useLoading();

  return (
    <>
      {/* Global Interactive Background */}
      <InteractiveBackground />

      <WalletProvider>
        {!isLoading && <Navbar />}
        <main className="pb-20 relative z-10">
          {children}
        </main>
      </WalletProvider>
    </>
  );
}