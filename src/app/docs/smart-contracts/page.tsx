'use client';

import { CodeBlock } from '@/components/docs/CodeBlock';
import { Card } from '@/components/ui/card';
import { FileText, Shield, Cpu, AlertTriangle, CheckCircle, Lock } from 'lucide-react';

export default function SmartContractsPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold text-white mb-4">Smart Contracts</h1>
      <p className="text-xl text-slate-400 mb-8">
        Technical documentation for KalshChain's Solana programs, AMM implementation, and on-chain architecture.
      </p>

      {/* Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          <FileText className="inline h-6 w-6 mr-2 text-indigo-400" />
          Program Overview
        </h2>
        
        <p className="text-slate-300 mb-6">
          KalshChain consists of three main Solana programs written in Rust using the Anchor framework:
        </p>

        <div className="grid gap-4 not-prose mb-6">
          <Card className="p-5 bg-slate-800/30 border-slate-700">
            <h4 className="font-semibold text-white mb-2">Market Program</h4>
            <p className="text-sm text-slate-400">
              Handles market creation, resolution, and lifecycle management
            </p>
            <code className="text-xs text-indigo-400 mt-2 block">Address: KaLsH...MkT1</code>
          </Card>

          <Card className="p-5 bg-slate-800/30 border-slate-700">
            <h4 className="font-semibold text-white mb-2">AMM Program</h4>
            <p className="text-sm text-slate-400">
              Automated Market Maker for liquidity pools and trade execution
            </p>
            <code className="text-xs text-indigo-400 mt-2 block">Address: KaLsH...AMM2</code>
          </Card>

          <Card className="p-5 bg-slate-800/30 border-slate-700">
            <h4 className="font-semibold text-white mb-2">Position Program</h4>
            <p className="text-sm text-slate-400">
              Manages user positions, claims, and profit/loss calculations
            </p>
            <code className="text-xs text-indigo-400 mt-2 block">Address: KaLsH...POS3</code>
          </Card>
        </div>
      </section>

      {/* Architecture */}
      <section id="architecture" className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          <Cpu className="inline h-6 w-6 mr-2 text-indigo-400" />
          Program Architecture
        </h2>

        <p className="text-slate-300 mb-6">
          The KalshChain architecture follows a modular design pattern with clear separation of concerns:
        </p>

        <div className="not-prose mb-6">
          <Card className="p-6 bg-slate-900/50 border-slate-700">
            <pre className="text-sm text-slate-300 overflow-x-auto">
{`┌─────────────────────────────────────────┐
│           User Interface                 │
│     (Next.js + Solana Wallet)           │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│        Solana Programs (Rust)           │
├─────────────┬──────────┬────────────────┤
│   Market    │   AMM    │   Position     │
│   Program   │ Program  │   Program      │
└─────────────┴──────────┴────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│          Solana Blockchain              │
│    (Accounts + Transaction Processing)  │
└─────────────────────────────────────────┘`}
            </pre>
          </Card>
        </div>

        <h3 className="text-xl font-semibold text-white mb-4">Account Structure</h3>
        
        <CodeBlock
          language="rust"
          filename="lib.rs"
          code={`// Market Account
#[account]
pub struct Market {
    pub authority: Pubkey,      // Market creator
    pub title: String,          // Market question
    pub description: String,    // Resolution criteria
    pub category: String,       // Market category
    pub expiration: i64,        // Unix timestamp
    pub resolution: Resolution, // YES, NO, or UNRESOLVED
    pub total_volume: u64,      // Total trading volume
    pub status: MarketStatus,   // ACTIVE, CLOSED, RESOLVED
    pub bump: u8,               // PDA bump seed
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq)]
pub enum Resolution {
    Unresolved,
    Yes,
    No,
    Invalid,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq)]
pub enum MarketStatus {
    Active,
    Closed,
    Resolved,
}`}
        />
      </section>

      {/* AMM Implementation */}
      <section id="amm" className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">AMM Implementation</h2>

        <p className="text-slate-300 mb-6">
          KalshChain uses a Constant Product Market Maker (CPMM) with the formula <code className="text-indigo-400">x * y = k</code> where:
        </p>

        <ul className="space-y-2 not-prose mb-6">
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-slate-300"><code className="text-indigo-400">x</code> = YES share reserves</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-slate-300"><code className="text-indigo-400">y</code> = NO share reserves</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-slate-300"><code className="text-indigo-400">k</code> = constant product</span>
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-white mb-4">Liquidity Pool Account</h3>

        <CodeBlock
          language="rust"
          filename="amm/pool.rs"
          code={`#[account]
pub struct LiquidityPool {
    pub market: Pubkey,          // Associated market
    pub yes_reserve: u64,        // YES share reserves
    pub no_reserve: u64,         // NO share reserves
    pub k_constant: u128,        // Constant product k
    pub tvl: u64,                // Total Value Locked
    pub total_volume: u64,       // Cumulative volume
    pub fee_rate: u16,           // Fee in basis points (200 = 2%)
    pub fee_rewards: u64,        // Accumulated fees
    pub bump: u8,
}

impl LiquidityPool {
    pub const FEE_RATE_BPS: u16 = 200; // 2% fee
    pub const BPS_DENOMINATOR: u16 = 10_000;

    /// Calculate output amount for a given input
    pub fn get_output_amount(
        &self,
        input_amount: u64,
        input_reserve: u64,
        output_reserve: u64,
    ) -> Result<u64> {
        // Apply fee
        let input_with_fee = (input_amount as u128)
            .checked_mul((Self::BPS_DENOMINATOR - Self::FEE_RATE_BPS) as u128)
            .unwrap()
            .checked_div(Self::BPS_DENOMINATOR as u128)
            .unwrap();

        // Calculate output using AMM formula
        let numerator = input_with_fee
            .checked_mul(output_reserve as u128)
            .unwrap();
        
        let denominator = (input_reserve as u128)
            .checked_add(input_with_fee)
            .unwrap();

        let output_amount = numerator
            .checked_div(denominator)
            .unwrap() as u64;

        Ok(output_amount)
    }

    /// Calculate current prices
    pub fn get_prices(&self) -> (f64, f64) {
        let total = (self.yes_reserve + self.no_reserve) as f64;
        let yes_price = self.no_reserve as f64 / total;
        let no_price = self.yes_reserve as f64 / total;
        (yes_price, no_price)
    }
}`}
        />
      </section>

      {/* Market Creation */}
      <section id="market-creation" className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Market Creation</h2>

        <p className="text-slate-300 mb-6">
          Creating a market requires initializing both the market account and its liquidity pool:
        </p>

        <CodeBlock
          language="rust"
          filename="instructions/create_market.rs"
          code={`#[derive(Accounts)]
#[instruction(params: CreateMarketParams)]
pub struct CreateMarket<'info> {
    #[account(
        init,
        payer = authority,
        space = Market::LEN,
        seeds = [b"market", authority.key().as_ref(), params.seed.as_ref()],
        bump
    )]
    pub market: Account<'info, Market>,

    #[account(
        init,
        payer = authority,
        space = LiquidityPool::LEN,
        seeds = [b"pool", market.key().as_ref()],
        bump
    )]
    pub pool: Account<'info, LiquidityPool>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<CreateMarket>,
    params: CreateMarketParams,
) -> Result<()> {
    let market = &mut ctx.accounts.market;
    let pool = &mut ctx.accounts.pool;

    // Validate parameters
    require!(
        params.expiration > Clock::get()?.unix_timestamp,
        ErrorCode::InvalidExpiration
    );
    require!(
        params.initial_liquidity >= MIN_LIQUIDITY,
        ErrorCode::InsufficientLiquidity
    );

    // Initialize market
    market.authority = ctx.accounts.authority.key();
    market.title = params.title;
    market.description = params.description;
    market.category = params.category;
    market.expiration = params.expiration;
    market.resolution = Resolution::Unresolved;
    market.status = MarketStatus::Active;
    market.total_volume = 0;
    market.bump = ctx.bumps.market;

    // Initialize liquidity pool (50/50 split)
    let half_liquidity = params.initial_liquidity / 2;
    pool.market = market.key();
    pool.yes_reserve = half_liquidity;
    pool.no_reserve = half_liquidity;
    pool.k_constant = (half_liquidity as u128) * (half_liquidity as u128);
    pool.tvl = params.initial_liquidity;
    pool.total_volume = 0;
    pool.fee_rate = LiquidityPool::FEE_RATE_BPS;
    pool.fee_rewards = 0;
    pool.bump = ctx.bumps.pool;

    emit!(MarketCreatedEvent {
        market: market.key(),
        authority: market.authority,
        title: market.title.clone(),
        expiration: market.expiration,
    });

    Ok(())
}`}
        />
      </section>

      {/* Trade Execution */}
      <section id="trade-execution" className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Trade Execution</h2>

        <p className="text-slate-300 mb-6">
          The trade instruction handles buying and selling of shares through the AMM:
        </p>

        <CodeBlock
          language="rust"
          filename="instructions/execute_trade.rs"
          code={`#[derive(Accounts)]
pub struct ExecuteTrade<'info> {
    #[account(mut)]
    pub market: Account<'info, Market>,

    #[account(
        mut,
        seeds = [b"pool", market.key().as_ref()],
        bump = pool.bump,
    )]
    pub pool: Account<'info, LiquidityPool>,

    #[account(
        init_if_needed,
        payer = trader,
        space = Position::LEN,
        seeds = [b"position", market.key().as_ref(), trader.key().as_ref()],
        bump
    )]
    pub position: Account<'info, Position>,

    #[account(mut)]
    pub trader: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<ExecuteTrade>,
    params: TradeParams,
) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    let market = &ctx.accounts.market;
    let position = &mut ctx.accounts.position;

    // Validate market status
    require!(
        market.status == MarketStatus::Active,
        ErrorCode::MarketNotActive
    );

    // Calculate trade amounts
    let (input_reserve, output_reserve) = match params.outcome {
        Outcome::Yes => (pool.no_reserve, pool.yes_reserve),
        Outcome::No => (pool.yes_reserve, pool.no_reserve),
    };

    let output_amount = if params.side == TradeSide::Buy {
        // Buying shares
        pool.get_output_amount(
            params.input_amount,
            input_reserve,
            output_reserve,
        )?
    } else {
        // Selling shares
        require!(
            position.quantity >= params.input_amount,
            ErrorCode::InsufficientShares
        );
        pool.get_output_amount(
            params.input_amount,
            output_reserve,
            input_reserve,
        )?
    };

    // Calculate fee
    let fee = (params.input_amount as u128)
        .checked_mul(pool.fee_rate as u128)
        .unwrap()
        .checked_div(LiquidityPool::BPS_DENOMINATOR as u128)
        .unwrap() as u64;

    // Update reserves
    if params.side == TradeSide::Buy {
        match params.outcome {
            Outcome::Yes => {
                pool.no_reserve += params.input_amount;
                pool.yes_reserve -= output_amount;
            }
            Outcome::No => {
                pool.yes_reserve += params.input_amount;
                pool.no_reserve -= output_amount;
            }
        }
    } else {
        match params.outcome {
            Outcome::Yes => {
                pool.yes_reserve += params.input_amount;
                pool.no_reserve -= output_amount;
            }
            Outcome::No => {
                pool.no_reserve += params.input_amount;
                pool.yes_reserve -= output_amount;
            }
        }
    }

    // Update position
    if params.side == TradeSide::Buy {
        position.quantity += output_amount;
        position.avg_price = calculate_avg_price(
            position.quantity,
            position.avg_price,
            output_amount,
            params.input_amount as f64 / output_amount as f64,
        );
    } else {
        position.quantity -= params.input_amount;
    }

    // Update pool metrics
    pool.fee_rewards += fee;
    pool.total_volume += params.input_amount;
    market.total_volume += params.input_amount;

    emit!(TradeExecutedEvent {
        market: market.key(),
        trader: ctx.accounts.trader.key(),
        outcome: params.outcome,
        side: params.side,
        quantity: output_amount,
        price: params.input_amount as f64 / output_amount as f64,
        fee,
    });

    Ok(())
}`}
        />
      </section>

      {/* Security */}
      <section id="audits" className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">
          <Shield className="inline h-6 w-6 mr-2 text-emerald-400" />
          Security & Audits
        </h2>

        <div className="not-prose mb-6">
          <Card className="p-6 bg-emerald-500/5 border-emerald-500/20">
            <div className="flex items-start gap-3">
              <Lock className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-white mb-2">Security Features</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">All programs audited by leading security firms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">Time-locked administrative functions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">Comprehensive testing suite with 100% coverage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">Bug bounty program for responsible disclosure</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <div className="not-prose">
          <Card className="p-6 bg-amber-500/5 border-amber-500/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-white mb-2">Risk Disclosures</h4>
                <p className="text-sm text-slate-300 mb-3">
                  While we've taken extensive security measures, users should be aware of inherent risks:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-sm text-slate-300">• Smart contract risk: Potential undiscovered vulnerabilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sm text-slate-300">• Market risk: Prediction market outcomes are uncertain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sm text-slate-300">• Liquidity risk: Large trades may experience slippage</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Testing */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Testing the Programs</h2>

        <p className="text-slate-300 mb-4">
          Run the test suite locally:
        </p>

        <CodeBlock
          language="bash"
          code={`# Install dependencies
pnpm install

# Run unit tests
anchor test

# Run integration tests
pnpm test:integration

# Generate coverage report
cargo tarpaulin --out Html`}
        />
      </section>
    </div>
  );
}
