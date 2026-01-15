import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, MapPin, Clock, Users, Baby, Car, Coffee, HelpCircle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-church.jpg";

const faqs = [
  {
    question: "Como devo me vestir?",
    answer: "Venha como se sentir confortável! Não há código de vestimenta. Você é bem-vindo do jeito que é.",
  },
  {
    question: "Quanto tempo dura o culto?",
    answer: "Nossos cultos costumam durar cerca de 1h30 a 2h, com momentos de louvor, adoração e pregação.",
  },
  {
    question: "Preciso ser batizado para participar?",
    answer: "Não! Todos são bem-vindos em nossos cultos, independente de sua jornada de fé.",
  },
  {
    question: "Vocês têm atividades para crianças?",
    answer: "Sim! Temos o Ministério Kids com atividades especiais para crianças durante todos os cultos.",
  },
];

const whatToExpect = [
  {
    icon: Coffee,
    title: "Recepção Calorosa",
    description: "Nossa equipe estará pronta para recebê-lo e ajudar com qualquer dúvida.",
  },
  {
    icon: Users,
    title: "Louvor e Adoração",
    description: "Músicas contemporâneas e hinos que elevam nosso coração a Deus.",
  },
  {
    icon: Heart,
    title: "Mensagem Relevante",
    description: "Pregação bíblica aplicada ao nosso dia a dia.",
  },
  {
    icon: Baby,
    title: "Cuidado com as Crianças",
    description: "Espaço seguro e divertido para os pequenos aprenderem sobre Jesus.",
  },
];

const SouNovo = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Comunidade da igreja em adoração"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 to-foreground/50" />
        </div>
        <div className="container-church relative z-10 pt-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium mb-4">
              Você é especial para nós! 💛
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Bem-vindo à Nossa
              <span className="block text-secondary">Família!</span>
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-8">
              Estamos muito felizes que você está considerando nos visitar!
              Preparamos esta página especialmente para você.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/onde-estamos">
                <MapPin className="w-5 h-5" />
                Como Chegar
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="section-padding">
        <div className="container-church">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              O que <span className="text-primary">esperar?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Veja como será sua experiência no primeiro culto conosco.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatToExpect.map((item, index) => (
              <motion.div
                key={item.title}
                className="text-center p-6 rounded-2xl bg-muted/50 hover:bg-muted transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-14 h-14 bg-hope-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="section-padding bg-muted/30">
        <div className="container-church">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              className="bg-card p-6 rounded-2xl shadow-soft"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Clock className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Horários
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Escolha o melhor horário para você:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Domingos: 09h e 19h
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Quinta-feira: 20h
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-card p-6 rounded-2xl shadow-soft"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Car className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Estacionamento
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Não se preocupe com seu carro:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Estacionamento gratuito
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Segurança no local
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-card p-6 rounded-2xl shadow-soft"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Baby className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Para as Crianças
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Espaço especial para os pequenos:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Ministério Kids
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Professores capacitados
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-church">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Perguntas <span className="text-primary">Frequentes</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto grid gap-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-card p-6 rounded-2xl shadow-soft"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex gap-4">
                  <HelpCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground text-sm">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* First Visit Form */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-church">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                Planejando sua Visita?
              </h2>
              <p className="text-primary-foreground/80 mb-8">
                Deixe seu contato que entraremos em contato para responder suas dúvidas!
              </p>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Seu nome"
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 h-12 rounded-xl"
                  />
                  <Input
                    type="tel"
                    placeholder="Seu WhatsApp"
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 h-12 rounded-xl"
                  />
                </div>
                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  className="w-full bg-secondary text-secondary-foreground hover:opacity-90"
                >
                  Quero ser Contatado
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SouNovo;
