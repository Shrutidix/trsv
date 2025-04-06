import React from "react";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Taxi from "./pages/Taxi";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RoutesPage from './pages/Routes';
import Policy from "./pages/policy";
import Terms from "./pages/terms";
import Packages from "./pages/Packages";
import Gallery from "./pages/gallery";
import Feedback from "./pages/Feedback";
import Invoice from "./pages/Invoice";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/taxi" element={<Taxi />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/privacy" element={<Policy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;