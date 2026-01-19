import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, Car, Navigation, Star } from "lucide-react";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";

const staticReviews = [
  {
    name: "Maria Silva",
    text: "Uma igreja maravilhosa! Fui muito bem acolhida desde o primeiro dia. Sinto a presença de Deus em cada culto.",
    rating: 5,
    time: "há 2 meses",
  },
  {
    name: "João Paulo",
    text: "Mensagens transformadoras e uma comunidade que realmente vive o amor de Cristo. Recomendo a todos!",
    rating: 5,
    time: "há 1 semana",
  },
  {
    name: "Ana Clara",
    text: "Minha família encontrou um lar espiritual aqui. O ministério infantil é excelente para meus filhos.",
    rating: 5,
    time: "há 3 semanas",
  },
  {
    name: "Pedro Santos",
    text: "Lugar de recomeços. A palavra é pregada com verdade e amor. Pastor Wesley é uma benção.",
    rating: 5,
    time: "há 1 mês",
  },
  {
    name: "Lucas Ferreira",
    text: "Ambiente acolhedor e cheio de vida. O louvor é incrível!",
    rating: 5,
    time: "há 5 dias",
  },
];

const OndeEstamos = () => {
  // CONFIGURAÇÃO DA API DO GOOGLE
  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || "";
  const PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID || "";

  const { reviews: realReviews, loading } = useGoogleReviews(
    GOOGLE_API_KEY,
    PLACE_ID,
  );

  // Usa as reviews reais se existirem, senão usa as estáticas como fallback
  const displayReviews =
    realReviews.length > 0
      ? realReviews.map((r) => ({
          name: r.author_name,
          text: r.text,
          rating: r.rating,
          time: r.relative_time_description,
          photo: r.profile_photo_url,
        }))
      : staticReviews;

  return (
    <Layout>
      {/* Hero Section - Dark Premium */}
      <section className="relative pt-40 pb-20 bg-[#050505] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-linear-to-b from-primary/10 to-transparent" />
          <div className="absolute bottom-0 right-0 w-150 h-150 bg-secondary/5 blur-[120px] rounded-full" />
        </div>

        <div className="container-church relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-secondary text-[10px] font-black uppercase tracking-[0.3em] mb-8 backdrop-blur-md">
              <MapPin size={12} /> Nossa Localização
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase">
              Venha nos <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary italic">
                Visitar.
              </span>
            </h1>
            <p className="text-white/50 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Estamos de portas abertas para receber você e sua família. <br />
              Campinas, SP.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map & Info Section */}
      <section className="py-24 bg-[#050505]">
        <div className="container-church">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Google Maps Integration */}
            <motion.div
              className="relative h-[500px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl shadow-black/50"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <iframe
                src="https://maps.google.com/maps?q=Av.%20Armando%20Mario%20Tozi%2C%20417%20-%20Jardim%20Lisa%2C%20Campinas%20-%20SP&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "grayscale(100%) invert(90%) contrast(85%)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa da Igreja"
                className="absolute inset-0"
              />

              <div className="absolute bottom-6 left-6 right-6 p-6 bg-[#050505]/90 backdrop-blur-xl rounded-3xl border border-white/10 flex items-center justify-between gap-4">
                <div>
                  <p className="text-white font-bold text-sm">
                    Av. Armando Mario Tozi, 417
                  </p>
                  <p className="text-white/50 text-xs">
                    Jardim Lisa, Campinas - SP
                  </p>
                </div>
                <Button
                  size="sm"
                  className="bg-white text-black hover:bg-secondary font-bold rounded-xl h-10 px-6 text-[10px] uppercase tracking-widest"
                  asChild
                >
                  <a
                    href="https://maps.google.com/?q=Av.+Armando+Mario+Tozi,+417+-+Jardim+Lisa,+Campinas+-+SP"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation size={14} className="mr-2" /> Traçar Rota
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Info Cards */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <h2 className="font-display text-4xl font-black text-white mb-4 tracking-tighter">
                  Informações <span className="text-primary">Úteis</span>
                </h2>
                <p className="text-white/50">
                  Tudo o que você precisa saber para sua primeira visita.
                </p>
              </div>

              <div className="grid gap-4">
                {[
                  {
                    icon: Clock,
                    title: "Horários",
                    desc: "Dom: 09h e 19h • Qui: 20h",
                    color: "text-secondary",
                  },
                  {
                    icon: Phone,
                    title: "Contato",
                    desc: "(19) 99685-9435",
                    color: "text-primary",
                  },
                  {
                    icon: Car,
                    title: "Estacionamento",
                    desc: "Gratuito e seguro no local",
                    color: "text-white",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors group"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl bg-black/40 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}
                    >
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">
                        {item.title}
                      </h3>
                      <p className="text-white/50 text-sm font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Button
                  variant="outline"
                  size="xl"
                  className="w-full border-white/10 bg-transparent text-white hover:bg-white/5 rounded-2xl h-16 font-black uppercase tracking-widest text-xs"
                  asChild
                >
                  <a
                    href="https://waze.com/ul?q=Av.+Armando+Mario+Tozi,+417+-+Jardim+Lisa,+Campinas+-+SP"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Abrir no Waze
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Carousel Section */}
      <section className="py-24 bg-[#0A0A0A] border-t border-white/5 overflow-hidden">
        <div className="container-church mb-16 text-center">
          <span className="text-secondary font-black uppercase tracking-[0.3em] text-xs mb-4 block">
            <Star size={12} className="inline mr-2 mb-1" /> Google Reviews
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-tighter">
            O que dizem sobre <br />{" "}
            <span className="text-white/30">nossa família.</span>
          </h2>
        </div>

        {/* Infinite Marquee */}
        <div className="relative w-full flex overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-[#0A0A0A] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-[#0A0A0A] to-transparent z-10" />

          <motion.div
            className="flex gap-6 px-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: displayReviews.length * 5,
            }}
          >
            {[...displayReviews, ...displayReviews].map((review, index) => (
              <div
                key={index}
                className="w-[350px] md:w-[450px] flex-shrink-0 bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {review.photo ? (
                      <img
                        src={review.photo}
                        alt={review.name}
                        className="w-10 h-10 rounded-full object-cover border border-white/10"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                        {review.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="text-white font-bold text-sm">
                        {review.name}
                      </p>
                      <p className="text-white/30 text-[10px] uppercase tracking-wider">
                        {review.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className="text-yellow-500 fill-yellow-500"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed font-medium line-clamp-4">
                  "{review.text}"
                </p>
                <div className="mt-6 flex items-center gap-2 opacity-20">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                    alt="Google"
                    className="w-4 h-4 grayscale"
                  />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                    Google Review
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="text-center mt-16">
          <Button
            variant="link"
            className="text-white/40 hover:text-white uppercase tracking-widest text-xs font-bold"
            asChild
          >
            <a
              href="https://www.google.com/search?q=Igreja+Familia+Cristo+Salva+Campinas"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver todas as avaliações no Google{" "}
              <Navigation size={14} className="ml-2" />
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default OndeEstamos;
