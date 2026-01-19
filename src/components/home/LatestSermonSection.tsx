import { motion, AnimatePresence } from "framer-motion";
import { Play, Calendar, Youtube, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLatestSermon } from "@/hooks/useLatestSermon";

const LatestSermonSection = () => {
  // Chamada do hook que consome a API real
  const { data: sermon, isLoading } = useLatestSermon();

  // Função para compartilhar
  const handleShare = () => {
    if (sermon?.url) {
      navigator.share?.({
        title: sermon.title,
        url: sermon.url,
      }).catch(() => {
        navigator.clipboard.writeText(sermon.url);
        alert("Link copiado para a área de transferência!");
      });
    }
  };

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 blur-[100px] rounded-full animate-pulse" />
      </div>

      <div className="container-church relative z-10">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <SermonSkeleton key="skeleton" />
          ) : sermon ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary text-secondary-foreground rounded-full text-[10px] font-black uppercase tracking-widest mb-6 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  Última Ministração
                </span>
                <h2 className="font-display text-5xl lg:text-7xl font-black text-[#1A1A1A] tracking-tighter">
                  Assista ao nosso <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
                    Último Culto Online
                  </span>
                </h2>
              </div>

              <div className="group relative bg-white rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col lg:flex-row transition-all duration-500 hover:shadow-[0_80px_150px_-30px_rgba(0,0,0,0.15)]">
                
                <div className="lg:w-7/12 relative aspect-video lg:aspect-auto overflow-hidden">
                  <img
                    src={sermon.thumbnail}
                    alt={sermon.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <a
                      href={sermon.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-24 h-24 bg-white text-primary rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
                    >
                      <Play size={32} className="fill-current ml-1" />
                    </a>
                  </div>
                </div>

                <div className="lg:w-5/12 p-10 lg:p-14 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-[10px] font-black text-primary uppercase tracking-widest mb-6">
                    <Calendar size={14} /> {sermon.publishedAt}
                  </div>
                  
                  <h3 className="font-display text-3xl font-black text-[#1A1A1A] mb-6 leading-[1.1] tracking-tighter">
                    {sermon.title}
                  </h3>

                  <p className="text-gray-500 font-light mb-10 text-lg leading-relaxed">
                    Acompanhe a palavra liberada para nossa família. 
                    Seja edificado através do louvor e da ministração direto do nosso canal.
                  </p>

                  <div className="flex flex-col gap-4">
                    <Button asChild size="xl" className="rounded-2xl h-16 font-bold shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90">
                      <a href={sermon.url} target="_blank" rel="noopener noreferrer">
                        ASSISTIR NO YOUTUBE <Youtube className="ml-2" />
                      </a>
                    </Button>
                    <button 
                      onClick={handleShare}
                      className="flex items-center justify-center gap-2 text-gray-400 hover:text-primary transition-colors text-[10px] font-bold uppercase tracking-widest"
                    >
                      <Share2 size={14} /> Compartilhar Culto
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-20 text-gray-400">Nenhum culto recente encontrado.</div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const SermonSkeleton = () => (
  <div className="max-w-6xl mx-auto w-full h-[500px] bg-gray-50 rounded-[3.5rem] animate-pulse flex flex-col lg:flex-row overflow-hidden border border-gray-100">
    <div className="lg:w-7/12 bg-gray-200" />
    <div className="lg:w-5/12 p-14 space-y-6">
      <div className="w-20 h-4 bg-gray-200 rounded" />
      <div className="w-full h-12 bg-gray-200 rounded" />
      <div className="w-full h-24 bg-gray-200 rounded" />
      <div className="w-full h-16 bg-gray-200 rounded-2xl" />
    </div>
  </div>
);

export default LatestSermonSection;