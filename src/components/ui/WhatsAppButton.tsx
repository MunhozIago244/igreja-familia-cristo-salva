import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

/**
 * WhatsAppButton - Componente de engajamento direto.
 * Ajustado para: Design Tokens (Shadcn), Acessibilidade e GPU Acceleration.
 */
const WhatsAppButton = () => {
  // Número e mensagem extraídos para facilitar manutenção ou internacionalização futura
  const WHATSAPP_URL = "https://wa.me/5519999999999?text=Olá! Gostaria de saber mais sobre a Igreja Família Cristo Salva.";

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      // Classes ajustadas: shadcn shadow-xl para profundidade e z-index garantido
      className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-shadow group"
      
      // Animação de entrada com Spring (Foco em UX Premium)
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      
      // Animação contínua sutil para chamar atenção sem ser intrusiva
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      
      transition={{ 
        delay: 1.5, // Delay maior para não competir com a Hero Animation
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      }}
      aria-label="Falar conosco pelo WhatsApp"
    >
      {/* Ícone com animação de balanço suave no hover do grupo */}
      <MessageCircle 
        className="w-7 h-7 text-white fill-none group-hover:rotate-12 transition-transform duration-300" 
        strokeWidth={2.5}
      />
      
      {/* Indicador de Status "Online" - Usando variável de cor do sistema (secondary) */}
      <span className="absolute top-0 right-0 w-4 h-4 bg-secondary border-2 border-white rounded-full animate-pulse shadow-sm" />
      
      {/* Tooltip Screen Reader Only para melhor SEO/Acessibilidade */}
      <span className="sr-only">WhatsApp</span>
    </motion.a>
  );
};

export default WhatsAppButton;