import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DashboardSkeleton } from "@/components/ui/skeleton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  TrendingUp, 
  BarChart3, 
  Gavel, 
  ArrowRight,
  MapPin,
  ChevronDown,
  IndianRupee,
  Truck,
  Wallet,
  Star,
  Search,
  Wheat,
  Scale,
  Calendar,
  Check,
  Sparkles,
  Users,
  BadgeCheck
} from "lucide-react";

// Timeline steps configuration
const timelineSteps = [
  { id: 1, key: "location", label: "Location", icon: MapPin },
  { id: 2, key: "crop", label: "Crop", icon: Wheat },
  { id: 3, key: "quantity", label: "Quantity", icon: Scale },
  { id: 4, key: "transport", label: "Transport", icon: Truck },
  { id: 5, key: "result", label: "Best Action", icon: Sparkles },
];

const locations = [
  { id: "indore", name: "Indore, Madhya Pradesh" },
  { id: "delhi", name: "Delhi NCR" },
  { id: "karnal", name: "Karnal, Haryana" },
  { id: "rajkot", name: "Rajkot, Gujarat" },
  { id: "nagpur", name: "Nagpur, Maharashtra" },
  { id: "kota", name: "Kota, Rajasthan" },
];

const crops = [
  { id: "wheat", name: "Wheat (गेहूं)", icon: "🌾" },
  { id: "rice", name: "Rice (चावल)", icon: "🍚" },
  { id: "soybean", name: "Soybean (सोयाबीन)", icon: "🫘" },
  { id: "mustard", name: "Mustard (सरसों)", icon: "🌻" },
  { id: "onion", name: "Onion (प्याज)", icon: "🧅" },
];

const units = [
  { id: "quintal", name: "Quintal", short: "Qt" },
  { id: "kg", name: "Kilogram", short: "Kg" },
];

const timelines = [
  { id: "today", name: "Today (आज)" },
  { id: "this-week", name: "This Week (इस हफ्ते)" },
  { id: "flexible", name: "Flexible (लचीला)" },
];

const transportModes = [
  { id: "own", name: "Own Vehicle (अपना वाहन)", icon: "🚛" },
  { id: "hired", name: "Hired Transport (किराए का)", icon: "🚚" },
  { id: "mandi", name: "Mandi Pickup (मंडी पिकअप)", icon: "📦" },
];

const dashboardData = {
  indore: { bestMandi: "Indore Main Mandi", price: 2450, transport: 200, netProfit: 22500 },
  delhi: { bestMandi: "Azadpur Mandi", price: 2380, transport: 350, netProfit: 20300 },
  karnal: { bestMandi: "Karnal Grain Market", price: 2520, transport: 280, netProfit: 22420 },
  rajkot: { bestMandi: "Rajkot APMC", price: 2400, transport: 180, netProfit: 22200 },
  nagpur: { bestMandi: "Kalamna Market", price: 2350, transport: 220, netProfit: 21300 },
  kota: { bestMandi: "Kota Mandi", price: 2480, transport: 250, netProfit: 22300 },
};

export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState("indore");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("quintal");
  const [selectedTimeline, setSelectedTimeline] = useState("");
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isCropDropdownOpen, setIsCropDropdownOpen] = useState(false);
  const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);
  const [isTimelineDropdownOpen, setIsTimelineDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [transportMode, setTransportMode] = useState("");
  const [isTransportDropdownOpen, setIsTransportDropdownOpen] = useState(false);

  // Simulate network delay for skeleton demo
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const closeAllDropdowns = () => {
    setIsCropDropdownOpen(false);
    setIsUnitDropdownOpen(false);
    setIsTimelineDropdownOpen(false);
    setIsLocationDropdownOpen(false);
    setIsTransportDropdownOpen(false);
  };

  // Calculate completed steps for timeline
  const completedSteps = useMemo(() => {
    const steps: string[] = [];
    if (selectedLocation) steps.push("location");
    if (selectedCrop) steps.push("crop");
    if (quantity && parseFloat(quantity) > 0) steps.push("quantity");
    if (transportMode) steps.push("transport");
    if (showResults) steps.push("result");
    return steps;
  }, [selectedLocation, selectedCrop, quantity, transportMode, showResults]);

  // Current active step
  const currentStep = useMemo(() => {
    if (!selectedLocation) return "location";
    if (!selectedCrop) return "crop";
    if (!quantity || parseFloat(quantity) <= 0) return "quantity";
    if (!transportMode) return "transport";
    return "result";
  }, [selectedLocation, selectedCrop, quantity, transportMode]);

  const currentData = dashboardData[selectedLocation as keyof typeof dashboardData];
  const currentLocationName = locations.find(l => l.id === selectedLocation)?.name || "";
  const currentCropData = crops.find(c => c.id === selectedCrop);
  const currentUnitName = units.find(u => u.id === selectedUnit)?.short || "Qt";
  const currentTimelineName = timelines.find(t => t.id === selectedTimeline)?.name || "";

  const canSearch = selectedCrop && quantity && parseFloat(quantity) > 0;

  const handleFindMarket = () => {
    if (!canSearch) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
    }, 800);
  };

  // Calculate net profit based on quantity and unit
  const quantityNum = parseFloat(quantity) || 10;
  const quantityInQuintals = selectedUnit === "kg" ? quantityNum / 100 : quantityNum;
  const calculatedNetProfit = Math.round((currentData.price - currentData.transport) * quantityInQuintals);

  const summaryCards = [
    {
      icon: Star,
      label: "Best Mandi Today",
      value: currentData.bestMandi,
      subtext: "Highest price near you",
      color: "bg-primary/10 text-primary",
      highlight: false,
    },
    {
      icon: IndianRupee,
      label: "Expected Price",
      value: `₹${currentData.price.toLocaleString()}`,
      subtext: "Per quintal",
      color: "bg-secondary/20 text-secondary-foreground",
      highlight: false,
    },
    {
      icon: Truck,
      label: "Transport Cost",
      value: `₹${currentData.transport}`,
      subtext: "Estimated one-way",
      color: "bg-accent/15 text-accent",
      highlight: false,
    },
    {
      icon: Wallet,
      label: "Your Net Profit",
      value: `₹${calculatedNetProfit.toLocaleString()}`,
      subtext: `For ${quantityNum} ${currentUnitName}`,
      color: "bg-success/15 text-success",
      highlight: true,
    },
  ];

  if (isLoading) {
    return (
      <div className="py-6 md:py-10">
        <div className="container max-w-4xl">
          <DashboardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 md:py-10">
      <div className="container max-w-4xl">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Hello Farmer 👋
          </h1>
          <p className="mt-2 text-xl text-muted-foreground">
            Let us help you get the best price
          </p>
        </div>

        {/* Selling Decision Timeline */}
        <div className="mt-6 rounded-2xl border-2 border-border bg-card p-4 sm:p-5 shadow-soft">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4 text-center">
            Selling Decision Timeline
          </p>
          
          {/* Desktop Timeline - Horizontal */}
          <div className="hidden sm:block">
            <div className="relative flex items-center justify-between">
              {/* Progress Line Background */}
              <div className="absolute top-5 left-8 right-8 h-0.5 bg-border" />
              {/* Progress Line Active */}
              <div 
                className="absolute top-5 left-8 h-0.5 bg-primary transition-all duration-500 ease-out"
                style={{ 
                  width: `calc(${(completedSteps.length / (timelineSteps.length - 1)) * 100}% - 64px)`,
                  maxWidth: 'calc(100% - 64px)'
                }}
              />
              
              {timelineSteps.map((step) => {
                const Icon = step.icon;
                const isCompleted = completedSteps.includes(step.key);
                const isCurrent = currentStep === step.key;
                
                return (
                  <div 
                    key={step.id} 
                    className="relative z-10 flex flex-col items-center"
                  >
                    <div 
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2
                        ${isCompleted 
                          ? "bg-primary border-primary text-primary-foreground shadow-md" 
                          : isCurrent 
                            ? "bg-background border-primary text-primary" 
                            : "bg-muted border-border text-muted-foreground"
                        }
                      `}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" strokeWidth={3} />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span 
                      className={`
                        mt-2 text-xs font-semibold transition-colors duration-300 text-center
                        ${isCompleted 
                          ? "text-primary" 
                          : isCurrent 
                            ? "text-foreground" 
                            : "text-muted-foreground"
                        }
                      `}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Timeline - Vertical Stacked */}
          <div className="sm:hidden">
            <div className="flex flex-wrap justify-center gap-2">
              {timelineSteps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = completedSteps.includes(step.key);
                const isCurrent = currentStep === step.key;
                const isLast = index === timelineSteps.length - 1;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div 
                      className={`
                        flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all duration-300
                        ${isCompleted 
                          ? "bg-primary text-primary-foreground" 
                          : isCurrent 
                            ? "bg-primary/15 text-primary border border-primary" 
                            : "bg-muted text-muted-foreground"
                        }
                      `}
                    >
                      {isCompleted ? (
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      ) : (
                        <Icon className="w-3.5 h-3.5" />
                      )}
                      <span className="text-xs font-semibold">{step.label}</span>
                    </div>
                    {!isLast && (
                      <ChevronDown className={`w-4 h-4 mx-0.5 rotate-[-90deg] ${isCompleted ? "text-primary" : "text-border"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selling Details Card */}
        <div className="mt-8 rounded-3xl border-2 border-border bg-card p-6 shadow-soft">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            🌾 What are you selling today?
          </h2>

          <div className="space-y-5">
            {/* Crop Selector */}
            <div>
              <label className="block text-foreground font-semibold mb-3 text-lg">
                <Wheat className="inline h-5 w-5 mr-2 text-primary" />
                Choose Your Crop
              </label>
              <div className="relative">
                <button
                  onClick={() => {
                    closeAllDropdowns();
                    setIsCropDropdownOpen(!isCropDropdownOpen);
                  }}
                  className="flex w-full items-center justify-between rounded-2xl border-2 border-border bg-background px-5 py-4 text-lg font-medium transition-colors hover:border-primary focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 tap-highlight min-h-[60px]"
                  aria-expanded={isCropDropdownOpen}
                  aria-haspopup="listbox"
                >
                  <span className={selectedCrop ? "text-foreground flex items-center gap-2" : "text-muted-foreground"}>
                    {selectedCrop ? (
                      <>
                        <span className="text-2xl">{currentCropData?.icon}</span>
                        {currentCropData?.name}
                      </>
                    ) : (
                      "Tap to select crop..."
                    )}
                  </span>
                  <ChevronDown className={`h-6 w-6 text-muted-foreground transition-transform duration-200 ${isCropDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isCropDropdownOpen && (
                  <div 
                    className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border-2 border-border bg-card shadow-medium overflow-hidden"
                    role="listbox"
                  >
                    <ul className="py-2">
                      {crops.map((crop) => (
                        <li key={crop.id}>
                          <button
                            onClick={() => {
                              setSelectedCrop(crop.id);
                              setIsCropDropdownOpen(false);
                              setShowResults(false);
                            }}
                            className={`flex w-full items-center gap-3 px-5 py-4 text-lg transition-colors tap-highlight ${
                              selectedCrop === crop.id 
                                ? "bg-primary text-primary-foreground font-semibold" 
                                : "text-foreground hover:bg-muted"
                            }`}
                            role="option"
                            aria-selected={selectedCrop === crop.id}
                          >
                            <span className="text-2xl">{crop.icon}</span>
                            {crop.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Quantity Input with Unit Selector */}
            <div>
              <label className="block text-foreground font-semibold mb-3 text-lg">
                <Scale className="inline h-5 w-5 mr-2 text-primary" />
                How Much?
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  min="1"
                  step="0.1"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    setShowResults(false);
                  }}
                  placeholder="Enter quantity..."
                  className="flex-1 rounded-2xl border-2 border-border bg-background px-5 py-4 text-lg font-medium text-foreground transition-colors hover:border-primary focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 placeholder:text-muted-foreground min-h-[60px]"
                />
                
                {/* Unit Selector */}
                <div className="relative w-32">
                  <button
                    onClick={() => {
                      closeAllDropdowns();
                      setIsUnitDropdownOpen(!isUnitDropdownOpen);
                    }}
                    className="flex w-full items-center justify-between rounded-2xl border-2 border-border bg-background px-4 py-4 text-lg font-semibold transition-colors hover:border-primary focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 tap-highlight min-h-[60px]"
                    aria-expanded={isUnitDropdownOpen}
                    aria-haspopup="listbox"
                  >
                    <span className="text-foreground">{currentUnitName}</span>
                    <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isUnitDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isUnitDropdownOpen && (
                    <div 
                      className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border-2 border-border bg-card shadow-medium overflow-hidden"
                      role="listbox"
                    >
                      <ul className="py-2">
                        {units.map((unit) => (
                          <li key={unit.id}>
                            <button
                              onClick={() => {
                                setSelectedUnit(unit.id);
                                setIsUnitDropdownOpen(false);
                                setShowResults(false);
                              }}
                              className={`flex w-full items-center px-4 py-3 text-lg transition-colors tap-highlight ${
                                selectedUnit === unit.id 
                                  ? "bg-primary text-primary-foreground font-semibold" 
                                  : "text-foreground hover:bg-muted"
                              }`}
                              role="option"
                              aria-selected={selectedUnit === unit.id}
                            >
                              {unit.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Selling Timeline (Optional) */}
            <div>
              <label className="block text-foreground font-semibold mb-3 text-lg">
                <Calendar className="inline h-5 w-5 mr-2 text-primary" />
                When to Sell?
                <span className="ml-2 text-sm font-normal text-muted-foreground">(Optional)</span>
              </label>
              <div className="relative">
                <button
                  onClick={() => {
                    closeAllDropdowns();
                    setIsTimelineDropdownOpen(!isTimelineDropdownOpen);
                  }}
                  className="flex w-full items-center justify-between rounded-2xl border-2 border-border bg-background px-5 py-4 text-lg font-medium transition-colors hover:border-primary focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 tap-highlight min-h-[60px]"
                  aria-expanded={isTimelineDropdownOpen}
                  aria-haspopup="listbox"
                >
                  <span className={selectedTimeline ? "text-foreground" : "text-muted-foreground"}>
                    {selectedTimeline ? currentTimelineName : "Choose timeline..."}
                  </span>
                  <ChevronDown className={`h-6 w-6 text-muted-foreground transition-transform duration-200 ${isTimelineDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isTimelineDropdownOpen && (
                  <div 
                    className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border-2 border-border bg-card shadow-medium overflow-hidden"
                    role="listbox"
                  >
                    <ul className="py-2">
                      {timelines.map((timeline) => (
                        <li key={timeline.id}>
                          <button
                            onClick={() => {
                              setSelectedTimeline(timeline.id);
                              setIsTimelineDropdownOpen(false);
                            }}
                            className={`flex w-full items-center gap-3 px-5 py-4 text-lg transition-colors tap-highlight ${
                              selectedTimeline === timeline.id 
                                ? "bg-primary text-primary-foreground font-semibold" 
                                : "text-foreground hover:bg-muted"
                            }`}
                            role="option"
                            aria-selected={selectedTimeline === timeline.id}
                          >
                            {timeline.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Location Selector */}
            <div>
              <label className="block text-foreground font-semibold mb-3 text-lg">
                <MapPin className="inline h-5 w-5 mr-2 text-primary" />
                Your Location
              </label>
              <div className="relative">
                <button
                  onClick={() => {
                    closeAllDropdowns();
                    setIsLocationDropdownOpen(!isLocationDropdownOpen);
                  }}
                  className="flex w-full items-center justify-between rounded-2xl border-2 border-border bg-background px-5 py-4 text-lg font-medium transition-colors hover:border-primary focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 tap-highlight min-h-[60px]"
                  aria-expanded={isLocationDropdownOpen}
                  aria-haspopup="listbox"
                >
                  <span className="text-foreground">{currentLocationName}</span>
                  <ChevronDown className={`h-6 w-6 text-muted-foreground transition-transform duration-200 ${isLocationDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isLocationDropdownOpen && (
                  <div 
                    className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border-2 border-border bg-card shadow-medium overflow-hidden"
                    role="listbox"
                  >
                    <ul className="py-2 max-h-72 overflow-y-auto">
                      {locations.map((location) => (
                        <li key={location.id}>
                          <button
                            onClick={() => {
                              setSelectedLocation(location.id);
                              setIsLocationDropdownOpen(false);
                              setShowResults(false);
                            }}
                            className={`flex w-full items-center gap-3 px-5 py-4 text-lg transition-colors tap-highlight ${
                              selectedLocation === location.id 
                                ? "bg-primary text-primary-foreground font-semibold" 
                                : "text-foreground hover:bg-muted"
                            }`}
                            role="option"
                            aria-selected={selectedLocation === location.id}
                          >
                            <MapPin className="h-5 w-5 flex-shrink-0" />
                            {location.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Transport Mode Selector */}
            <div>
              <label className="block text-foreground font-semibold mb-3 text-lg">
                <Truck className="inline h-5 w-5 mr-2 text-primary" />
                How Will You Transport?
              </label>
              <div className="relative">
                <button
                  onClick={() => {
                    closeAllDropdowns();
                    setIsTransportDropdownOpen(!isTransportDropdownOpen);
                  }}
                  className="flex w-full items-center justify-between rounded-2xl border-2 border-border bg-background px-5 py-4 text-lg font-medium transition-colors hover:border-primary focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 tap-highlight min-h-[60px]"
                  aria-expanded={isTransportDropdownOpen}
                  aria-haspopup="listbox"
                >
                  <span className={transportMode ? "text-foreground flex items-center gap-2" : "text-muted-foreground"}>
                    {transportMode ? (
                      <>
                        <span className="text-xl">{transportModes.find(t => t.id === transportMode)?.icon}</span>
                        {transportModes.find(t => t.id === transportMode)?.name}
                      </>
                    ) : (
                      "Choose transport method..."
                    )}
                  </span>
                  <ChevronDown className={`h-6 w-6 text-muted-foreground transition-transform duration-200 ${isTransportDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isTransportDropdownOpen && (
                  <div 
                    className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border-2 border-border bg-card shadow-medium overflow-hidden"
                    role="listbox"
                  >
                    <ul className="py-2">
                      {transportModes.map((mode) => (
                        <li key={mode.id}>
                          <button
                            onClick={() => {
                              setTransportMode(mode.id);
                              setIsTransportDropdownOpen(false);
                              setShowResults(false);
                            }}
                            className={`flex w-full items-center gap-3 px-5 py-4 text-lg transition-colors tap-highlight ${
                              transportMode === mode.id 
                                ? "bg-primary text-primary-foreground font-semibold" 
                                : "text-foreground hover:bg-muted"
                            }`}
                            role="option"
                            aria-selected={transportMode === mode.id}
                          >
                            <span className="text-xl">{mode.icon}</span>
                            {mode.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Find Best Market Button */}
          <Button
            onClick={handleFindMarket}
            disabled={!canSearch || isSearching}
            loading={isSearching}
            variant="hero"
            size="xl"
            className="w-full justify-center gap-3 mt-8"
          >
            <Search className="h-6 w-6" />
            Find Best Market
          </Button>
        </div>

        {/* Results Section */}
        {showResults ? (
          <>
            {/* Change Crop/Quantity Link */}
            <div className="mt-8 flex items-center justify-between">
              <p className="text-muted-foreground font-medium">
                Results for <span className="text-foreground font-semibold">{currentCropData?.name}</span> · {quantity} {currentUnitName}
              </p>
              <button
                onClick={() => setShowResults(false)}
                className="text-primary font-semibold hover:underline underline-offset-4 tap-highlight"
              >
                Change crop / quantity
              </button>
            </div>

            {/* Today's Best Action Card */}
            <div className="mt-6 rounded-3xl border-2 border-success bg-gradient-to-br from-success/10 via-success/5 to-transparent p-6 sm:p-8 shadow-lg relative overflow-hidden">
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-success/20 to-transparent opacity-50 blur-xl pointer-events-none" />
              
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-success text-success-foreground shadow-md">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      Today's Best Action
                    </h3>
                  </div>
                  
                  {/* Confidence Indicator */}
                  <div className="flex items-center gap-2 bg-success/20 px-3 py-1.5 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-sm font-bold text-success">High Confidence</span>
                  </div>
                </div>

                {/* Recommendation */}
                <p className="mt-5 text-lg sm:text-xl font-semibold text-foreground leading-relaxed">
                  🎯 Sell your <span className="text-success">{currentCropData?.name}</span> at <span className="text-success">{currentData.bestMandi}</span> today for the best returns!
                </p>

                {/* Profit Comparison */}
                <div className="mt-5 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 rounded-2xl bg-card/80 border border-success/30 p-4">
                    <p className="text-sm text-muted-foreground font-medium">You'll earn</p>
                    <p className="text-2xl sm:text-3xl font-bold text-success mt-1">
                      +₹{Math.round(calculatedNetProfit * 0.08).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">more than average mandi</p>
                  </div>
                  
                  <div className="flex-1 rounded-2xl bg-card/80 border border-border p-4">
                    <p className="text-sm text-muted-foreground font-medium">vs Lowest Mandi</p>
                    <p className="text-2xl sm:text-3xl font-bold text-foreground mt-1">
                      +₹{Math.round(calculatedNetProfit * 0.15).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">saved by choosing best</p>
                  </div>
                </div>

                {/* Action hint */}
                <p className="mt-5 text-sm text-muted-foreground bg-muted/50 rounded-xl px-4 py-2 inline-flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  Recommendation based on today's prices & your transport cost
                </p>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {summaryCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.label}
                    className={`rounded-2xl border-2 p-5 transition-all duration-300 ${
                      card.highlight 
                        ? "border-success bg-success/5 shadow-medium" 
                        : "border-border bg-card shadow-soft"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${card.color}`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      {card.highlight && (
                        <span className="rounded-full bg-success px-3 py-1.5 text-sm font-semibold text-success-foreground">
                          Best Deal
                        </span>
                      )}
                    </div>
                    {/* Explanatory Label */}
                    <p className="mt-3 text-xs text-muted-foreground bg-muted/50 rounded-lg px-2 py-1 inline-block">
                      {card.highlight 
                        ? "Calculated using nearby mandis" 
                        : "Based on your crop and quantity"}
                    </p>
                    <p className="mt-2 text-muted-foreground font-medium">{card.label}</p>
                    <p className={`mt-1 text-2xl font-bold ${card.highlight ? "text-success" : "text-foreground"}`}>
                      {card.value}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{card.subtext}</p>
                  </div>
                );
              })}
            </div>

            {/* Why This Mandi - Collapsible Section */}
            <Collapsible className="mt-4">
              <CollapsibleTrigger className="w-full flex items-center justify-between rounded-2xl border-2 border-border bg-card px-5 py-4 text-left hover:border-primary transition-colors tap-highlight group">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <BadgeCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Why this mandi?</p>
                    <p className="text-sm text-muted-foreground">See why we recommend {currentData.bestMandi}</p>
                  </div>
                </div>
                <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              
              <CollapsibleContent className="mt-3 rounded-2xl border-2 border-border bg-card overflow-hidden animate-accordion-down">
                <div className="p-5 space-y-4">
                  {/* Reason 1: Higher Price */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success/15 text-success">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Higher price than nearby mandis</p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        ₹{currentData.price}/Qt vs ₹{currentData.price - 70}/Qt average nearby
                      </p>
                    </div>
                  </div>

                  {/* Reason 2: Lower Transport */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Truck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Lower transport cost</p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Only ₹{currentData.transport} one-way from your location
                      </p>
                    </div>
                  </div>

                  {/* Reason 3: Buyer Demand */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/30 text-secondary-foreground">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Strong buyer demand today</p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        12+ active buyers looking for {currentCropData?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Compare Nearby Mandis Section */}
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Compare Nearby Mandis</h3>
                  <p className="text-sm text-muted-foreground">Net profit comparison for {quantityNum} {currentUnitName}</p>
                </div>
              </div>
              
              {/* Scrollable Cards Container */}
              <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scrollbar-hide">
                {[
                  { 
                    name: currentData.bestMandi, 
                    price: currentData.price, 
                    transport: currentData.transport,
                    netProfit: calculatedNetProfit,
                    isBest: true,
                    distance: "12 km"
                  },
                  { 
                    name: selectedLocation === "indore" ? "Dewas Mandi" : "Regional Market",
                    price: currentData.price - 50, 
                    transport: currentData.transport + 80,
                    netProfit: Math.round((currentData.price - 50 - (currentData.transport + 80)) * quantityInQuintals),
                    isBest: false,
                    distance: "28 km"
                  },
                  { 
                    name: selectedLocation === "indore" ? "Ujjain Mandi" : "District Market",
                    price: currentData.price - 30, 
                    transport: currentData.transport + 150,
                    netProfit: Math.round((currentData.price - 30 - (currentData.transport + 150)) * quantityInQuintals),
                    isBest: false,
                    distance: "45 km"
                  },
                ].map((mandi, index) => (
                  <div 
                    key={index}
                    className={`flex-shrink-0 w-[280px] sm:w-auto sm:flex-1 rounded-2xl border-2 p-5 snap-start transition-all ${
                      mandi.isBest 
                        ? "border-success bg-success/5 shadow-lg shadow-success/10 ring-1 ring-success/20" 
                        : "border-border bg-card hover:border-muted-foreground/30"
                    }`}
                  >
                    {/* Best Badge */}
                    {mandi.isBest && (
                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-success-foreground">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="text-xs font-bold text-success uppercase tracking-wide">Best Option</span>
                      </div>
                    )}
                    
                    {/* Mandi Name */}
                    <h4 className={`font-semibold text-base ${mandi.isBest ? "text-success" : "text-foreground"}`}>
                      {mandi.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{mandi.distance} away</p>
                    
                    {/* Price Info */}
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Price/Qt</span>
                        <span className="font-medium text-foreground">₹{mandi.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Transport</span>
                        <span className="font-medium text-foreground">₹{mandi.transport}</span>
                      </div>
                    </div>
                    
                    {/* Net Profit */}
                    <div className={`mt-4 pt-4 border-t ${mandi.isBest ? "border-success/30" : "border-border"}`}>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">Net Profit</span>
                        <span className={`text-xl font-bold ${mandi.isBest ? "text-success" : "text-foreground"}`}>
                          ₹{mandi.netProfit.toLocaleString()}
                        </span>
                      </div>
                      {!mandi.isBest && (
                        <p className="text-xs text-destructive mt-1 text-right">
                          ₹{(calculatedNetProfit - mandi.netProfit).toLocaleString()} less
                        </p>
                      )}
                      {mandi.isBest && (
                        <p className="text-xs text-success mt-1 text-right font-medium">
                          Maximum returns
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col gap-4">
              <Button asChild variant="gold" size="xl" className="w-full justify-between">
                <Link to="/profit-comparison">
                  <span className="flex items-center gap-3">
                    <BarChart3 className="h-6 w-6" />
                    Compare Profit by Location
                  </span>
                  <ArrowRight className="h-6 w-6" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="xl" className="w-full justify-between">
                <Link to="/auction">
                  <span className="flex items-center gap-3">
                    <Gavel className="h-6 w-6" />
                    Start Auction
                  </span>
                  <ArrowRight className="h-6 w-6" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          /* Empty State - Friendly and Guiding */
          <div className="mt-8 rounded-3xl border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 via-background to-success/5 p-8 sm:p-10 text-center">
            {/* Illustration */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-success/20 shadow-soft">
              <span className="text-5xl">🌾</span>
            </div>
            
            {/* Encouraging Message */}
            <h3 className="mt-6 text-2xl font-bold text-foreground">
              Ready to find the best price?
            </h3>
            <p className="mt-3 text-lg text-muted-foreground max-w-sm mx-auto">
              Tell us what you're selling and we'll find the highest-paying mandi near you!
            </p>
            
            {/* Progress Hints */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${selectedCrop ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
                {selectedCrop ? <Check className="h-4 w-4" /> : <span className="h-4 w-4 rounded-full border-2 border-current" />}
                <span>Select Crop</span>
              </div>
              <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${quantity && parseFloat(quantity) > 0 ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
                {quantity && parseFloat(quantity) > 0 ? <Check className="h-4 w-4" /> : <span className="h-4 w-4 rounded-full border-2 border-current" />}
                <span>Enter Quantity</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium bg-muted text-muted-foreground">
                <Sparkles className="h-4 w-4" />
                <span>Get Best Price</span>
              </div>
            </div>
            
            {/* CTA */}
            <p className="mt-6 text-sm text-muted-foreground">
              👆 Start by selecting your crop above
            </p>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-8">
          <Button asChild variant="outline" size="xl" className="w-full justify-between">
            <Link to="/market-prices">
              <span className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6" />
                View All Mandi Prices
              </span>
              <ArrowRight className="h-6 w-6" />
            </Link>
          </Button>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-center text-muted-foreground">
          Prices updated every hour. Last update: 10:30 AM
        </p>
      </div>
    </div>
  );
}
