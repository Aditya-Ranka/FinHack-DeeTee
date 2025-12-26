import { Link } from "react-router-dom";
import { Sprout, Phone, Mail } from "lucide-react";

const platformLinks = [
  { label: "Market Prices", href: "/market-prices" },
  { label: "Compare Profit", href: "/profit-comparison" },
  { label: "Auction", href: "/auction" },
  { label: "Learning Hub", href: "/literacy-hub" },
];

const helpLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Contact Us", href: "#" },
  { label: "FAQs", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-hero">
                <Sprout className="h-6 w-6 text-primary-foreground" />
              </div>
              <span>FinHack-DeeTee</span>
            </Link>
            <p className="mt-4 max-w-sm text-muted-foreground leading-relaxed">
              Better prices for Indian farmers. No middlemen. No hidden costs.
            </p>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <a href="tel:+911800123456" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-5 w-5" />
                <span>1800-123-456 (Toll Free)</span>
              </a>
              <a href="mailto:help@finhack-deetee.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
                <span>help@finhack-deetee.com</span>
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Platform</h3>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Help</h3>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground text-center">
            © 2024 FinHack-DeeTee. Made for Indian Farmers.
          </p>
        </div>
      </div>
    </footer>
  );
}
