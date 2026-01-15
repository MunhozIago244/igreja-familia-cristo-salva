import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Heart, Target, Eye, BookOpen, Users, Sparkles, Quote, ArrowDown } from "lucide-react";
import communityImage from "@/assets/FM_1.jpg";
import ambosImage from "@/assets/PR_1.jpg";

const values = [
  {
    icon: Heart,
    title: "Amor",
    description: "O amor de Cristo é o centro e o combustível de todas as nossas ações.",
    color: "bg-red-500/10 text-red-500"
  },
  {
    icon: Users,
    title: "Família",
    description: "Uma casa onde cada pessoa é acolhida, cuidada e integrada em amor.",
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    icon: BookOpen,
    title: "Palavra",
    description: "Fundamentados na Rocha: a Bíblia é nossa única regra de fé e prática.",
    color: "bg-amber-500/10 text-amber-500"
  },
];

const QuemSomos = () => {
  return (
    <Layout>
      {/* 1. HERO SECTION - Minimalista e Impactante */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-white pt-20">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-[120px]" />
        </div>

        <div className="container-church relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8"
            >
              <Sparkles size={12} className="text-primary" /> Nossa Essência
            </motion.span>
            
            <h1 className="font-display text-5xl md:text-8xl font-black text-slate-900 leading-[0.85] tracking-tighter mb-8">
              UMA FAMÍLIA <br />
              <span className="text-primary italic">PARA PERTENCER.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
              Mais do que uma igreja, somos um corpo vivo movido pela esperança e pela restauração em Jesus Cristo.
            </p>

            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex justify-center text-slate-300"
            >
              <ArrowDown size={32} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. STORY SECTION - Design Editorial (Layering) */}
      <section className="py-24 lg:py-40 bg-white">
        <div className="container-church">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            <motion.div 
              className="lg:col-span-7 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200">
                <img
                  src={communityImage}
                  alt="Comunidade"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-10 -right-10 z-20 bg-primary p-10 rounded-[2.5rem] shadow-xl text-white hidden md:block">
                <p className="text-5xl font-black tracking-tighter">2014</p>
                <p className="text-xs font-bold uppercase tracking-widest opacity-80">Ano de Fundação</p>
              </div>
            </motion.div>

            <motion.div 
              className="lg:col-span-5 space-y-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-1 bg-primary" />
              <h2 className="font-display text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                Nossa história começou <span className="text-primary text-3xl block md:inline md:text-5xl">com um chamado.</span>
              </h2>
              <div className="space-y-6 text-slate-500 text-lg leading-relaxed">
                <p>
                  A Igreja Família Cristo Salva nasceu em Campinas com um propósito inegociável: 
                  <strong> viver o Evangelho na sua forma mais pura — o amor.</strong>
                </p>
                <p>
                  O que começou com um pequeno grupo de oração transformou-se em um refúgio para centenas de pessoas que buscavam não apenas religião, mas uma família espiritual autêntica.
                </p>
                <Quote className="text-primary/20 w-12 h-12 -mb-8" />
                <p className="italic text-slate-700 font-medium">
                  "Aqui, não olhamos para o seu passado, olhamos para o que Cristo pode fazer no seu futuro."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION - High Contrast Dark Mode */}
      <section className="py-24 bg-[#0A0A0A] rounded-[4rem] mx-4 md:mx-8 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-transparent pointer-events-none" />
        
        <div className="container-church relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
            <motion.div
              className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                <Target className="text-white" size={28} />
              </div>
              <h3 className="font-display text-3xl font-black mb-6 tracking-tighter">Nossa Missão</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                Levar o amor de Cristo a todas as famílias, restaurando identidades através da Palavra, do acolhimento e do serviço sacrificial ao próximo.
              </p>
            </motion.div>

            <motion.div
              className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-secondary/50 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-secondary/20 group-hover:scale-110 transition-transform">
                <Eye className="text-black" size={28} />
              </div>
              <h3 className="font-display text-3xl font-black mb-6 tracking-tighter text-white">Nossa Visão</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                Ser um farol de esperança que impacta gerações, formando discípulos que manifestam o Reino de Deus em cada esfera da sociedade.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. VALUES - Grid Moderno */}
      <section className="py-24 lg:py-40 bg-white">
        <div className="container-church">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">
              O QUE NOS <span className="text-primary italic">MOVE.</span>
            </h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="relative p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-slate-200 transition-all group overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <value.icon size={32} />
                </div>
                <h3 className="font-display text-2xl font-black text-slate-900 mb-4 tracking-tighter">{value.title}</h3>
                <p className="text-slate-500 leading-relaxed">{value.description}</p>
                <div className="absolute -bottom-4 -right-4 text-slate-100 group-hover:text-primary/5 transition-colors">
                  <value.icon size={120} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LEADERSHIP - Minimalista e Focado */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="container-church">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl font-black text-slate-900 tracking-tighter mb-4">Nossa Liderança</h2>
              <p className="text-slate-500 uppercase text-xs font-bold tracking-[0.3em]">Cuidado e Direção</p>
            </div>
            
            <motion.div
              className="relative group max-w-sm mx-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10 bg-white p-8 rounded-[3rem] shadow-xl text-center border border-slate-100 transition-transform group-hover:-translate-y-2">
                <div className="relative inline-block mb-6">
                  <img
                    src={ambosImage}
                    alt="Pastor e Pastora"
                    className="w-140 h-auto rounded-[2.5rem] object-fit mx-auto shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white border-4 border-white">
                    <Heart size={16} fill="currentColor" />
                  </div>
                </div>
                <h3 className="font-display text-2xl font-black text-slate-900 mb-1">Pastor e Pastora</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Dedicados a pastorear com amor, ensino e visão para que cada família viva a plenitude de Cristo.
                </p>
              </div>
              {/* Decorative back-blob */}
              <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-110 -z-10 group-hover:bg-primary/10 transition-colors" />
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default QuemSomos;