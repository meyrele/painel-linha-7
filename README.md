# Universidades em rede pela Economia Solidária: mapa, memória e movimento

Hub do painel de pesquisa da Linha 7 do [SoU_Ciência](https://souciencia.unifesp.br/) (Unifesp). Site estático que reúne e apresenta os produtos do painel: mapa de iniciativas, linha do tempo, estudos temáticos, glossário, panorama e metodologia.

**No ar:** https://meyrele.github.io/painel-linha-7/

## Visualizar localmente

Na pasta do repositório:

```bash
python -m http.server 8000
```

Depois abrir http://localhost:8000/ no navegador. Não há etapa de build: HTML, CSS e JS puros.

## Repositórios relacionados

Dois produtos do painel têm repositório e publicação próprios; esta home apenas aponta para eles (e incorpora o mapa via iframe):

| Produto              | Publicado em                                       |
|----------------------|----------------------------------------------------|
| Mapa de iniciativas  | https://meyrele.github.io/Linha_7/                 |
| Linha do tempo       | https://meyrele.github.io/linha-do-tempo-linha-7/  |

## Estrutura

- `index.html`: home
- `pages/`: páginas internas (a criar)
- `assets/`: CSS, JS e imagens
- `content/`: reservado para o documento-guia do painel, mantido apenas localmente (não versionado)

Convenções do projeto em [CLAUDE.md](CLAUDE.md); pendências em [TODO.md](TODO.md).
