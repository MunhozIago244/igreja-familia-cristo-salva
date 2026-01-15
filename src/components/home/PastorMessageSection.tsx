import { motion, Variants } from "framer-motion";
import { Quote, Heart, Sparkles, Instagram } from "lucide-react";
import pastorImage from "@/assets/pastor.jpg";

const sectionVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
};

const PastorMessageSection = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-[#FAFAFA]">
      {/* Background Decorativo - Otimizado para Tailwind v4 (w-150 / h-150) */}
      <div className="absolute top-0 right-0 w-150 h-150 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 -z-10" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-secondary/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 -z-10" />

      <div className="container-church">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          
          {/* Coluna da Imagem */}
          <motion.div
            className="relative"
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative z-10">
              <div className="absolute -inset-4 border border-gray-200 rounded-[3rem] -z-10" />
              
              {/* Aspect-ratio usando sintaxe canônica aspect-4/5 */}
              <div className="overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] aspect-4/5 lg:aspect-4/5 bg-white">
                <img
                  src={pastorImage}
                  alt="Pr. Wesley Demarchi sorrindo em um ambiente acolhedor"
                  className="w-full h-full object-cover transition-all duration-1000 hover:scale-105"
                />
              </div>

              {/* Card de Atuação - Corrigido rounded-4xl e min-w-45 */}
              <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-white/80 backdrop-blur-xl p-8 rounded-4xl shadow-xl border border-white flex flex-col items-center min-w-45">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                  <Quote className="w-6 h-6 text-white fill-current" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-1">Ministério</span>
                <span className="text-2xl font-display font-black text-foreground tracking-tighter">Desde 2014</span>
              </div>
            </div>
          </motion.div>

          {/* Coluna de Conteúdo */}
          <motion.div
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                {/* Badge com Contraste Ajustado e Tracking Otimizado */}
                <span className="bg-secondary/20 text-secondary border border-secondary/10 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.25em] shadow-sm shadow-secondary/5">
                  Nossa Liderança
                </span>
              </div>
              <h2 className="font-display text-5xl lg:text-7xl font-black text-[#1A1A1A] leading-[0.95] tracking-tighter">
                Coração de <br />
                {/* Atualizado para bg-linear-to-r conforme Tailwind v4 */}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-primary/80 to-secondary">
                  pastor e amigo.
                </span>
              </h2>
            </header>

            <div className="space-y-8">
              <p className="text-2xl text-gray-600 font-light leading-relaxed italic">
                "Olá, amado! É uma alegria saber que você está conhecendo a nossa igreja. Construímos esta comunidade sobre o alicerce do amor, onde cada pessoa é um membro vital da nossa família."
              </p>
              
              <div className="flex items-start gap-4 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <p className="text-gray-500 leading-relaxed font-medium">
                  Nossa missão em Campinas é ser um farol de esperança. Aqui, você encontrará amizades genuínas e uma palavra que fala diretamente ao seu momento de vida.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  {/* Atualizado para bg-linear-to-br */}
                  <div className="h-16 w-16 rounded-2xl bg-linear-to-br from-[#1A1A1A] to-[#333] flex items-center justify-center text-white shadow-lg">
                    <span className="font-display text-2xl font-black">W</span>
                  </div>
                  <div>
                    <h4 className="font-display text-2xl font-black text-[#1A1A1A] leading-none">
                      Pr. Wesley Demarchi
                    </h4>
                    <p className="text-xs text-primary font-bold uppercase tracking-widest mt-2">
                      Presidente • Família Cristo Salva Campinas
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                   {/* CORREÇÃO DE ACESSIBILIDADE: Adicionado aria-label e title ao botão de ícone */}
                   <button 
                    type="button"
                    aria-label="Siga o Pr. Wesley no Instagram"
                    title="Siga no Instagram"
                    className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                   >
                     <Instagram size={20} />
                   </button>
                   <button className="flex items-center gap-2 px-6 h-12 rounded-full bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-widest hover:bg-primary transition-all shadow-lg shadow-black/5">
                     Conhecer História <Heart size={14} className="fill-current" />
                   </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PastorMessageSection;