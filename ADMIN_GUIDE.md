# Guia de Configuração do Painel de Administrador

Para acessar o painel de administrador em `/admin`, você precisa configurar uma senha segura.

## 1. Crie um arquivo de ambiente local

Crie um arquivo chamado `.env.local` na raiz do seu projeto. Este arquivo é para variáveis de ambiente locais e não deve ser enviado para o repositório Git (já está no `.gitignore`).

## 2. Defina a senha do administrador

Dentro do arquivo `.env.local`, adicione a seguinte linha:

```
VITE_ADMIN_PASSWORD="fcs_admin_2026"
```

Substitua `"SUA_SENHA_SECRETA_AQUI"` por uma senha forte e segura de sua escolha.

## 3. Reinicie o servidor de desenvolvimento

Se o servidor de desenvolvimento estiver rodando, pare-o e inicie-o novamente com `npm run dev` para que as novas variáveis de ambiente sejam carregadas.

Agora você pode acessar a página `/admin` e usar a senha que você definiu para fazer o login.

## ⚠️ Aviso de Segurança

Este método é simples, mas tem uma **limitação de segurança importante**: a senha definida no arquivo `.env.local` será incluída no código final do site (bundle de JavaScript) e ficará visível para qualquer pessoa com conhecimento técnico para inspecionar os arquivos do site.

Para uma aplicação em produção com dados sensíveis, considere usar um serviço de autenticação mais robusto (como Auth0, Firebase Authentication, etc.) que não exponha a senha no lado do cliente.
