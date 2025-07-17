chrome.runtime.onInstalled.addListener(() => {
  console.log('MoonMath extension installed');
});

const API_ENDPOINTS = {
  COINGECKO: 'https://api.coingecko.com/api/v3',
  DEXSCREENER: 'https://api.dexscreener.com/latest/dex',
  SOLANA_FM: 'https://api.solana.fm'
};

async function fetchTokenData(tokenAddress) {
  try {
    const response = await fetch(`${API_ENDPOINTS.DEXSCREENER}/tokens/${tokenAddress}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    if (data.pairs && data.pairs.length > 0) {
      const pair = data.pairs[0];
      return {
        name: pair.baseToken.name,
        symbol: pair.baseToken.symbol,
        price: parseFloat(pair.priceUsd) || 0,
        marketCap: parseFloat(pair.fdv) || 0,
        totalSupply: parseFloat(pair.baseToken.totalSupply) || 0,
        liquidity: parseFloat(pair.liquidity?.usd) || 0,
        volume24h: parseFloat(pair.volume?.h24) || 0,
        priceChange24h: parseFloat(pair.priceChange?.h24) || 0
      };
    }
    
    throw new Error('No trading pairs found for this token');
  } catch (error) {
    console.error('Error fetching token data:', error);
    throw error;
  }
}

async function fetchSolanaTokenInfo(tokenAddress) {
  try {
    const response = await fetch(`${API_ENDPOINTS.SOLANA_FM}/v0/tokens/${tokenAddress}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    return {
      name: data.name || 'Unknown Token',
      symbol: data.symbol || 'UNKNOWN',
      decimals: data.decimals || 9,
      totalSupply: data.supply || 0,
      address: tokenAddress
    };
  } catch (error) {
    console.error('Error fetching Solana token info:', error);
    return null;
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fetchTokenData') {
    fetchTokenData(request.tokenAddress)
      .then(data => sendResponse({ success: true, data }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }
  
  if (request.action === 'fetchSolanaTokenInfo') {
    fetchSolanaTokenInfo(request.tokenAddress)
      .then(data => sendResponse({ success: true, data }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }
  
  if (request.action === 'calculateXGains') {
    try {
      const { currentPrice, targetMarketCap, totalSupply, investmentAmount } = request;
      
      if (!currentPrice || !targetMarketCap || !totalSupply || !investmentAmount) {
        throw new Error('Missing required parameters for calculation');
      }
      
      const targetPrice = targetMarketCap / totalSupply;
      const xGains = targetPrice / currentPrice;
      const potentialValue = investmentAmount * xGains;
      const potentialProfit = potentialValue - investmentAmount;
      
      sendResponse({
        success: true,
        data: {
          xGains: xGains.toFixed(2),
          targetPrice: targetPrice.toFixed(8),
          potentialValue: potentialValue.toFixed(2),
          potentialProfit: potentialProfit.toFixed(2)
        }
      });
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
    return true;
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.action.openPopup();
});