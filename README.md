# Guia: Compre Sem Erro

Site estatico para reviews de produtos com links de afiliados, busca, categorias, posts recentes, posts mais visitados e pagina de configuracoes em modo DEV.

## Identidade visual

- **Paleta:** verde petroleo (`#0f766e`), grafite (`#102126`), amarelo destaque (`#f59e0b`), coral (`#e11d48`) e base clara (`#f7faf9`).
- **Tipografia:** stack de sistema com foco em legibilidade e carregamento rapido.
- **Logo:** icone minimalista de etiqueta/check, usado no cabecalho, rodape e favicon.

## Como executar

```bash
npm run dev
```

O site ficara disponivel em `http://localhost:4173`.

## Como validar o build

```bash
npm run build
```

O build gera a pasta `dist/` com os arquivos estaticos e uma copia `404.html` para fallback de rotas em hospedagens como GitHub Pages.

## Modo DEV

A rota `/configuracoes` aparece no menu e fica acessivel automaticamente em `localhost` ou `127.0.0.1`. Em ambiente publicado, use `?dev=1` apenas para demonstracao temporaria.

As categorias adicionadas nessa tela sao salvas no `localStorage` do navegador.

## Estrutura

```text
assets/          Logo, favicon e imagens SVG de produtos
scripts/         Servidor local e build sem dependencias externas
src/app.js       Rotas, componentes e interacoes
src/data/        Posts e categorias de exemplo
src/styles.css   Identidade visual, responsividade e componentes
```
