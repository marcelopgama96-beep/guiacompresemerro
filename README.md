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

## Como gerenciar posts

Os cards dos posts ficam em `src/data/posts.js`. Posts completos podem ficar em arquivos Markdown dentro da pasta `posts/`.

Para criar um review completo:

1. Adicione um arquivo em `posts/`, por exemplo `posts/nome-do-produto.md`.
2. Cadastre o resumo em `src/data/posts.js`.
3. No cadastro, preencha `contentPath` apontando para o Markdown, por exemplo `"posts/nome-do-produto.md"`.
4. Use o link de afiliado em `affiliateUrl`.
5. Cadastre imagens em `gallery` dentro de `src/data/posts.js` para elas aparecerem nos cards, carrossel e página do post.

Evite seções de bastidor como "Observação editorial" ou "Imagens de referência encontradas". O texto do post deve soar como review publicado pelo próprio Guia, com linguagem direta para o leitor.

O site cria a rota automaticamente no formato:

`/post/id-do-post`

## Modo DEV

A rota `/configuracoes` aparece no menu e fica acessivel automaticamente em `localhost` ou `127.0.0.1`. Em ambiente publicado, use `?dev=1` apenas para demonstracao temporaria.

As categorias adicionadas nessa tela sao salvas no `localStorage` do navegador.

## Estrutura

```text
assets/          Logo, favicon e imagens SVG de produtos
404.html         Fallback de rotas para GitHub Pages
index.html       Entrada principal do site
posts/           Reviews completos em Markdown
src/app.js       Rotas, componentes e interacoes
src/data/        Posts e categorias de exemplo
src/styles.css   Identidade visual, responsividade e componentes
```
