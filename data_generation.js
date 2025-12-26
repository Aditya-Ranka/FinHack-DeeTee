// market locations
const market_locations = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Pune"];

// price ranges
const rice_prices = [[3000, 5500], [3900, 4600], [4000, 5500], [5000, 5400], [5000, 7000]];
const wheat_prices = [[2900, 5000], [2300, 2700], [3600, 4600], [2400, 4000], [4200, 5600]];
const corn_prices = [[2500, 3800], [2200, 2500], [2200, 2600], [1900, 2400], [2600, 2800]];
const sugarcane_prices = [[400, 800], [300, 500], [300, 550], [700, 850], [400, 500]];
const millet_prices = [[3000, 4500], [3000, 3500], [3500, 4500], [3000, 3600], [5000, 5700]];

// market objects
const createMarket = () => ({
  "Market_Name": market_locations,
  "Quantity (Quintal)": Array(5).fill(0),
  "Price": Array(5).fill(0.0)
});

const rice_market = createMarket();
const wheat_market = createMarket();
const corn_market = createMarket();
const sugarcane_market = createMarket();
const millet_market = createMarket();

const all_markets = [
  rice_market,
  wheat_market,
  corn_market,
  sugarcane_market,
  millet_market
];

const all_prices = [
  rice_prices,
  wheat_prices,
  corn_prices,
  sugarcane_prices,
  millet_prices
];

const crops = ["Rice", "Wheat", "Corn", "Sugarcane", "Millet"];

// random helpers
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function update_market(market, min_price, max_price, i) {
  market["Price"][i] = Number(randomFloat(min_price, max_price).toFixed(2));
  market["Quantity (Quintal)"][i] = Math.round(randomFloat(1, 10));
}

const interval_seconds = 2;

console.log(`Starting price randomization for all markets every ${interval_seconds} seconds.`);
console.log("Press Ctrl+C to stop.");

// main loop
setInterval(() => {
  all_markets.forEach((market, idx) => {
    const prices = all_prices[idx];
    const crop = crops[idx];

    for (let i = 0; i < 5; i++) {
      update_market(market, prices[i][0], prices[i][1], i);
    }

    console.log(crop, market);
  });

  console.log("\n\nUpdating All Crops\n\n");
}, interval_seconds * 1000);
