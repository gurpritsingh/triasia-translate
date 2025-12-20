import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import KoreanInterpreter from "./pages/KoreanInterpreter";
import KoreanTranslator from "./pages/KoreanTranslator";
import KannadInterpreter from "./pages/KannadInterpreter";
import KannadTranslator from "./pages/KannadTranslator";
import PunjabiInterpreter from "./pages/PunjabiInterpreter";
import PunjabiTranslator from "./pages/PunjabiTranslator";
import HindiInterpreter from "./pages/HindiInterpreter";
import HindiTranslator from "./pages/HindiTranslator";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
                    <Route path="/hindi/translator" element={<HindiTranslator />} />
                    <Route path="/hindi/interpreter" element={<HindiInterpreter />} />
                    <Route path="/punjabi/translator" element={<PunjabiTranslator />} />
                    <Route path="/punjabi/interpreter" element={<PunjabiInterpreter />} />
                    <Route path="/kannad/translator" element={<KannadTranslator />} />
                    <Route path="/kannad/interpreter" element={<KannadInterpreter />} />
                    <Route path="/korean/translator" element={<KoreanTranslator />} />
                    <Route path="/korean/interpreter" element={<KoreanInterpreter />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
