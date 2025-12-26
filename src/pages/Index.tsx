import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  ArrowRight,
  Users,
  Truck,
  HelpCircle,
  BarChart3,
  Gavel,
  Search,
  Calculator,
  Handshake,
  CircleCheck,
  AlertTriangle
} from "lucide-react";

const problems = [
  {
    icon: Users,
    title: "Middlemen Take Your Profit",
    description: "Brokers and agents keep 15-30% of your hard-earned money. You do all the work, they take the gain.",
  },
  {
    icon: Truck,
    title: "Hidden Transport Costs",
    description: "You only learn the true cost after selling. Surprise charges eat into your profits every time.",
  },
  {
    icon: HelpCircle,
    title: "No Market Information",
    description: "Without knowing prices at other mandis, you accept whatever rate is offered. Knowledge is power.",
  },
];

const solutions = [
  {
    icon: TrendingUp,
    title: "Real-Time Mandi Prices",
    description: "See live prices from 100+ mandis across India. Know exactly where your crop sells highest before you travel.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Calculator,
    title: "Smart Profit Engine",
    description: "Enter your crop and quantity. We calculate your actual profit after transport and commission. No surprises.",
    color: "bg-secondary/20 text-secondary-foreground",
  },
  {
    icon: Gavel,
    title: "Direct Buyer Auction",
    description: "Skip the middleman completely. Bulk buyers bid on your crops. You choose the best offer.",
    color: "bg-accent/15 text-accent",
  },
];

const steps = [
  {
    number: "1",
    title: "Check Mandi Prices",
    description: "Open the app and see today's rates at mandis near you and across India.",
    icon: Search,
  },
  {
    number: "2",
    title: "Compare Your Profit",
    description: "Enter your crop details. See exactly how much you will earn at each location.",
    icon: BarChart3,
  },
  {
    number: "3",
    title: "Sell to Best Buyer",
    description: "Choose the best option or let buyers bid for your crop. Get paid directly.",
    icon: Handshake,
  },
];

export default function Index() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        
        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="animate-fade-in text-display-sm md:text-display text-primary-foreground text-balance leading-tight">
              Sell Your Crops at the Best Price — Without Middlemen
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-primary-foreground/90 animate-fade-in leading-relaxed max-w-2xl mx-auto" style={{ animationDelay: "100ms" }}>
              Real-time mandi prices, profit calculations, and direct buyers. 
              All in one simple app.
            </p>
            
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-in" style={{ animationDelay: "200ms" }}>
              <Button asChild variant="gold" size="xl">
                <Link to="/market-prices">
                  Check Today's Best Market
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <a href="#how-it-works">
                  How It Works
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-2 text-destructive font-medium mb-4">
              <AlertTriangle className="h-5 w-5" />
              The Problem
            </div>
            <h2 className="text-display-sm text-foreground">
              Farmers Lose Money Every Day
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              The current system is broken. Here is why:
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <div
                  key={problem.title}
                  className="rounded-2xl border-2 border-destructive/20 bg-destructive/5 p-6 md:p-8 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-destructive/15 text-destructive">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-foreground">
                    {problem.title}
                  </h3>
                  <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-success/10 px-4 py-2 text-success font-medium mb-4">
              <CircleCheck className="h-5 w-5" />
              Our Solution
            </div>
            <h2 className="text-display-sm text-foreground">
              Take Control of Your Earnings
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Simple tools that put the power back in your hands
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <div
                  key={solution.title}
                  className="group rounded-2xl border border-border bg-card p-6 md:p-8 shadow-soft transition-all duration-300 hover:shadow-medium hover:scale-[1.02] animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl ${solution.color}`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-foreground">
                    {solution.title}
                  </h3>
                  <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-muted scroll-mt-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-display-sm text-foreground">
              How It Works
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Three simple steps to better earnings
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="relative animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Connector Line - Hidden on mobile */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[calc(50%+3rem)] w-[calc(100%-3rem)] h-0.5 bg-border" />
                  )}
                  
                  <div className="flex flex-col items-center text-center">
                    {/* Step Number */}
                    <div className="relative">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full gradient-hero shadow-medium">
                        <Icon className="h-10 w-10 text-primary-foreground" />
                      </div>
                      <div className="absolute -top-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-bold text-lg shadow-soft">
                        {step.number}
                      </div>
                    </div>
                    
                    <h3 className="mt-6 text-xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-lg text-muted-foreground leading-relaxed max-w-xs">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <Button asChild variant="hero" size="xl">
              <Link to="/market-prices">
                Start Now — It's Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-3xl gradient-hero p-8 text-center shadow-glow md:p-12">
            <h2 className="text-display-sm text-primary-foreground">
              Ready to Earn More?
            </h2>
            <p className="mt-4 text-xl text-primary-foreground/90 max-w-xl mx-auto">
              Join thousands of farmers who are already getting better prices for their crops.
            </p>
            <div className="mt-8">
              <Button asChild variant="gold" size="xl">
                <Link to="/market-prices">
                  Check Today's Prices
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
