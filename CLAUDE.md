# Painel da Linha 7 — SoU_Ciência / Unifesp

## Nome do painel

- **Título provisório (público):** Universidades em rede pela Economia Solidária: mapa, memória e movimento
- **Nome de pesquisa:** Universidades e movimentos sociais por uma Economia Solidária Feminista Ecológica: construindo agendas de futuros

## Propósito deste repositório

Site estático que funciona como **hub** do painel de pesquisa da Linha 7 do SoU_Ciência (Unifesp). A home reúne e aponta para os produtos do painel. Dois produtos vivem em repositórios próprios e **não** fazem parte deste repo:

- Mapa de iniciativas: https://meyrele.github.io/Linha_7/
- Linha do tempo: https://meyrele.github.io/linha-do-tempo-linha-7/

Publicado em: https://meyrele.github.io/painel-linha-7/

## Regras de engenharia

- **Sem build.** HTML/CSS/JS puros. Nada de bundler, framework ou gerenciador de pacotes.
- **Deploy = branch `main`, pasta raiz**, via GitHub Pages. O que está na `main` está no ar.
- **Caminhos sempre relativos** (`assets/...`, `pages/...`), nunca começando com `/`: o site vive no subdiretório `/painel-linha-7/` do domínio, e um caminho absoluto quebra no ar.
- **Fonte Aquawax Pro não pode ser versionada** (licença pendente). Nenhum `.woff`, `.woff2`, `.otf` ou `.ttf` entra no repo (já bloqueado no `.gitignore`). Até a licença sair, usar Plus Jakarta Sans (títulos) e DM Sans (texto) via Google Fonts.

## Estrutura

```
index.html          home do painel
pages/              páginas internas (Estudos Temáticos, Glossário, Panorama, Metodologia…)
assets/css/         tokens.css (variáveis :root) + home.css (estilos da home)
assets/js/          main.js (zoom da linha do tempo, animações de entrada)
assets/img/         logo SoU_Ciência e imagem da linha do tempo aprovada
content/            documento-guia (.docx original + .md convertido + media/), SÓ LOCAL
```

O conteúdo de `content/` **não é versionado** (`.gitignore`): o documento-guia tem links internos (planilhas, formulário de edição, gravações e transcrições de entrevistas) e o repositório é público. Usar como referência local; não mover para outra pasta versionada nem copiar links internos para páginas do site.

## Paleta

SoU_Ciência (variáveis em `assets/css/tokens.css`):

| Nome     | Hex       |
|----------|-----------|
| verde    | `#00a086` |
| magenta  | `#c4245a` |
| azul     | `#1e7ec8` |
| laranja  | `#e85d1a` |

Cores dos ciclos históricos:

| Ciclo | Hex       |
|-------|-----------|
| C1    | `#C97C3E` |
| C2    | `#BD3838` |
| C3    | `#7CA9A0` |
| C4    | `#7E4E34` |
| C5    | `#A7B74C` |

## Disciplina de git

- Um commit por mudança lógica.
- Mensagens de commit em português.
- Rodadas de conteúdo em branches `rodada-[data]` (ex.: `rodada-2026-10-15`), mescladas na `main` quando aprovadas.

## Preview local

```bash
python -m http.server 8000
```

Abrir http://localhost:8000/

## Como trabalhar com a pessoa responsável

- A pessoa **não usa terminal**: todo comando (git, servidor local, conversões) é executado pelo Claude.
- **Sempre pedir confirmação antes de qualquer decisão de design** (cores, tipografia, layout, textos, hierarquia visual).
