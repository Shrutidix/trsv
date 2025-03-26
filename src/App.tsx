import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Taxi from "./pages/Taxi";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RoutesPage from './pages/Routes';
import  Policy from "./pages/policy";
import Terms from "./pages/terms";

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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />


          <Route path="/privacy" element={< Policy/>}/>
          <Route path="/terms" element={< Terms/>}/>
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;