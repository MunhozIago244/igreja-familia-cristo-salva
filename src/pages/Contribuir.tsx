import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Heart, Copy, CheckCircle2, 
  QrCode, Wallet, Landmark, 
  ShieldCheck, Sparkles, ArrowRight,
  HandHeart
} from "lucide-react";
import { toast } from "sonner";

const Contribuir = () => {
  const [copied, setCopied] = useState(false);
  const pixKey = "42.025.432/0001-05"; // CNPJ Oficial

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    toast.success("Chave PIX copiada com sucesso!");
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <Layout>
      {/* 1. HERO SECTION PREMIUM */}
      <section className="relative pt-44 pb-24 bg-[#050505] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-160 h-80 bg-primary/10 blur-[140px] rounded-full opacity-50" />
        </div>

        <div className="container-church relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 rounded-full text-secondary text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              <Sparkles size={12} /> Generosidade que Transforma
            </span>
            <h1 className="font-display text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none uppercase">
              DÍZIMOS E <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary italic">OFERTAS</span>
            </h1>
            <p className="text-white/50 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Sua fidelidade sustenta a obra de Deus e nos permite <br />
              alcançar mais vidas para o Reino.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. BIBLICAL FOUNDATION - ESTILO MINIMALISTA LUXO */}
      <section className="py-24 bg-[#050505] border-y border-white/5">
        <div className="container-church text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <HandHeart className="w-12 h-12 text-primary mx-auto mb-8 opacity-50" />
            <h2 className="font-serif text-3xl md:text-4xl text-white italic leading-tight mb-6">
              "Cada um dê conforme determinou em seu coração, não com pesar ou por obrigação, pois Deus ama quem dá com alegria."
            </h2>
            <cite className="text-white/20 font-black uppercase text-xs tracking-[0.4em] not-italic">
              2 Coríntios 9:7
            </cite>
          </motion.div>
        </div>
      </section>

      {/* 3. MÉTODOS DE CONTRIBUIÇÃO */}
      <section className="py-32 bg-[#050505]">
        <div className="container-church">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* CARD PIX - DESTAQUE PRINCIPAL */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/3 border border-primary/20 p-10 md:p-14 rounded-[4rem] relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-10 text-primary/5 group-hover:text-primary/10 transition-colors">
                <QrCode size={180} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                    <Wallet size={28} />
                  </div>
                  <h3 className="font-display text-3xl font-black text-white uppercase tracking-tighter">Via PIX</h3>
                </div>

                <p className="text-white/40 font-medium mb-10 text-lg">
                  A forma mais rápida e segura de contribuir. Utilize o CNPJ da igreja como chave.
                </p>

                {/* QR Code Interativo */}
                <div className="bg-white p-6 rounded-[2.5rem] w-fit mx-auto lg:mx-0 mb-10 shadow-2xl shadow-primary/10 group-hover:scale-105 transition-transform">
                  <div className="w-48 h-48 bg-zinc-100 rounded-2xl flex items-center justify-center border-4 border-white">
                    {/* Aqui entraria a imagem real do QR Code do banco */}
                    <QrCode size={120} className="text-black" />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-4">Chave PIX (CNPJ)</label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-white/5 border border-white/10 h-16 rounded-2xl flex items-center px-6 text-white font-mono text-lg tracking-wider">
                      {pixKey}
                    </div>
                    <Button
                      onClick={handleCopy}
                      className={`h-16 w-16 rounded-2xl transition-all ${copied ? 'bg-green-500 hover:bg-green-600' : 'bg-primary hover:bg-primary/90'}`}
                    >
                      {copied ? <CheckCircle2 size={24} /> : <Copy size={24} />}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CARD BANCÁRIO - INSTITUCIONAL */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-8"
            >
              <div className="bg-white/3 border border-white/5 p-12 rounded-[4.5rem] flex-1 backdrop-blur-3xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary">
                    <Landmark size={28} />
                  </div>
                  <h3 className="font-display text-3xl font-black text-white uppercase tracking-tighter">Dados Bancários</h3>
                </div>

                <div className="grid gap-6">
                  {[
                    { label: "Instituição", value: "A Ser Informada" },
                    { label: "Agência", value: "A Ser Informada" },
                    { label: "Conta Corrente", value: "A Ser Informada" },
                    { label: "Razão Social", value: "Igreja Família Cristo Salva" },
                    { label: "CNPJ", value: pixKey }
                  ].map((item, idx) => (
                    <div key={idx} className="border-b border-white/5 pb-4 last:border-0">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">{item.label}</p>
                      <p className="text-white text-lg font-bold tracking-tight">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CARD TRANSPARÊNCIA */}
              <div className="bg-secondary p-10 rounded-[3rem] relative overflow-hidden">
                <ShieldCheck className="absolute -right-8 -bottom-8 w-40 h-40 text-black/5" />
                <h4 className="text-black font-black text-xl uppercase tracking-tighter mb-4">Compromisso Ético</h4>
                <p className="text-black/60 font-medium leading-snug">
                  Nossa gestão é pautada na transparência bíblica. Todos os recursos são aplicados no avanço do Evangelho e manutenção ministerial.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. FOOTER DE APOIO */}
      <section className="pb-40 bg-[#050505]">
        <div className="container-church text-center">
          <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale contrast-200">
             {/* Simulação de logos de segurança/bancos */}
             <span className="font-black text-white tracking-widest">SEGURANÇA SSL</span>
             <span className="font-black text-white tracking-widest">PIX OFICIAL</span>
             <span className="font-black text-white tracking-widest">GESTÃO TRANSPARENTE</span>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contribuir;