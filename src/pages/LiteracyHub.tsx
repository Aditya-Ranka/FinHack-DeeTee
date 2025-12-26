import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  GraduationCap,
  TrendingUp,
  Truck,
  IndianRupee,
  ChevronRight,
  Clock,
  CheckCircle2,
  Play,
  FileText,
  Lightbulb,
  Target,
  BarChart3,
  ArrowRight
} from "lucide-react";

const featuredLessons = [
  {
    id: 1,
    icon: IndianRupee,
    title: "Understanding MSP",
    description: "Learn what Minimum Support Price means, how it is decided by the government, and how you can benefit from it.",
    duration: "8 min read",
    type: "article",
    difficulty: "Beginner",
    color: "bg-primary/10 text-primary",
  },
  {
    id: 2,
    icon: TrendingUp,
    title: "Market Cycles",
    description: "Understand when prices go up and down throughout the year. Learn the best time to sell your crops for maximum profit.",
    duration: "10 min read",
    type: "article",
    difficulty: "Beginner",
    color: "bg-secondary/20 text-secondary-foreground",
  },
  {
    id: 3,
    icon: Truck,
    title: "Logistics Optimisation",
    description: "Simple tips to reduce your transport costs. Learn how to plan trips, share transport, and save money.",
    duration: "6 min read",
    type: "article",
    difficulty: "Beginner",
    color: "bg-accent/15 text-accent",
  },
];

const additionalTopics = [
  {
    id: 4,
    icon: Target,
    title: "Setting Your Selling Price",
    description: "How to decide the right price for your crops",
    duration: "5 min",
  },
  {
    id: 5,
    icon: BarChart3,
    title: "Reading Price Trends",
    description: "Simple ways to understand if prices will rise or fall",
    duration: "7 min",
  },
  {
    id: 6,
    icon: Lightbulb,
    title: "Saving for Next Season",
    description: "Tips to save money and prepare for farming expenses",
    duration: "4 min",
  },
];

export default function LiteracyHub() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <div className="py-6 md:py-10">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-hero mb-4">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-display-sm text-foreground">
            Economic Literacy Hub
          </h1>
          <p className="mt-3 text-xl text-muted-foreground max-w-lg mx-auto">
            Simple lessons to help you earn more and spend wisely. Learn at your own pace.
          </p>
        </div>

        {/* Welcome Card */}
        <div className="mt-8 rounded-2xl gradient-hero p-6 text-center">
          <p className="text-primary-foreground/90 text-lg">
            👋 Welcome! These lessons are written in simple language. No complicated terms. Just practical knowledge for farmers.
          </p>
        </div>

        {/* Featured Lessons */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2 mb-6">
            <BookOpen className="h-5 w-5 text-primary" />
            Start Learning
          </h2>

          <div className="space-y-4">
            {featuredLessons.map((lesson) => {
              const Icon = lesson.icon;
              const isExpanded = expandedCard === lesson.id;

              return (
                <div
                  key={lesson.id}
                  className="rounded-2xl border-2 border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/50 shadow-soft"
                >
                  {/* Main Card Content */}
                  <div className="p-6">
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl ${lesson.color}`}>
                        <Icon className="h-7 w-7" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-semibold text-foreground">
                              {lesson.title}
                            </h3>
                            <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {lesson.duration}
                              </span>
                              <span className="rounded-full bg-success/15 px-2 py-0.5 text-success font-medium">
                                {lesson.difficulty}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
                          {lesson.description}
                        </p>

                        {/* Action Button */}
                        <div className="mt-4">
                          <Button 
                            variant="hero" 
                            size="lg"
                            className="gap-2"
                            onClick={() => setExpandedCard(isExpanded ? null : lesson.id)}
                          >
                            <FileText className="h-5 w-5" />
                            Read More
                            <ChevronRight className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="border-t border-border bg-muted/30 p-6">
                      <div className="prose prose-lg max-w-none">
                        {lesson.id === 1 && (
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-foreground">What is MSP?</h4>
                            <p className="text-muted-foreground">
                              MSP (Minimum Support Price) is the price set by the government at which they will buy your crops. 
                              It protects you from very low market prices.
                            </p>
                            <div className="rounded-xl bg-success/10 p-4 border border-success/20">
                              <p className="text-success font-medium flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5" />
                                Key Point
                              </p>
                              <p className="mt-1 text-foreground">
                                Even if market price falls, government will buy at MSP. This is your safety net.
                              </p>
                            </div>
                            <h4 className="text-lg font-semibold text-foreground">How to Sell at MSP?</h4>
                            <ul className="space-y-2 text-muted-foreground">
                              <li className="flex items-start gap-2">
                                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                                Register with your local procurement center
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                                Bring quality crops that meet standards
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                                Get paid directly to your bank account
                              </li>
                            </ul>
                          </div>
                        )}
                        {lesson.id === 2 && (
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-foreground">Understanding Price Cycles</h4>
                            <p className="text-muted-foreground">
                              Crop prices change throughout the year based on supply and demand. 
                              Knowing these patterns helps you sell at the right time.
                            </p>
                            <div className="grid gap-3 sm:grid-cols-2">
                              <div className="rounded-xl bg-destructive/10 p-4">
                                <p className="font-medium text-destructive">Prices Usually Low</p>
                                <p className="mt-1 text-muted-foreground">Right after harvest when everyone is selling</p>
                              </div>
                              <div className="rounded-xl bg-success/10 p-4">
                                <p className="font-medium text-success">Prices Usually High</p>
                                <p className="mt-1 text-muted-foreground">3-4 months after harvest when supply is low</p>
                              </div>
                            </div>
                            <div className="rounded-xl bg-secondary/20 p-4">
                              <p className="font-medium text-foreground">💡 Tip</p>
                              <p className="mt-1 text-muted-foreground">
                                If you can store your crops safely, waiting 2-3 months often gives 10-15% better price.
                              </p>
                            </div>
                          </div>
                        )}
                        {lesson.id === 3 && (
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-foreground">Reducing Transport Costs</h4>
                            <p className="text-muted-foreground">
                              Transport can eat into your profits. Here are ways to save money:
                            </p>
                            <ul className="space-y-3">
                              <li className="flex items-start gap-3 rounded-xl bg-muted p-4">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">1</span>
                                <div>
                                  <p className="font-medium text-foreground">Share Transport</p>
                                  <p className="text-muted-foreground">Combine your load with neighboring farmers to split costs</p>
                                </div>
                              </li>
                              <li className="flex items-start gap-3 rounded-xl bg-muted p-4">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">2</span>
                                <div>
                                  <p className="font-medium text-foreground">Compare Nearby Mandis</p>
                                  <p className="text-muted-foreground">Sometimes a closer mandi gives better net profit</p>
                                </div>
                              </li>
                              <li className="flex items-start gap-3 rounded-xl bg-muted p-4">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">3</span>
                                <div>
                                  <p className="font-medium text-foreground">Plan Your Trips</p>
                                  <p className="text-muted-foreground">Avoid peak times when transport rates are higher</p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* More Topics */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2 mb-6">
            <Lightbulb className="h-5 w-5 text-secondary" />
            More Topics
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            {additionalTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <div
                  key={topic.id}
                  className="group rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-soft cursor-pointer"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground group-hover:text-primary transition-colors">
                    {topic.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {topic.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {topic.duration}
                    </span>
                    <span className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-10 rounded-2xl border border-border bg-muted/50 p-6 text-center">
          <p className="text-lg text-foreground">
            🤔 Have questions about any topic?
          </p>
          <p className="mt-1 text-muted-foreground">
            Call our toll-free helpline: <span className="font-semibold text-primary">1800-123-456</span>
          </p>
        </div>
      </div>
    </div>
  );
}
