import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Gavel, 
  Clock,
  Package,
  IndianRupee,
  ArrowLeft,
  CheckCircle,
  XCircle,
  TrendingUp,
  User,
  MapPin,
  BarChart3
} from "lucide-react";

// Mock auction data
const auctionData = {
  id: 1,
  commodity: "Wheat (Sharbati)",
  quantity: 50,
  unit: "Quintals",
  location: "Indore, MP",
  seller: "Ramesh Kumar",
  startingPrice: 2300,
  timeLeft: { hours: 2, minutes: 30, seconds: 45 },
  createdAt: "2 hours ago",
};

// Mock bid data with timestamps
const initialBids = [
  { id: 1, buyerName: "Agri Traders Ltd", location: "Delhi", amount: 2480, time: "2 min ago", isTop: true },
  { id: 2, buyerName: "Krishna Foods", location: "Mumbai", amount: 2450, time: "5 min ago", isTop: false },
  { id: 3, buyerName: "Bharat Grains", location: "Ahmedabad", amount: 2420, time: "12 min ago", isTop: false },
  { id: 4, buyerName: "Sharma Exports", location: "Jaipur", amount: 2400, time: "18 min ago", isTop: false },
  { id: 5, buyerName: "MP Commodities", location: "Bhopal", amount: 2380, time: "25 min ago", isTop: false },
];

// New bids that will appear (mock real-time)
const newBidsQueue = [
  { id: 6, buyerName: "Gujarat Mills", location: "Surat", amount: 2500, time: "Just now", isTop: true },
  { id: 7, buyerName: "Punjab Traders", location: "Ludhiana", amount: 2520, time: "Just now", isTop: true },
];

export default function AuctionDetail() {
  const { id } = useParams();
  const [bids, setBids] = useState(initialBids);
  const [newBidIndex, setNewBidIndex] = useState(0);
  const [selectedBid, setSelectedBid] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(auctionData.timeLeft);

  // Mock real-time bid updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (newBidIndex < newBidsQueue.length) {
        const newBid = newBidsQueue[newBidIndex];
        setBids(prev => {
          const updated = prev.map(b => ({ ...b, isTop: false }));
          return [newBid, ...updated];
        });
        setNewBidIndex(prev => prev + 1);
      }
    }, 8000); // New bid every 8 seconds

    return () => clearInterval(interval);
  }, [newBidIndex]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          return { hours: 0, minutes: 0, seconds: 0 };
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const topBid = bids[0];
  const totalBidValue = topBid.amount * auctionData.quantity;

  return (
    <div className="py-6 md:py-10">
      <div className="container max-w-4xl">
        {/* Back Button */}
        <Link 
          to="/auction" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Auctions
        </Link>

        {/* Auction Header */}
        <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-success/15 px-3 py-1 text-sm font-medium text-success mb-3">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                Live Auction
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                {auctionData.commodity}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Package className="h-4 w-4" />
                  {auctionData.quantity} {auctionData.unit}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {auctionData.location}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {auctionData.seller}
                </span>
              </div>
            </div>

            {/* Countdown */}
            <div className="rounded-xl bg-accent/15 px-5 py-3 text-center">
              <p className="text-sm text-muted-foreground mb-1">Time Remaining</p>
              <div className="flex items-center gap-1 text-2xl font-bold text-accent">
                <Clock className="h-6 w-6 mr-1" />
                {String(timeLeft.hours).padStart(2, "0")}:
                {String(timeLeft.minutes).padStart(2, "0")}:
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>

        {/* Current Highest Bid - Highlighted */}
        <div className="mt-6 rounded-2xl border-2 border-success bg-success/10 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-success font-medium flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Current Highest Bid
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-bold text-success">
                  ₹{topBid.amount.toLocaleString()}
                </span>
                <span className="text-xl text-success/70">/quintal</span>
              </div>
              <p className="mt-2 text-muted-foreground">
                Total Value: <span className="font-semibold text-foreground">₹{totalBidValue.toLocaleString()}</span> for {auctionData.quantity} quintals
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm text-muted-foreground">Top Bidder</p>
              <p className="text-lg font-semibold text-foreground">{topBid.buyerName}</p>
              <p className="text-sm text-muted-foreground">{topBid.location}</p>
            </div>
          </div>
        </div>

        {/* Bid History Graph Placeholder */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-semibold text-foreground flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-primary" />
            Bid History
          </h2>
          <div className="h-32 rounded-xl bg-muted/50 flex items-center justify-center border-2 border-dashed border-border">
            <div className="text-center">
              <BarChart3 className="h-10 w-10 text-muted-foreground mx-auto" />
              <p className="mt-2 text-muted-foreground">Bid trend graph will appear here</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>Starting: ₹{auctionData.startingPrice}</span>
            <span>Current: ₹{topBid.amount}</span>
            <span className="text-success font-medium">+₹{topBid.amount - auctionData.startingPrice} increase</span>
          </div>
        </div>

        {/* Live Bid List */}
        <div className="mt-6">
          <h2 className="font-semibold text-foreground flex items-center gap-2 mb-4">
            <Gavel className="h-5 w-5 text-primary" />
            All Bids ({bids.length})
            <span className="ml-2 flex items-center gap-1 text-sm font-normal text-success">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              Live
            </span>
          </h2>

          <div className="space-y-3">
            {bids.map((bid, index) => (
              <div
                key={bid.id}
                onClick={() => setSelectedBid(selectedBid === bid.id ? null : bid.id)}
                className={`rounded-2xl border-2 p-4 cursor-pointer transition-all ${
                  bid.isTop
                    ? "border-success bg-success/5 shadow-soft"
                    : selectedBid === bid.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                      index === 0 
                        ? "bg-success text-success-foreground" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      #{index + 1}
                    </div>
                    
                    <div>
                      <p className="font-semibold text-foreground">{bid.buyerName}</p>
                      <p className="text-sm text-muted-foreground">{bid.location} • {bid.time}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`text-xl font-bold ${bid.isTop ? "text-success" : "text-foreground"}`}>
                      ₹{bid.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">/quintal</p>
                  </div>
                </div>

                {/* Expanded Actions */}
                {selectedBid === bid.id && (
                  <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3 sm:flex-row">
                    <Button variant="hero" size="lg" className="flex-1 gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Accept This Bid
                    </Button>
                    <Button variant="outline" size="lg" className="flex-1 gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                      <XCircle className="h-5 w-5" />
                      Reject Bid
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Action Buttons - Fixed at bottom on mobile */}
        <div className="mt-8 sticky bottom-6 z-10">
          <div className="rounded-2xl border-2 border-border bg-card p-4 shadow-medium">
            <p className="text-center text-muted-foreground mb-3">
              Tap on any bid above to accept or reject
            </p>
            <div className="flex gap-3">
              <Button variant="hero" size="xl" className="flex-1 gap-2">
                <CheckCircle className="h-6 w-6" />
                Accept Top Bid
              </Button>
              <Button variant="outline" size="xl" className="flex-1 gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                <XCircle className="h-6 w-6" />
                End Auction
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
