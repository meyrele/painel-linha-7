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
- **Fonte Aquawax Pro não pode ser versionada** (licença pendente). Nenhum `.woff`, `.woff2`, `.otf` ou `.ttf` entra no repo (já bloqueado no `.gitignore`). Até a licença sair, usar Plus Jakarta Sans (interface) e DM Sans (texto) via Google Fonts, além da Playfair Display (display).
- **`assets/css/base.css` é compartilhado por todas as páginas** (home e `pages/`): reset, tokens de tipografia, navbar e menu mobile, botões, rótulos e títulos de seção, etiqueta "Em construção", `.rule`/`.rows` e rodapé. Estilos só da home vão em `home.css`; só das páginas internas, em `pages.css`. Navbar e rodapé são repetidos em cada HTML: ao mudar um, mudar em todos.
- **Os números da home — 134 iniciativas — são fixos no HTML**; atualizar junto com o mapa (hero e título da seção Mapa em `index.html`).
- **A home copia as cores dos sites publicados do mapa e da linha do tempo, nunca o contrário.** As cores dos ciclos vêm de `ALL_DATA.cycles` da linha do tempo; as dos tipos de instituição, da legenda do mapa. Ficam em `tokens.css` (`--ciclo-*`, `--mapa-*`).
- **Licença exibida: CC BY 4.0, a confirmar com a equipe.**
- A imagem original `linha-do-tempo-aprovada.jpg` (~11 MB) fica só local (`.gitignore`); o site usa a versão `.webp`. Ela também é a fonte das manchas de aquarela. **Cuidado ao mesclar em `main` branches antigas**: o merge que tirou o .jpg do git apagou a cópia local; se sumir, restaurar com `git show a6deb38:assets/img/linha-do-tempo-aprovada.jpg > assets/img/linha-do-tempo-aprovada.jpg`.

## Estrutura

```
index.html          home do painel
pages/              estudos-tematicos, glossario, biblioteca, agenda-de-futuros, equipe, metodologia
assets/css/         tokens.css (variáveis :root) + base.css (compartilhado) + home.css + pages.css
assets/js/          main.js (compartilhado: menu mobile, fios e entradas, contadores, pôster da prévia da linha do tempo)
assets/img/         logos SoU_Ciência (normal e claro), favicons, imagem da linha do tempo (.webp) e manchas de aquarela (mancha-1..3.webp)
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

## Linguagem visual

Editorial, não de template: tipografia, fios horizontais, numeração e as manchas de aquarela da linha do tempo.

- **Tipografia:** Playfair Display 400 (e itálico) para display — H1, H2, números grandes, numeração 01/02/03 e citações. Plus Jakarta Sans para navbar, rótulos, botões e H3. DM Sans para o corpo. Tokens: `--f-display`, `--f-ui`, `--f-body`.
- **Fios e numeração em vez de cards:** listas usam `.rows` (linhas separadas por `.rule`, grade rótulo 120px · título · texto · ação 120px). Nada de cards com borda colorida no topo, ícones em quadrados pastel, badges com bolinha ou sombras.
- **Raio único de 4px** (`--radius`) para botões, iframes e o que tiver canto. Botões não são pílulas.
- **Rótulos de seção:** só texto em caixa-alta (Plus Jakarta 11px, `.14em`), na cor da seção.
- **Cor em texto:** usar os tons `--texto-*` de `tokens.css` (contraste ≥ 4,5:1 sobre branco e areia). As cores puras do SoU ficam para elementos que não são texto. O magenta passa nos dois fundos e é usado direto.
- **Manchas de aquarela** (`assets/img/mancha-1..3.webp`, ciclos 1, 2 e 3 do pôster) são elemento de identidade: fundo do hero, opacidade 0,35–0,5, nunca sobre texto. Recortadas do .jpg original; o pigmento foi aprofundado para que, a ~0,45 de opacidade, tenham o tom do pôster.

### Movimento

- Durações: 200–400 ms para interação, até 700 ms para entrada.
- Easing: `cubic-bezier(.2,.8,.2,1)` (`--ease-entrada`) para entradas; `ease-out` para hovers.
- Animar só `transform` e `opacity` (os fios animam `transform: scaleX`).
- Sem parallax e sem elementos flutuando; o único loop é a deriva lenta das manchas.
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
