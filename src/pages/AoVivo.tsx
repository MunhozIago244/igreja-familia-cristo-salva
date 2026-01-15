import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Play, Calendar, Radio, 
  Youtube, Facebook, MessageCircle,
  Sparkles, MonitorPlay
} from "lucide-react"; // Removidos ExternalLink e ArrowRight (não utilizados)
import { Link } from "react-router-dom";
import { useLiveStatus } from "@/hooks/useLiveStatus";
import { useSermonsList } from "@/hooks/useSermonsList";
import worshipImage from "@/assets/worship.jpg";

const AoVivo = () => {
  // Removidas variáveis liveLoading e sermonsLoading que não estavam sendo lidas
  const { isLive, liveUrl, liveTitle } = useLiveStatus();
  const { sermons } = useSermonsList(1); 
  const latestSermon = sermons[0];

  return (
    <Layout>
      {/* 1. HERO DYNAMICS */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 z-0">
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-linear-to-b ${isLive ? 'from-red-600/10' : 'from-primary/10'} to-transparent`} />
          <div className="absolute top-[-20%] right-[-10%] w-150 h-150 bg-primary/20 blur-[150px] rounded-full opacity-30" />
        </div>

        <div className="container-church relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <span className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 border backdrop-blur-md ${
              isLive 
                ? "bg-red-600/10 border-red-600/30 text-red-500 animate-pulse" 
                : "bg-white/5 border-white/10 text-white/60"
            }`}>
              {isLive ? <><Radio size={12} /> Transmitindo Agora</> : "Aguardando próxima transmissão"}
            </span>

            <h1 className="font-display text-5xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter mb-8 uppercase">
              {isLive ? "Conecte-se à" : "Acompanhe nossa"} <br />
              <span className={`italic ${isLive ? 'text-red-500' : 'text-primary'}`}>
                {isLive ? "Presença Online." : "Caminhada de Fé."}
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 2. MAIN PLAYER SECTION */}
      <section className="pb-32 bg-[#050505]">
        <div className="container-church">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {/* Ajustada classe rounded-[2rem] para rounded-4xl conforme sugestão do Tailwind */}
            <div className="relative aspect-video bg-white/5 rounded-4xl overflow-hidden border border-white/10 shadow-3xl">
              {isLive ? (
                <iframe
                  className="w-full h-full"
                  src={liveUrl?.replace("watch?v=", "embed/") + "?autoplay=1"}
                  title={liveTitle || "Culto ao Vivo"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <img
                    src={latestSermon?.thumbnail || worshipImage}
                    className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
                    alt="Fundo de Adoração"
                  />
                  <div className="relative z-10">
                    <div className="w-24 h-24 bg-white/5 border border-white/10 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-8">
                      <Radio className="w-10 h-10 text-white/20" />
                    </div>
                    <h3 className="font-display text-3xl font-black text-white mb-4 uppercase tracking-tighter">
                      Estamos Temporariamente <span className="text-primary italic">Offline.</span>
                    </h3>
                    <p className="text-white/50 text-lg max-w-md mx-auto mb-10">
                      Nossas transmissões acontecem aos Domingos (09h e 19h) e Quintas (20h).
                    </p>
                    
                    {latestSermon && (
                      <div className="bg-white/5 border border-white/10 p-6 rounded-4xl backdrop-blur-md max-w-sm mx-auto group hover:bg-white/10 transition-all">
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-3">Recomendado para hoje</p>
                        <h4 className="text-white font-bold mb-4 line-clamp-1">{latestSermon.title}</h4>
                        <Button asChild variant="secondary" className="w-full rounded-xl font-black text-[10px] tracking-widest uppercase">
                          <a href={latestSermon.url} target="_blank" rel="noopener noreferrer">
                            <Play size={12} className="mr-2 fill-current" /> Assistir Último Culto
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* INFO GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
              <div className="lg:col-span-2 bg-white/5 border border-white/10 p-10 rounded-4xl backdrop-blur-2xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-primary/20 rounded-2xl text-primary">
                    <Calendar size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tighter uppercase">Próximos Cultos</h3>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { day: "Domingos", time: "09h & 19h", label: "Celebração" },
                    { day: "Quintas", time: "20h00", label: "Cultos Variados" }
                  ].map((item, i) => (
                    <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-3xl group hover:bg-primary/10 transition-all">
                      <p className="text-primary font-black uppercase text-[10px] tracking-widest mb-1">{item.day}</p>
                      <p className="text-3xl font-black text-white mb-1">{item.time}</p>
                      <p className="text-white/40 text-sm font-medium">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-secondary p-10 rounded-4xl flex flex-col justify-between group">
                <div>
                  <Sparkles className="text-black mb-6" size={32} />
                  <h3 className="text-2xl font-black text-black tracking-tighter uppercase leading-none mb-4">
                    Não perca <br />o movimento.
                  </h3>
                  <p className="text-black/60 font-medium text-sm mb-8">
                    Receba o link das transmissões direto no seu WhatsApp.
                  </p>
                </div>
                <div className="space-y-3">
                  <Button className="w-full bg-black text-white hover:bg-black/80 rounded-2xl h-14 font-black uppercase tracking-widest text-[10px]">
                    <MessageCircle className="mr-2" size={16} /> Grupo de Avisos
                  </Button>
                  <div className="flex gap-2">
                    {/* Adicionado 'rel' e 'title' para acessibilidade e segurança */}
                    <Button variant="outline" className="flex-1 border-black/10 bg-black/5 rounded-2xl h-14 hover:bg-black/10" asChild>
                      <a 
                        href="https://www.youtube.com/channel/UCkr4dnH1viDLV7so_mk0QDQ" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        title="Canal do YouTube"
                      >
                        <Youtube size={20} className="text-black" />
                      </a>
                    </Button>
                    <Button variant="outline" className="flex-1 border-black/10 bg-black/5 rounded-2xl h-14 hover:bg-black/10" asChild>
                      <a 
                        href="https://www.facebook.com/cristosalvafamilia" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        title="Página do Facebook"
                      >
                        <Facebook size={20} className="text-black" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. CTA BIBLIOTECA */}
      <section className="pb-32 pt-32">
        <div className="container-church">
          <div className="relative p-12 md:p-24 bg-primary rounded-4xl overflow-hidden group">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center md:text-left">
                <h2 className="font-display text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 uppercase">
                  Uma biblioteca <br /><span className="text-secondary italic">de avivamento.</span>
                </h2>
                <p className="text-white/70 text-lg font-medium">
                  Acesse centenas de mensagens que transformaram nossa família.
                </p>
              </div>
              <Button size="xl" className="bg-white text-primary hover:bg-secondary hover:text-black rounded-3xl h-20 px-12 font-black uppercase tracking-[0.2em] shadow-2xl transition-all" asChild>
                <Link to="/pregacoes">
                  <MonitorPlay className="mr-3" /> Explorar Mensagens
                </Link>
              </Button>
            </div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-white/10 blur-[100px] rounded-full group-hover:bg-white/20 transition-all duration-700" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AoVivo;