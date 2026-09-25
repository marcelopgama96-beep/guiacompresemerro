# Guia: Compre Sem Erro

Site estatico para reviews de produtos com links de afiliados, busca, categorias, posts recentes, posts mais visitados e pagina de configuracoes em modo DEV.

## Identidade visual

- **Paleta:** verde petroleo (`#0f766e`), grafite (`#102126`), amarelo destaque (`#f59e0b`), coral (`#e11d48`) e base clara (`#f7faf9`).
- **Tipografia:** stack de sistema com foco em legibilidade e carregamento rapido.
- **Logo:** icone minimalista de etiqueta/check, usado no cabecalho, rodape e favicon.

## Como publicar pelo GitHub Pages

Este projeto nao precisa de `npm`, build, servidor proprio ou dependencias externas. Ele foi feito para ser servido diretamente pelo GitHub Pages.

1. Acesse o repositorio no GitHub.
2. Entre em **Settings**.
3. Abra **Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/root`.
6. Salve.

Depois que o GitHub Pages publicar, o site deve ficar em:

`https://marcelopgama96-beep.github.io/guiacompresemerro/`

O arquivo `404.html` replica a entrada principal para permitir que rotas como `/privacidade`, `/contato`, `/busca` e `/configuracoes` funcionem quando acessadas diretamente no GitHub Pages.

## Como visualizar sem publicar

Abra `index.html` em um navegador moderno ou use a propria URL publicada pelo GitHub Pages. Como o site usa modulos JavaScript, a visualizacao mais fiel sera pelo GitHub Pages.

## Modo DEV

A rota `/configuracoes` aparece no menu e fica acessivel automaticamente em `localhost` ou `127.0.0.1`. Em ambiente publicado, use `?dev=1` apenas para demonstracao temporaria.

As categorias adicionadas nessa tela sao salvas no `localStorage` do navegador.

## Estrutura

```text
assets/          Logo, favicon e imagens SVG de produtos
404.html         Fallback de rotas para GitHub Pages
index.html       Entrada principal do site
src/app.js       Rotas, componentes e interacoes
src/data/        Posts e categorias de exemplo
src/styles.css   Identidade visual, responsividade e componentes
```
