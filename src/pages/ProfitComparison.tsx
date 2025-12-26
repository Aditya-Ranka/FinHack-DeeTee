import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  ChevronDown,
  MapPin,
  Truck,
  IndianRupee,
  Wallet,
  ArrowRight,
  Award,
  Info,
  User,
  Navigation,
  TrendingUp,
  TrendingDown,
  Clock,
  Gavel,
  Share2,
  Bookmark,
  MessageCircle
} from "lucide-react";

const locations = [
  { id: "dewas", name: "Dewas, MP" },
  { id: "ujjain", name: "Ujjain, MP" },
  { id: "ratlam", name: "Ratlam, MP" },
  { id: "shajapur", name: "Shajapur, MP" },
];

const commodities = ["Wheat", "Basmati Rice", "Mustard", "Cotton", "Soybean"];

// Mock data based on farmer location
const comparisonData: Record<string, Record<string, Array<{
  mandi: string;
  state: string;
  price: number;
  distance: number;
  transportCost: number;
}>>> = {
  dewas: {
    Wheat: [
      { mandi: "Dewas Local", state: "MP", price: 2350, distance: 5, transportCost: 50 },
      { mandi: "Indore", state: "MP", price: 2450, distance: 45, transportCost: 250 },
      { mandi: "Ujjain", state: "MP", price: 2400, distance: 60, transportCost: 320 },
      { mandi: "Bhopal", state: "MP", price: 2480, distance: 150, transportCost: 600 },
    ],
    "Basmati Rice": [
      { mandi: "Dewas Local", state: "MP", price: 6200, distance: 5, transportCost: 80 },
      { mandi: "Indore", state: "MP", price: 6500, distance: 45, transportCost: 350 },
      { mandi: "Karnal", state: "Haryana", price: 6800, distance: 800, transportCost: 2500 },
    ],
    Mustard: [
      { mandi: "Dewas Local", state: "MP", price: 4800, distance: 5, transportCost: 60 },
      { mandi: "Jaipur", state: "Rajasthan", price: 5100, distance: 400, transportCost: 1200 },
      { mandi: "Alwar", state: "Rajasthan", price: 5050, distance: 450, transportCost: 1350 },
    ],
    Cotton: [
      { mandi: "Indore", state: "MP", price: 6900, distance: 45, transportCost: 400 },
      { mandi: "Rajkot", state: "Gujarat", price: 7200, distance: 500, transportCost: 1800 },
      { mandi: "Nagpur", state: "Maharashtra", price: 7050, distance: 350, transportCost: 1200 },
    ],
    Soybean: [
      { mandi: "Dewas Local", state: "MP", price: 3950, distance: 5, transportCost: 50 },
      { mandi: "Indore", state: "MP", price: 4100, distance: 45, transportCost: 280 },
      { mandi: "Kota", state: "Rajasthan", price: 4050, distance: 300, transportCost: 900 },
    ],
  },
};

// Use same data for other locations (simplified)
["ujjain", "ratlam", "shajapur"].forEach(loc => {
  comparisonData[loc] = comparisonData.dewas;
});

// Heatmap positions for radial layout (angle in degrees, distance from center)
const heatmapPositions = [
  { angle: -30, radius: 140 },  // Top right
  { angle: 30, radius: 140 },   // Bottom right
  { angle: 150, radius: 140 },  // Bottom left
  { angle: -150, radius: 140 }, // Top left
];

export default function ProfitComparison() {
  const [selectedLocation, setSelectedLocation] = useState("dewas");
  const [selectedCommodity, setSelectedCommodity] = useState("Wheat");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isCommodityOpen, setIsCommodityOpen] = useState(false);

  const currentLocationName = locations.find(l => l.id === selectedLocation)?.name || "";
  const markets = comparisonData[selectedLocation]?.[selectedCommodity] || [];
  
  // Calculate net profit and find best option
  const marketsWithProfit = markets.map(market => ({
    ...market,
    netProfit: market.price - market.transportCost,
  }));

  // Sort by profit for heatmap display
  const sortedByProfit = [...marketsWithProfit].sort((a, b) => b.netProfit - a.netProfit);
  const maxProfit = Math.max(...marketsWithProfit.map(m => m.netProfit));
  const minProfit = Math.min(...marketsWithProfit.map(m => m.netProfit));

  const bestMarket = marketsWithProfit.reduce((best, current) => 
    current.netProfit > best.netProfit ? current : best
  , marketsWithProfit[0]);

  const highestPriceMarket = marketsWithProfit.reduce((highest, current) => 
    current.price > highest.price ? current : highest
  , marketsWithProfit[0]);

  // Determine if market is high or low profit
  const getProfitLevel = (netProfit: number) => {
    const range = maxProfit - minProfit;
    const threshold = minProfit + range * 0.5;
    return netProfit >= threshold ? "high" : "low";
  };

  return (
    <div className="py-6 md:py-10">
      <div className="container max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-display-sm text-foreground flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-primary" />
            Compare Your Profit
          </h1>
          <p className="mt-2 text-xl text-muted-foreground">
            Find where you will earn the most after transport costs
          </p>
        </div>

        {/* Inputs */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {/* Location Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              <MapPin className="inline h-4 w-4 mr-1" />
              Your Location
            </label>
            <button
              onClick={() => { setIsLocationOpen(!isLocationOpen); setIsCommodityOpen(false); }}
              className="flex w-full items-center justify-between rounded-xl border-2 border-border bg-card px-4 py-3 text-lg font-medium text-foreground transition-colors hover:border-primary focus:border-primary focus:outline-none"
            >
              <span>{currentLocationName}</span>
              <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${isLocationOpen ? "rotate-180" : ""}`} />
            </button>

            {isLocationOpen && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border border-border bg-card shadow-medium">
                <ul className="py-2">
                  {locations.map((location) => (
                    <li key={location.id}>
                      <button
                        onClick={() => {
                          setSelectedLocation(location.id);
                          setIsLocationOpen(false);
                        }}
                        className={`flex w-full items-center gap-2 px-4 py-3 text-lg transition-colors hover:bg-muted ${
                          selectedLocation === location.id 
                            ? "bg-primary/10 text-primary font-medium" 
                            : "text-foreground"
                        }`}
                      >
                        <MapPin className="h-4 w-4" />
                        {location.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Commodity Dropdown */}
          <div className="relative">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              <IndianRupee className="inline h-4 w-4 mr-1" />
              Commodity
            </label>
            <button
              onClick={() => { setIsCommodityOpen(!isCommodityOpen); setIsLocationOpen(false); }}
              className="flex w-full items-center justify-between rounded-xl border-2 border-border bg-card px-4 py-3 text-lg font-medium text-foreground transition-colors hover:border-primary focus:border-primary focus:outline-none"
            >
              <span>{selectedCommodity}</span>
              <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${isCommodityOpen ? "rotate-180" : ""}`} />
            </button>

            {isCommodityOpen && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border border-border bg-card shadow-medium">
                <ul className="py-2">
                  {commodities.map((commodity) => (
                    <li key={commodity}>
                      <button
                        onClick={() => {
                          setSelectedCommodity(commodity);
                          setIsCommodityOpen(false);
                        }}
                        className={`flex w-full items-center px-4 py-3 text-lg transition-colors hover:bg-muted ${
                          selectedCommodity === commodity 
                            ? "bg-primary/10 text-primary font-medium" 
                            : "text-foreground"
                        }`}
                      >
                        {commodity}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Geographic Heatmap Section */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Navigation className="h-5 w-5 text-primary" />
            Market Profit Map
          </h2>

          {/* Radial Heatmap Layout */}
          <div className="relative mx-auto w-full max-w-lg aspect-square">
            {/* Background circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-full h-full rounded-full border-2 border-dashed border-border/40" />
              <div className="absolute w-3/4 h-3/4 rounded-full border-2 border-dashed border-border/30" />
              <div className="absolute w-1/2 h-1/2 rounded-full border-2 border-dashed border-border/20" />
            </div>

            {/* Farmer Location - Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-hero shadow-medium">
                  <User className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="mt-2 rounded-lg bg-primary px-3 py-1 text-sm font-medium text-primary-foreground whitespace-nowrap">
                  You ({currentLocationName.split(",")[0]})
                </div>
              </div>
            </div>

            {/* Market Cards - Positioned radially */}
            {sortedByProfit.slice(0, 4).map((market, index) => {
              const position = heatmapPositions[index];
              const profitLevel = getProfitLevel(market.netProfit);
              const isBest = market.mandi === bestMarket?.mandi;
              
              // Calculate position
              const angleRad = (position.angle * Math.PI) / 180;
              const x = Math.cos(angleRad) * position.radius;
              const y = Math.sin(angleRad) * position.radius;

              return (
                <div
                  key={market.mandi}
                  className="absolute top-1/2 left-1/2 z-10"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  <div
                    className={`w-32 sm:w-36 rounded-xl border-2 p-3 shadow-soft transition-transform hover:scale-105 ${
                      profitLevel === "high"
                        ? "border-success bg-success/10"
                        : "border-destructive bg-destructive/10"
                    }`}
                  >
                    {isBest && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-success px-2 py-0.5 text-2xs font-medium text-success-foreground whitespace-nowrap">
                          <Award className="h-2.5 w-2.5" />
                          Best
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center">
                      <p className="font-semibold text-foreground text-sm truncate">
                        {market.mandi}
                      </p>
                      <p className="text-2xs text-muted-foreground mt-0.5">
                        {market.distance} km away
                      </p>
                      <div className={`mt-2 text-lg font-bold ${
                        profitLevel === "high" ? "text-success" : "text-destructive"
                      }`}>
                        ₹{market.netProfit.toLocaleString()}
                      </div>
                      <p className={`text-2xs ${
                        profitLevel === "high" ? "text-success" : "text-destructive"
                      }`}>
                        {profitLevel === "high" ? "High Profit" : "Low Profit"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Heatmap Legend */}
          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-success" />
              <span className="text-muted-foreground">High Profit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-destructive" />
              <span className="text-muted-foreground">Low Profit</span>
            </div>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="mt-10 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Detailed Comparison for {selectedCommodity}
          </h2>

          {marketsWithProfit.map((market) => {
            const isBest = market.mandi === bestMarket?.mandi;
            const isHighestPrice = market.mandi === highestPriceMarket?.mandi;
            const isHighCost = market.transportCost > 500;

            return (
              <div
                key={market.mandi}
                className={`rounded-2xl border-2 p-5 ${
                  isBest 
                    ? "border-success bg-success/5" 
                    : "border-border bg-card"
                }`}
              >
                {/* Header with badge */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xl font-semibold text-foreground">
                        {market.mandi}
                      </h3>
                      {isBest && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-success px-3 py-1 text-xs font-medium text-success-foreground">
                          <Award className="h-3 w-3" />
                          Most Profitable
                        </span>
                      )}
                      {isHighestPrice && !isBest && (
                        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                          Highest Price
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-muted-foreground">{market.state}</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {/* Price */}
                  <div className="rounded-xl bg-muted/50 p-3">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <IndianRupee className="h-3 w-3" />
                      Price/Quintal
                    </div>
                    <div className="mt-1 text-lg font-bold text-foreground">
                      ₹{market.price.toLocaleString()}
                    </div>
                  </div>

                  {/* Distance */}
                  <div className="rounded-xl bg-muted/50 p-3">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      Distance
                    </div>
                    <div className="mt-1 text-lg font-bold text-foreground">
                      {market.distance} km
                    </div>
                  </div>

                  {/* Transport Cost */}
                  <div className={`rounded-xl p-3 ${isHighCost ? "bg-destructive/10" : "bg-muted/50"}`}>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Truck className="h-3 w-3" />
                      Transport
                    </div>
                    <div className={`mt-1 text-lg font-bold ${isHighCost ? "text-destructive" : "text-foreground"}`}>
                      -₹{market.transportCost}
                    </div>
                  </div>

                  {/* Net Profit */}
                  <div className={`rounded-xl p-3 ${isBest ? "bg-success/15" : "bg-muted/50"}`}>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Wallet className="h-3 w-3" />
                      Net Profit
                    </div>
                    <div className={`mt-1 text-lg font-bold ${isBest ? "text-success" : "text-foreground"}`}>
                      ₹{market.netProfit.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Market Insight Card */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Market Insight
          </h2>
          <div className="space-y-3">
            {/* Stable Prices */}
            <div className="flex items-center gap-3 rounded-xl border border-success/30 bg-success/5 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/15">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="font-medium text-foreground">Prices are stable today</p>
                <p className="text-sm text-muted-foreground">Good time to sell at current rates</p>
              </div>
            </div>

            {/* High Demand */}
            <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Demand is higher than yesterday</p>
                <p className="text-sm text-muted-foreground">Buyers are actively looking for {selectedCommodity}</p>
              </div>
            </div>

            {/* Tomorrow Warning */}
            <div className="flex items-center gap-3 rounded-xl border border-warning/30 bg-warning/5 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/15">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="font-medium text-foreground">Selling tomorrow may reduce profit</p>
                <p className="text-sm text-muted-foreground">Expected price drop of ₹50-80/quintal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="mt-8 rounded-xl border border-border bg-muted/50 p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground">How We Calculate</p>
              <p className="mt-1 text-muted-foreground">
                <span className="font-semibold text-foreground">Net Profit = Price – Transport Cost</span>
                <br />
                Higher price does not always mean higher profit. A nearby mandi with lower price may give you more money in hand.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 space-y-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Take Action</h2>
          
          <div className="grid gap-3 sm:grid-cols-2">
            {/* Start Auction */}
            <Button asChild variant="hero" size="xl" className="w-full justify-between">
              <Link to="/auction">
                <div className="flex items-center gap-3">
                  <Gavel className="h-6 w-6" />
                  <span>Start Auction</span>
                </div>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>

            {/* Find Transport */}
            <Button variant="outline" size="xl" className="w-full justify-between border-2">
              <div className="flex items-center gap-3">
                <Truck className="h-6 w-6 text-primary" />
                <span>Find Transport</span>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {/* Save Today's Selling Plan */}
            <Button variant="secondary" size="xl" className="w-full justify-between">
              <div className="flex items-center gap-3">
                <Bookmark className="h-6 w-6" />
                <span>Save Selling Plan</span>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </Button>

            {/* Share Plan (WhatsApp-style) */}
            <Button 
              variant="outline" 
              size="xl" 
              className="w-full justify-between border-2 border-success/50 bg-success/5 hover:bg-success/10 text-success hover:text-success"
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="h-6 w-6" />
                <span>Share on WhatsApp</span>
              </div>
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
