import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Heart, Send, Lock, CheckCircle2, 
  HandsPraying, ShieldCheck, Sparkles,
  ArrowRight, Info
} from "lucide-react";
import { toast } from "sonner";

const PedidoOracao = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de delay para transição suave (UX Sênior)
    const toastId = toast.loading("Enviando seu clamor aos céus...");
    
    setTimeout(() => {
      setIsSubmitted(true);
      toast.success("Recebido! Estaremos em oração por você.", { id: toastId });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* 1. HERO SECTION PREMIUM */}
            <section className="relative pt-44 pb-20 bg-[#050505] overflow-hidden">
              <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-linear-to-b from-primary/10 to-transparent" />
                <div className="absolute top-[20%] right-[-5%] w-96 h-96 bg-primary/20 blur-[120px] rounded-full opacity-30 animate-pulse" />
              </div>

              <div className="container-church relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-4xl mx-auto"
                >
                  <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-secondary text-[10px] font-black uppercase tracking-[0.3em] mb-8 backdrop-blur-md">
                    <Sparkles size={12} /> Intercessão 24h
                  </span>
                  <h1 className="font-display text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.85] uppercase">
                    A Força da <br />
                    <span className="italic text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">Oração Coletiva.</span>
                  </h1>
                  <p className="text-white/50 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                    Não importa o tamanho do seu fardo, você não precisa carregá-lo sozinho. 
                    Nossa equipe de intercessores está pronta para clamar por você.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* 2. FORM & INFO GRID */}
            <section className="pb-32 bg-[#050505]">
              <div className="container-church">
                <div className="grid lg:grid-cols-12 gap-16 items-start">
                  
                  {/* Formulário (Lado Esquerdo) */}
                  <motion.div 
                    className="lg:col-span-7 bg-white/3 border border-white/10 p-10 md:p-16 rounded-[4rem] backdrop-blur-3xl shadow-3xl"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className={`grid transition-all duration-500 gap-8 ${isAnonymous ? 'opacity-30 pointer-events-none grayscale' : 'opacity-100'}`}>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-4">Como devemos te chamar?</label>
                          <Input
                            placeholder="Seu nome (ou apelido)"
                            className="bg-white/5 border-white/10 h-16 rounded-2xl text-white focus:ring-primary/20 px-6"
                            required={!isAnonymous}
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-4">Motivo do Clamor</label>
                        <Textarea
                          placeholder="Compartilhe seu coração conosco... Deus já conhece sua necessidade."
                          className="bg-white/5 border-white/10 min-h-[200px] rounded-[2.5rem] text-white focus:ring-primary/20 p-8 resize-none text-lg"
                          required
                        />
                      </div>

                      {/* Opções de Privacidade */}
                      <div className="p-8 bg-white/3 rounded-[2rem] border border-white/5 space-y-6">
                        <div className="flex items-start gap-4">
                          <Checkbox 
                            id="anon" 
                            className="mt-1 border-primary data-[state=checked]:bg-primary" 
                            onCheckedChange={(val) => setIsAnonymous(val as boolean)}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label htmlFor="anon" className="text-sm font-bold text-white uppercase tracking-tight cursor-pointer">Enviar de forma anônima</label>
                            <p className="text-white/40 text-xs">Apenas Deus e a equipe de intercessão saberão o conteúdo.</p>
                          </div>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        size="xl" 
                        className="w-full rounded-3xl bg-primary hover:bg-primary/90 text-white font-black text-xs tracking-[0.3em] h-20 shadow-2xl shadow-primary/30 transition-all group"
                      >
                        ENVIAR MEU PEDIDO <Send size={16} className="ml-3 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                      </Button>

                      <div className="flex items-center justify-center gap-3 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
                        <ShieldCheck size={14} /> Confidencialidade Garantida
                      </div>
                    </form>
                  </motion.div>

                  {/* Informações (Lado Direito) */}
                  <motion.div 
                    className="lg:col-span-5 space-y-8"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="p-12 bg-secondary rounded-[3.5rem] relative overflow-hidden group">
                      <Heart className="text-black/10 absolute -top-10 -right-10 w-64 h-64 group-hover:scale-110 transition-transform duration-700" />
                      <div className="relative z-10">
                        <h3 className="text-black font-black text-3xl tracking-tighter uppercase leading-none mb-6">
                          Onde dois ou mais <br /><span className="italic text-black/60">estiverem reunidos...</span>
                        </h3>
                        <p className="text-black/70 font-medium text-lg leading-relaxed mb-8">
                          Nossa igreja possui um ministério dedicado exclusivamente à oração. Seu pedido será levado ao altar em nossos cultos e reuniões de intercessão.
                        </p>
                        <div className="flex items-center gap-3 text-black font-black text-[10px] uppercase tracking-widest border-t border-black/10 pt-6">
                          <Info size={16} /> Resposta em até 24h
                        </div>
                      </div>
                    </div>

                    {/* Cards de Versículos */}
                    <div className="bg-white/3 border border-white/5 p-10 rounded-[3rem] backdrop-blur-md">
                      <p className="text-primary italic font-serif text-2xl mb-6">
                        "Clama a mim, e responder-te-ei, e anunciar-te-ei coisas grandes e firmes que não sabes."
                      </p>
                      <span className="text-white/30 font-black uppercase text-[10px] tracking-widest">— Jeremias 33:3</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          /* 3. SUCCESS STATE - PREMIUM ACOLHIMENTO */
          <motion.section 
            key="success-section"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-screen flex items-center justify-center pt-20 bg-[#050505]"
          >
            <div className="container-church max-w-3xl text-center">
              <div className="mb-12 relative">
                <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mx-auto border border-primary/30 relative z-10">
                  <CheckCircle2 className="w-16 h-16 text-primary" />
                </div>
                <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-150" />
              </div>
              
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6 leading-none">
                Clamor <span className="text-primary italic">Registrado.</span>
              </h2>
              <p className="text-white/50 text-xl font-medium mb-12 max-w-xl mx-auto">
                Fique em paz. Sua mensagem já está sob os cuidados da nossa equipe de intercessão e, acima de tudo, diante do Senhor.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-12">
                <Button variant="outline" className="h-20 rounded-3xl border-white/10 hover:bg-white/5 text-white/60 font-black tracking-widest text-[10px]" onClick={() => setIsSubmitted(false)}>
                  ENVIAR OUTRO PEDIDO
                </Button>
                <Button className="h-20 rounded-3xl bg-white text-black hover:bg-secondary transition-all font-black tracking-widest text-[10px]" asChild>
                  <a href="/">VOLTAR AO INÍCIO <ArrowRight size={16} className="ml-2" /></a>
                </Button>
              </div>

              <p className="text-primary font-black uppercase text-[10px] tracking-[0.4em]">Deus abençoe sua caminhada</p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default PedidoOracao;