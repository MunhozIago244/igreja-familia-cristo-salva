import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, Car, Navigation, Star } from "lucide-react";

const OndeEstamos = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-muted/30">
        <div className="container-church">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-2 bg-hope-light text-primary rounded-full text-sm font-medium mb-4">
              Visite-nos
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Onde <span className="text-primary">Estamos</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Venha nos visitar! Estamos localizados em Campinas, SP, 
              prontos para recebê-lo de braços abertos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map & Info */}
      <section className="section-padding">
        <div className="container-church">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Map Placeholder */}
            <motion.div
              className="relative rounded-3xl overflow-hidden h-[400px] lg:h-auto"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-muted flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Mapa será integrado com Google Maps API
                  </p>
                  <Button variant="default" className="mt-4" asChild>
                    <a
                      href="https://maps.google.com/?q=Campinas,SP,Brasil"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Navigation className="w-4 h-4" />
                      Abrir no Google Maps
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-bold text-foreground mb-8">
                Informações de <span className="text-primary">Localização</span>
              </h2>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex gap-4 p-6 bg-muted/50 rounded-2xl">
                  <div className="w-12 h-12 bg-hope-light rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Endereço</h3>
                    <p className="text-muted-foreground">
                      Campinas, São Paulo<br />
                      Brasil
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4 p-6 bg-muted/50 rounded-2xl">
                  <div className="w-12 h-12 bg-warmth-light rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Horários de Cultos</h3>
                    <p className="text-muted-foreground">
                      Domingos: 09h e 19h<br />
                      Quinta-feira: 20h
                    </p>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex gap-4 p-6 bg-muted/50 rounded-2xl">
                  <div className="w-12 h-12 bg-hope-light rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Contato</h3>
                    <a
                      href="https://wa.me/5519999999999"
                      className="text-primary hover:underline"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>

                {/* Parking */}
                <div className="flex gap-4 p-6 bg-muted/50 rounded-2xl">
                  <div className="w-12 h-12 bg-warmth-light rounded-xl flex items-center justify-center flex-shrink-0">
                    <Car className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Estacionamento</h3>
                    <p className="text-muted-foreground">
                      Estacionamento gratuito disponível no local
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button variant="default" size="lg" asChild>
                  <a
                    href="https://maps.google.com/?q=Campinas,SP,Brasil"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation className="w-4 h-4" />
                    Como Chegar
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a
                    href="https://waze.com/ul?q=Campinas,SP,Brasil"
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

      {/* Reviews */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-church">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              O que as pessoas dizem
            </h2>
            <div className="flex items-center justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-6 h-6 text-secondary fill-secondary" />
              ))}
            </div>
            <p className="text-primary-foreground/80">
              Avaliações do Google (será integrado com API)
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Maria S.",
                text: "Uma igreja maravilhosa! Fui muito bem acolhida desde o primeiro dia.",
              },
              {
                name: "João P.",
                text: "Mensagens transformadoras e uma comunidade que realmente vive o amor de Cristo.",
              },
              {
                name: "Ana C.",
                text: "Minha família encontrou um lar espiritual aqui. Somos muito gratos!",
              },
            ].map((review, index) => (
              <motion.div
                key={index}
                className="bg-primary-foreground/10 p-6 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-secondary fill-secondary" />
                  ))}
                </div>
                <p className="text-primary-foreground/90 mb-4">"{review.text}"</p>
                <p className="font-medium">{review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default OndeEstamos;
