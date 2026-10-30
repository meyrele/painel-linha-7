# Painel da Linha 7 — SoU_Ciência / Unifesp

## Nome do painel

- **Título provisório (público):** Universidades em rede pela Economia Solidária: mapa, memória e movimentos
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
- **Fonte Aquawax Pro não pode ser versionada** (licença pendente). Nenhum `.woff`, `.woff2`, `.otf` ou `.ttf` entra no repo (já bloqueado no `.gitignore`). Até a licença sair, usar Plus Jakarta Sans (interface) e DM Sans (texto) via Google Fonts, além da Playfair Display (display).
- **`assets/css/base.css` é compartilhado por todas as páginas** (home e `pages/`): reset, tokens de tipografia, navbar e menu mobile, botões, rótulos e títulos de seção, etiqueta "Em construção", `.rule`/`.rows` e rodapé. Estilos só da home vão em `home.css`; só das páginas internas, em `pages.css`. Navbar e rodapé são repetidos em cada HTML: ao mudar um, mudar em todos.
- **Os números da home — 134 iniciativas — são fixos no HTML**; atualizar junto com o mapa (contador do hero em `index.html`).
- **A home copia as cores dos sites publicados do mapa e da linha do tempo, nunca o contrário.** As cores dos ciclos vêm de `ALL_DATA.cycles` da linha do tempo; as dos tipos de instituição, da legenda do mapa. Ficam em `tokens.css` (`--ciclo-*`, `--mapa-*`).
- **Licença exibida: CC BY 4.0, a confirmar com a equipe.**
- A imagem original `linha-do-tempo-aprovada.jpg` (~11 MB) fica só local (`.gitignore`); o site usa a versão `.webp`. **Cuidado ao mesclar em `main` branches antigas**: o merge que tirou o .jpg do git apagou a cópia local; se sumir, restaurar com `git show a6deb38:assets/img/linha-do-tempo-aprovada.jpg > assets/img/linha-do-tempo-aprovada.jpg`.

## Estrutura

```
index.html          home do painel
pages/              o-projeto, estudos-tematicos, glossario, biblioteca, agenda-de-futuros
                    (equipe.html e metodologia.html só redirecionam para o-projeto.html)
assets/css/         tokens.css (variáveis :root) + base.css (compartilhado) + home.css + pages.css
assets/js/          main.js (compartilhado: menu mobile, submenu Sobre, fios e entradas, contadores, pôster da prévia da linha do tempo, barra de âncoras)
assets/img/         logos SoU_Ciência (normal e claro), favicons, imagem da linha do tempo (.webp) e aquarela do hero (aquarela-hero.webp)
content/            documento-guia e Ajustes_linha_7.docx (+ .md convertidos), SÓ LOCAL
```

O conteúdo de `content/` **não é versionado** (`.gitignore`): o documento-guia tem links internos (planilhas, formulário de edição, gravações e transcrições de entrevistas) e o repositório é público. Usar como referência local; não mover para outra pasta versionada nem copiar links internos para páginas do site.

## Arquitetura do conteúdo

- **Subtítulo no plural:** "Mapa, memória e movimentos" (nunca "movimento").
- **Hero em três pesos:** H1 "Universidades em rede pela Economia Solidária" (Playfair 400) → subtítulo "Mapa, memória e movimentos" (Playfair itálico, cada palavra na sua cor de produto; vírgula e "e" em cinza) → linha de apoio (DM Sans 17px). À direita, o bloco "O painel" (três parágrafos enviados pela equipe na rodada de 30/10; DM Sans 14,5px, entrelinha 1,7, até 520px) com links para Quem somos e Metodologia.
- **Títulos das seções da home (texto aprovado pela equipe em 29/10; não alterar sem nova aprovação):**
  - Mapa: "Economia Solidária Feminista Ecológica – mapa de iniciativas nas Universidades"
  - Linha do tempo: "Economia Solidária Feminista Ecológica – linha do tempo nas Universidades, 1993–2025"
  - Travessão curto "–" com espaços entre as partes; no período, sem espaços. Maiúsculas exatamente assim.
- **Cores de produto** (`tokens.css`): `--cor-mapa` (azul, Mapa), `--cor-memoria` (magenta, Linha do tempo), `--cor-movimentos` (verde, Estudos temáticos). Usadas no subtítulo e nos itens correspondentes do menu.
- **Navbar:** logo · nome do painel · Sobre · Mapa · Linha do tempo · Estudos temáticos · Glossário · Biblioteca · Agenda de futuros. "Sobre" é link para `o-projeto.html` (topo) e abre um submenu (Apresentação, Quem somos, Metodologia) ao passar o mouse ou focar pelo teclado; ↓/↑ percorrem os subitens, Esc fecha. Hambúrguer a partir de 1100px, com os subitens sempre visíveis e indentados; entre 1101 e 1399px o nome quebra em duas linhas.
- **Sem viúvas:** títulos com `text-wrap: balance` e textos com `text-wrap: pretty` (`base.css`); fallback em `main.js` para navegadores sem suporte.
- **Caixas sobre fundo areia são brancas** (borda 1px `--areia-borda`, raio 4px).
- **Página "O projeto"** (`pages/o-projeto.html`): reúne o conteúdo institucional em blocos com âncora — `#apresentacao`, `#quem-somos`, `#metodologia`, `#mapa`, `#linha-do-tempo`, `#estudos-tematicos` — e uma barra de botões-âncora fixa sob a navbar. Links para equipe e metodologia apontam para esses blocos.
- **Nomenclatura oficial:** "Quem somos" (não "Equipe") e "Metodologia" (não "Como o painel foi construído").
- **Conteúdo editorial:** vem de `content/ajustes.md`, convertido de `content/Ajustes_linha_7.docx` (`pandoc -t gfm --wrap=none`). Ignorar comentários e linhas de instrução do Word. Os textos do prompt da rodada prevalecem sobre o docx.

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

## Linguagem visual

Editorial, não de template: tipografia, fios horizontais, numeração e a aquarela ao fundo do hero.

- **Tipografia:** Playfair Display 400 (e itálico) para display — H1, H2, números grandes, numeração 01/02/03 e citações. Plus Jakarta Sans para navbar, rótulos, botões e H3. DM Sans para o corpo. Tokens: `--f-display`, `--f-ui`, `--f-body`.
- **Fios e numeração em vez de cards:** listas usam `.rows` (linhas separadas por `.rule`, grade rótulo 120px · título · texto · ação 120px). Nada de cards com borda colorida no topo, ícones em quadrados pastel, badges com bolinha ou sombras.
- **Raio único de 4px** (`--radius`) para botões, iframes e o que tiver canto. Botões não são pílulas.
- **Rótulos de seção:** só texto em caixa-alta (Plus Jakarta 11px, `.14em`), na cor da seção.
- **Cor em texto:** usar os tons `--texto-*` de `tokens.css` (contraste ≥ 4,5:1 sobre branco e areia). As cores puras do SoU ficam para elementos que não são texto. O magenta passa nos dois fundos e é usado direto.
- **Aquarela do hero** (`assets/img/aquarela-hero.webp`) é elemento de identidade: imagem fornecida pela equipe, **não** recortes do pôster da linha do tempo. O original (`watercolor-abstract-rainbow-blend-of-colors-on-pap-2026-09-25-08-18-26-utc.jpg`, na raiz) fica fora do git. Tratamento: Adobe RGB convertido para sRGB, 1800px, WebP 80, bordas esquerda e inferior esmaecidas no canal alfa (a imagem cobre o papel inteiro, então não há fundo branco a remover); cores não alteradas. No hero: fundo ancorado no alto à direita, 62% da largura (75% em 1024px; faixa de 240px no topo em 720px), opacidade 0,55. Qualquer mudança de posição ou opacidade exige medir de novo o contraste do texto sobre ela (≥ 4,5:1).

### Movimento

- Durações: 200–400 ms para interação, até 700 ms para entrada.
- Easing: `cubic-bezier(.2,.8,.2,1)` (`--ease-entrada`) para entradas; `ease-out` para hovers.
- Animar só `transform` e `opacity` (os fios animam `transform: scaleX`).
- Sem parallax e sem elementos flutuando; o único loop é a deriva lenta da aquarela do hero (até 10px e 1°, ciclo de 24 s).
- Hover com movimento só em `@media (hover: hover) and (pointer: fine)`.
- Tudo desligado com `prefers-reduced-motion: reduce`.
- Ferramenta: a skill **emilkowalski/skill** (`animate` para construir, `review-animations` para revisar, `find-animation-opportunities` para procurar). Fica instalada em `.claude/skills/` (fora do git); o `skills-lock.json` é versionado; para reinstalar: `npx skills experimental_install`.

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
