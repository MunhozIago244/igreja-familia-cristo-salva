import { motion, Variants } from "framer-motion";
import { Clock, MapPin, Users, Heart, Star, Sparkles, Moon, LucideIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ServiceSchedule {
  week?: string;
  name: string;
  time: string;
  description?: string;
}

interface ServiceCard {
  day: string;
  icon: LucideIcon;
  featured: boolean;
  staticTime?: string;
  schedule?: ServiceSchedule[];
  footer?: string;
}

const services: ServiceCard[] = [
  {
    day: "Domingos",
    icon: Users,
    featured: true,
    staticTime: "09h & 19h",
    footer: "Celebração da Família",
  },
  {
    day: "Quintas",
    icon: Clock,
    featured: false,
    footer: "Cultos Temáticos às 20h",
    schedule: [
      { week: "1ª", name: "Culto de Oração", time: "20h" },
      { week: "2ª", name: "MEF - Mulheres", time: "20h", description: "Enc. Feminino" },
      { week: "3ª", name: "Culto da Família", time: "20h" },
      { week: "4ª", name: "Culto dos Homens", time: "20h" },
    ],
  },
  {
    day: "Sábados",
    icon: Sparkles,
    featured: false,
    footer: "Movimentos Específicos",
    schedule: [
      { week: "1º", name: "GP - Jovens", time: "19h", description: "Geração com Propósito" },
      { week: "3º", name: "Adolescentes", time: "17h" },
      { week: "3º", name: "GP - Jovens", time: "19h" },
    ],
  },
];

const cardVariants: Variants = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
};

const ServiceTimesSection = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-[#050505] text-white">
      {/* Background Decorativo Otimizado */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/10 blur-[160px] rounded-full opacity-50" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02]" />
      </div>

      <div className="container-church relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-6">
            <span className="bg-secondary/20 text-secondary border border-secondary/20 px-5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-lg shadow-secondary/5 flex items-center gap-2">
              <Moon size={14} className="fill-current" /> Programação Semanal
            </span>
          </div>
          <h2 className="font-display text-5xl lg:text-7xl font-black mb-6 tracking-tighter leading-none">
            Momentos de <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-primary to-secondary">
              Comunhão Real.
            </span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Escolha um momento para estar conosco. Cada culto é planejado para 
            edificar sua vida e fortalecer os laços da sua família.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.day}
              variants={cardVariants}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative p-10 rounded-4xl border transition-all duration-500 flex flex-col ${
                service.featured 
                  ? "bg-linear-to-b from-primary to-primary/80 border-primary shadow-[0_30px_60px_-15px_rgba(155,28,33,0.4)] scale-105 z-20" 
                  : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] backdrop-blur-xl z-10"
              }`}
            >
              <div className="flex justify-between items-start mb-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${service.featured ? "bg-white/20" : "bg-primary/10"}`}>
                  <service.icon className={`w-7 h-7 ${service.featured ? "text-white" : "text-primary"}`} />
                </div>
                {service.featured && (
                  <div className="bg-white text-primary text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-xl">
                    Principal
                  </div>
                )}
              </div>

              <h3 className="font-display text-4xl font-black mb-2 tracking-tighter">{service.day}</h3>
              
              {service.staticTime ? (
                <div className="my-14 text-center lg:text-left">
                  <span className="text-7xl font-display font-black tracking-tighter text-white drop-shadow-2xl">
                    {service.staticTime}
                  </span>
                </div>
              ) : (
                <div className="space-y-3 my-8 flex-grow">
                  {service.schedule?.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5 group-hover:border-white/10 transition-all">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-secondary uppercase tracking-[0.2em] mb-1">{item.week} semana</span>
                        <span className="font-bold text-sm text-white/90 leading-none">{item.name}</span>
                        {item.description && <span className="text-[9px] text-white/30 uppercase mt-1 tracking-wider">{item.description}</span>}
                      </div>
                      <span className="font-display font-black text-xl text-white">{item.time}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className={`mt-auto pt-8 border-t ${service.featured ? "border-white/20" : "border-white/5"}`}>
                <p className={`text-xs font-bold flex items-center gap-2 tracking-wide uppercase ${service.featured ? "text-white" : "text-white/40"}`}>
                  <Star size={14} className="text-secondary fill-current" />
                  {service.footer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex flex-col items-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <Button
            variant="outline"
            size="xl"
            className="rounded-full border-white/10 bg-white/5 text-white hover:bg-primary hover:border-primary hover:scale-105 transition-all px-16 h-16 text-base font-bold group shadow-2xl"
            asChild
          >
            <Link to="/onde-estamos" aria-label="Ver localização da igreja no mapa">
              <MapPin className="w-5 h-5 mr-3 group-hover:animate-bounce text-secondary" />
              COMO CHEGAR NA FAMÍLIA
              <ArrowRight className="w-4 h-4 ml-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          </Button>
          
          <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-white/[0.02] border border-white/5">
            <Heart className="w-4 h-4 text-primary fill-current" />
            <span className="text-xs font-bold text-white/30 uppercase tracking-[0.3em]">Uma igreja de amor em Campinas</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceTimesSection;