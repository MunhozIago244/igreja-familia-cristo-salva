import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// UI Providers (Shadcn)
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Componentes Globais
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer"; // Importação do Footer
import ScrollToTop from "@/components/ui/ScrollToTop";

// --- Lazy Loading das Páginas ---
const Index = lazy(() => import("./pages/Index"));
const QuemSomos = lazy(() => import("./pages/QuemSomos"));
const OndeEstamos = lazy(() => import("./pages/OndeEstamos"));
const Ministerios = lazy(() => import("./pages/Ministerios"));
const Pregacoes = lazy(() => import("./pages/Pregacoes"));
const Eventos = lazy(() => import("./pages/Eventos"));
const SouNovo = lazy(() => import("./pages/SouNovo"));
const Contribuir = lazy(() => import("./pages/Contribuir"));
const PedidoOracao = lazy(() => import("./pages/PedidoOracao"));
const Contato = lazy(() => import("./pages/Contato"));
const AoVivo = lazy(() => import("./pages/AoVivo"));

// Novas Páginas Legais
const Privacidade = lazy(() => import("./pages/Privacidade"));
const Termos = lazy(() => import("./pages/Termos"));

const NotFound = lazy(() => import("./pages/NotFound"));

// --- Configuração do React Query ---
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min
      retry: 1,
      refetchOnWindowFocus: false, // Evita refetch desnecessário ao trocar de aba
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" closeButton />
        
        <BrowserRouter>
          {/* O ScrollToTop garante que ao trocar de rota a página volte ao topo */}
          <ScrollToTop />
          
          {/* Header persistente em todas as rotas */}
          <Header />

          <Suspense 
            fallback={
              <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#0A0A0A] text-white">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-[10px] font-black animate-pulse uppercase tracking-[0.4em] text-primary">
                  Família Cristo Salva
                </p>
              </div>
            }
          >
            <main className="min-h-screen">
              <Routes>
                {/* Rotas Principais */}
                <Route path="/" element={<Index />} />
                <Route path="/quem-somos" element={<QuemSomos />} />
                <Route path="/onde-estamos" element={<OndeEstamos />} />
                <Route path="/ministerios" element={<Ministerios />} />
                <Route path="/pregacoes" element={<Pregacoes />} />
                <Route path="/eventos" element={<Eventos />} />
                <Route path="/sou-novo" element={<SouNovo />} />
                <Route path="/contribuir" element={<Contribuir />} />
                <Route path="/oracao" element={<PedidoOracao />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/ao-vivo" element={<AoVivo />} />
                
                {/* Rotas Legais Adicionadas */}
                <Route path="/privacidade" element={<Privacidade />} />
                <Route path="/termos" element={<Termos />} />
                
                {/* Rota 404 sempre ao final */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;