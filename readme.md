# ⛪ Família Cristo Salva — Digital Platform

<div align="center">

![FCS Banner](https://img.shields.io/badge/FCS-Church_Management-E53E3E?style=for-the-badge)

**Uma plataforma de alto desempenho projetada para conectar fé, comunidade e tecnologia.**

[![Status](https://img.shields.io/badge/status-Production_Ready-success?style=flat-square)](#)
[![React 19](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Neon](https://img.shields.io/badge/Database-Neon_PostgreSQL-00E599?style=flat-square&logo=postgresql)](https://neon.tech/)
[![Tailwind](https://img.shields.io/badge/UI-Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

[Visão Geral](#-visão-geral) •
[Arquitetura](#-arquitetura-e-decisões-técnicas) •
[Instalação](#-instalação) •
[Desafios Superados](#-o-problema-da-api-do-youtube) •
[Roadmap](#-roadmap)

</div>

---

## 📋 Visão Geral

A **FCS Platform** não é apenas um site institucional; é um ecossistema digital resiliente desenvolvido para a Igreja Família Cristo Salva. O projeto resolve gargalos técnicos críticos, como a dependência de APIs de terceiros e a necessidade de alta performance em dispositivos móveis.

### ✨ Destaques da Solução
- 🚀 **Performance LCP Otimizada:** Carregamento "Above the Fold" em menos de 1 segundo.
- 🛡️ **Soberania de Dados:** Camada de persistência local para conteúdos de mídia.
- 📱 **Mobile-First:** Experiência de usuário fluida em smartphones de entrada.
- 🔍 **SEO de Elite:** Implementação nativa de metadados do React 19 para indexação perfeita.

---

## 🏗️ Arquitetura e Decisões Técnicas

Abaixo, a representação de como os dados fluem do YouTube até o dispositivo do membro da igreja, garantindo que o site nunca fique offline.



### Stack Tecnológica

| Camada | Tecnologia | Motivação |
| :--- | :--- | :--- |
| **Frontend** | React 19 + Vite | Gestão nativa de metadados e build ultra-rápido. |
| **Styling** | Tailwind + shadcn/ui | Design System consistente e CSS com zero runtime. |
| **Banco de Dados** | Neon (PostgreSQL) | Banco de dados serverless com escalonamento automático. |
| **Data Fetching** | TanStack Query v5 | Cache inteligente no client-side e estados de loading. |
| **Automação** | GitHub Actions | Sincronização de dados sem custo de servidor (Cron). |

---

## 📺 O Problema da API do YouTube (Resolvido)

A API do YouTube possui limites severos de cota (10k unidades/dia). Consultas frequentes do lado do cliente esgotariam essa cota em minutos.

**Nossa Engenharia de Cache:**
1. Um **GitHub Action** executa um script de sincronização diariamente às 03:00 AM.
2. O script consome apenas **1 unidade de cota** para buscar os vídeos mais recentes.
3. Os dados são salvos no **Neon DB** via `upsert`.
4. Os usuários acessam os vídeos através do nosso banco de dados, protegendo nossa chave de API e garantindo 100% de disponibilidade.

```typescript
// Exemplo da lógica de Upsert Sênior utilizada
await db.video.upsert({
  where: { youtubeId: video.id },
  update: { 
    title: video.title, 
    thumbnail: video.highResThumb 
  },
  create: { ...videoData }
});

🔧 Instalação e Setup
Pré-requisitos
Node.js 20+

Conta no Neon.tech

Chave de API do Google Cloud

Passo a Passo
Clonar e Instalar:

Bash

git clone [https://github.com/seu-usuario/fcs-platform.git](https://github.com/seu-usuario/fcs-platform.git)
cd fcs-platform
npm install
Variáveis de Ambiente: Crie um .env.local na raiz:

Snippet de código

DATABASE_URL="postgresql://user:password@neon-host/dbname"
YOUTUBE_API_KEY="AIzaSy..."
Banco de Dados:

Bash

npx prisma db push
Rodar em Desenvolvimento:

Bash

npm run dev
🗺️ Roadmap
Fase 1: Fundação ✅
[x] Arquitetura de Cache com Neon DB.

[x] UI Premium com Glassmorphism.

[x] Integração de metadados React 19.

Fase 2: Engajamento (Em progresso)
[ ] Central de Pedidos de Oração com notificações via E-mail.

[ ] Mural de Testemunhos com moderação administrativa.

[ ] PWA para instalação direta no celular (sem App Store).

Fase 3: Inteligência
[ ] Busca de mensagens via IA baseada em temas bíblicos.

[ ] Dashboard de métricas de engajamento da comunidade.

📄 Licença
Distribuído sob a Licença MIT. Veja LICENSE para mais detalhes.

<div align="center">

Desenvolvido com excelência técnica por [Seu Nome/Iago]

LinkedIn • Site Oficial

</div>