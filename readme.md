# ⛪ Família Cristo Salva - Web Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg)](https://tailwindcss.com/)
[![Neon](https://img.shields.io/badge/Database-Neon-00E599.svg)](https://neon.tech/)

Uma plataforma web de alta performance desenvolvida para a **Igreja Família Cristo Salva**. O projeto foca em entregar uma experiência premium, acessível e resiliente, integrando conteúdos ao vivo e biblioteca de mensagens.

---

## 🚀 Visão Geral e Desafios Técnicos

O maior desafio técnico deste projeto foi a gestão de cotas da **YouTube Data API v3**. Para garantir que o site suporte milhares de acessos diários sem interromper a exibição de vídeos devido ao limite de 10k unidades/dia do Google, implementamos uma **Arquitetura de Cache de Dados em Camadas**.



### Diferenciais da Solução:
* **Persistência com Neon DB:** Em vez de chamadas diretas à API pelo cliente, os metadados dos vídeos são persistidos em um banco PostgreSQL Serverless.
* **Sincronização Automatizada:** Um serviço via GitHub Actions atualiza o banco de dados uma vez ao dia (Custo de cota: ~1 unidade), tornando o sistema imune a picos de tráfego.
* **Performance "Above the Fold":** Uso estratégico de `lazy loading` e `Suspense` para garantir que a Hero Section carregue em menos de 1s (LCP otimizado).
* **Modern UI/UX:** Interface construída com princípios de *Glassmorphism* sutil e animações via Framer Motion.

---

## 🛠️ Stack Tecnológica

- **Frontend:** React 19 (Suporte nativo a metadados)
- **Framework de Estilo:** Tailwind CSS & Shadcn/UI
- **Gerenciamento de Estado/Fetch:** TanStack Query (React Query) v5
- **Banco de Dados:** Neon (PostgreSQL)
- **Ícones:** Lucide React
- **Animações:** Framer Motion

---

## 🏗️ Estrutura de Pastas

```text
src/
├── assets/          # Ativos estáticos (Imagens/Vídeos)
├── components/      
│   ├── layout/      # Componentes globais (Header, Footer)
│   ├── ui/          # Componentes base (Botões, Inputs via Shadcn)
│   └── home/        # Seções específicas da Index
├── hooks/           # Lógica de consumo de APIs e Cache
├── pages/           # Rotas da aplicação (Lazy Loaded)
├── services/        # Scripts de sincronização e integração DB
└── lib/             # Configurações de bibliotecas (Prisma, Axios)
⚙️ Configuração do Ambiente
Pré-requisitos
Node.js 20+

Conta no Neon.tech

Chave de API do Google Cloud (YouTube Data API v3)

Passo a Passo
Clone o repositório:

Bash

git clone [https://github.com/seu-usuario/familia-cristo-salva.git](https://github.com/seu-usuario/familia-cristo-salva.git)
cd familia-cristo-salva
Instale as dependências:

Bash

npm install
Configure as Variáveis de Ambiente: Crie um arquivo .env na raiz do projeto:

Snippet de código

DATABASE_URL="sua_string_de_conexao_do_neon"
YOUTUBE_API_KEY="sua_chave_api_google"
YOUTUBE_CHANNEL_ID="id_do_canal_da_igreja"
Inicie o ambiente de desenvolvimento:

Bash

npm run dev
🤖 Automação de Dados (CI/CD)
O projeto utiliza GitHub Actions para manter os dados atualizados sem custo operacional. O workflow está configurado em .github/workflows/sync.yml e realiza as seguintes tarefas:

Acorda o banco de dados Neon.

Consulta a API do YouTube para novos envios.

Realiza o upsert dos dados (evitando duplicidade).

Garante que o Front-end sempre tenha dados "quentes".

⚖️ Licença
Distribuído sob a licença MIT. Veja LICENSE para mais informações.

🤝 Contato
Iago - [Seu Link de Contato/LinkedIn] Projeto: https://familiacristosalva.com.br