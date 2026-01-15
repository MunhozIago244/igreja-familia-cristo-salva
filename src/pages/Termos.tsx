import { motion } from "framer-motion";
import { Scale, FileText, AlertCircle, Share2, Copyright } from "lucide-react";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <span className="text-secondary font-black uppercase tracking-[0.3em] text-xs">Regras da Comunidade</span>
          <h1 className="text-5xl font-black mt-4 tracking-tighter">TERMOS DE <span className="text-primary">USO</span></h1>
          <p className="text-slate-400 mt-6 text-lg">Ao navegar, você concorda com as seguintes diretrizes.</p>
        </motion.div>

        <article className="prose prose-invert prose-slate max-w-none">
          <div className="grid gap-8">
            
            <section className="bg-white/5 border border-white/10 p-8 rounded-[2rem]">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Copyright className="text-primary" /> Propriedade Intelectual
              </h2>
              <p className="text-slate-400">
                Todo o conteúdo disponibilizado — incluindo vídeos de pregações, áudios, textos e o logotipo "Família Cristo Salva" — é de propriedade exclusiva da instituição ou de seus licenciadores, protegido por leis de direitos autorais.
              </p>
            </section>

            <section className="bg-white/5 border border-white/10 p-8 rounded-[2rem]">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Share2 className="text-primary" /> Licença de Uso
              </h2>
              <p className="text-slate-400">É concedida permissão para compartilhar conteúdos para fins de evangelização, desde que:</p>
              <ul className="list-disc pl-6 mt-4 text-slate-400 space-y-2">
                <li>Não haja cobrança financeira pelo acesso ao conteúdo.</li>
                <li>Os créditos e links originais sejam preservados.</li>
                <li>O conteúdo não seja editado para alterar o sentido da mensagem bíblica.</li>
              </ul>
            </section>

            <section className="bg-white/5 border border-white/10 p-8 rounded-[2rem]">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <AlertCircle className="text-primary" /> Limitação de Responsabilidade
              </h2>
              <p className="text-slate-400">
                A igreja esforça-se para manter as informações atualizadas, porém não se responsabiliza por erros técnicos ou interrupções temporárias de serviços de transmissão ao vivo (streaming).
              </p>
            </section>

          </div>
        </article>
      </div>
    </div>
  );
};

export default TermsPage;