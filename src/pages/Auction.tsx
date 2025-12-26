import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Gavel, 
  Clock,
  Package,
  IndianRupee,
  Plus,
  Eye,
  Users,
  TrendingUp
} from "lucide-react";

const liveAuctions = [
  {
    id: 1,
    commodity: "Wheat (Sharbati)",
    quantity: 50,
    unit: "Quintals",
    location: "Indore, MP",
    currentBid: 2480,
    bidCount: 8,
    timeLeft: { hours: 2, minutes: 30 },
    seller: "Ramesh K.",
  },
  {
    id: 2,
    commodity: "Basmati Rice (1121)",
    quantity: 30,
    unit: "Quintals",
    location: "Karnal, Haryana",
    currentBid: 6850,
    bidCount: 12,
    timeLeft: { hours: 4, minutes: 15 },
    seller: "Suresh S.",
  },
  {
    id: 3,
    commodity: "Cotton (Long Staple)",
    quantity: 25,
    unit: "Quintals",
    location: "Rajkot, Gujarat",
    currentBid: 7200,
    bidCount: 6,
    timeLeft: { hours: 1, minutes: 45 },
    seller: "Vikram P.",
  },
  {
    id: 4,
    commodity: "Soybean",
    quantity: 40,
    unit: "Quintals",
    location: "Dewas, MP",
    currentBid: 4100,
    bidCount: 9,
    timeLeft: { hours: 5, minutes: 0 },
    seller: "Gopal S.",
  },
  {
    id: 5,
    commodity: "Mustard",
    quantity: 35,
    unit: "Quintals",
    location: "Alwar, Rajasthan",
    currentBid: 5150,
    bidCount: 7,
    timeLeft: { hours: 3, minutes: 20 },
    seller: "Mohan L.",
  },
  {
    id: 6,
    commodity: "Maize",
    quantity: 60,
    unit: "Quintals",
    location: "Davangere, Karnataka",
    currentBid: 1980,
    bidCount: 5,
    timeLeft: { hours: 6, minutes: 45 },
    seller: "Krishna R.",
  },
];

export default function Auction() {
  const [activeTab, setActiveTab] = useState<"browse" | "my">("browse");

  return (
    <div className="py-6 md:py-10">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-display-sm text-foreground flex items-center gap-3">
              <Gavel className="h-8 w-8 text-primary" />
              Auction Marketplace
            </h1>
            <p className="mt-2 text-xl text-muted-foreground">
              Buyers bid on your crops. You choose the best offer.
            </p>
          </div>
          <Button variant="hero" size="lg" className="gap-2 self-start">
            <Plus className="h-5 w-5" />
            Start New Auction
          </Button>
        </div>

        {/* How It Works */}
        <div className="mt-8 rounded-2xl border border-border bg-muted/50 p-5">
          <h2 className="font-semibold text-foreground mb-3">How Reverse Auction Works</h2>
          <div className="grid gap-4 sm:grid-cols-3 text-center">
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">1</div>
              <p className="mt-2 text-muted-foreground">You list your crop</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">2</div>
              <p className="mt-2 text-muted-foreground">Buyers place bids</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">3</div>
              <p className="mt-2 text-muted-foreground">You accept best price</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab("browse")}
            className={`px-6 py-3 text-lg font-medium transition-colors border-b-2 -mb-px ${
              activeTab === "browse"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Live Auctions
          </button>
          <button
            onClick={() => setActiveTab("my")}
            className={`px-6 py-3 text-lg font-medium transition-colors border-b-2 -mb-px ${
              activeTab === "my"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            My Auctions
          </button>
        </div>

        {/* Live Auctions */}
        {activeTab === "browse" && (
          <div className="mt-6 space-y-4">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">{liveAuctions.length}</span> auctions are live right now
            </p>

            {liveAuctions.map((auction) => (
              <div
                key={auction.id}
                className="rounded-2xl border-2 border-border bg-card p-6 shadow-soft"
              >
                {/* Top Row: Commodity & Timer */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {auction.commodity}
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      by {auction.seller} • {auction.location}
                    </p>
                  </div>
                  
                  {/* Countdown Timer */}
                  <div className="flex items-center gap-2 rounded-xl bg-accent/15 px-4 py-2">
                    <Clock className="h-5 w-5 text-accent" />
                    <span className="text-xl font-bold text-accent">
                      {auction.timeLeft.hours}h {auction.timeLeft.minutes}m
                    </span>
                    <span className="text-sm text-accent">left</span>
                  </div>
                </div>

                {/* Info Cards */}
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {/* Quantity */}
                  <div className="rounded-xl bg-muted/50 p-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Package className="h-5 w-5" />
                      <span>Quantity</span>
                    </div>
                    <p className="mt-2 text-2xl font-bold text-foreground">
                      {auction.quantity} <span className="text-base font-normal text-muted-foreground">{auction.unit}</span>
                    </p>
                  </div>

                  {/* Current Bid */}
                  <div className="rounded-xl bg-success/10 p-4">
                    <div className="flex items-center gap-2 text-success">
                      <IndianRupee className="h-5 w-5" />
                      <span>Highest Bid</span>
                    </div>
                    <p className="mt-2 text-2xl font-bold text-success">
                      ₹{auction.currentBid.toLocaleString()}<span className="text-base font-normal">/q</span>
                    </p>
                  </div>

                  {/* Bidders */}
                  <div className="rounded-xl bg-muted/50 p-4 col-span-2 sm:col-span-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-5 w-5" />
                      <span>Active Bidders</span>
                    </div>
                    <p className="mt-2 text-2xl font-bold text-foreground">
                      {auction.bidCount} <span className="text-base font-normal text-muted-foreground">buyers</span>
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-6">
                  <Button asChild variant="gold" size="xl" className="w-full justify-center gap-3">
                    <Link to={`/auction/${auction.id}`}>
                      <Eye className="h-5 w-5" />
                      View Auction
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* My Auctions */}
        {activeTab === "my" && (
          <div className="mt-6">
            {/* Empty State */}
            <div className="rounded-2xl border-2 border-dashed border-border bg-muted/30 p-10 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Gavel className="h-10 w-10 text-primary" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-foreground">
                No Active Auctions
              </h3>
              <p className="mt-2 text-lg text-muted-foreground max-w-sm mx-auto">
                Start your first auction and let buyers compete for your crops
              </p>
              <Button variant="hero" size="xl" className="mt-8 gap-2">
                <Plus className="h-5 w-5" />
                Start New Auction
              </Button>
            </div>

            {/* Benefits */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5">
                <TrendingUp className="h-8 w-8 text-success" />
                <h4 className="mt-3 font-semibold text-foreground">Better Prices</h4>
                <p className="mt-1 text-muted-foreground">
                  Buyers compete, so you get higher prices than local mandi
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <Users className="h-8 w-8 text-primary" />
                <h4 className="mt-3 font-semibold text-foreground">Direct to Buyers</h4>
                <p className="mt-1 text-muted-foreground">
                  No middlemen. You deal directly with verified bulk buyers
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
