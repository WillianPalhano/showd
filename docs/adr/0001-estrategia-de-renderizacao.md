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