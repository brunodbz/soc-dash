# SOC Security Dashboard

Dashboard de Segurança (SOC) com visualização unificada de eventos, integrações e gestão básica de usuários. A aplicação agora opera em modo de acesso livre: nenhuma tela exige login e a API responde sem validação de token.

## 📌 Principais recursos
- **Visão geral**: cards de severidade, indicadores de resposta e lista de eventos em tempo real.
- **Integrações**: configuração de Elastic Search SIEM, Tenable, Microsoft Defender e OpenCTI.
- **Painel de administração**: gestão de usuários simulada e alternância de integrações.
- **Exportação**: geração de relatórios (Excel/PDF) usando bibliotecas `xlsx` e `jspdf`.
- **Execução simples**: front-end em React + Vite e API Node.js inclusa no repositório.

## 🧰 Stack
- **Front-end**: React 18 + TypeScript + Vite
- **UI**: shadcn/ui, Tailwind CSS, lucide-react
- **Back-end**: Node.js (API local em `server/index.js` com armazenamento em arquivo JSON)
- **Ferramentas**: pnpm, Axios, Recharts, react-router-dom

## 🚀 Como rodar localmente
A base de dependências usa `pnpm` (recomendado), mas `npm` também funciona.

1) **Instale dependências**
```bash
pnpm install
```

2) **Suba a API mock** (porta padrão 4000)
```bash
pnpm server
```

3) **Inicie o front-end** (porta padrão 5173)
```bash
pnpm dev
```

4) **Acesse**
Abra `http://localhost:5173` no navegador. O dashboard abre imediatamente sem autenticação.

### Notas rápidas
- A API não exige mais cabeçalho `Authorization`. O front-end usa um token padrão apenas para manter compatibilidade com chamadas existentes.
- Se precisar alterar portas, edite `server/index.js` (variável `PORT`) e o arquivo `.env` ou `VITE_API_URL` no ambiente do Vite.

## 📂 Estrutura resumida
- `src/` – código React (páginas, componentes, contextos e serviços)
- `server/` – API Node.js com dados persistidos em disco
- `public/` – assets estáticos
- `README.md` – este guia atualizado

## 🧪 Scripts úteis
```bash
pnpm dev      # roda o front-end
pnpm server   # sobe a API local
pnpm build    # build de produção do front-end
pnpm lint     # checagens estáticas (TS + Biome) + build de verificação
```

## 🔒 Sobre autenticação
- O fluxo de login foi removido. O cabeçalho com token é preenchido com um valor fixo para garantir compatibilidade com as requisições existentes.
- As rotas da API (`/api/integrations`, `/api/users`, `/api/events`, `/api/dashboard`) estão liberadas e não retornam mais 401.

## ❓ Suporte
Encontrou um problema ou precisa de ajustes adicionais? Abra uma issue detalhando o cenário ou o endpoint/tela impactados.
