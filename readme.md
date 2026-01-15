⛪ Família Cristo Salva - Web Platform
Uma plataforma web de alta performance desenvolvida para a Igreja Família Cristo Salva. O projeto foca em entregar uma experiência premium, resiliente e escalável.

🚀 Racional Tecnológico: Por que estas ferramentas?
Como arquiteto do projeto, a seleção da stack foi baseada em três pilares: Custo Zero de Operação, Performance Extrema e Manutenibilidade.

React 19 & Vite: Escolhidos pela nova gestão nativa de metadados e pela velocidade de compilação. O uso de Suspense e Lazy Loading garante que o bundle inicial seja mínimo, priorizando o Time to Interactive.

Neon DB (PostgreSQL Serverless): A escolha pelo Neon deve-se ao seu modelo autoscaling e à capacidade de "dormir" quando não há tráfego, eliminando custos de infraestrutura enquanto mantém a robustez do PostgreSQL.

YouTube Data API v3 + Cache Layer: Para mitigar o limite severo de 10.000 unidades de cota/dia, implementamos um sistema onde o frontend consome nosso banco de dados, reduzindo as chamadas à API do Google de milhares para apenas uma por dia.

TanStack Query (React Query): Utilizado para gerenciar o estado assíncrono, garantindo que os dados persistidos no banco sejam cacheados no navegador do usuário, reduzindo latência.

💎 Melhores Práticas Adotadas
O projeto segue rigorosos padrões de desenvolvimento sênior:

SOLID & Clean Code: Componentes pequenos, com responsabilidade única e propriedades tipadas.

Estratégia Anti-CLS (Cumulative Layout Shift): Implementação de Skeleton Screens personalizados que reservam o espaço exato das seções carregadas via lazy, garantindo nota máxima no Google PageSpeed.

Segurança e Acessibilidade: - Uso de rel="noopener noreferrer" em todos os links externos.

Atributos ARIA e discernible text para garantir navegação por leitores de tela.

Variáveis de ambiente (.env) estritamente protegidas.

UI/UX de Alto Nível: Design baseado em Glassmorphism, utilizando backdrop-filter para profundidade visual e animações aceleradas por GPU via Framer Motion.

🏗️ Estrutura de Pastas
Plaintext

src/
├── assets/          # Ativos otimizados (WebP, SVGs)
├── components/      
│   ├── layout/      # Estrutura global (Header, Footer, Layout Wrapper)
│   ├── ui/          # Design System base (Shadcn/UI otimizado)
│   └── home/        # Seções modulares da Index (Lazy Ready)
├── hooks/           # Hooks customizados para lógica de cache/status
├── pages/           # Rotas da aplicação (Code Splitting ativo)
├── services/        # Lógica de sincronização YouTube -> Neon
└── lib/             # Configurações de terceiros (Prisma, Axios config)
⚙️ Configuração do Ambiente
Pré-requisitos
Node.js 20+

Neon Account para banco de dados PostgreSQL.

Google Cloud Console com YouTube Data API v3 ativada.

Instalação
Clone o projeto:

Bash

git clone https://github.com/seu-usuario/familia-cristo-salva.git
cd familia-cristo-salva
Dependências:

Bash

npm install
Variáveis de Ambiente: Crie um .env seguindo o modelo:

Snippet de código

DATABASE_URL="postgres://user:password@neon-host/dbname"
YOUTUBE_API_KEY="AIzaSy..."
Run:

Bash

npm run dev
🤖 Automação de Dados (CI/CD)
Utilizamos GitHub Actions (.github/workflows/sync.yml) para automação de infraestrutura:

Cron Job: Sincroniza os vídeos diariamente às 03:00 AM.

Atomic Upsert: Garante que novos vídeos entrem no banco sem duplicar registros existentes.

Auto-Wakeup: O script "acorda" o banco Neon apenas durante a tarefa de sync.

🤝 Contato
Iago - https://www.linkedin.com/in/munhoz-iago

Ponto de verificação final: Esta documentação reflete uma arquitetura pronta para produção, focada em resolver gargalos de API e oferecer uma experiência de usuário impecável.