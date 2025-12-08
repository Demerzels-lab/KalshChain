'use client';

import { CodeBlock } from '@/components/docs/CodeBlock';
import { Card } from '@/components/ui/card';
import { Shield, Lock, Key, AlertTriangle, CheckCircle, Eye } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold text-white mb-4">Security</h1>
      <p className="text-xl text-slate-400 mb-8">
        Learn about KalshChain's multi-layered security architecture and best practices to keep your funds safe.
      </p>

      {/* Security Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          <Shield className="inline h-6 w-6 mr-2 text-emerald-400" />
          Security Architecture
        </h2>
        
        <p className="text-slate-300 mb-6">
          KalshChain implements multiple security layers to protect user funds and data. Our non-custodial design means you always retain full control of your assets.
        </p>

        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="p-6 bg-emerald-500/5 border-emerald-500/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <CheckCircle className="h-5 w-5" />
              </div>
              <h4 className="font-semibold text-white">Non-Custodial</h4>
            </div>
            <p className="text-sm text-slate-400">
              Your private keys never leave your wallet. KalshChain cannot access or freeze your funds.
            </p>
          </Card>

          <Card className="p-6 bg-indigo-500/5 border-indigo-500/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Lock className="h-5 w-5" />
              </div>
              <h4 className="font-semibold text-white">Smart Contract Audits</h4>
            </div>
            <p className="text-sm text-slate-400">
              All on-chain programs undergo third-party security audits before deployment.
            </p>
          </Card>

          <Card className="p-6 bg-purple-500/5 border-purple-500/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Key className="h-5 w-5" />
              </div>
              <h4 className="font-semibold text-white">Encrypted Data</h4>
            </div>
            <p className="text-sm text-slate-400">
              All data in transit uses TLS 1.3. Database stores only public wallet addresses.
            </p>
          </Card>

          <Card className="p-6 bg-yellow-500/5 border-yellow-500/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-yellow-500/10 text-yellow-400 flex items-center justify-center">
                <Eye className="h-5 w-5" />
              </div>
              <h4 className="font-semibold text-white">Open Source</h4>
            </div>
            <p className="text-sm text-slate-400">
              Smart contracts are publicly verifiable on Solana blockchain for transparency.
            </p>
          </Card>
        </div>
      </section>

      {/* Wallet Security */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          <Key className="inline h-6 w-6 mr-2 text-purple-400" />
          Wallet Security Best Practices
        </h2>
        
        <h3 className="text-xl font-semibold text-white mb-3">Seed Phrase Protection</h3>
        <p className="text-slate-300 mb-4">
          Your seed phrase is the master key to your wallet. Anyone with access to it can steal all your funds.
        </p>

        <div className="not-prose mb-6">
          <Card className="p-6 bg-rose-500/5 border-rose-500/20">
            <h4 className="font-semibold text-rose-400 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Critical Security Rules
            </h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-rose-400">•</span>
                <span><strong>Never share</strong> your seed phrase with anyone, including KalshChain team</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400">•</span>
                <span><strong>Never store</strong> seed phrases digitally (screenshots, cloud, email)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400">•</span>
                <span><strong>Write it down</strong> on paper and store in a secure physical location</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400">•</span>
                <span><strong>Never enter</strong> your seed phrase on suspicious websites</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400">•</span>
                <span><strong>Use hardware wallets</strong> for large amounts (Ledger, Trezor)</span>
              </li>
            </ul>
          </Card>
        </div>

        <h3 className="text-xl font-semibold text-white mb-3 mt-8">Transaction Verification</h3>
        <p className="text-slate-300 mb-4">
          Always verify transaction details before signing:
        </p>

        <CodeBlock
          language="typescript"
          filename="transaction-verification.ts"
          code={`// Check transaction details before signing
async function verifyTransaction(tx: Transaction) {
  // 1. Verify recipient address
  console.log('Sending to:', tx.to);
  console.log('Amount:', tx.amount);
  
  // 2. Check contract interaction
  if (tx.data) {
    const decoded = decodeTransaction(tx.data);
    console.log('Contract method:', decoded.method);
    console.log('Parameters:', decoded.params);
  }
  
  // 3. Verify expected outcome
  const expectedOutcome = calculateExpectedOutcome(tx);
  console.log('Expected result:', expectedOutcome);
  
  // 4. Only sign if everything matches expectations
  if (userConfirmsDetails()) {
    return await wallet.signTransaction(tx);
  }
  
  throw new Error('Transaction cancelled by user');
}`}
        />
      </section>

      {/* Smart Contract Security */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          <Lock className="inline h-6 w-6 mr-2 text-indigo-400" />
          Smart Contract Security
        </h2>
        
        <h3 className="text-xl font-semibold text-white mb-3">Audit Process</h3>
        <p className="text-slate-300 mb-4">
          All KalshChain smart contracts undergo rigorous security audits:
        </p>

        <div className="not-prose mb-6">
          <table className="w-full border border-slate-700">
            <thead>
              <tr className="bg-slate-800">
                <th className="p-3 text-left text-white border-b border-slate-700">Audit Phase</th>
                <th className="p-3 text-left text-white border-b border-slate-700">Focus Areas</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-700">
                <td className="p-3 text-slate-300">Static Analysis</td>
                <td className="p-3 text-slate-400">Automated tools scan for common vulnerabilities</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="p-3 text-slate-300">Manual Review</td>
                <td className="p-3 text-slate-400">Security experts review code logic and architecture</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="p-3 text-slate-300">Fuzzing & Testing</td>
                <td className="p-3 text-slate-400">Stress testing with random inputs to find edge cases</td>
              </tr>
              <tr>
                <td className="p-3 text-slate-300">Economic Analysis</td>
                <td className="p-3 text-slate-400">Verify AMM formulas and incentive structures</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold text-white mb-3 mt-8">Access Controls</h3>
        <CodeBlock
          language="rust"
          filename="access-control.rs"
          code={`// Solana program access control example
#[program]
pub mod kalshchain_market {
    use super::*;
    
    // Only market creator can resolve
    pub fn resolve_market(
        ctx: Context<ResolveMarket>,
        outcome: Outcome
    ) -> Result<()> {
        let market = &mut ctx.accounts.market;
        
        // Verify caller is authorized oracle
        require!(
            ctx.accounts.oracle.key() == market.oracle_address,
            ErrorCode::UnauthorizedOracle
        );
        
        // Verify market is expired
        require!(
            Clock::get()?.unix_timestamp > market.expiration,
            ErrorCode::MarketNotExpired
        );
        
        market.status = MarketStatus::Resolved;
        market.winning_outcome = outcome;
        
        Ok(())
    }
    
    // Emergency pause (multi-sig admin only)
    pub fn emergency_pause(
        ctx: Context<EmergencyPause>
    ) -> Result<()> {
        require!(
            ctx.accounts.admin.is_signer,
            ErrorCode::UnauthorizedAdmin
        );
        
        let market = &mut ctx.accounts.market;
        market.status = MarketStatus::Paused;
        
        emit!(EmergencyPauseEvent {
            market: market.key(),
            timestamp: Clock::get()?.unix_timestamp
        });
        
        Ok(())
    }
}`}
        />
      </section>

      {/* API Security */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">API Security</h2>
        
        <h3 className="text-xl font-semibold text-white mb-3">Rate Limiting</h3>
        <p className="text-slate-300 mb-4">
          To prevent abuse, API endpoints have rate limits:
        </p>

        <div className="not-prose mb-6">
          <table className="w-full border border-slate-700">
            <thead>
              <tr className="bg-slate-800">
                <th className="p-3 text-left text-white border-b border-slate-700">Endpoint Type</th>
                <th className="p-3 text-right text-white border-b border-slate-700">Rate Limit</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-700">
                <td className="p-3 text-slate-300">Public endpoints</td>
                <td className="p-3 text-right text-slate-400">100 requests / minute</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="p-3 text-slate-300">Authenticated reads</td>
                <td className="p-3 text-right text-slate-400">300 requests / minute</td>
              </tr>
              <tr>
                <td className="p-3 text-slate-300">Trading endpoints</td>
                <td className="p-3 text-right text-slate-400">10 requests / minute</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold text-white mb-3 mt-8">Request Signing</h3>
        <CodeBlock
          language="typescript"
          filename="api-authentication.ts"
          code={`// Sign API requests with wallet
import { sign } from 'tweetnacl';
import bs58 from 'bs58';

async function authenticatedRequest(
  endpoint: string,
  data: any,
  wallet: WalletAdapter
) {
  // 1. Create message to sign
  const timestamp = Date.now();
  const message = JSON.stringify({
    endpoint,
    data,
    timestamp
  });
  
  // 2. Sign message with wallet
  const messageBytes = new TextEncoder().encode(message);
  const signature = await wallet.signMessage(messageBytes);
  
  // 3. Send request with signature
  const response = await fetch(\`https://api.kalshchain.com/v1\${endpoint}\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Wallet-Address': wallet.publicKey.toBase58(),
      'X-Signature': bs58.encode(signature),
      'X-Timestamp': timestamp.toString()
    },
    body: JSON.stringify(data)
  });
  
  return response.json();
}`}
        />
      </section>

      {/* Common Threats */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          <AlertTriangle className="inline h-6 w-6 mr-2 text-yellow-400" />
          Common Threats & Protection
        </h2>
        
        <div className="not-prose space-y-4">
          <Card className="p-5 border-red-500/20">
            <h4 className="font-semibold text-white mb-2">Phishing Attacks</h4>
            <p className="text-sm text-slate-400 mb-3">
              Scammers create fake websites that look like KalshChain to steal your seed phrase.
            </p>
            <div className="text-sm text-emerald-400">
              ✓ Always verify URL is https://kalshchain.com
            </div>
            <div className="text-sm text-emerald-400">
              ✓ Bookmark the official website
            </div>
            <div className="text-sm text-emerald-400">
              ✓ Never enter seed phrase on any website
            </div>
          </Card>

          <Card className="p-5 border-red-500/20">
            <h4 className="font-semibold text-white mb-2">Malicious Transactions</h4>
            <p className="text-sm text-slate-400 mb-3">
              Attackers trick users into signing transactions that drain wallets.
            </p>
            <div className="text-sm text-emerald-400">
              ✓ Always review transaction details before signing
            </div>
            <div className="text-sm text-emerald-400">
              ✓ Verify contract addresses and amounts
            </div>
            <div className="text-sm text-emerald-400">
              ✓ Use hardware wallets for extra security
            </div>
          </Card>

          <Card className="p-5 border-red-500/20">
            <h4 className="font-semibold text-white mb-2">Smart Contract Exploits</h4>
            <p className="text-sm text-slate-400 mb-3">
              Vulnerabilities in smart contracts can be exploited to steal funds.
            </p>
            <div className="text-sm text-emerald-400">
              ✓ We conduct regular security audits
            </div>
            <div className="text-sm text-emerald-400">
              ✓ Bug bounty program rewards vulnerability disclosure
            </div>
            <div className="text-sm text-emerald-400">
              ✓ Emergency pause mechanism for critical issues
            </div>
          </Card>
        </div>
      </section>

      {/* Reporting */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Security Disclosure</h2>
        <p className="text-slate-300 mb-4">
          Found a security vulnerability? We appreciate responsible disclosure.
        </p>

        <div className="not-prose">
          <Card className="p-6 bg-indigo-500/5 border-indigo-500/20">
            <h4 className="font-semibold text-white mb-3">Bug Bounty Program</h4>
            <p className="text-slate-300 mb-4">
              Report security vulnerabilities to <code className="text-indigo-400 bg-slate-800 px-2 py-1 rounded">security@kalshchain.com</code>
            </p>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Critical vulnerabilities: Up to $50,000 reward</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>High severity: Up to $10,000 reward</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Medium/Low: Up to $1,000 reward</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
}
