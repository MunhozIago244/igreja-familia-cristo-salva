import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, Database, UserCheck } from "lucide-react";

const PrivacyPage = () => {
  const sections = [
    {
      icon: <Database className="text-primary" />,
      title: "Coleta de Informações",
      content: "Coletamos dados estritamente necessários para o exercício de nossas atividades ministeriais, como nome, e-mail e telefone, fornecidos voluntariamente em formulários de contato, pedidos de oração ou cadastro de novos membros."
    },
    {
      icon: <Lock className="text-primary" />,
      title: "Segurança dos Dados",
      content: "Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição acidental."
    },
    {
      icon: <Eye className="text-primary" />,
      title: "Uso de Cookies",
      content: "Utilizamos cookies apenas para melhorar a performance do site e entender o fluxo de visitantes. Não rastreamos comportamentos para fins comerciais de terceiros."
    },
    {
      icon: <UserCheck className="text-primary" />,
      title: "Seus Direitos",
      content: "De acordo com a LGPD, você tem o direito de acessar, corrigir, anonimizar ou excluir seus dados. Para isso, entre em contato através de nossa página de suporte."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">Transparência</span>
          <h1 className="text-5xl font-black mt-4 tracking-tighter">POLÍTICA DE <span className="text-primary">PRIVACIDADE</span></h1>
          <p className="text-slate-400 mt-6 text-lg">Última atualização: 15 de Janeiro de 2026</p>
        </motion.div>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.section 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/[0.07] transition-colors"
            >
              <div className="flex items-start gap-5">
                <div className="p-3 bg-primary/10 rounded-2xl">{section.icon}</div>
                <div>
                  <h2 className="text-xl font-bold mb-3">{section.title}</h2>
                  <p className="text-slate-400 leading-relaxed">{section.content}</p>
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;