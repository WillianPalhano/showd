# 0001 — Estratégia de renderização

- **Status:** Aceito
- **Data:** 2026-11-04

## Contexto
O  CLI criou o projeto com SSR + prerender em todas as rotas. Isso traz custos para o projeto no futuro e quero construir um projeto estruturado da forma correta desde o início.

## Opções consideradas

A) Remover o SSR agora e adicionar de novo quando precisar. 
B) Manter o SSR instalado, mas trocar '**' para RenderMode.Client. Na prática, o app vira CSR hoje, e quando surgirem as páginas públicas você muda uma rota para Server, conscientemente.

## Decisão

Escolhi a opção B, acredito que o SSR é importante para algumas partes do projeto, mas manter ele CSR na maior parte é mais interessante, tanto no ponto de vista de custos, quando na necessidade, muitas telas vão ser carregadas apenas uma vez e sem a necessidade de um servidor atualizando elas com tanta frequência, gerando custos.

## Consequências

Altero o serverRoutes agora, deixando o projeto estruturado da maneira que quero seguir, desde o início.

---

## Revisão

> Correções feitas na revisão do ADR. O texto acima foi mantido como escrito originalmente.

### Contexto — o custo não vem do prerender
Prerender (SSG) **não gera custo de servidor**: o HTML é gerado uma vez, no build, e servido como arquivo estático, tão barato quanto um app CSR. Quem gera custo é o `RenderMode.Server`, que renderiza **a cada requisição** e exige um servidor Node ligado o tempo todo.

O problema real de prerender em todas as rotas (`'**'`):
- Páginas que dependem do usuário ou de dados que mudam (ex.: "minhas séries") não fazem sentido geradas antecipadamente no build.
- Com SSR/prerender, o código também roda no servidor, onde não existem `window`, `document` e `localStorage` — o que quebraria o plano de salvar dados no `localStorage`.

### Opções consideradas — com prós e contras
**A) Remover o SSR agora e adicionar quando precisar**
- Prós: projeto mais simples possível; menos arquivos e configuração para entender agora.
- Contras: reconfigurar o SSR depois dá trabalho; o `server.ts` (que pode virar o BFF) sai junto.

**B) Manter o SSR instalado, com `'**'` em `RenderMode.Client`**
- Prós: o app se comporta como CSR hoje; uma rota passa a `Server` com uma linha, quando houver motivo; o `server.ts` continua disponível para virar o BFF.
- Contras: mantém arquivos e dependências de SSR que ainda não são usados.

### Decisão — precisão no motivo
O SSR não fica "atualizando" telas com frequência: ele **renderiza cada página no momento da requisição**. Por isso precisa de um servidor sempre disponível, e é daí que vem o custo. Rotas `Client` podem ser servidas como arquivos estáticos.

### Consequências — completas
- **Fica mais fácil:** o app se comporta como CSR, e APIs do browser como `localStorage` funcionam sem cuidado extra.
- **Ponto de atenção:** quando uma rota virar `Server`, o código usado por ela não pode acessar APIs do browser sem proteção.
- **Quando revisar:** quando existir uma página pública de série que precise de preview de link (WhatsApp, Discord) ou de SEO — candidata a `RenderMode.Server`.

### Formatação
As opções A e B estavam em linhas seguidas sem marcador de lista; em Markdown isso vira um único parágrafo. Use lista (`-`) ou deixe uma linha em branco entre elas.