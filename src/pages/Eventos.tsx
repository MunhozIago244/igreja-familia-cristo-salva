import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Calendar, Clock, MapPin, Users, CalendarPlus, 
  Sparkles, ArrowRight, Star, Bell 
} from "lucide-react";
import { Link } from "react-router-dom";
import communityImage from "@/assets/community.jpg";

// Interface para garantir tipagem forte e evitar erros em produção
interface SpecialEvent {
  id: number;
  title: string;
  description: string;
  dateDisplay: string; // Ex: "20-22 de Fev"
  startDate: string;   // ISO format: "2026-02-20T19:30:00"
  endDate: string;     // ISO format: "2026-02-22T22:00:00"
  time: string;
  location: string;
  category: string;
  image: string;
  featured: boolean;
  registrationLink: string;
}

const specialEvents: SpecialEvent[] = [
  {
    id: 1,
    title: "Retiro de Homens 2026",
    description: "Três dias de imersão, cura e fortalecimento para o alicerce dos Homens do Reino.",
    dateDisplay: "20-22 de Fevereiro",
    startDate: "2026-02-20T19:30:00",
    endDate: "2026-02-22T14:00:00",
    time: "19h30",
    location: "Sítio Monte Santo",
    category: "Retiro",
    image: communityImage,
    featured: true,
    registrationLink: "https://forms.gle/exemplo-homens"
  },
  {
    id: 2,
    title: "Retiro de Mulheres: Preciosas",
    description: "Um encontro profundo com a identidade de filha. Momentos de renovo, comunhão e a glória de Deus.",
    dateDisplay: "15-17 de Maio",
    startDate: "2026-05-15T19:00:00",
    endDate: "2026-05-17T13:00:00",
    time: "19h00",
    location: "Hotel Fazenda Campinas",
    category: "Retiro",
    image: communityImage,
    featured: true,
    registrationLink: "https://forms.gle/exemplo-mulheres"
  }
];

// Helper para gerar link do Google Calendar dinamicamente
const generateGoogleCalendarLink = (event: SpecialEvent) => {
  const start = event.startDate.replace(/[-:]/g, "");
  const end = event.endDate.replace(/[-:]/g, "");
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start}/${end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
};

const Eventos = () => {
  return (
    <Layout>
      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-24 bg-white overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-linear-to-b from-primary/5 to-transparent z-0" />
        <div className="container-church relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              <Sparkles size={12} /> Agenda do Reino
            </span>
            <h1 className="font-display text-5xl md:text-8xl font-black text-slate-900 leading-[0.85] tracking-tighter mb-8 uppercase">
              Onde a família <br />
              <span className="text-primary italic text-4xl md:text-7xl">se encontra.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 2. EVENTOS ESPECIAIS (Retiros e Conferências) */}
      <section className="py-24 bg-white">
        <div className="container-church">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {specialEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-[600px] rounded-[4rem] overflow-hidden shadow-2xl border border-slate-100"
              >
                {/* Background Image com Zoom no Hover */}
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
                  <div className="flex gap-3 mb-6">
                    <span className="bg-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {event.category}
                    </span>
                    <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                      {event.dateDisplay}
                    </span>
                  </div>

                  <h3 className="font-display text-4xl md:text-5xl font-black mb-4 tracking-tighter leading-tight uppercase">
                    {event.title}
                  </h3>
                  
                  <p className="text-white/70 text-lg mb-8 max-w-md">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 mb-10 text-sm font-bold text-white/90">
                    <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/10">
                      <Clock size={16} className="text-secondary" /> {event.time}
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl border border-white/10">
                      <MapPin size={16} className="text-secondary" /> {event.location}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Botão Dinâmico de Inscrição */}
                    <Button 
                      asChild
                      className="bg-white text-black hover:bg-secondary hover:text-black h-16 px-10 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex-1 shadow-2xl"
                    >
                      <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                        <Users className="mr-2" size={18} /> Quero me inscrever
                      </a>
                    </Button>

                    {/* Botão Dinâmico de Calendário */}
                    <Button 
                      asChild
                      variant="outline" 
                      className="border-white/20 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 h-16 w-16 rounded-2xl p-0 transition-transform active:scale-95"
                    >
                      <a 
                        href={generateGoogleCalendarLink(event)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        title="Adicionar ao meu Calendário"
                      >
                        <CalendarPlus size={24} />
                      </a>
                    </Button>
                  </div>
                </div>

                {event.featured && (
                  <div className="absolute top-10 right-10 bg-secondary w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl rotate-12">
                    <Star className="text-black fill-current" size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CTA WHATSAPP */}
      <section className="pb-32 pt-32">
        <div className="container-church">
          <div className="bg-[#0A0A0A] p-12 md:p-24 rounded-[5rem] relative overflow-hidden flex flex-col items-center text-center">
            <div className="relative z-10 max-w-3xl">
              <Bell className="w-16 h-16 text-primary mx-auto mb-8 animate-bounce" />
              <h2 className="font-display text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-none">
                FIQUE POR DENTRO DE <br />
                <span className="text-primary italic uppercase">CADA NOVIDADE.</span>
              </h2>
              <p className="text-white/40 text-xl mb-12">
                Participe do nosso canal oficial e receba as agendas semanais diretamente no seu celular.
              </p>
              <Button size="xl" className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-20 px-16 text-sm font-black uppercase tracking-[0.2em] shadow-primary/20 shadow-2xl transition-all hover:scale-105">
                ENTRAR NO GRUPO DE AVISOS
              </Button>
            </div>
            {/* Ambient Light */}
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/20 blur-[120px] rounded-full" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-secondary/10 blur-[120px] rounded-full" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Eventos;