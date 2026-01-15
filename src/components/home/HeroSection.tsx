import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, Users, Church, Heart, ArrowRight } from "lucide-react";
import { motion, Variants, Transition } from "framer-motion";
import { useLiveStatus } from "@/hooks/useLiveStatus";
import heroImage from "@/public/FAMILIA.jpg";

const heroVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 }
};

const baseTransition: Transition = { 
  duration: 1, 
  ease: [0.16, 1, 0.3, 1] 
};

const HeroSection = () => {
  const { isLive, liveUrl } = useLiveStatus();

  return (
    // Corrigido: min-h-[100vh] -> min-h-screen
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 z-0">
        {/* Corrigido: w-[600px] h-[600px] -> w-150 h-150 */}
        <div className="absolute top-[-10%] left-[-10%] w-150 h-150 bg-primary/20 blur-[150px] rounded-full opacity-50" />
        
        <img
          src={heroImage}
          alt="Igreja Família Cristo Salva"
          // Corrigido: Removido style inline para usar classes Tailwind (Webhint)
          className="w-full h-full object-cover opacity-30 scale-105 contrast-110 brightness-50"
        />
        
        {/* Corrigido: bg-gradient-to-b -> bg-linear-to-b (Tailwind v4) */}
        <div className="absolute inset-0 bg-linear-to-b from-[#050505]/90 via-[#050505]/40 to-[#050505]" />
      </div>

      <div className="container-church relative z-10 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          
          {isLive && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={baseTransition}
              className="flex justify-center mb-10"
            >
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-red-600/10 border border-red-600/20 backdrop-blur-md rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500">
                  Ao Vivo Agora
                </span>
              </div>
            </motion.div>
          )}

          <motion.h1
            className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-black text-white mb-8 leading-[0.85] tracking-[-0.04em]"
            variants={heroVariants}
            initial="initial"
            animate="animate"
            transition={{ ...baseTransition, delay: 0.1 }}
          >
            Lugar de <br />
            {/* Corrigido: bg-gradient-to-r -> bg-linear-to-r */}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-primary to-secondary inline-block">
              Recomeços.
            </span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-2xl text-white/60 mb-14 max-w-2xl mx-auto leading-relaxed font-light"
            variants={heroVariants}
            initial="initial"
            animate="animate"
            transition={{ ...baseTransition, delay: 0.2 }}
          >
            Uma igreja contemporânea, vibrante e apaixonada por Jesus.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24"
            variants={heroVariants}
            initial="initial"
            animate="animate"
            transition={{ ...baseTransition, delay: 0.3 }}
          >
            <Button 
              size="xl" 
              className="w-full sm:w-auto text-base px-12 rounded-full bg-primary text-white hover:scale-105 transition-all shadow-[0_20px_40px_rgba(155,28,33,0.3)] font-black group"
              asChild
            >
              <Link to="/sou-novo">
                QUERO VISITAR
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              variant={isLive ? "secondary" : "outline"}
              size="xl" 
              className={`w-full sm:w-auto text-base px-12 rounded-full backdrop-blur-md transition-all font-black group ${
                isLive 
                  ? "bg-secondary text-black animate-pulse shadow-[0_0_30px_rgba(234,179,8,0.4)] border-none" 
                  : "border-white/10 bg-white/5 text-white"
              }`}
              asChild
            >
              <a 
                href={isLive && liveUrl ? liveUrl : "/ao-vivo"} 
                target={isLive ? "_blank" : "_self"}
                rel="noopener noreferrer"
              >
                <Play className={`w-4 h-4 mr-2 ${isLive ? "fill-black" : "fill-secondary text-secondary"}`} />
                {isLive ? "ASSISTIR AGORA" : "CULTO ONLINE"}
              </a>
            </Button>
          </motion.div>

          {/* Corrigido: bg-white/[0.03] -> bg-white/3 */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 bg-white/3 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-4 shadow-2xl"
            variants={heroVariants}
            initial="initial"
            animate="animate"
            transition={{ ...baseTransition, delay: 0.5 }}
          >
            {[
              { label: "Domingos", time: "09h & 19h", icon: Church, sub: "Celebração Principal" },
              { label: "Quintas", time: "20h00", icon: Heart, sub: "Noite de Poder" },
              { label: "GP Jovens", time: "19h30", icon: Users, sub: "Sábados Especiais" }
            ].map((item, idx) => (
              <div 
                key={idx} 
                // Corrigido: hover:bg-white/[0.05] -> hover:bg-white/5 | rounded-[2rem] -> rounded-4xl
                className={`flex flex-col items-center md:items-start p-8 transition-all hover:bg-white/5 group rounded-4xl ${
                  idx === 1 ? "md:border-x border-white/5" : ""
                }`}
              >
                <item.icon className="w-6 h-6 text-secondary mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-center md:text-left">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black mb-1">{item.label}</p>
                  <p className="text-3xl font-black text-white leading-none tracking-tighter mb-2">{item.time}</p>
                  <p className="text-[10px] text-primary font-bold uppercase tracking-widest">{item.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;