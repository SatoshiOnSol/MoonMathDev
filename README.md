# 🌙 MoonMath - Solana X-Gains Calculator

A powerful Chrome extension for calculating potential x-gains on Solana tokens based on market cap projections. Perfect for crypto enthusiasts, traders, and investors who want to quickly analyze the potential returns of their investments.

![MoonMath Extension](https://img.shields.io/badge/Chrome-Extension-blue?style=for-the-badge&logo=google-chrome)
![Solana](https://img.shields.io/badge/Solana-Compatible-purple?style=for-the-badge&logo=solana)
![Version](https://img.shields.io/badge/Version-1.0.0-green?style=for-the-badge)

## 🚀 Features

### Core Functionality
- **Real-time Token Data**: Fetches live market data for Solana tokens
- **X-Gains Calculator**: Calculate potential multipliers based on target market caps
- **Multiple Data Sources**: Integrates with DexScreener and Solana FM APIs
- **Investment Analysis**: Shows potential profit/loss scenarios
- **Quick Presets**: One-click market cap targets (1M, 10M, 100M, 1B, 10B)

### User Experience
- **Modern UI**: Clean, intuitive interface with gradient design
- **Persistent Storage**: Remembers your last searches and calculations
- **Real-time Validation**: Input validation with helpful error messages
- **Responsive Design**: Optimized for Chrome extension popup format
- **Quick Access**: Always available from your Chrome toolbar

### Advanced Features
- **Multiple API Endpoints**: Fallback systems for reliable data fetching
- **Token Address Validation**: Ensures valid Solana addresses
- **Error Handling**: Comprehensive error management and user feedback
- **Performance Optimized**: Fast calculations and efficient data loading

## 📦 Installation

### Method 1: Developer Mode (Recommended)

1. **Download the Extension**
   ```bash
   git clone https://github.com/yourusername/moonmath-extension.git
   cd moonmath-extension
   ```

2. **Open Chrome Extensions**
   - Navigate to `chrome://extensions/` in Chrome
   - Enable "Developer mode" (toggle in top-right corner)

3. **Load the Extension**
   - Click "Load unpacked"
   - Select the MoonMath folder containing `manifest.json`
   - The extension will appear in your extensions list

4. **Pin to Toolbar** (Optional)
   - Click the puzzle piece icon in Chrome toolbar
   - Find "MoonMath" and click the pin icon

### Method 2: Chrome Web Store
*Coming soon - extension will be published to Chrome Web Store*

## 🎯 How to Use

### Basic Usage

1. **Open the Extension**
   - Click the MoonMath icon in your Chrome toolbar
   - The calculator popup will open

2. **Enter Token Address**
   - Paste a Solana token contract address
   - Click "Fetch Data" to retrieve current market information

3. **Set Your Parameters**
   - **Target Market Cap**: Enter your projected market cap target
   - **Investment Amount**: Enter how much you plan to invest

4. **Calculate X-Gains**
   - Click "Calculate X-Gains" to see potential returns
   - View results including multiplier, target price, and potential profit

### Advanced Features

#### Quick Market Cap Presets
Use the preset buttons for common market cap targets:
- **1M**: $1 Million market cap
- **10M**: $10 Million market cap  
- **100M**: $100 Million market cap
- **1B**: $1 Billion market cap
- **10B**: $10 Billion market cap

#### Understanding the Results
- **X-Gains**: The multiplier (e.g., 10x means 10 times your investment)
- **Target Price**: What the token price would be at your target market cap
- **Potential Value**: Total value of your investment at target price
- **Potential Profit**: Net profit (Potential Value - Investment Amount)

## 🔧 Technical Details

### Architecture

#### Manifest V3
The extension uses Chrome's latest Manifest V3 specification for enhanced security and performance.

#### API Integration
- **DexScreener API**: Primary source for token pricing and market data
- **Solana FM API**: Backup source for token information
- **CoinGecko API**: Additional market data (future implementation)

#### Security Features
- Content Security Policy (CSP) implementation
- Host permissions limited to required APIs only
- No sensitive data storage
- Input validation and sanitization

### File Structure
```
MoonMath/
├── manifest.json          # Extension configuration
├── popup.html            # Main UI structure
├── popup.css             # Styling and themes
├── popup.js              # Frontend logic and interactions
├── background.js         # Service worker and API calls
├── icons/                # Extension icons (16px to 128px)
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md             # This documentation
```

### Dependencies
- **Chrome Extension APIs**: Storage, Runtime messaging
- **External APIs**: DexScreener, Solana FM
- **No external libraries**: Pure vanilla JavaScript for minimal footprint

## 🧮 Calculation Formula

The X-gains calculation uses the following formula:

```
Target Price = Target Market Cap ÷ Total Supply
X-Gains = Target Price ÷ Current Price
Potential Value = Investment Amount × X-Gains
Potential Profit = Potential Value - Investment Amount
```

### Example Calculation
- **Current Price**: $0.001
- **Total Supply**: 1,000,000,000 tokens
- **Target Market Cap**: $100,000,000
- **Investment**: $1,000

**Results:**
- Target Price: $100,000,000 ÷ 1,000,000,000 = $0.10
- X-Gains: $0.10 ÷ $0.001 = 100x
- Potential Value: $1,000 × 100 = $100,000
- Potential Profit: $100,000 - $1,000 = $99,000

## 🛠️ Development

### Local Development Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/moonmath-extension.git
   cd moonmath-extension
   ```

2. **Load in Chrome**
   - Follow installation steps above for developer mode

3. **Make Changes**
   - Edit files as needed
   - Click refresh icon in `chrome://extensions/` to reload

### API Endpoints Used

#### DexScreener API
```
GET https://api.dexscreener.com/latest/dex/tokens/{tokenAddress}
```
Returns: Token pairs, pricing, market cap, volume data

#### Solana FM API
```
GET https://api.solana.fm/v0/tokens/{tokenAddress}
```
Returns: Token metadata, supply information

### Permissions Explained

- **activeTab**: Access to current tab (minimal permission)
- **storage**: Save user preferences and calculation history
- **host_permissions**: Access to required API endpoints only

## 🚨 Disclaimer

**IMPORTANT: This tool is for educational and research purposes only.**

- **Not Financial Advice**: All calculations are hypothetical projections
- **Do Your Own Research (DYOR)**: Always verify information independently
- **High Risk**: Cryptocurrency investments carry significant risk
- **No Guarantees**: Past performance doesn't predict future results

### Risk Factors
- Crypto markets are highly volatile
- Token prices can go to zero
- Market cap projections may not be realistic
- Liquidity and trading volume matter significantly
- Regulatory changes can affect token values

## 🐛 Troubleshooting

### Common Issues

#### "Failed to fetch token data"
- **Cause**: Invalid token address or API issues
- **Solution**: Verify the token address is correct and try again

#### "No trading pairs found"
- **Cause**: Token may not be actively traded
- **Solution**: Check if token has liquidity on major DEXs

#### Extension not loading
- **Cause**: Chrome extension permissions or developer mode issues
- **Solution**: Ensure developer mode is enabled and extension is properly loaded

#### Calculations seem incorrect
- **Cause**: Outdated token data or supply changes
- **Solution**: Refresh token data and verify total supply

### Getting Help

1. **Check Console**: Open Chrome DevTools (F12) and check for errors
2. **Reload Extension**: Go to `chrome://extensions/` and click refresh
3. **Clear Storage**: Right-click extension icon → Options → Clear Data
4. **Report Issues**: Create an issue in the GitHub repository

## 🔄 Updates and Changelog

### Version 1.0.0 (Current)
- Initial release
- Core x-gains calculation functionality
- DexScreener API integration
- Modern UI with presets
- Local storage for user preferences

### Planned Features (v1.1.0)
- [ ] Historical price charts
- [ ] Portfolio tracking
- [ ] Multiple token comparison
- [ ] Export calculations to CSV
- [ ] Dark mode theme
- [ ] Mobile responsive design

### Future Roadmap
- **v1.2.0**: Social features and sharing
- **v1.3.0**: Advanced technical indicators
- **v1.4.0**: Multi-blockchain support
- **v2.0.0**: Web application version

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Code Contributions
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m "Add feature"`
4. Push to branch: `git push origin feature-name`
5. Create a Pull Request

### Bug Reports
- Use GitHub Issues to report bugs
- Include Chrome version and extension version
- Provide steps to reproduce the issue
- Include screenshots if applicable

### Feature Requests
- Suggest new features via GitHub Issues
- Explain the use case and benefits
- Consider implementation complexity

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ❌ No warranty provided
- ❌ No liability assumed

## 🙏 Acknowledgments

- **Solana Community**: For building an amazing ecosystem
- **DexScreener**: For providing reliable API access
- **Chrome Extension Community**: For documentation and examples
- **Open Source Contributors**: For inspiration and best practices

## 📞 Contact

- **GitHub**: [Your GitHub Profile](https://github.com/yourusername)
- **Twitter**: [@YourTwitter](https://twitter.com/yourtwitter)
- **Email**: your.email@example.com
- **Discord**: YourDiscord#1234

---

**Made with ❤️ for the Solana community**

*Remember: Always invest responsibly and never risk more than you can afford to lose.*