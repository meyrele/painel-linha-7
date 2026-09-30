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
- **`assets/css/base.css` é compartilhado por todas as páginas** (home e `pages/`): reset, tokens de tipografia, navbar e menu mobile, botões, cabeçalhos de seção, etiqueta "Em construção", rodapé e `.reveal`. Estilos só da home vão em `home.css`; só das páginas internas, em `pages.css`. Navbar e rodapé são repetidos em cada HTML: ao mudar um, mudar em todos.
- **Os números da home — 134 iniciativas — são fixos no HTML**; atualizar junto com o mapa (hero e título da seção Mapa em `index.html`).
- **A home copia as cores dos sites publicados do mapa e da linha do tempo, nunca o contrário.** As cores dos ciclos vêm de `ALL_DATA.cycles` da linha do tempo; as dos tipos de instituição, da legenda do mapa. Ficam em `tokens.css` (`--ciclo-*`, `--mapa-*`).
- **Licença exibida: CC BY 4.0, a confirmar com a equipe.**
- A imagem original `linha-do-tempo-aprovada.jpg` (~11 MB) fica só local (`.gitignore`); o site usa a versão `.webp`.

## Estrutura

```
index.html          home do painel
pages/              estudos-tematicos, glossario, biblioteca, agenda-de-futuros, equipe, metodologia
assets/css/         tokens.css (variáveis :root) + base.css (compartilhado) + home.css + pages.css
assets/js/          main.js (compartilhado: menu mobile, animações, pôster da prévia da linha do tempo)
assets/img/         logos SoU_Ciência (normal e claro), favicons e imagem da linha do tempo (.webp)
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
