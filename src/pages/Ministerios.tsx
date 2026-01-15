import { motion, Variants } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Music, 
  Heart, 
  Users, 
  Baby, 
  Megaphone, 
  Hand, 
  Coffee, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  ArrowRight,
  LucideIcon 
} from "lucide-react";
import { Link } from "react-router-dom";

// Interface rigorosa para evitar ESLint: no-explicit-any
interface MinistryDetail {
  icon: LucideIcon;
  title: string;
  description: string;
  schedule: string;
  tag: string;
  colorClass: string;
}

const ministries: MinistryDetail[] = [
  {
    icon: Flame,
    title: "GP Campinas",
    tag: "Jovens",
    description: "Nossa Geração com Propósito. Focada em discipulado, comunhão e impacto social para jovens apaixonados por Jesus.",
    schedule: "Sábados às 19h",
    colorClass: "text-orange-400 bg-orange-400/10",
  },
  {
    icon: ShieldCheck,
    title: "Homens do Reino",
    tag: "Homens",
    description: "Um ministério dedicado a fortalecer o caráter, a vida espiritual e a liderança do homem em todas as esferas.",
    schedule: "4ª Quinta do mês",
    colorClass: "text-blue-400 bg-blue-400/10",
  },
  {
    icon: Heart,
    title: "MEF",
    tag: "Mulheres",
    description: "Ministério de Encorajamento Feminino. Um lugar de cura, oração e fortalecimento para mulheres de todas as idades.",
    schedule: "2ª Quinta do mês",
    colorClass: "text-pink-400 bg-pink-400/10",
  },
  {
    icon: Baby,
    title: "Família CS Kids",
    tag: "Crianças",
    description: "Ministério infantil com ensino bíblico criativo e seguro. Cuidamos do futuro da igreja com excelência.",
    schedule: "Todos os cultos",
    colorClass: "text-yellow-400 bg-yellow-400/10",
  },
  {
    icon: Users,
    title: "Família CS Teens",
    tag: "Adolescentes",
    description: "Lugar de conexão para adolescentes, focando em identidade em Cristo e amizades saudáveis.",
    schedule: "3º Sábado às 17h",
    colorClass: "text-purple-400 bg-purple-400/10",
  },
  {
    icon: Music,
    title: "Louvor e Adoração",
    tag: "Música",
    description: "Conduzindo a congregação à presença de Deus através da música, técnica e coração quebrantado.",
    schedule: "Ensaios: Sábados",
    colorClass: "text-cyan-400 bg-cyan-400/10",
  },
  {
    icon: Megaphone,
    title: "Mídia & Tech",
    tag: "Produção",
    description: "Som, Projeção, Transmissão e Redes Sociais. Usamos a tecnologia como ferramenta de evangelização.",
    schedule: "Equipes em escala",
    colorClass: "text-secondary bg-secondary/10",
  },
  {
    icon: Coffee,
    title: "Hospitalidade",
    tag: "Recepção",
    description: "O primeiro sorriso da igreja. Focados em fazer cada visitante se sentir verdadeiramente em casa.",
    schedule: "Todos os cultos",
    colorClass: "text-emerald-400 bg-emerald-400/10",
  },
];

const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const cardVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Ministerios = () => {
  return (
    <Layout>
      {/* Hero Section - Mantendo o estilo Premium Dark */}
      <section className="relative pt-40 pb-24 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(155,28,33,0.15),transparent_50%)]" />
        </div>

        <div className="container-church relative z-10">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary text-secondary-foreground rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <Sparkles className="w-3 h-3" /> Faça a diferença
            </span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-8">
              Onde há amor, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                há serviço.
              </span>
            </h1>
            <p className="text-xl text-gray-400 font-light leading-relaxed">
              Na Família Cristo Salva, acreditamos que servir é a maior expressão de amor a Deus. 
              Descubra qual ministério ressoa com seu coração e junte-se a nós.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid de Ministérios */}
      <section className="py-24 bg-[#0F0F0F] relative">
        <div className="container-church">
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {ministries.map((ministry) => (
              <motion.div
                key={ministry.title}
                variants={cardVariants}
                className="group relative bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] hover:bg-white/[0.04] hover:border-primary/30 transition-all duration-500 flex flex-col h-full"
              >
                <div className={`w-14 h-14 rounded-2xl ${ministry.colorClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <ministry.icon className="w-7 h-7" />
                </div>

                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/60">
                    {ministry.tag}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white mt-1">
                    {ministry.title}
                  </h3>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow font-light">
                  {ministry.description}
                </p>

                <div className="pt-4 border-t border-white/5">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">
                    Cronograma
                  </p>
                  <p className="text-white text-xs font-medium">
                    {ministry.schedule}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Seção CTA Final - Impacto e Chamada */}
      <section className="py-24 bg-[#0A0A0A] border-t border-white/5">
        <div className="container-church">
          <motion.div
            className="bg-gradient-to-br from-primary to-primary/80 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/20"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {/* Elemento visual de fundo do card */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10">
              <Heart className="w-16 h-16 text-secondary mx-auto mb-8 fill-secondary/20" />
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
                Sentiu o chamado <br className="hidden sm:block" /> para servir?
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto mb-12 font-light italic">
                "Cada um exerça o dom que recebeu para servir os outros, administrando fielmente a graça de Deus em suas múltiplas formas." 
                <span className="block mt-2 font-bold not-italic text-sm text-secondary">1 Pedro 4:10</span>
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="secondary"
                  size="xl"
                  className="w-full sm:w-auto rounded-full bg-white text-primary hover:bg-secondary hover:text-secondary-foreground transition-all px-12 font-bold text-lg"
                  asChild
                >
                  <Link to="/contato">
                    Quero me voluntariar
                  </Link>
                </Button>
                <Button
                  variant="link"
                  className="text-white hover:text-secondary font-bold tracking-widest text-xs uppercase"
                  asChild
                >
                  <Link to="/contato" className="flex items-center">
                    Falar com a secretaria <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Ministerios;