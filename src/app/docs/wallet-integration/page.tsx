import { CodeBlock } from '@/components/docs/CodeBlock';

export default function WalletIntegrationPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Wallet Integration</h1>
      <p className="text-gray-400 text-lg mb-8">
        Panduan lengkap untuk mengintegrasikan wallet Solana dengan KalshChain, termasuk 
        connection management, transaction signing, dan security best practices.
      </p>

      {/* Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Overview</h2>
        <p className="text-gray-300 mb-4">
          KalshChain mendukung semua wallet Solana yang kompatibel dengan Wallet Adapter standard, 
          termasuk Phantom, Solflare, Backpack, dan lainnya. Wallet integration menggunakan 
          <code className="text-purple-400 mx-1">@solana/wallet-adapter-react</code> library 
          untuk consistent experience.
        </p>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-purple-300">Supported Wallets</h3>
          <ul className="grid grid-cols-2 gap-3 text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-purple-400">✓</span> Phantom
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-400">✓</span> Solflare
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-400">✓</span> Backpack
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-400">✓</span> Glow
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-400">✓</span> Slope
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-400">✓</span> Ledger
            </li>
          </ul>
        </div>
      </section>

      {/* Installation */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Installation</h2>
        <p className="text-gray-300 mb-4">
          Install dependencies yang diperlukan untuk wallet integration.
        </p>

        <CodeBlock language="bash" code={`# Install Solana wallet adapter
npm install @solana/wallet-adapter-react \\
            @solana/wallet-adapter-react-ui \\
            @solana/wallet-adapter-wallets \\
            @solana/web3.js

# Install specific wallet adapters
npm install @solana/wallet-adapter-phantom \\
            @solana/wallet-adapter-solflare \\
            @solana/wallet-adapter-backpack`} />
      </section>

      {/* Setup */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Wallet Setup</h2>
        <p className="text-gray-300 mb-4">
          Configure wallet adapter provider di root application Anda.
        </p>

        <h3 className="text-xl font-semibold mb-3 mt-6">Provider Configuration</h3>
        <CodeBlock language="typescript" code={`import { useMemo } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  BackpackWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';

export default function WalletContextProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  // Network bisa 'devnet', 'testnet', atau 'mainnet-beta'
  const network = WalletAdapterNetwork.Mainnet;
  
  // RPC endpoint
  const endpoint = useMemo(() => {
    if (network === WalletAdapterNetwork.Mainnet) {
      // Use custom RPC untuk better performance
      return process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 
             'https://api.mainnet-beta.solana.com';
    }
    return clusterApiUrl(network);
  }, [network]);
  
  // Initialize wallet adapters
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new BackpackWalletAdapter(),
    ],
    []
  );
  
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}`} />

        <h3 className="text-xl font-semibold mb-3 mt-6">App Integration</h3>
        <CodeBlock language="typescript" code={`// app/layout.tsx
import WalletContextProvider from '@/components/WalletContextProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <WalletContextProvider>
          {children}
        </WalletContextProvider>
      </body>
    </html>
  );
}`} />
      </section>

      {/* Wallet Connection */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Wallet Connection</h2>
        <p className="text-gray-300 mb-4">
          Implement wallet connection UI dan handle connection states.
        </p>

        <h3 className="text-xl font-semibold mb-3 mt-6">Connect Button Component</h3>
        <CodeBlock language="typescript" code={`'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export function WalletConnectButton() {
  return (
    <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700" />
  );
}

// Custom connect button dengan styling
export function CustomWalletButton() {
  const { wallet, connect, disconnect, connecting, connected } = useWallet();
  
  const handleClick = async () => {
    if (connected) {
      await disconnect();
    } else {
      await connect();
    }
  };
  
  return (
    <button
      onClick={handleClick}
      disabled={connecting}
      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 
                 rounded-lg font-semibold transition-colors
                 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {connecting && 'Connecting...'}
      {connected && 'Disconnect'}
      {!connecting && !connected && 'Connect Wallet'}
    </button>
  );
}`} />

        <h3 className="text-xl font-semibold mb-3 mt-6">Wallet State Management</h3>
        <CodeBlock language="typescript" code={`'use client';

import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

export function WalletInfo() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);
  
  useEffect(() => {
    if (!publicKey) {
      setBalance(null);
      return;
    }
    
    // Fetch balance
    const fetchBalance = async () => {
      try {
        const bal = await connection.getBalance(publicKey);
        setBalance(bal / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };
    
    fetchBalance();
    
    // Subscribe ke balance changes
    const subscriptionId = connection.onAccountChange(
      publicKey,
      (accountInfo) => {
        setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
      }
    );
    
    return () => {
      connection.removeAccountChangeListener(subscriptionId);
    };
  }, [publicKey, connection]);
  
  if (!connected || !publicKey) {
    return <div>Wallet not connected</div>;
  }
  
  return (
    <div className="space-y-2">
      <div className="text-sm text-gray-400">Address:</div>
      <div className="font-mono text-sm">
        {publicKey.toBase58().slice(0, 4)}...
        {publicKey.toBase58().slice(-4)}
      </div>
      
      <div className="text-sm text-gray-400">Balance:</div>
      <div className="text-xl font-semibold">
        {balance !== null ? \`\${balance.toFixed(4)} SOL\` : 'Loading...'}
      </div>
    </div>
  );
}`} />

        <h3 className="text-xl font-semibold mb-3 mt-6">Auto-Connect Handling</h3>
        <CodeBlock language="typescript" code={`import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';

export function useAutoConnect() {
  const { wallet, connect, connected, connecting } = useWallet();
  
  useEffect(() => {
    // Check if user previously connected
    const wasConnected = localStorage.getItem('walletConnected') === 'true';
    
    if (wasConnected && !connected && !connecting && wallet) {
      connect().catch((error) => {
        console.error('Auto-connect failed:', error);
        localStorage.removeItem('walletConnected');
      });
    }
  }, [wallet, connect, connected, connecting]);
  
  useEffect(() => {
    // Save connection state
    if (connected) {
      localStorage.setItem('walletConnected', 'true');
    } else {
      localStorage.removeItem('walletConnected');
    }
  }, [connected]);
}`} />
      </section>

      {/* Transaction Signing */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Transaction Signing</h2>
        <p className="text-gray-300 mb-4">
          Handle transaction creation, signing, dan submission ke Solana network.
        </p>

        <h3 className="text-xl font-semibold mb-3 mt-6">Basic Transaction</h3>
        <CodeBlock language="typescript" code={`import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { 
  Transaction, 
  SystemProgram, 
  PublicKey,
  LAMPORTS_PER_SOL 
} from '@solana/web3.js';

export async function sendSOL(
  recipientAddress: string,
  amount: number
) {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  
  if (!publicKey) {
    throw new Error('Wallet not connected');
  }
  
  // Create transaction
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: new PublicKey(recipientAddress),
      lamports: amount * LAMPORTS_PER_SOL,
    })
  );
  
  // Get recent blockhash
  const { blockhash, lastValidBlockHeight } = 
    await connection.getLatestBlockhash();
  
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = publicKey;
  
  // Send transaction
  const signature = await sendTransaction(transaction, connection);
  
  // Confirm transaction
  await connection.confirmTransaction({
    signature,
    blockhash,
    lastValidBlockHeight,
  });
  
  return signature;
}`} />

        <h3 className="text-xl font-semibold mb-3 mt-6">Program Interaction</h3>
        <CodeBlock language="typescript" code={`import { 
  Transaction, 
  TransactionInstruction,
  PublicKey 
} from '@solana/web3.js';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Execute trade di KalshChain program
export async function executeTrade(
  marketId: string,
  outcome: 'YES' | 'NO',
  amount: number
) {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  
  if (!publicKey) {
    throw new Error('Wallet not connected');
  }
  
  // Program ID (contoh)
  const PROGRAM_ID = new PublicKey('KALSHxxx...');
  
  // Derive PDAs
  const [marketPDA] = await PublicKey.findProgramAddress(
    [Buffer.from('market'), Buffer.from(marketId)],
    PROGRAM_ID
  );
  
  const [poolPDA] = await PublicKey.findProgramAddress(
    [Buffer.from('pool'), marketPDA.toBuffer()],
    PROGRAM_ID
  );
  
  // Create instruction data
  const instructionData = Buffer.from([
    1, // instruction index (1 = execute_trade)
    outcome === 'YES' ? 0 : 1,
    ...new Uint8Array(new BigUint64Array([BigInt(amount)]).buffer)
  ]);
  
  // Create instruction
  const instruction = new TransactionInstruction({
    keys: [
      { pubkey: publicKey, isSigner: true, isWritable: true },
      { pubkey: marketPDA, isSigner: false, isWritable: true },
      { pubkey: poolPDA, isSigner: false, isWritable: true },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    programId: PROGRAM_ID,
    data: instructionData,
  });
  
  // Create dan send transaction
  const transaction = new Transaction().add(instruction);
  const signature = await sendTransaction(transaction, connection);
  
  // Wait for confirmation
  const confirmation = await connection.confirmTransaction(signature, 'confirmed');
  
  if (confirmation.value.err) {
    throw new Error('Transaction failed');
  }
  
  return signature;
}`} />

        <h3 className="text-xl font-semibold mb-3 mt-6">Multiple Instructions</h3>
        <CodeBlock language="typescript" code={`// Batch multiple operations dalam satu transaction
export async function batchTrades(
  trades: Array<{
    marketId: string;
    outcome: 'YES' | 'NO';
    amount: number;
  }>
) {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  
  if (!publicKey) {
    throw new Error('Wallet not connected');
  }
  
  const transaction = new Transaction();
  
  // Add instruction untuk setiap trade
  for (const trade of trades) {
    const instruction = await createTradeInstruction(
      trade.marketId,
      trade.outcome,
      trade.amount,
      publicKey
    );
    transaction.add(instruction);
  }
  
  // Send single transaction dengan multiple instructions
  const signature = await sendTransaction(transaction, connection);
  
  await connection.confirmTransaction(signature, 'confirmed');
  
  return signature;
}`} />

        <h3 className="text-xl font-semibold mb-3 mt-6">Transaction Status Tracking</h3>
        <CodeBlock language="typescript" code={`export async function trackTransaction(
  signature: string,
  connection: Connection
): Promise<'confirmed' | 'finalized' | 'failed'> {
  // Wait for confirmation
  const confirmation = await connection.confirmTransaction(
    signature,
    'confirmed'
  );
  
  if (confirmation.value.err) {
    return 'failed';
  }
  
  // Optional: wait for finalization
  await connection.confirmTransaction(signature, 'finalized');
  
  return 'finalized';
}

// Usage dengan loading states
export function useTransactionStatus(signature: string | null) {
  const { connection } = useConnection();
  const [status, setStatus] = useState<'pending' | 'confirmed' | 'finalized' | 'failed'>('pending');
  
  useEffect(() => {
    if (!signature) return;
    
    trackTransaction(signature, connection)
      .then(setStatus)
      .catch(() => setStatus('failed'));
  }, [signature, connection]);
  
  return status;
}`} />
      </section>

      {/* Error Handling */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Error Handling</h2>
        <p className="text-gray-300 mb-4">
          Handle berbagai error scenarios dalam wallet interactions.
        </p>

        <CodeBlock language="typescript" code={`// Comprehensive error handling
export class WalletError extends Error {
  constructor(
    message: string,
    public code: WalletErrorCode,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'WalletError';
  }
}

export enum WalletErrorCode {
  NOT_CONNECTED = 'NOT_CONNECTED',
  USER_REJECTED = 'USER_REJECTED',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  TRANSACTION_FAILED = 'TRANSACTION_FAILED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNKNOWN = 'UNKNOWN',
}

export function handleWalletError(error: any): WalletError {
  // User rejected transaction
  if (error.message?.includes('User rejected')) {
    return new WalletError(
      'Transaction was rejected by user',
      WalletErrorCode.USER_REJECTED,
      error
    );
  }
  
  // Insufficient funds
  if (error.message?.includes('insufficient')) {
    return new WalletError(
      'Insufficient funds for transaction',
      WalletErrorCode.INSUFFICIENT_FUNDS,
      error
    );
  }
  
  // Transaction simulation failed
  if (error.message?.includes('simulation failed')) {
    return new WalletError(
      'Transaction simulation failed',
      WalletErrorCode.TRANSACTION_FAILED,
      error
    );
  }
  
  // Network errors
  if (error.message?.includes('fetch') || error.message?.includes('network')) {
    return new WalletError(
      'Network error occurred',
      WalletErrorCode.NETWORK_ERROR,
      error
    );
  }
  
  // Unknown error
  return new WalletError(
    error.message || 'Unknown wallet error',
    WalletErrorCode.UNKNOWN,
    error
  );
}

// Usage example
export async function safeExecuteTrade(params: TradeParams) {
  try {
    const signature = await executeTrade(
      params.marketId,
      params.outcome,
      params.amount
    );
    
    return { success: true, signature };
    
  } catch (error) {
    const walletError = handleWalletError(error);
    
    // Log error
    console.error('Trade failed:', walletError);
    
    // Show user-friendly message
    switch (walletError.code) {
      case WalletErrorCode.USER_REJECTED:
        return { success: false, error: 'You cancelled the transaction' };
        
      case WalletErrorCode.INSUFFICIENT_FUNDS:
        return { success: false, error: 'Insufficient balance' };
        
      case WalletErrorCode.TRANSACTION_FAILED:
        return { success: false, error: 'Transaction failed. Please try again' };
        
      case WalletErrorCode.NETWORK_ERROR:
        return { success: false, error: 'Network error. Please check your connection' };
        
      default:
        return { success: false, error: 'An error occurred. Please try again' };
    }
  }
}`} />
      </section>

      {/* Security Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Security Best Practices</h2>
        <p className="text-gray-300 mb-4">
          Implementasi security measures untuk protect user funds dan data.
        </p>

        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-purple-300">1. Transaction Verification</h3>
            <p className="text-gray-300 mb-3">
              Selalu verify transaction details sebelum signing.
            </p>
            <CodeBlock language="typescript" code={`export function TransactionPreview({ 
  transaction 
}: { 
  transaction: Transaction 
}) {
  const instructions = transaction.instructions;
  
  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h4 className="font-semibold mb-2">Transaction Details</h4>
      
      <div className="space-y-2 text-sm">
        <div>
          <span className="text-gray-400">Instructions:</span>
          <span className="ml-2">{instructions.length}</span>
        </div>
        
        <div>
          <span className="text-gray-400">Fee Payer:</span>
          <span className="ml-2 font-mono text-xs">
            {transaction.feePayer?.toBase58().slice(0, 8)}...
          </span>
        </div>
        
        {/* Show instruction details */}
        {instructions.map((ix, i) => (
          <div key={i} className="border-t border-gray-700 pt-2 mt-2">
            <div className="text-gray-400">Instruction {i + 1}:</div>
            <div className="font-mono text-xs">
              Program: {ix.programId.toBase58().slice(0, 8)}...
            </div>
            <div className="text-xs text-gray-400">
              Accounts: {ix.keys.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`} />
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-purple-300">2. Amount Validation</h3>
            <p className="text-gray-300 mb-3">
              Validate amounts sebelum creating transactions.
            </p>
            <CodeBlock language="typescript" code={`export function validateTradeAmount(
  amount: number,
  balance: number,
  maxAmount?: number
): { valid: boolean; error?: string } {
  // Check positive
  if (amount <= 0) {
    return { 
      valid: false, 
      error: 'Amount must be positive' 
    };
  }
  
  // Check minimum
  const MIN_TRADE = 0.01;
  if (amount < MIN_TRADE) {
    return { 
      valid: false, 
      error: \`Minimum trade amount is \${MIN_TRADE}\` 
    };
  }
  
  // Check balance
  if (amount > balance) {
    return { 
      valid: false, 
      error: 'Insufficient balance' 
    };
  }
  
  // Check maximum
  if (maxAmount && amount > maxAmount) {
    return { 
      valid: false, 
      error: \`Maximum trade amount is \${maxAmount}\` 
    };
  }
  
  return { valid: true };
}`} />
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-purple-300">3. Rate Limiting</h3>
            <p className="text-gray-300 mb-3">
              Implement rate limiting untuk prevent spam transactions.
            </p>
            <CodeBlock language="typescript" code={`class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private limit: number;
  private window: number; // milliseconds
  
  constructor(limit: number = 10, windowMs: number = 60000) {
    this.limit = limit;
    this.window = windowMs;
  }
  
  canMakeRequest(userId: string): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(userId) || [];
    
    // Remove old requests outside window
    const recentRequests = userRequests.filter(
      time => now - time < this.window
    );
    
    if (recentRequests.length >= this.limit) {
      return false;
    }
    
    // Add current request
    recentRequests.push(now);
    this.requests.set(userId, recentRequests);
    
    return true;
  }
}

// Usage
const rateLimiter = new RateLimiter(10, 60000); // 10 req/min

export async function rateLimitedTrade(userId: string, params: TradeParams) {
  if (!rateLimiter.canMakeRequest(userId)) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }
  
  return await executeTrade(params.marketId, params.outcome, params.amount);
}`} />
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-purple-300">4. Secure Storage</h3>
            <p className="text-gray-300 mb-3">
              Never store private keys atau sensitive data di frontend.
            </p>
            <CodeBlock language="typescript" code={`// ❌ WRONG - Never do this
const PRIVATE_KEY = 'xxx...'; // Never hardcode

// ❌ WRONG - Never store in localStorage
localStorage.setItem('privateKey', privateKey);

// ✅ CORRECT - Let wallet manage keys
const { publicKey, signTransaction } = useWallet();

// ✅ CORRECT - Only store public data
localStorage.setItem('walletConnected', 'true');
localStorage.setItem('preferredWallet', walletName);

// ✅ CORRECT - Use session for temporary data
sessionStorage.setItem('pendingTrade', JSON.stringify(tradeData));`} />
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-purple-300">5. Network Security</h3>
            <p className="text-gray-300 mb-3">
              Use secure RPC endpoints dan verify network.
            </p>
            <CodeBlock language="typescript" code={`// Use environment variables untuk RPC URLs
const RPC_ENDPOINT = process.env.NEXT_PUBLIC_SOLANA_RPC_URL;

// Verify network before transactions
export async function verifyNetwork(connection: Connection) {
  const genesisHash = await connection.getGenesisHash();
  
  // Mainnet genesis hash
  const MAINNET_GENESIS = '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d';
  
  if (genesisHash !== MAINNET_GENESIS) {
    throw new Error('Connected to wrong network');
  }
}

// Use HTTPS untuk all API calls
const API_ENDPOINT = 'https://api.kalshchain.com'; // Not HTTP`} />
          </div>
        </div>
      </section>

      {/* Testing */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Testing Wallet Integration</h2>
        <p className="text-gray-300 mb-4">
          Test wallet functionality di development environment.
        </p>

        <CodeBlock language="typescript" code={`// Mock wallet untuk testing
export class MockWallet {
  publicKey: PublicKey;
  
  constructor() {
    // Generate random keypair untuk testing
    const keypair = Keypair.generate();
    this.publicKey = keypair.publicKey;
  }
  
  async signTransaction(transaction: Transaction): Promise<Transaction> {
    // Simulate signing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return transaction;
  }
  
  async signAllTransactions(
    transactions: Transaction[]
  ): Promise<Transaction[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return transactions;
  }
}

// Test helper
export async function testWalletConnection() {
  const mockWallet = new MockWallet();
  console.log('Test wallet address:', mockWallet.publicKey.toBase58());
  
  // Test transaction signing
  const transaction = new Transaction();
  const signed = await mockWallet.signTransaction(transaction);
  
  console.log('Transaction signed successfully');
  return true;
}`} />
      </section>

      {/* Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Troubleshooting</h2>
        
        <div className="space-y-4">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 text-purple-300">
              Wallet tidak terdeteksi
            </h3>
            <p className="text-gray-300 mb-2">
              Ensure wallet extension terinstall dan enabled. Check console untuk errors.
            </p>
            <CodeBlock language="typescript" code={`if (typeof window.solana === 'undefined') {
  console.error('Phantom wallet not detected');
  // Show install prompt
}`} />
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 text-purple-300">
              Transaction timeout
            </h3>
            <p className="text-gray-300 mb-2">
              Increase timeout atau retry dengan fresh blockhash.
            </p>
            <CodeBlock language="typescript" code={`const signature = await sendTransaction(transaction, connection, {
  skipPreflight: false,
  preflightCommitment: 'confirmed',
  maxRetries: 3,
});`} />
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 text-purple-300">
              Blockhash not found
            </h3>
            <p className="text-gray-300 mb-2">
              Get fresh blockhash sebelum sending transaction.
            </p>
            <CodeBlock language="typescript" code={`const { blockhash } = await connection.getLatestBlockhash('finalized');
transaction.recentBlockhash = blockhash;`} />
          </div>
        </div>
      </section>
    </div>
  );
}
