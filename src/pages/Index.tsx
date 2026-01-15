import { Suspense, lazy } from "react";
import Layout from "@/components/layout/Layout";

// --- SEÇÕES CRÍTICAS (LCP - Largest Contentful Paint) ---
// Carregamento síncrono para garantir que o usuário veja o conteúdo principal instantaneamente
import HeroSection from "@/components/home/HeroSection";
import PastorMessageSection from "@/components/home/PastorMessageSection";

// --- SEÇÕES ASSÍNCRONAS (Lazy Loading) ---
// Carregadas conforme o usuário faz scroll para reduzir o bundle inicial
const ServiceTimesSection = lazy(() => import("@/components/home/ServiceTimesSection"));
const LatestSermonSection = lazy(() => import("@/components/home/LatestSermonSection"));
const MinistriesSection = lazy(() => import("@/components/home/MinistriesSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Fallback refinado: Skeleton que mantém a estrutura visual e evita Cumulative Layout Shift (CLS)
const SectionSkeleton = () => (
  <div className="container-church py-20">
    <div className="w-full h-[400px] bg-white/5 border border-white/10 animate-pulse rounded-[3rem]" />
  </div>
);

const Index = () => {
  return (
    <Layout>
      {/* DOCUMENT METADATA (React 19+)
        Otimização de SEO e Social Sharing (Open Graph)
      */}
      <title>Família Cristo Salva | Um lugar para recomeçar</title>
      <meta name="description" content="Uma comunidade vibrante em Campinas dedicada a amar a Deus e servir ao próximo. Conheça nossos cultos e ministérios." />
      <meta property="og:title" content="Família Cristo Salva" />
      <meta property="og:description" content="Há um lugar para você em nossa família." />
      <meta property="og:type" content="website" />
      <link rel="canonical" href="https://familiacristosalva.com.br" />

      {/* 1. SEÇÃO DE IMPACTO: Prioridade de renderização alta */}
      <HeroSection />
      
      {/* 2. CONEXÃO: Transição suave para o conteúdo */}
      <PastorMessageSection />

      {/* 3. CARREGAMENTO PROGRESSIVO 
        Usamos Suspense individual ou agrupado dependendo da estratégia de scroll.
        Dica Sênior: Se as seções forem pesadas, considere usar um Intersection Observer 
        dentro de cada componente para disparar o fetch apenas quando visível.
      */}
      <Suspense fallback={<SectionSkeleton />}>
        <div className="flex flex-col">
          <ServiceTimesSection />
          <LatestSermonSection />
          <MinistriesSection />
          <CTASection />
        </div>
      </Suspense>
    </Layout>
  );
};

export default Index;