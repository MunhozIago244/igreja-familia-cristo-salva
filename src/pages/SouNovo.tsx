import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, MapPin, Clock, Users, Baby, Car, Coffee, HelpCircle, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

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
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState(""); // Novo estado para o email
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Enviando suas informações...");

    const submission = {
      name,
      whatsapp,
      email, // Incluir email na submissão
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/new-person', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        throw new Error('Failed to save new person submission.');
      }

      toast.success("Recebido! Em breve entraremos em contato.", { id: toastId });
      setName("");
      setWhatsapp("");
      setIsSubmitted(true);
    } catch (error) {
      toast.error("Ocorreu um erro ao salvar suas informações.", { id: toastId });
      console.error("Failed to save new person submission:", error);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
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
            <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto text-center"
              >
                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                  Planejando sua Visita?
                </h2>
                <p className="text-primary-foreground/80 mb-8">
                  Deixe seu contato que entraremos em contato para responder suas dúvidas!
                </p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      placeholder="Seu nome"
                      className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 h-12 rounded-xl"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <Input
                      type="tel"
                      placeholder="Seu WhatsApp"
                      className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 h-12 rounded-xl"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      required
                    />
                  </div>
                  <Input
                    type="email" // Alterado para tipo email
                    placeholder="Seu E-mail"
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 h-12 rounded-xl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
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
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto text-center"
              >
                <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-6" />
                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                  Obrigado!
                </h2>
                <p className="text-primary-foreground/80 mb-8">
                  Em breve um de nossos líderes entrará em contato com você.
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-secondary text-secondary-foreground hover:opacity-90"
                    asChild
                  >
                    <Link to="/ministerios">
                      Conheça nossos Ministérios <ArrowRight className="ml-2" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SouNovo;
