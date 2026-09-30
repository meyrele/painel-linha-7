# TODO — Painel da Linha 7

## Links ainda em "#" (index.html)

Cards de "Explore o painel":
- [ ] Estudos Temáticos
- [ ] Glossário
- [ ] Panorama
- [ ] Metodologia

Rodapé, coluna "Painel" (todos em `#`):
- [ ] Mapa de Iniciativas (sugestão: https://meyrele.github.io/Linha_7/)
- [ ] Linha do Tempo (sugestão: https://meyrele.github.io/linha-do-tempo-linha-7/)
- [ ] Estudos Temáticos
- [ ] Glossário
- [ ] Panorama
- [ ] Metodologia

Rodapé, coluna "Sobre":
- [ ] Linha de Pesquisa 7
- [ ] Equipe
- [ ] E-book 2024

## Páginas de `pages/` ainda inexistentes

- [ ] `pages/estudos-tematicos.html` (textos e vídeo-animações: trabalho reprodutivo e cuidado, soberania alimentar, moradia e território)
- [ ] `pages/glossario.html`
- [ ] `pages/panorama.html`
- [ ] `pages/metodologia.html`
- [ ] Páginas de "Sobre": Linha de Pesquisa 7, Equipe, E-book 2024 (definir se são páginas internas ou links externos)

## Fonte

- [ ] Licença da Aquawax Pro pendente. Quando liberada, decidir como servir a fonte (hoje é proibido versionar; `.gitignore` bloqueia `.woff/.woff2/.otf/.ttf`). O comentário com o `@font-face` previsto está no `<head>` do `index.html`. Até lá: Plus Jakarta Sans + DM Sans via Google Fonts.

## Para a rodada de conteúdo (não alterado nesta etapa)

- [ ] Hero, navbar e demais textos ainda usam o nome de pesquisa; revisar para o título provisório "Universidades em rede pela Economia Solidária: mapa, memória e movimento".
- [ ] Cores dos ciclos no HTML divergem da paleta definida: C1 usa `#c17f3b` (paleta: `#C97C3E`) e C2 usa `#b85c3a` (paleta: `#BD3838`). C3–C5 já batem.
- [ ] Logo no rodapé: o protótipo previa um `.jpg`; o insumo disponível é um SVG com texto preto, que fica pouco legível sobre o fundo escuro do rodapé. Avaliar versão negativa (texto branco) do logo.
- [ ] Texto de fallback da imagem da linha do tempo ainda diz "Coloque APROVADA.jpg na mesma pasta".
- [ ] Legenda de chips abaixo do mapa na home (Federal/Municipal/Estadual/Privada em ocre/verde-água/marrom/oliva) não corresponde às cores do mapa publicado (vermelho/azul/amarelo/preto).
- [ ] Sem favicon: o navegador recebe 404 em `/favicon.ico`. Criar um a partir do símbolo do logo SoU_Ciência.
- [ ] Card "Mapa de Iniciativas" (seção Explorar) aponta para a âncora `#mapa` da própria home; decidir se deve abrir o mapa publicado, como o card da Linha do Tempo.

## Desempenho

- [ ] `assets/img/linha-do-tempo-aprovada.jpg` tem ~11 MB; gerar versão otimizada para web (ex.: largura ~2400 px, JPEG ~80%) mantendo a original fora do site ou em alta resolução apenas no zoom.

## Documento-guia

- [x] Decidido (30/09/2026): `content/documento-guia.*` fica só na cópia local, fora do git, por conter links internos (planilhas, formulário de edição, gravações e transcrições de entrevistas).
- [ ] Se algum trecho do documento-guia for virar conteúdo público (ex.: textos de Metodologia), extrair só esse trecho, sem os links internos.
