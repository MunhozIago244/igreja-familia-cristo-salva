import { motion } from "framer-motion";
import { Heart, HandHeart, MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import communityImage from "@/public/ALUZ.jpg";

const CTASection = () => {
  return (
    <section className="relative min-h-150 flex items-center overflow-hidden py-24 lg:py-32">
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        <img
          src={communityImage}
          alt="Comunidade da igreja em comunhão"
          className="w-full h-full object-cover scale-105 transition-transform duration-700 hover:scale-100"
        />
        {/* Overlay Multi-camadas com sintaxe linear-to otimizada */}
        <div className="absolute inset-0 bg-linear-to-r from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0A0A0A] via-transparent to-transparent" />
      </div>

      {/* --- DECORATIVE ELEMENTS (Frufrus) --- */}
      {/* Ajustado: Fechamento correto da div e classe linear-to-l */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[120px] pointer-events-none" 
      /> {/* Div fechada corretamente aqui */}

      <div className="container-church relative z-10 px-6">
        <div className="max-w-4xl">
          {/* Badge Superior */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-8"
          >
            <span className="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
              <Sparkles size={12} /> Faça Parte da Família
            </span>
          </motion.div>

          {/* Título Principal */}
          <motion.h2
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            QUEREMOS CAMINHAR <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-primary animate-gradient-x italic">
              JUNTO COM VOCÊ.
            </span>
          </motion.h2>

          {/* Texto de Apoio */}
          <motion.p
            className="text-white/70 text-lg md:text-xl mb-12 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Não importa onde você está em sua jornada, há um lugar para você aqui. 
            Seja para oração, serviço ou comunhão, <span className="text-white font-semibold">nossa casa é sua casa.</span>
          </motion.p>

          {/* Grupo de Botões */}
          <motion.div
            className="grid grid-cols-1 sm:flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="xl"
              className="bg-primary text-white hover:bg-black rounded-2xl h-16 px-8 text-xs font-black uppercase tracking-widest shadow-2xl shadow-primary/30 group transition-all"
              asChild
            >
              <Link to="/oracao" className="flex items-center gap-3">
                <Heart className="w-5 h-5 fill-current" />
                Pedido de Oração
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="xl"
              className="border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-black rounded-2xl h-16 px-8 text-xs font-black uppercase tracking-widest transition-all"
              asChild
            >
              <Link to="/contribuir" className="flex items-center gap-3">
                <HandHeart className="w-5 h-5" />
                Contribuir
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="xl"
              className="text-white/60 hover:text-white hover:bg-white/5 rounded-2xl h-16 px-8 text-xs font-black uppercase tracking-widest transition-all"
              asChild
            >
              <Link to="/contato" className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5" />
                Fale Conosco
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;