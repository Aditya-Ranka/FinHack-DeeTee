import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import MarketPrices from "./pages/MarketPrices";
import ProfitComparison from "./pages/ProfitComparison";
import Auction from "./pages/Auction";
import AuctionDetail from "./pages/AuctionDetail";
import LiteracyHub from "./pages/LiteracyHub";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/market-prices" element={<MarketPrices />} />
            <Route path="/profit-comparison" element={<ProfitComparison />} />
            <Route path="/auction" element={<Auction />} />
            <Route path="/auction/:id" element={<AuctionDetail />} />
            <Route path="/literacy-hub" element={<LiteracyHub />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
