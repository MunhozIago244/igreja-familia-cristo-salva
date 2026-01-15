import { Link } from "react-router-dom";
import { 
  Heart, MapPin, Phone, Mail, Clock, Instagram, 
  Facebook, Youtube, Sparkles, ArrowUpRight, MessageCircle 
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Links centralizados para facilitar a manutenção
  const linksNavegacao = [
    { label: "Quem Somos", href: "/quem-somos" },
    { label: "Ministérios", href: "/ministerios" },
    { label: "Eventos", href: "/eventos" },
    { label: "Pregações", href: "/pregacoes" },
    { label: "Contribuir", href: "/contribuir" },
  ];

  const socialLinks = [
    { Icon: Instagram, href: "#", label: "Instagram" },
    { Icon: Facebook, href: "#", label: "Facebook" },
    { Icon: Youtube, href: "#", label: "YouTube" },
    { Icon: MessageCircle, href: "https://wa.me/seu-numero", label: "WhatsApp" },
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-[#050505] text-white">
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop" 
          alt="Church Ambient" 
          className="w-full h-full object-cover opacity-[0.07] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent" />
      </div>

      {/* --- DECORATIVE ELEMENTS --- */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative z-10 container mx-auto px-6 pt-20 pb-10">
        
        {/* --- MEGA CTA SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 border-b border-white/5 pb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <Sparkles size={12} /> Vida Com Propósito
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6">
              HÁ UM LUGAR PARA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary italic">VOCÊ CONOSCO.</span>
            </h2>
            <p className="text-white/50 text-lg max-w-md mx-auto lg:mx-0">
              Não somos apenas uma igreja, somos uma família que caminha junta.
            </p>
          </motion.div>

          <div className="flex justify-center lg:justify-end">
            <Link 
              to="/contato" 
              className="group relative flex items-center justify-center w-44 h-44 rounded-full border border-white/10 hover:border-primary/50 transition-all duration-700"
            >
              <div className="absolute inset-2 rounded-full border border-dashed border-white/5 group-hover:rotate-180 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500" />
              
              <span className="relative z-10 flex flex-col items-center gap-1 font-black text-xs tracking-widest transition-transform group-hover:scale-110">
                QUERO <br /> CONHECER
                <ArrowUpRight size={20} className="text-primary" />
              </span>
            </Link>
          </div>
        </div>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Coluna 1: Branding & Social */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-2xl shadow-primary/20">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tighter leading-tight">CRISTO <span className="text-primary">SALVA</span></h3>
                <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40">Família</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-white/50 hover:text-white transition-colors">
                <Mail size={16} className="text-primary" />
                <span className="text-sm">contato@cristosalva.com.br</span>
              </div>
              <div className="flex items-center gap-3 text-white/50 hover:text-white transition-colors">
                <Phone size={16} className="text-primary" />
                <span className="text-sm">(19) 99863-3898</span>
              </div>
            </div>

            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a 
                  key={label}
                  href={href} 
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-all duration-300 group"
                >
                  <Icon size={18} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div className="lg:pl-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-8 text-secondary">Explorar</h4>
            <ul className="space-y-4">
              {linksNavegacao.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-white/40 hover:text-primary text-sm font-bold flex items-center gap-3 transition-all group"
                  >
                    <span className="w-0 h-[2px] bg-primary group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Horários Dinâmicos */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-8 text-secondary">Programação</h4>
            <div className="space-y-6">
              {[
                { day: "Domingos", time: "09h e 19h", desc: "Culto de Celebração" },
                { day: "Quintas", time: "20h00", desc: "Cultos Variados" },
                { day: "Sábados", time: "19h00", desc: "Movimento Jovens" },
              ].map((item) => (
                <div key={item.day} className="group cursor-default">
                  <p className="text-xs font-black uppercase tracking-tighter text-white group-hover:text-primary transition-colors">{item.day}</p>
                  <p className="text-sm font-medium text-white/40">{item.time} — {item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna 4: Localização & Maps */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-8 text-secondary">Onde Estamos</h4>
            <div className="p-1 bg-white/5 border border-white/10 rounded-[2rem]">
              <div className="p-6">
                <div className="flex gap-3 mb-6">
                  <MapPin size={20} className="text-primary shrink-0" />
                  <p className="text-xs text-white/60 leading-relaxed">
                    Rua Exemplo, 123 — Bairro Jardim <br />
                    Campinas/SP • CEP 13000-000
                  </p>
                </div>
                <ButtonMap />
              </div>
            </div>
          </div>
        </div>

        {/* --- LEGAL FOOTER --- */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-[9px] text-white/20 uppercase tracking-[0.3em]">
              © {currentYear} FAMÍLIA CRISTO SALVA • CNPJ 00.000.000/0001-00
            </p>
            <p className="text-[9px] text-white/20 uppercase tracking-[0.3em]">
              Feito com fé e tecnologia
            </p>
          </div>
          
          <div className="flex gap-8">
            <Link to="/privacidade" className="text-[10px] text-white/40 hover:text-white uppercase tracking-[0.2em] transition-colors border-b border-transparent hover:border-primary">Privacidade</Link>
            <Link to="/termos" className="text-[10px] text-white/40 hover:text-white uppercase tracking-[0.2em] transition-colors border-b border-transparent hover:border-primary">Termos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Subcomponente para manter o código limpo
const ButtonMap = () => (
  <a 
    href="https://maps.google.com" 
    target="_blank" 
    rel="noopener noreferrer"
    className="group flex items-center justify-between w-full p-4 rounded-2xl bg-white hover:bg-secondary transition-all duration-500 overflow-hidden"
  >
    <span className="text-black text-[10px] font-black uppercase tracking-widest">Ver no Google Maps</span>
    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
      <ArrowUpRight size={16} />
    </div>
  </a>
);

export default Footer;