import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MapPin, Phone, Mail, Clock, Send, 
  Instagram, Facebook, Youtube, Sparkles, 
  MessageCircle, ExternalLink, CheckCircle2 
} from "lucide-react";
import { toast } from "sonner";

// Dados Oficiais
const CHURCH_CONTACT = {
  phone: "5519996859435",
  email: "cristosalvafamilia@gmail.com",
  address: "Av. Armando Mario Tozi, 417 - Jardim Lisa, Campinas - SP",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Av.+Armando+Mario+Tozi,+417+-+Jardim+Lisa,+Campinas+-+SP"
};

const Contato = () => {
  const [loading, setLoading] = useState(false);

  // Lógica para verificar se está aberto (Simples mas funcional para UX)
  const isOpen = useMemo(() => {
    const now = new Date();
    const day = now.getDay(); // 0=Dom, 4=Qui, 6=Sab
    const hour = now.getHours();
    
    if (day === 0 && (hour === 9 || hour === 19)) return true;
    if (day === 4 && hour === 20) return true;
    if (day === 6 && (hour === 11 || hour === 19)) return true;
    return false;
  }, []);

  const handleWhatsAppSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      nome: formData.get("nome"),
      assunto: formData.get("assunto"),
      mensagem: formData.get("mensagem")
    };

    // Formatação da mensagem para o WhatsApp
    const text = `*Novo Contato via Site*\n\n*Nome:* ${data.nome}\n*Assunto:* ${data.assunto}\n*Mensagem:* ${data.mensagem}`;
    const encodedText = encodeURIComponent(text);
    
    setTimeout(() => {
      window.open(`https://wa.me/${CHURCH_CONTACT.phone}?text=${encodedText}`, "_blank");
      toast.success("Redirecionando para o WhatsApp...");
      setLoading(false);
    }, 800);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-44 pb-24 bg-[#050505] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-80 bg-primary/20 blur-[150px] rounded-full opacity-40" />
        </div>

        <div className="container-church relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 rounded-full text-secondary text-[10px] font-black uppercase tracking-[0.3em] mb-8 backdrop-blur-md">
              <Sparkles size={12} /> Canais de Conexão
            </span>
            <h1 className="font-display text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
              VAMOS <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary italic">CONVERSAR?</span>
            </h1>
            <p className="text-white/50 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Dúvidas, pedidos de oração ou apenas um "oi". <br />
              Nossa família está de braços abertos para você.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="pb-40 bg-[#050505]">
        <div className="container-church">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Sidebar de Informações (5 colunas) */}
            <motion.div 
              className="lg:col-span-5 space-y-6"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* Card de Localização */}
              <a 
                href={CHURCH_CONTACT.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white/3 border border-white/5 p-10 rounded-[3rem] hover:bg-white/5 hover:border-primary/40 transition-all group"
              >
                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-primary/20 rounded-3xl flex items-center justify-center text-primary shrink-0 group-hover:rotate-12 transition-transform">
                    <MapPin size={32} />
                  </div>
                  <div>
                    <h3 className="text-secondary font-black text-xs uppercase tracking-widest mb-3">Visite-nos</h3>
                    <p className="text-white text-xl font-bold leading-tight">
                      Av. Armando Mario Tozi, 417 <br />
                      <span className="text-white/60 font-medium">Jardim Lisa, Campinas - SP</span>
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-primary text-xs font-bold uppercase">
                      Ver no Google Maps <ExternalLink size={14} />
                    </div>
                  </div>
                </div>
              </a>

              {/* Card de Status de Funcionamento */}
              <div className="bg-white/3 border border-white/5 p-10 rounded-[3rem]">
                <div className="flex gap-6">
                  <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shrink-0 ${isOpen ? 'bg-green-500/20 text-green-500 animate-pulse' : 'bg-white/5 text-white/20'}`}>
                    <Clock size={32} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-secondary font-black text-xs uppercase tracking-widest">Horários</h3>
                      {isOpen && (
                        <span className="bg-green-500/10 text-green-500 text-[10px] font-black px-3 py-1 rounded-full border border-green-500/20">ABERTO AGORA</span>
                      )}
                    </div>
                    <ul className="space-y-2 text-white/60 text-sm font-medium">
                      <li className="flex justify-between border-b border-white/5 pb-2"><span>Dom</span> <span className="text-white">09:00 e 19:00</span></li>
                      <li className="flex justify-between border-b border-white/5 pb-2"><span>Seg / Qui</span> <span className="text-white">20:00</span></li>
                      <li className="flex justify-between border-b border-white/5 pb-2"><span>Sáb</span> <span className="text-white">17:00 e 19:00</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Redes e Contatos Rápidos */}
              <div className="grid grid-cols-2 gap-4">
                <a href={`mailto:${CHURCH_CONTACT.email}`} className="bg-white/3 border border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center gap-3 hover:bg-white/5 transition-all">
                  <Mail className="text-primary" />
                  <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">E-mail</span>
                </a>
                <a href={`https://wa.me/${CHURCH_CONTACT.phone}`} className="bg-white/3 border border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center gap-3 hover:bg-white/5 transition-all">
                  <MessageCircle className="text-secondary" />
                  <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">WhatsApp</span>
                </a>
              </div>
            </motion.div>

            {/* Formulário de Conversão (7 colunas) */}
            <motion.div 
              className="lg:col-span-7 bg-white/3 border border-white/10 p-10 md:p-16 rounded-[4rem] relative overflow-hidden"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10">
                <h2 className="font-display text-4xl font-black text-white mb-4 tracking-tighter uppercase">
                  Mande sua <span className="text-primary italic">Mensagem</span>
                </h2>
                <p className="text-white/40 font-medium mb-12">Preencha os campos abaixo e entraremos em contato o mais rápido possível.</p>

                <form onSubmit={handleWhatsAppSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-4">Nome Completo</label>
                      <Input
                        name="nome"
                        placeholder="Como podemos te chamar?"
                        className="bg-white/5 border-white/10 h-16 rounded-2xl text-white focus:ring-primary/20 transition-all px-6"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-4">Assunto</label>
                      <Input
                        name="assunto"
                        placeholder="Ex: Pedido de Oração"
                        className="bg-white/5 border-white/10 h-16 rounded-2xl text-white focus:ring-primary/20 transition-all px-6"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-4">Sua Mensagem</label>
                    <Textarea
                      name="mensagem"
                      placeholder="Sinta-se à vontade para escrever..."
                      className="bg-white/5 border-white/10 min-h-[220px] rounded-[2.5rem] text-white focus:ring-primary/20 transition-all p-8 resize-none"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full rounded-[2rem] bg-primary hover:bg-primary/90 text-white font-black text-xs tracking-[0.3em] h-20 shadow-2xl shadow-primary/20 transition-all flex items-center justify-center gap-3 group"
                  >
                    {loading ? "PROCESSANDO..." : "ENVIAR PARA O WHATSAPP"}
                    {!loading && <Send size={18} className="group-hover:translate-x-1 transition-transform" />}
                  </Button>
                </form>
              </div>

              {/* Elemento Decorativo */}
              <div className="absolute -bottom-20 -right-20 text-white/2 pointer-events-none select-none">
                <MessageCircle size={400} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contato;