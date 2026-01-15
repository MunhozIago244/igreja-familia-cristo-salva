import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/5519999999999?text=Olá! Gostaria de saber mais sobre a Igreja Família Cristo Salva."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white fill-current" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full animate-pulse-soft" />
    </motion.a>
  );
};

export default WhatsAppButton;
