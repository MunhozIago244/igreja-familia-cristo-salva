import { motion, Variants } from "framer-motion";
import { 
  Heart, 
  Users, 
  Baby, 
  Megaphone, 
  Flame, 
  ShieldCheck, 
  ArrowRight,
  LucideIcon,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Interface estrita para conformidade com ESLint e segurança de tipos
interface Ministry {
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
  colorClass: string;
}

const ministries: Ministry[] = [
  {
    icon: Flame,
    title: "GP Campinas",
    description: "Nossa Geração com Propósito. Jovens apaixonados por Jesus e por pessoas.",
    tag: "Jovens",
    colorClass: "text-orange-400 bg-orange-400/10",
  },
  {
    icon: ShieldCheck,
    title: "Homens do Reino",
    description: "Fortalecendo o caráter cristão e a liderança do homem na família e sociedade.",
    tag: "Homens",
    colorClass: "text-blue-400 bg-blue-400/10",
  },
  {
    icon: Heart,
    title: "MEF",
    description: "Ministério de Encorajamento Feminino. Mulheres que oram e crescem juntas.",
    tag: "Mulheres",
    colorClass: "text-pink-400 bg-pink-400/10",
  },
  {
    icon: Baby,
    title: "Família CS KIDS",
    description: "Um ambiente seguro e divertido onde as crianças aprendem sobre Deus.",
    tag: "Crianças",
    colorClass: "text-yellow-400 bg-yellow-400/10",
  },
  {
    icon: Users,
    title: "Família CS TEENS",
    description: "Discipulado e comunhão para adolescentes que querem fazer a diferença.",
    tag: "Teens",
    colorClass: "text-purple-400 bg-purple-400/10",
  },
  {
    icon: Megaphone,
    title: "Mídia & Tech",
    description: "Produção, som e transmissão. Levando a mensagem além das paredes.",
    tag: "Suporte",
    colorClass: "text-secondary bg-secondary/10",
  },
];

// Animações otimizadas para performance (GPU accelerated)
const containerVariants: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
  },
};

const MinistriesSection = () => {
  return (
    <section className="section-padding relative overflow-hidden bg-[#0A0A0A] text-white">
      {/* Elementos de Iluminação de Fundo (Glow Effect) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full" />
      </div>

      <div className="container-church relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <Sparkles className="w-3 h-3" /> Sirva com Propósito
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1]">
              Encontre o seu lugar <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-secondary">
                na nossa família.
              </span>
            </h2>
          </motion.div>

          <motion.p 
            className="text-gray-400 text-lg max-w-sm lg:text-right leading-relaxed font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Acreditamos que cada membro é um ministro e cada dom é uma ferramenta para expandir o Reino.
          </motion.p>
        </div>

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {ministries.map((ministry) => (
            <motion.div
              key={ministry.title}
              variants={itemVariants}
              className="group relative bg-white/[0.03] border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/[0.06] hover:border-primary/30 transition-all duration-500"
            >
              {/* Icon Holder */}
              <div className={`w-16 h-16 rounded-2xl ${ministry.colorClass} flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                <ministry.icon className="w-8 h-8" />
              </div>

              <div className="mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary opacity-70">
                  {ministry.tag}
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-2 group-hover:text-secondary transition-colors">
                  {ministry.title}
                </h3>
              </div>

              <p className="text-gray-400 leading-relaxed text-sm mb-8 font-light min-h-[60px]">
                {ministry.description}
              </p>

              <div className="pt-6 border-t border-white/5">
                <Link 
                  to="/ministerios" 
                  className="inline-flex items-center text-[10px] font-black tracking-widest text-primary uppercase group-hover:gap-3 transition-all"
                >
                  Conhecer Ministério <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>

              {/* Decorative Corner Background */}
              <div className="absolute bottom-0 right-0 p-4 opacity-[0.02] group-hover:opacity-[0.1] transition-opacity">
                <ministry.icon size={80} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <Button 
            variant="outline" 
            size="xl" 
            className="rounded-full border-white/10 bg-white/5 hover:bg-primary hover:border-primary text-white px-12 transition-all duration-300 shadow-xl"
            asChild
          >
            <Link to="/ministerios" className="flex items-center gap-2">
              Ver todos os ministérios
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default MinistriesSection;