class MoonMathCalculator {
    constructor() {
        this.currentTokenData = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSavedData();
    }

    bindEvents() {
        document.getElementById('fetchTokenData').addEventListener('click', () => this.fetchTokenData());
        document.getElementById('calculateGains').addEventListener('click', () => this.calculateXGains());
        
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const marketCap = e.target.dataset.mcap;
                document.getElementById('targetMarketCap').value = marketCap;
                this.calculateXGains();
            });
        });

        document.getElementById('tokenAddress').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.fetchTokenData();
            }
        });

        document.getElementById('targetMarketCap').addEventListener('input', () => {
            if (this.currentTokenData) {
                this.calculateXGains();
            }
        });

        document.getElementById('investmentAmount').addEventListener('input', () => {
            if (this.currentTokenData) {
                this.calculateXGains();
            }
        });
    }

    async fetchTokenData() {
        const tokenAddress = document.getElementById('tokenAddress').value.trim();
        
        if (!tokenAddress) {
            this.showError('Please enter a token address');
            return;
        }

        if (!this.isValidSolanaAddress(tokenAddress)) {
            this.showError('Please enter a valid Solana token address');
            return;
        }

        this.setLoading(true);
        this.clearMessages();

        try {
            const response = await this.sendMessage({
                action: 'fetchTokenData',
                tokenAddress: tokenAddress
            });

            if (response.success) {
                this.currentTokenData = response.data;
                this.displayTokenInfo(response.data);
                this.saveTokenAddress(tokenAddress);
                this.showSuccess('Token data fetched successfully');
                
                if (document.getElementById('targetMarketCap').value && 
                    document.getElementById('investmentAmount').value) {
                    this.calculateXGains();
                }
            } else {
                this.showError(`Failed to fetch token data: ${response.error}`);
            }
        } catch (error) {
            this.showError(`Error: ${error.message}`);
        } finally {
            this.setLoading(false);
        }
    }

    async calculateXGains() {
        if (!this.currentTokenData) {
            this.showError('Please fetch token data first');
            return;
        }

        const targetMarketCap = parseFloat(document.getElementById('targetMarketCap').value);
        const investmentAmount = parseFloat(document.getElementById('investmentAmount').value);

        if (!targetMarketCap || targetMarketCap <= 0) {
            this.showError('Please enter a valid target market cap');
            return;
        }

        if (!investmentAmount || investmentAmount <= 0) {
            this.showError('Please enter a valid investment amount');
            return;
        }

        try {
            const response = await this.sendMessage({
                action: 'calculateXGains',
                currentPrice: this.currentTokenData.price,
                targetMarketCap: targetMarketCap,
                totalSupply: this.currentTokenData.totalSupply,
                investmentAmount: investmentAmount
            });

            if (response.success) {
                this.displayResults(response.data);
                this.saveCalculationData(targetMarketCap, investmentAmount);
            } else {
                this.showError(`Calculation failed: ${response.error}`);
            }
        } catch (error) {
            this.showError(`Error: ${error.message}`);
        }
    }

    displayTokenInfo(data) {
        document.getElementById('tokenName').textContent = `${data.name} (${data.symbol})`;
        document.getElementById('currentPrice').textContent = `$${data.price.toFixed(8)}`;
        document.getElementById('marketCap').textContent = this.formatCurrency(data.marketCap);
        document.getElementById('totalSupply').textContent = this.formatNumber(data.totalSupply);
        
        document.getElementById('tokenInfo').style.display = 'block';
    }

    displayResults(data) {
        document.getElementById('xGains').textContent = `${data.xGains}x`;
        document.getElementById('targetPrice').textContent = `$${data.targetPrice}`;
        document.getElementById('potentialValue').textContent = `$${this.formatNumber(data.potentialValue)}`;
        document.getElementById('potentialProfit').textContent = `$${this.formatNumber(data.potentialProfit)}`;
        
        const profitElement = document.getElementById('potentialProfit');
        profitElement.style.color = parseFloat(data.potentialProfit) >= 0 ? '#16a34a' : '#dc2626';
        
        document.getElementById('resultsSection').style.display = 'block';
    }

    sendMessage(message) {
        return new Promise((resolve) => {
            chrome.runtime.sendMessage(message, resolve);
        });
    }

    isValidSolanaAddress(address) {
        return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
    }

    formatCurrency(amount) {
        if (amount >= 1e9) {
            return `$${(amount / 1e9).toFixed(2)}B`;
        } else if (amount >= 1e6) {
            return `$${(amount / 1e6).toFixed(2)}M`;
        } else if (amount >= 1e3) {
            return `$${(amount / 1e3).toFixed(2)}K`;
        }
        return `$${amount.toFixed(2)}`;
    }

    formatNumber(num) {
        return new Intl.NumberFormat('en-US').format(num);
    }

    setLoading(isLoading) {
        const fetchBtn = document.getElementById('fetchTokenData');
        const calculateBtn = document.getElementById('calculateGains');
        
        if (isLoading) {
            fetchBtn.textContent = 'Fetching...';
            fetchBtn.disabled = true;
            calculateBtn.disabled = true;
        } else {
            fetchBtn.textContent = 'Fetch Data';
            fetchBtn.disabled = false;
            calculateBtn.disabled = false;
        }
    }

    showError(message) {
        this.clearMessages();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;
        document.querySelector('.input-section').appendChild(errorDiv);
        
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }

    showSuccess(message) {
        this.clearMessages();
        const successDiv = document.createElement('div');
        successDiv.className = 'success';
        successDiv.textContent = message;
        document.querySelector('.input-section').appendChild(successDiv);
        
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 3000);
    }

    clearMessages() {
        document.querySelectorAll('.error, .success').forEach(el => el.remove());
    }

    saveTokenAddress(address) {
        chrome.storage.local.set({ lastTokenAddress: address });
    }

    saveCalculationData(targetMarketCap, investmentAmount) {
        chrome.storage.local.set({
            lastTargetMarketCap: targetMarketCap,
            lastInvestmentAmount: investmentAmount
        });
    }

    async loadSavedData() {
        try {
            const data = await chrome.storage.local.get([
                'lastTokenAddress',
                'lastTargetMarketCap',
                'lastInvestmentAmount'
            ]);

            if (data.lastTokenAddress) {
                document.getElementById('tokenAddress').value = data.lastTokenAddress;
            }

            if (data.lastTargetMarketCap) {
                document.getElementById('targetMarketCap').value = data.lastTargetMarketCap;
            }

            if (data.lastInvestmentAmount) {
                document.getElementById('investmentAmount').value = data.lastInvestmentAmount;
            }
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MoonMathCalculator();
});