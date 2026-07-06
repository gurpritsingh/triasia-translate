import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ServicePage from "./pages/ServicePage";
import LocationsIndexPage from "./pages/LocationsIndexPage";
import CityIndexPage from "./pages/CityIndexPage";
import ServiceCategoryPage from "./pages/ServiceCategoryPage";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

// Fixed, static route table — adding a city or language never requires editing
// this file again; see src/content/{cities,languages}.ts.
const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/locations" element={<LocationsIndexPage />} />
          <Route path="/locations/:citySlug" element={<CityIndexPage />} />
          <Route path="/services/:categorySlug" element={<ServiceCategoryPage />} />
          <Route path="/:languageSlug/:serviceSlug" element={<ServicePage />} />
          <Route path="/:citySlug/:languageSlug/:serviceSlug" element={<ServicePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
