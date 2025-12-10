import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { WalletProvider } from '@/providers/WalletProvider';
import { Navbar } from '@/components/Navbar';
import { InteractiveBackground } from '@/components/InteractiveBackground';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'KalshChain - Decentralized Prediction Market Platform',
  description: 'Trade on the future with blockchain transparency. Decentralized prediction markets for crypto, politics, economics, sports, and more. Powered by Solana.',
  keywords: 'prediction market, decentralized, blockchain, Solana, crypto, trading, AMM',
  icons: {
    icon: '/logo.jpeg',
    shortcut: '/logo.jpeg',
    apple: '/logo.jpeg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900 min-h-screen relative selection:bg-cyan-primary-100 selection:text-cyan-primary-900`}
      >
        {/* Global Interactive Background */}
        <InteractiveBackground />

        <WalletProvider>
          <Navbar />
          <main className="pb-20 relative z-10">
            {children}
          </main>
        </WalletProvider>
      </body>
    </html>
  );
}