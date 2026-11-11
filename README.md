# Showd

Uma aplicação para registrar as séries que você assiste: avaliações, watchlist e interação com amigos sobre o que cada um tem visto. Feita para amigos e indicações. A ideia surgiu com o fim recente de um app parecido e com a vontade de manter um diário das séries que tenho assistido.

## Stack

- [Angular](https://angular.dev/) 21 (componentes standalone, signals, zoneless)
- [Vitest](https://vitest.dev/) para testes unitários
- SSR instalado, mas todas as rotas renderizam no cliente por enquanto — o porquê está no [ADR 0001](docs/adr/0001-estrategia-de-renderizacao.md)
- Dados de séries: [TMDB](https://www.themoviedb.org/)

## Pré-requisitos

- [Node.js](https://nodejs.org/) 20.19.4
- npm (já vem com o Node)

## Como rodar

Copiar "environment.example.ts" para os arquivos "environment.ts" e "environment.development.ts" e colar o seu token do TMDB.

```bash
npm install
npm start
```

Depois, abra `http://localhost:4200/` no navegador. A página recarrega sozinha quando algum arquivo é alterado.

## Build

```bash
npm run build
```

Os arquivos gerados ficam em `dist/`.

## Testes

```bash
npm test
```

## Decisões de arquitetura

As decisões relevantes do projeto ficam registradas em [`docs/adr/`](docs/adr/).