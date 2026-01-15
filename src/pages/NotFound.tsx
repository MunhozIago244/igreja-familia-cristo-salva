import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, Map } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log de erro para observabilidade em produção
    console.error(
      "[Routing Architecture] 404 - Route not found:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] p-6 overflow-hidden relative">
      
      {/* 1. ELEMENTOS DE FUNDO (LUMINESCÊNCIA) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-primary/10 blur-[160px] rounded-full opacity-40" />
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-secondary/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* 2. ÍCONE E CÓDIGO DO ERRO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-xl">
            <Search className="text-primary w-10 h-10 animate-pulse" />
          </div>
          
          <h1 className="font-display text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter text-white/5 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1]">
            404
          </h1>

          <h2 className="font-display text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase">
            Caminho não <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary italic">encontrado</span>
          </h2>

          <p className="text-white/40 text-lg md:text-xl font-medium mb-12 max-w-md mx-auto leading-relaxed">
            Parece que essa página não existe ou foi movida. 
            Não se preocupe, estamos aqui para te guiar de volta.
          </p>

          {/* 3. AÇÕES DE NAVEGAÇÃO */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              variant="outline"
              size="xl"
              className="w-full sm:w-auto rounded-2xl border-white/10 bg-white/5 text-white hover:bg-white/10 h-16 px-8 transition-all group"
            >
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                VOLTAR
              </Link>
            </Button>

            <Button
              asChild
              size="xl"
              className="w-full sm:w-auto rounded-2xl bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20 h-16 px-10 font-black tracking-widest text-[10px]"
            >
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                IR PARA A HOME
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* 4. FOOTER DE AJUDA */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 pt-8 border-t border-white/5"
        >
          <p className="text-white/20 text-xs font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2">
            <Map size={14} /> Família Cristo Salva • Campinas, SP
          </p>
        </motion.div>
      </div>

      {/* DETALHE DECORATIVO */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  );
};

export default NotFound;