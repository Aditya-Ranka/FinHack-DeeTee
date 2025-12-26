import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sprout, TrendingUp, BarChart3, Gavel, BookOpen, LayoutDashboard, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/market-prices", label: "Prices", icon: TrendingUp },
  { href: "/profit-comparison", label: "Compare", icon: BarChart3 },
  { href: "/auction", label: "Auction", icon: Gavel },
  { href: "/literacy-hub", label: "Learn", icon: BookOpen },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background safe-area-top">
        <div className="container flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-lg font-bold text-primary transition-colors hover:text-primary/80 tap-highlight rounded-lg p-1 -m-1"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-hero">
              <Sprout className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="hidden sm:inline text-xl">FinHack-DeeTee</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-4 py-3 text-base font-medium transition-all duration-200",
                    isActive(link.href)
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-12 w-12"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </Button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-foreground/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Navigation Drawer */}
      <nav
        className={cn(
          "fixed top-[calc(4rem+env(safe-area-inset-top))] left-0 right-0 bottom-0 z-50 bg-background overflow-y-auto transition-transform duration-300 ease-out lg:hidden safe-area-bottom",
          isOpen ? "translate-y-0" : "-translate-y-full"
        )}
        aria-label="Mobile navigation"
      >
        <div className="container py-6">
          <p className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">
            Menu
          </p>
          
          <div className="space-y-2">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "flex items-center gap-4 rounded-2xl px-5 py-4 text-xl font-medium transition-all duration-200 tap-highlight",
                    isActive(link.href)
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-foreground hover:bg-muted active:bg-muted"
                  )}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animation: isOpen ? "fade-in 0.3s ease-out forwards" : "none"
                  }}
                >
                  <div className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl",
                    isActive(link.href) ? "bg-primary-foreground/20" : "bg-muted"
                  )}>
                    <Icon className="h-6 w-6" />
                  </div>
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Help Section */}
          <div className="mt-8 rounded-2xl bg-muted p-5">
            <p className="font-semibold text-foreground">Need Help?</p>
            <p className="mt-1 text-muted-foreground">
              Call: <span className="font-semibold text-primary">1800-123-456</span>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Toll-free • Available 24/7
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}
