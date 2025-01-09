const axios = require('axios');

// Define structures for CoinGecko data
class Coin {
  constructor(id, symbol, name) {
    this.id = id;
    this.symbol = symbol;
    this.name = name;
  }
}

class CoinGeckoResponse {
  constructor(id, symbol, name, description, links, market_data) {
    this.id = id;
    this.symbol = symbol;
    this.name = name;
    this.description = new Description(description.en);
    this.links = new Links(links.homepage, links.twitter_screen_name, links.subreddit_url);
    this.market_data = new MarketData(
      market_data.current_price,
      market_data.market_cap,
      market_data.total_volume,
      market_data.price_change_percentage_24h
    );
  }
}

class Description {
  constructor(en) {
    this.en = en || null;
  }
}

class Links {
  constructor(homepage, twitter_screen_name, subreddit_url) {
    this.homepage = homepage || [];
    this.twitter_screen_name = twitter_screen_name || null;
    this.subreddit_url = subreddit_url || null;
  }
}

class MarketData {
  constructor(current_price, market_cap, total_volume, price_change_percentage_24h) {
    this.current_price = new Prices(current_price.usd, current_price.eur, current_price.btc);
    this.market_cap = new Prices(market_cap.usd, market_cap.eur, market_cap.btc);
    this.total_volume = new Prices(total_volume.usd, total_volume.eur, total_volume.btc);
    this.price_change_percentage_24h = price_change_percentage_24h || null;
  }
}

class Prices {
  constructor(usd, eur, btc) {
    this.usd = usd || null;
    this.eur = eur || null;
    this.btc = btc || null;
  }
}

// Fetch Sei info
async function getSeiInfo() {
  try {
    const url = 'https://api.coingecko.com/api/v3/coins/sei-network';
    const response = await axios.get(url);
    const data = response.data;
    return new CoinGeckoResponse(
      data.id,
      data.symbol,
      data.name,
      data.description,
      data.links,
      data.market_data
    );
  } catch (error) {
    console.error('Error fetching Sei info:', error.message);
    throw error;
  }
}

// Fetch coin data by substring
async function getCoinData(coinSubstring) {
  try {
    const url = 'https://api.coingecko.com/api/v3/coins/list';
    const response = await axios.get(url);
    const coins = response.data.map((coin) => new Coin(coin.id, coin.symbol, coin.name));

    // Find matching coin
    for (const coin of coins) {
      if (coin.id.toLowerCase().includes(coinSubstring.toLowerCase())) {
        console.log(`ID: ${coin.id}, Symbol: ${coin.symbol}, Name: ${coin.name}`);
        return {
          id: coin.id,
          symbol: coin.symbol,
          name: coin.name,
        };
      }
    }

    return { id: '', symbol: '', name: '' }; // Default empty result if no match is found
  } catch (error) {
    console.error('Error fetching coin data:', error.message);
    throw error;
  }
}

// Example usage
(async () => {
  try {
    const seiInfo = await getSeiInfo();
    console.log('Sei Info:', seiInfo);

    const coinData = await getCoinData('sei-network');
    console.log('Coin Data:', coinData);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();


module.exports = {getCoinData, getSeiInfo}