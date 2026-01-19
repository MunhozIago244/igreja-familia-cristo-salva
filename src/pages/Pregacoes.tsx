import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Calendar, Search, Youtube, Share2, ArrowUpRight } from "lucide-react";
// Correção do erro 2307: Importando o tipo explicitamente para resolver o erro de declaração
import { useSermonsList } from "@/hooks/useSermonsList";
import type { Sermon } from "@/types/Sermon"; 

const Pregacoes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: sermons, isLoading } = useSermonsList();

  // Correção do erro 7006: Tipando explicitamente o parâmetro 'sermon'
  const filteredSermons = (sermons || []).filter((sermon: Sermon) =>
    sermon.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredSermon = filteredSermons[0];
  const otherSermons = filteredSermons.slice(1);

  return (
    <Layout>
      {/* --- HERO EDITORIAL --- */}
      <section className="relative pt-40 pb-20 bg-[#FFFFFF] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container-church relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/50 text-secondary-foreground rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Arquivo de Mensagens
            </span>
            <h1 className="font-display text-6xl lg:text-8xl font-black text-[#1A1A1A] tracking-tighter leading-[0.9] mb-8">
              Alimentando a <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-primary/80 to-secondary">
                Fé da Família.
              </span>
            </h1>
            <div className="flex flex-col md:flex-row md:items-center gap-8 mt-12">
              <div className="relative flex-1 group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                <Input
                  type="text"
                  placeholder="Pesquisar por título ou tema..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-14 h-16 rounded-2xl border-gray-100 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] focus:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all text-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-32 bg-white">
        <div className="container-church">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <SermonGridSkeleton />
            ) : (
              <>
                {/* DESTAQUE PRINCIPAL */}
                {featuredSermon && !searchTerm && (
                  <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mb-32">
                    <div className="group relative grid lg:grid-cols-12 bg-white rounded-[4rem] overflow-hidden shadow-[0_60px_120px_-20px_rgba(0,0,0,0.08)] border border-gray-50 transition-all duration-700 hover:shadow-2xl">
                      <div className="lg:col-span-7 relative aspect-video lg:aspect-auto overflow-hidden">
                        <img src={featuredSermon.thumbnail} alt={featuredSermon.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                        {/* Correção de Acessibilidade: Adicionado title e aria-label */}
                        <a 
                          href={featuredSermon.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          title={`Assistir: ${featuredSermon.title}`}
                          aria-label={`Assistir vídeo: ${featuredSermon.title}`}
                          className="absolute inset-0 flex items-center justify-center group"
                        >
                          <div className="w-24 h-24 bg-white/90 backdrop-blur-md text-primary rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110">
                            <Play size={32} className="fill-current ml-1" />
                          </div>
                        </a>
                      </div>
                      <div className="lg:col-span-5 p-12 lg:p-20 flex flex-col justify-center">
                        <div className="flex items-center gap-3 text-[10px] font-black text-primary uppercase tracking-widest mb-6">
                          <Calendar size={14} /> {featuredSermon.date}
                        </div>
                        <h2 className="font-display text-4xl lg:text-5xl font-black text-[#1A1A1A] mb-8 leading-[1.1] tracking-tighter">
                          {featuredSermon.title}
                        </h2>
                        <div className="flex flex-wrap gap-4">
                          <Button asChild size="xl" className="rounded-2xl h-16 px-10 font-bold shadow-xl shadow-primary/20">
                            <a href={featuredSermon.url} target="_blank" rel="noopener noreferrer">ASSISTIR AGORA</a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* GRID DE MENSAGENS */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
                  {/* Correção do erro 7006: Tipando sermon (Sermon) e index (number) */}
                  {(searchTerm ? filteredSermons : otherSermons).map((sermon: Sermon, index: number) => (
                    <motion.div
                      key={sermon.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="group"
                    >
                      <a href={sermon.url} target="_blank" rel="noopener noreferrer" className="block" title={sermon.title}>
                        <div className="relative aspect-video rounded-[2.5rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-500">
                          <img src={sermon.thumbnail} alt={sermon.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                        <div className="px-2">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{sermon.date}</span>
                            <ArrowUpRight size={14} className="text-gray-300 group-hover:text-primary transition-all" />
                          </div>
                          <h3 className="font-display text-2xl font-black text-[#1A1A1A] leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {sermon.title}
                          </h3>
                        </div>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

const SermonGridSkeleton = () => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="animate-pulse">
        <div className="aspect-video bg-gray-50 rounded-[2.5rem] mb-8" />
        <div className="h-4 w-24 bg-gray-100 rounded mb-4" />
        <div className="h-8 w-full bg-gray-100 rounded" />
      </div>
    ))}
  </div>
);

export default Pregacoes;