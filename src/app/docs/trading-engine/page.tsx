import { CodeBlock } from '@/components/docs/CodeBlock';

export default function TradingEnginePage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Trading Engine</h1>
      <p className="text-gray-400 text-lg mb-8">
        Memahami mekanisme trading engine KalshChain, implementasi AMM (Automated Market Maker), 
        manajemen liquidity pools, dan pricing formulas.
      </p>

      {/* AMM Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Automated Market Maker (AMM)</h2>
        <p className="text-gray-300 mb-4">
          KalshChain menggunakan Constant Product Market Maker (CPMM) model yang telah dioptimasi 
          untuk prediction markets. Berbeda dengan traditional order books, AMM menggunakan mathematical 
          formulas untuk menentukan harga berdasarkan liquidity pool reserves.
        </p>

        <h3 className="text-xl font-semibold mb-3 mt-6">Core Principles</h3>
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-4">
          <h4 className="text-lg font-semibold mb-3 text-purple-300">Constant Product Formula</h4>
          <p className="text-gray-300 mb-3">
            Formula dasar yang mengatur liquidity pool:
          </p>
          <div className="bg-gray-900 p-4 rounded font-mono text-sm text-center mb-4">
            <span className="text-yellow-400">x × y = k</span>
          </div>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li><code className="text-purple-400">x</code> = Reserve token YES dalam pool</li>
            <li><code className="text-purple-400">y</code> = Reserve token NO dalam pool</li>
            <li><code className="text-purple-400">k</code> = Constant product (invariant)</li>
          </ul>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-4">
          <h4 className="text-lg font-semibold mb-3 text-purple-300">Price Discovery</h4>
          <p className="text-gray-300 mb-3">
            Harga ditentukan oleh ratio reserves dalam pool:
          </p>
          <div className="bg-gray-900 p-4 rounded font-mono text-sm mb-4">
            <div className="text-yellow-400">Price_YES = y / (x + y)</div>
            <div className="text-yellow-400 mt-2">Price_NO = x / (x + y)</div>
          </div>
          <p className="text-gray-400 text-sm">
            Harga selalu berjumlah 1.0, mencerminkan probabilitas outcome yang saling eksklusif.
          </p>
        </div>
      </section>

      {/* Liquidity Pools */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Liquidity Pools</h2>
        <p className="text-gray-300 mb-4">
          Setiap prediction market memiliki dedicated liquidity pool yang menampung reserves untuk 
          outcome YES dan NO. Liquidity providers menyediakan capital untuk memfasilitasi trading.
        </p>

        <h3 className="text-xl font-semibold mb-3 mt-6">Pool Structure</h3>
        <CodeBlock language="typescript" code={`interface LiquidityPool {
  marketId: string;
  yesReserve: number;    // Token YES dalam pool
  noReserve: number;     // Token NO dalam pool
  totalLiquidity: number; // Total liquidity provided
  lpTokenSupply: number;  // LP token yang beredar
  feeRate: number;        // Trading fee (default 0.3%)
  createdAt: Date;
  updatedAt: Date;
}

// Example pool state
const examplePool: LiquidityPool = {
  marketId: "btc-150k-2026",
  yesReserve: 45000,
  noReserve: 55000,
  totalLiquidity: 100000,
  lpTokenSupply: 100000,
  feeRate: 0.003,
  createdAt: new Date(),
  updatedAt: new Date()
};`} />

        <h3 className="text-xl font-semibold mb-3 mt-6">Adding Liquidity</h3>
        <p className="text-gray-300 mb-4">
          Liquidity providers menerima LP tokens yang merepresentasikan share mereka dalam pool.
        </p>
        <CodeBlock language="typescript" code={`// Calculate LP tokens untuk liquidity provision
function calculateLPTokens(
  amountYes: number,
  amountNo: number,
  pool: LiquidityPool
): number {
  // Untuk pool baru
  if (pool.lpTokenSupply === 0) {
    return Math.sqrt(amountYes * amountNo);
  }
  
  // Untuk pool existing, maintain proporsi
  const shareYes = amountYes / pool.yesReserve;
  const shareNo = amountNo / pool.noReserve;
  const share = Math.min(shareYes, shareNo);
  
  return share * pool.lpTokenSupply;
}

// Add liquidity transaction
async function addLiquidity(
  marketId: string,
  amountYes: number,
  amountNo: number
) {
  const pool = await getPool(marketId);
  const lpTokens = calculateLPTokens(amountYes, amountNo, pool);
  
  // Update pool reserves
  pool.yesReserve += amountYes;
  pool.noReserve += amountNo;
  pool.lpTokenSupply += lpTokens;
  pool.totalLiquidity = pool.yesReserve + pool.noReserve;
  
  await updatePool(pool);
  await mintLPTokens(marketId, lpTokens);
  
  return {
    lpTokens,
    share: lpTokens / pool.lpTokenSupply
  };
}`} />

        <h3 className="text-xl font-semibold mb-3 mt-6">Removing Liquidity</h3>
        <CodeBlock language="typescript" code={`// Remove liquidity dan burn LP tokens
async function removeLiquidity(
  marketId: string,
  lpTokenAmount: number
) {
  const pool = await getPool(marketId);
  const share = lpTokenAmount / pool.lpTokenSupply;
  
  // Calculate amounts to return
  const yesAmount = pool.yesReserve * share;
  const noAmount = pool.noReserve * share;
  
  // Update pool
  pool.yesReserve -= yesAmount;
  pool.noReserve -= noAmount;
  pool.lpTokenSupply -= lpTokenAmount;
  pool.totalLiquidity = pool.yesReserve + pool.noReserve;
  
  await updatePool(pool);
  await burnLPTokens(marketId, lpTokenAmount);
  
  return {
    yesAmount,
    noAmount,
    totalValue: yesAmount + noAmount
  };
}`} />
      </section>

      {/* Order Execution */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Order Execution</h2>
        <p className="text-gray-300 mb-4">
          Trading engine memproses orders dengan mengupdate pool reserves sambil mempertahankan 
          constant product invariant.
        </p>

        <h3 className="text-xl font-semibold mb-3 mt-6">Swap Calculation</h3>
        <CodeBlock language="typescript" code={`// Calculate output amount untuk given input
function calculateSwapOutput(
  inputAmount: number,
  inputReserve: number,
  outputReserve: number,
  feeRate: number = 0.003
): number {
  // Deduct fee dari input
  const inputWithFee = inputAmount * (1 - feeRate);
  
  // Apply constant product formula
  // (x + dx) * (y - dy) = k
  // dy = (y * dx) / (x + dx)
  const numerator = outputReserve * inputWithFee;
  const denominator = inputReserve + inputWithFee;
  const outputAmount = numerator / denominator;
  
  return outputAmount;
}

// Calculate input amount untuk desired output
function calculateSwapInput(
  outputAmount: number,
  inputReserve: number,
  outputReserve: number,
  feeRate: number = 0.003
): number {
  // Reverse calculation
  // dx = (x * dy) / (y - dy) / (1 - fee)
  const numerator = inputReserve * outputAmount;
  const denominator = outputReserve - outputAmount;
  const inputBeforeFee = numerator / denominator;
  const inputAmount = inputBeforeFee / (1 - feeRate);
  
  return inputAmount;
}`} />

        <h3 className="text-xl font-semibold mb-3 mt-6">Buy Order Execution</h3>
        <CodeBlock language="typescript" code={`interface TradeParams {
  marketId: string;
  outcome: 'YES' | 'NO';
  amount: number;
  maxSlippage: number; // 0.01 = 1%
}

async function executeBuyOrder(params: TradeParams) {
  const { marketId, outcome, amount, maxSlippage } = params;
  const pool = await getPool(marketId);
  
  // Determine reserves based on outcome
  const inputReserve = outcome === 'YES' ? pool.noReserve : pool.yesReserve;
  const outputReserve = outcome === 'YES' ? pool.yesReserve : pool.noReserve;
  
  // Calculate swap
  const outputAmount = calculateSwapOutput(
    amount,
    inputReserve,
    outputReserve,
    pool.feeRate
  );
  
  // Check slippage
  const expectedPrice = outputReserve / (inputReserve + outputReserve);
  const executionPrice = outputAmount / amount;
  const slippage = Math.abs(executionPrice - expectedPrice) / expectedPrice;
  
  if (slippage > maxSlippage) {
    throw new Error(\`Slippage \${(slippage * 100).toFixed(2)}% exceeds max \${(maxSlippage * 100).toFixed(2)}%\`);
  }
  
  // Update pool reserves
  if (outcome === 'YES') {
    pool.noReserve += amount;
    pool.yesReserve -= outputAmount;
  } else {
    pool.yesReserve += amount;
    pool.noReserve -= outputAmount;
  }
  
  await updatePool(pool);
  
  // Record trade
  const trade = await createTrade({
    marketId,
    outcome,
    type: 'BUY',
    inputAmount: amount,
    outputAmount,
    price: executionPrice,
    slippage,
    fee: amount * pool.feeRate,
    timestamp: new Date()
  });
  
  return trade;
}`} />

        <h3 className="text-xl font-semibold mb-3 mt-6">Sell Order Execution</h3>
        <CodeBlock language="typescript" code={`async function executeSellOrder(params: TradeParams) {
  const { marketId, outcome, amount, maxSlippage } = params;
  const pool = await getPool(marketId);
  
  // For sell, swap outcome tokens back to base currency
  const inputReserve = outcome === 'YES' ? pool.yesReserve : pool.noReserve;
  const outputReserve = outcome === 'YES' ? pool.noReserve : pool.yesReserve;
  
  // Calculate output
  const outputAmount = calculateSwapOutput(
    amount,
    inputReserve,
    outputReserve,
    pool.feeRate
  );
  
  // Slippage check
  const expectedPrice = outputReserve / (inputReserve + outputReserve);
  const executionPrice = outputAmount / amount;
  const slippage = Math.abs(executionPrice - expectedPrice) / expectedPrice;
  
  if (slippage > maxSlippage) {
    throw new Error(\`Slippage too high: \${(slippage * 100).toFixed(2)}%\`);
  }
  
  // Update reserves
  if (outcome === 'YES') {
    pool.yesReserve += amount;
    pool.noReserve -= outputAmount;
  } else {
    pool.noReserve += amount;
    pool.yesReserve -= outputAmount;
  }
  
  await updatePool(pool);
  
  return await createTrade({
    marketId,
    outcome,
    type: 'SELL',
    inputAmount: amount,
    outputAmount,
    price: executionPrice,
    slippage,
    fee: amount * pool.feeRate,
    timestamp: new Date()
  });
}`} />
      </section>

      {/* Pricing Formulas */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Pricing Formulas</h2>
        <p className="text-gray-300 mb-4">
          Formula pricing yang digunakan untuk calculate harga real-time dan price impact.
        </p>

        <h3 className="text-xl font-semibold mb-3 mt-6">Current Price Calculation</h3>
        <CodeBlock language="typescript" code={`// Get current market price untuk outcome
function getCurrentPrice(
  pool: LiquidityPool,
  outcome: 'YES' | 'NO'
): number {
  const totalReserve = pool.yesReserve + pool.noReserve;
  
  if (outcome === 'YES') {
    return pool.noReserve / totalReserve;
  } else {
    return pool.yesReserve / totalReserve;
  }
}

// Get implied probability dari price
function getImpliedProbability(price: number): number {
  // Price dalam prediction market = implied probability
  return price;
}

// Example usage
const pool = await getPool('btc-150k-2026');
const yesPrice = getCurrentPrice(pool, 'YES');
const yesProbability = getImpliedProbability(yesPrice);

console.log(\`YES price: $\${yesPrice.toFixed(3)}\`);
console.log(\`Implied probability: \${(yesProbability * 100).toFixed(1)}%\`);`} />

        <h3 className="text-xl font-semibold mb-3 mt-6">Price Impact Calculation</h3>
        <CodeBlock language="typescript" code={`// Calculate price impact dari trade
function calculatePriceImpact(
  tradeAmount: number,
  inputReserve: number,
  outputReserve: number,
  feeRate: number = 0.003
): {
  priceImpact: number;
  newPrice: number;
  oldPrice: number;
} {
  // Old price
  const oldPrice = outputReserve / (inputReserve + outputReserve);
  
  // Calculate new reserves after trade
  const inputWithFee = tradeAmount * (1 - feeRate);
  const outputAmount = (outputReserve * inputWithFee) / (inputReserve + inputWithFee);
  
  const newInputReserve = inputReserve + tradeAmount;
  const newOutputReserve = outputReserve - outputAmount;
  
  // New price
  const newPrice = newOutputReserve / (newInputReserve + newOutputReserve);
  
  // Price impact
  const priceImpact = Math.abs(newPrice - oldPrice) / oldPrice;
  
  return {
    priceImpact,
    newPrice,
    oldPrice
  };
}

// Example: Check impact sebelum trade
const impact = calculatePriceImpact(
  10000, // Trade 10,000 tokens
  pool.yesReserve,
  pool.noReserve
);

console.log(\`Price impact: \${(impact.priceImpact * 100).toFixed(2)}%\`);
console.log(\`Old price: $\${impact.oldPrice.toFixed(3)}\`);
console.log(\`New price: $\${impact.newPrice.toFixed(3)}\`);`} />

        <h3 className="text-xl font-semibold mb-3 mt-6">Advanced Pricing Functions</h3>
        <CodeBlock language="typescript" code={`// Get average execution price untuk trade
function getAverageExecutionPrice(
  inputAmount: number,
  outputAmount: number
): number {
  return outputAmount / inputAmount;
}

// Calculate optimal trade size untuk target price
function calculateOptimalTradeSize(
  targetPrice: number,
  currentReserveInput: number,
  currentReserveOutput: number
): number {
  // Solve for trade size yang akan achieve target price
  // targetPrice = (y - dy) / ((x + dx) + (y - dy))
  const totalReserve = currentReserveInput + currentReserveOutput;
  const targetOutputReserve = targetPrice * totalReserve;
  const dy = currentReserveOutput - targetOutputReserve;
  
  // Use constant product: dx = (x * dy) / (y - dy)
  const dx = (currentReserveInput * dy) / (currentReserveOutput - dy);
  
  return dx;
}

// Get bid-ask spread
function getBidAskSpread(
  pool: LiquidityPool,
  tradeSize: number = 1000
): {
  bidPrice: number;
  askPrice: number;
  spread: number;
} {
  // Ask price (buying)
  const askOutput = calculateSwapOutput(
    tradeSize,
    pool.noReserve,
    pool.yesReserve,
    pool.feeRate
  );
  const askPrice = tradeSize / askOutput;
  
  // Bid price (selling)
  const bidOutput = calculateSwapOutput(
    tradeSize,
    pool.yesReserve,
    pool.noReserve,
    pool.feeRate
  );
  const bidPrice = bidOutput / tradeSize;
  
  const spread = askPrice - bidPrice;
  
  return { bidPrice, askPrice, spread };
}`} />
      </section>

      {/* Fee Structure */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Fee Structure</h2>
        <p className="text-gray-300 mb-4">
          Trading fees digunakan untuk compensate liquidity providers dan maintain protocol.
        </p>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3">Fee Breakdown</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex justify-between">
              <span>Trading Fee:</span>
              <span className="text-purple-400 font-semibold">0.3%</span>
            </li>
            <li className="flex justify-between">
              <span>LP Provider Share:</span>
              <span className="text-purple-400 font-semibold">0.25%</span>
            </li>
            <li className="flex justify-between">
              <span>Protocol Fee:</span>
              <span className="text-purple-400 font-semibold">0.05%</span>
            </li>
          </ul>
        </div>

        <CodeBlock language="typescript" code={`// Fee calculation dan distribution
function calculateFees(tradeAmount: number): {
  totalFee: number;
  lpFee: number;
  protocolFee: number;
} {
  const totalFee = tradeAmount * 0.003;
  const lpFee = tradeAmount * 0.0025;
  const protocolFee = tradeAmount * 0.0005;
  
  return { totalFee, lpFee, protocolFee };
}

// Accrue fees untuk LP providers
async function accrueFees(
  marketId: string,
  lpFee: number
) {
  const pool = await getPool(marketId);
  
  // Fees ditambahkan ke reserves, increasing value per LP token
  pool.totalLiquidity += lpFee;
  
  await updatePool(pool);
}`} />
      </section>

      {/* Performance Optimization */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Performance Optimization</h2>
        <p className="text-gray-300 mb-4">
          Best practices untuk optimize trading engine performance.
        </p>

        <CodeBlock language="typescript" code={`// Batch price calculations untuk multiple markets
async function batchGetPrices(
  marketIds: string[]
): Promise<Map<string, { yesPrice: number; noPrice: number }>> {
  const pools = await Promise.all(
    marketIds.map(id => getPool(id))
  );
  
  const priceMap = new Map();
  
  pools.forEach((pool, index) => {
    const totalReserve = pool.yesReserve + pool.noReserve;
    priceMap.set(marketIds[index], {
      yesPrice: pool.noReserve / totalReserve,
      noPrice: pool.yesReserve / totalReserve
    });
  });
  
  return priceMap;
}

// Cache frequently accessed pools
class PoolCache {
  private cache: Map<string, { pool: LiquidityPool; timestamp: number }>;
  private ttl: number = 5000; // 5 seconds
  
  constructor() {
    this.cache = new Map();
  }
  
  async get(marketId: string): Promise<LiquidityPool> {
    const cached = this.cache.get(marketId);
    const now = Date.now();
    
    if (cached && (now - cached.timestamp) < this.ttl) {
      return cached.pool;
    }
    
    const pool = await getPool(marketId);
    this.cache.set(marketId, { pool, timestamp: now });
    
    return pool;
  }
  
  invalidate(marketId: string) {
    this.cache.delete(marketId);
  }
}

// Use connection pooling untuk database
const poolCache = new PoolCache();`} />
      </section>

      {/* Error Handling */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Error Handling</h2>
        <CodeBlock language="typescript" code={`// Comprehensive error handling
class TradingEngineError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'TradingEngineError';
  }
}

async function executeTrade(params: TradeParams) {
  try {
    // Validate parameters
    if (params.amount <= 0) {
      throw new TradingEngineError(
        'Trade amount must be positive',
        'INVALID_AMOUNT'
      );
    }
    
    const pool = await getPool(params.marketId);
    
    // Check pool liquidity
    const outputReserve = params.outcome === 'YES' 
      ? pool.yesReserve 
      : pool.noReserve;
      
    if (params.amount > outputReserve * 0.5) {
      throw new TradingEngineError(
        'Trade size exceeds 50% of pool liquidity',
        'INSUFFICIENT_LIQUIDITY',
        { maxSize: outputReserve * 0.5 }
      );
    }
    
    // Execute trade
    const result = await executeBuyOrder(params);
    return result;
    
  } catch (error) {
    if (error instanceof TradingEngineError) {
      throw error;
    }
    
    throw new TradingEngineError(
      'Trade execution failed',
      'EXECUTION_ERROR',
      { originalError: error.message }
    );
  }
}`} />
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Best Practices</h2>
        <div className="space-y-4">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 text-purple-300">1. Always Set Slippage Tolerance</h3>
            <p className="text-gray-300 mb-2">
              Protect trades dari unexpected price movements dengan setting max slippage.
            </p>
            <CodeBlock language="typescript" code={`const trade = await executeBuyOrder({
  marketId: 'btc-150k-2026',
  outcome: 'YES',
  amount: 1000,
  maxSlippage: 0.01 // 1% maximum slippage
});`} />
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 text-purple-300">2. Check Price Impact</h3>
            <p className="text-gray-300 mb-2">
              Calculate price impact sebelum execute large trades.
            </p>
            <CodeBlock language="typescript" code={`const impact = calculatePriceImpact(amount, inputReserve, outputReserve);
if (impact.priceImpact > 0.05) {
  console.warn('High price impact detected:', \`\${(impact.priceImpact * 100).toFixed(2)}%\`);
  // Consider splitting trade into smaller chunks
}`} />
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 text-purple-300">3. Monitor Pool Health</h3>
            <p className="text-gray-300 mb-2">
              Regular monitoring pool reserves dan liquidity depth.
            </p>
            <CodeBlock language="typescript" code={`function assessPoolHealth(pool: LiquidityPool) {
  const balance = pool.yesReserve / pool.noReserve;
  const depth = Math.min(pool.yesReserve, pool.noReserve);
  
  return {
    balanced: balance > 0.7 && balance < 1.3,
    deepLiquidity: depth > 50000,
    totalLiquidity: pool.totalLiquidity
  };
}`} />
          </div>
        </div>
      </section>
    </div>
  );
}
