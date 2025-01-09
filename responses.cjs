import { createWallet } from './index.cjs';

const axios = require('axios');
const { getSeiInfo, getCoinData } = require('./coindata.cjs');

// Mocked Coin_Data module
const Coin_Data = {
   getSeiInfo,
   getCoinData
};

// About Sei function
export async function aboutSei() {
  let about = '';
  try {
    const response = await Coin_Data.getSeiInfo();
    about += `🌟 *About Sei Network (${response.symbol}):*\n\n`;

    // Description
    if (response.description && response.description.en) {
      about += `${response.description.en}\n\n`;
    } else {
      about += 'Sei Network is a cutting-edge blockchain platform optimized for trading.\n\n';
    }

    // Current price and market data
    if (response.market_data?.current_price?.usd) {
      about += `💵 *Current Price (USD):* $${response.market_data.current_price.usd.toFixed(2)}\n`;
    } else {
      about += '💵 *Current Price:* Not available\n';
    }

    if (response.market_data?.price_change_percentage_24h) {
      about += `📈 *24h Price Change:* ${response.market_data.price_change_percentage_24h.toFixed(2)}%\n`;
    }

    if (response.market_data?.market_cap?.usd) {
      about += `🏦 *Market Cap (USD):* $${response.market_data.market_cap.usd.toFixed(2)}\n`;
    }

    // Closing statement
    about += `\nSei Network empowers developers and users with efficient and reliable blockchain technology. \
It's a perfect choice for anyone interested in blockchain trading innovations.\n`;
  } catch (error) {
    about += 'An error occurred while getting data about Sei\n';
  }

  return about;
}

// Community function
export async function community() {
  let communityInfo = '';
  try {
    const response = await Coin_Data.getSeiInfo();
    communityInfo += `🌐 *Join the Sei Community (${response.symbol.toUpperCase()}):*\n\n`;

    // Homepage
    communityInfo += `🔗 *Official Website:* ${response.links?.homepage?.[0] || 'Not available'}\n\n`;

    // Twitter
    if (response.links?.twitter_screen_name) {
      communityInfo += `🐦 *Twitter:* https://twitter.com/${response.links.twitter_screen_name}\n\n`;
    }

    // Reddit
    if (response.links?.subreddit_url) {
      communityInfo += `👥 *Reddit Community:* ${response.links.subreddit_url}\n\n`;
    }

    // Community descriptions
    communityInfo += `
Communities:

- Block 24  
Block 24 is a community created with the primary goal of onboarding Nigerians into the world of crypto and SEI.  
* Founded by active Sei community members Midas and Cryptostew.  
* Produces educational video content to enhance crypto understanding.  
* Hosts 'Block Talk,' a weekly X space discussing various topics.  
* Organizes IRL events to engage and educate the community.  

X link: https://x.com/Block24_  
Discord link: https://discord.com/invite/PuT5Y4SqMx  

- Crossover Studios 
A Web3 creative studio focusing on developing intellectual property through online content creation. 
* What began as a few lighthearted animated videos on Twitter has rapidly expanded, with intentions to collaborate with additional creators and establish a small community of creators.

X link: https://x.com/crossover_xo

Discord link: https://discord.gg/rXVgq6swQx \n

- Fuckers 
THE COMMUNITY’S COMMUNITY!!! 
* YRRRRR!!! 
* FUCK AROUND N FIND OUT 
* [REDACTED] OF [REDACTED] 

X link: https://x.com/fuckersforlife

Discord link: https://discord.com/invite/8PS9AaaqK3 \n


- S3 Labs 
First started as a community around those who enjoy Sei spaces. This is your hub to chat during spaces and ask questions of people on stage.

It has grown a lot since then and now are a place for people to network within the Sei ecosystem. S3 also incubates NFT projects, empowering artists and collectors, as well as helps dApps get connected with users and vise versa. 

X link: https://x.com/s3_labs?s=21&t=YJUDwtZOk1GgaJ7Bk7oAnA

Discord link: https://discord.com/invite/s3labs"

Sei is an open and collaborative network! Join us on our platforms to discuss, contribute, \
and help shape the future of blockchain technology. Whether you're a developer, trader, or enthusiast, \
there's a place for you here!
`;
  } catch (error) {
    communityInfo += 'An error occurred while getting data about Sei\n';
  }

  return communityInfo;
}

// Help function
export function help() {
  return `
🌟 Welcome to @TheSeiNewbieBot! 🌟
Hi there! I’m here to guide you through everything Sei-related. Whether you’re a beginner or looking to dive deeper, I’ve got your back! 🚀

🔹 Getting Started
1️⃣ Follow us on Twitter for the latest updates and exclusive content 👉 https://x.com/TheSeiNewbiebot.
2️⃣ Use the buttons below to explore commands and interact with me. 😊

🤖 What Can I Do?
Tap the commands below to discover all the features and tools I offer! 🎉
  `;
}

// Guide function
export function guide() {
  return `
Welcome to the SEI Wallet Guide Bot! 🤖✨
Here’s what I can help you with:
🌟 Guides:

1️⃣ Wallet Creation 🛠️
    Create your SEI wallet with one click! 🚀

2️⃣ Send & Receive SEI 💸
    Discover how to send SEI coins to friends or receive payments effortlessly. 🤝
    I’ll guide you on how to scan QR codes, copy wallet addresses, and ensure your transactions are safe and smooth! 🔒⚡


🎯 How to Get Started?
Tap a button below to dive into any guide and unlock the knowledge you need! 🌐💪

☝️ Pro Tip: Always ensure your recovery phrase and private keys are stored securely, away from prying eyes! 👀🔒
`;
}

export const create_wallet=async()=>{
    let wallet = await createWallet()
    return `Sei address: ${wallet.address}\nRecovery  phrase: ${wallet.mnemonic}`
}

export const buy_sei =()=>{
  return`Here’s a simple guide to help you get started:\n\n

1. Choose a Cryptocurrency Exchange\n
Centralized Exchanges (CEX): Popular options like Binance, Kraken, KuCoin, or Coinbase typically list SEI. Check if SEI is available on your preferred exchange.\n\n

2. Create an Account\n
Sign up for an account on a CEX, providing your personal details, verifying your identity, and securing your account with two-factor authentication (2FA).\n
If using a DEX, you’ll need a compatible wallet, such as Keplr to connect and trade directly from your wallet.\n\n

3. Deposit Funds\n
Deposit fiat currency (USD, EUR, etc.) via bank transfer, credit/debit card, or other payment methods supported by your chosen exchange.\n
Alternatively, deposit cryptocurrency (like USDT, BTC, or ETH) if you're trading from other crypto holdings.\n\n

4. Buy Sei (SEI)\n
On a CEX, go to the trading section, select SEI, and place a market or limit order to buy SEI.\n\n

5. Store Your SEI Safely\n
For long-term storage, consider transferring SEI to a secure, non-custodial wallet like Keplr or hardware wallets like Ledger for added security.\n
N/B: Your deposit memo/tag is as important as address so not forget them when making deposits.`
}
