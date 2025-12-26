import { useState, useEffect } from "react";
import { ListSkeleton } from "@/components/ui/skeleton";
import { 
  Search, 
  TrendingUp,
  ChevronDown,
  Clock,
  MapPin
} from "lucide-react";

const commodities = ["All Commodities", "Wheat", "Basmati Rice", "Mustard", "Cotton", "Soybean", "Maize", "Gram"];

const priceData = [
  { id: 1, commodity: "Wheat", mandi: "Indore", state: "MP", price: 2450, updatedAt: "10:30 AM" },
  { id: 2, commodity: "Wheat", mandi: "Delhi", state: "Delhi", price: 2380, updatedAt: "10:15 AM" },
  { id: 3, commodity: "Wheat", mandi: "Bhopal", state: "MP", price: 2420, updatedAt: "09:45 AM" },
  { id: 4, commodity: "Basmati Rice", mandi: "Karnal", state: "Haryana", price: 6800, updatedAt: "10:00 AM" },
  { id: 5, commodity: "Basmati Rice", mandi: "Amritsar", state: "Punjab", price: 6650, updatedAt: "09:30 AM" },
  { id: 6, commodity: "Basmati Rice", mandi: "Ludhiana", state: "Punjab", price: 6720, updatedAt: "10:20 AM" },
  { id: 7, commodity: "Mustard", mandi: "Jaipur", state: "Rajasthan", price: 5100, updatedAt: "10:10 AM" },
  { id: 8, commodity: "Mustard", mandi: "Alwar", state: "Rajasthan", price: 5050, updatedAt: "09:50 AM" },
  { id: 9, commodity: "Cotton", mandi: "Rajkot", state: "Gujarat", price: 7200, updatedAt: "10:25 AM" },
  { id: 10, commodity: "Cotton", mandi: "Nagpur", state: "Maharashtra", price: 7050, updatedAt: "09:40 AM" },
  { id: 11, commodity: "Soybean", mandi: "Indore", state: "MP", price: 4100, updatedAt: "10:05 AM" },
  { id: 12, commodity: "Soybean", mandi: "Dewas", state: "MP", price: 4050, updatedAt: "09:55 AM" },
  { id: 13, commodity: "Maize", mandi: "Davangere", state: "Karnataka", price: 1950, updatedAt: "10:15 AM" },
  { id: 14, commodity: "Gram", mandi: "Bikaner", state: "Rajasthan", price: 5200, updatedAt: "09:35 AM" },
];

export default function MarketPrices() {
  const [selectedCommodity, setSelectedCommodity] = useState("All Commodities");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate network delay
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter data
  const filteredData = priceData.filter((item) => {
    const matchesCommodity = selectedCommodity === "All Commodities" || item.commodity === selectedCommodity;
    const matchesSearch = 
      item.commodity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mandi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCommodity && matchesSearch;
  });

  // Find highest price per commodity
  const highestPrices: Record<string, number> = {};
  priceData.forEach((item) => {
    if (!highestPrices[item.commodity] || item.price > highestPrices[item.commodity]) {
      highestPrices[item.commodity] = item.price;
    }
  });

  return (
    <div className="py-6 md:py-10">
      <div className="container max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-primary" />
            Mandi Prices
          </h1>
          <p className="mt-2 text-xl text-muted-foreground">
            Today's prices from mandis across India
          </p>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          {/* Commodity Dropdown */}
          <div className="relative flex-1">
            <label className="block text-sm font-semibold text-muted-foreground mb-2">
              Filter by Commodity
            </label>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex w-full items-center justify-between rounded-2xl border-2 border-border bg-card px-5 py-4 text-lg font-medium text-foreground transition-colors hover:border-primary focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 tap-highlight"
              aria-expanded={isDropdownOpen}
            >
              <span>{selectedCommodity}</span>
              <ChevronDown className={`h-6 w-6 text-muted-foreground transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border-2 border-border bg-card shadow-medium overflow-hidden">
                <ul className="py-2 max-h-72 overflow-y-auto">
                  {commodities.map((commodity) => (
                    <li key={commodity}>
                      <button
                        onClick={() => {
                          setSelectedCommodity(commodity);
                          setIsDropdownOpen(false);
                        }}
                        className={`flex w-full items-center px-5 py-4 text-lg transition-colors tap-highlight ${
                          selectedCommodity === commodity 
                            ? "bg-primary text-primary-foreground font-semibold" 
                            : "text-foreground hover:bg-muted"
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

          {/* Search */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-muted-foreground mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search mandi or state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-[60px] w-full rounded-2xl border-2 border-border bg-card pl-14 pr-5 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing <span className="font-bold text-foreground">{filteredData.length}</span> results
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            Updated just now
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="mt-4">
            <ListSkeleton count={5} />
          </div>
        ) : (
          <>
            {/* Price List */}
            <div className="mt-4 space-y-3">
              {filteredData.map((item) => {
                const isHighest = item.price === highestPrices[item.commodity];
                
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border-2 p-5 transition-colors tap-highlight ${
                      isHighest 
                        ? "border-success bg-success/5" 
                        : "border-border bg-card"
                    }`}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      {/* Left: Commodity & Location */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-xl font-bold text-foreground">
                            {item.commodity}
                          </h3>
                          {isHighest && (
                            <span className="rounded-full bg-success px-3 py-1 text-sm font-semibold text-success-foreground">
                              Highest Price
                            </span>
                          )}
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-5 w-5 flex-shrink-0" />
                          <span className="text-lg">{item.mandi}, {item.state}</span>
                        </div>
                      </div>

                      {/* Right: Price & Time */}
                      <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-1">
                        <div className={`text-2xl sm:text-3xl font-bold ${isHighest ? "text-success" : "text-foreground"}`}>
                          ₹{item.price.toLocaleString()}
                          <span className="text-base font-normal text-muted-foreground">/q</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {item.updatedAt}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State - Friendly and Guiding */}
            {filteredData.length === 0 && (
              <div className="mt-12 text-center rounded-3xl border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 via-background to-accent/5 p-10">
                {/* Illustration */}
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 shadow-soft">
                  <span className="text-5xl">🔍</span>
                </div>
                
                {/* Encouraging Message */}
                <h3 className="mt-6 text-2xl font-bold text-foreground">
                  No matches yet — but don't worry!
                </h3>
                <p className="mt-3 text-lg text-muted-foreground max-w-md mx-auto">
                  We couldn't find prices matching your search. Try a different commodity or mandi name.
                </p>
                
                {/* Helpful Tips */}
                <div className="mt-6 inline-flex flex-col gap-2 text-left bg-muted/50 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-primary">💡</span> Try searching for "Wheat" or "Delhi"
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-primary">💡</span> Check if the commodity filter is set correctly
                  </p>
                </div>
                
                {/* CTA Button */}
                <button
                  onClick={() => { setSearchQuery(""); setSelectedCommodity("All Commodities"); }}
                  className="mt-6 inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-lg rounded-xl px-6 py-3 hover:bg-primary/90 transition-colors tap-highlight"
                >
                  <TrendingUp className="h-5 w-5" />
                  Show All Prices
                </button>
              </div>
            )}

            {/* Legend */}
            <div className="mt-8 flex items-center gap-3 text-muted-foreground">
              <div className="h-4 w-4 rounded-full bg-success flex-shrink-0" />
              <span>Green = Highest price for that commodity</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
