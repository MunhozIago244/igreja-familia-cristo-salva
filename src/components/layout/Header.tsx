import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart, Sparkles, MessageSquareHeart, ChevronRight, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Configuração de Rotas
 * Adicionado 'Contribuir' ao fluxo principal de navegação.
 */
const navLinks = [
  { href: "/", label: "Início" },
  { href: "/quem-somos", label: "Quem Somos" },
  { href: "/ministerios", label: "Ministérios" },
  { href: "/eventos", label: "Eventos" },
  { href: "/contribuir", label: "Contribuir" },
  { href: "/pregacoes", label: "Pregações" },
  { href: "/contato", label: "Contato" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isHeroPage = useMemo(() => {
    // Adicionado /contribuir e /oracao às rotas hero para manter o design glassmorphism
    const heroRoutes = ["/", "/ao-vivo", "/contribuir", "/oracao"]; 
    return heroRoutes.includes(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  const solidBackground = isScrolled || !isHeroPage;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 md:px-8 ${
        isScrolled ? "pt-2" : "pt-6"
      }`}
    >
      <nav 
        className={`mx-auto max-w-7xl transition-all duration-500 rounded-[2.5rem] border px-6 ${
          solidBackground
            ? "bg-[#0A0A0A]/90 backdrop-blur-xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] py-3" 
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          
          {/* --- LOGO --- */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center transition-all duration-500 group-hover:rotate-[10deg] shadow-lg shadow-primary/20">
                <Heart className="w-5 h-5 text-white fill-current" />
              </div>
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0, 1, 0] }} 
                transition={{ duration: 2, repeat: Infinity }} 
                className="absolute -top-1 -right-1 text-secondary"
              >
                <Sparkles size={12} />
              </motion.div>
            </div>
            
            <div className="flex flex-col leading-none">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] mb-0.5 text-primary">
                Família
              </span>
              <span className={`font-display text-base font-black tracking-tighter transition-colors duration-300 ${
                solidBackground || isHeroPage ? "text-white" : "text-slate-900"
              }`}>
                CRISTO <span className="text-primary">SALVA</span>
              </span>
            </div>
          </Link>

          {/* --- DESKTOP NAV (Otimizado para mais itens) --- */}
          <div className={`hidden xl:flex items-center border rounded-full px-2 py-1 gap-0.5 transition-all duration-500 ${
            solidBackground || isHeroPage 
              ? "bg-white/5 border-white/10" 
              : "bg-slate-100 border-slate-200"
          }`}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.12em] transition-all duration-300 rounded-full group ${
                    isActive 
                      ? "text-white" 
                      : (solidBackground || isHeroPage ? "text-white/60 hover:text-white" : "text-slate-500 hover:text-black")
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-primary rounded-full -z-10 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* --- ACTIONS --- */}
          <div className="hidden lg:flex items-center gap-6 shrink-0">
            <Link 
              to="/oracao" 
              className={`flex items-center gap-2 text-[10px] font-bold transition-all uppercase tracking-widest hover:scale-105 ${
                solidBackground || isHeroPage ? "text-white/60 hover:text-white" : "text-slate-500 hover:text-black"
              }`}
            >
              <MessageSquareHeart size={14} className="text-primary" />
              Pedido de Oração
            </Link>
            <Button 
              className="bg-primary text-white hover:bg-black rounded-full px-7 h-11 text-[11px] font-black transition-all duration-300 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95"
              asChild
            >
              <Link to="/contato">SOU NOVO</Link>
            </Button>
          </div>

          {/* --- MOBILE TOGGLE --- */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`xl:hidden w-11 h-11 rounded-2xl border flex items-center justify-center transition-all ${
              solidBackground || isHeroPage 
                ? "bg-white/5 border-white/10 text-white" 
                : "bg-slate-100 border-slate-200 text-slate-900"
            }`}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* --- MOBILE OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.98 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: -10, scale: 0.98 }} 
            className="absolute top-24 left-4 right-4 xl:hidden z-50"
          >
            <div className="bg-[#0D0D0D]/98 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-[0_40px_80px_rgba(0,0,0,0.7)]">
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center justify-between p-4 rounded-2xl text-sm font-bold transition-all ${
                      location.pathname === link.href 
                        ? "bg-primary text-white shadow-lg shadow-primary/25" 
                        : "text-gray-400 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {link.label}
                      {link.href === "/contribuir" && <HandHeart size={16} className="text-secondary" />}
                    </span>
                    <ChevronRight size={18} className="opacity-30" />
                  </Link>
                ))}
                
                <div className="h-px bg-white/10 my-4" />
                
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="border-white/10 text-white rounded-2xl h-14 font-bold text-xs" asChild>
                    <Link to="/oracao" className="flex gap-2 items-center">
                      ORAÇÃO <MessageSquareHeart size={16} />
                    </Link>
                  </Button>
                  <Button className="bg-secondary text-black rounded-2xl h-14 font-black text-xs" asChild>
                    <Link to="/contribuir" className="flex gap-2 items-center">
                      CONTRIBUIR <HandHeart size={16} />
                    </Link>
                  </Button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;