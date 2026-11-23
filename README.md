# Brasilock

O jornal da Cidade para jogadores brasileiros de Deadlock: builds auditadas, patches em português e o estado do jogo.
Feito com [Astro](https://astro.build): o site sai como HTML estático, quase sem JavaScript.

## Rodar

```
npm install
npm run dev      # http://localhost:4321
npm run build    # gera a pasta dist/
```

## Onde mexer no conteúdo

Não precisa tocar em código. Se algum campo estiver errado, `npm run build` avisa qual.

| O quê | Arquivo |
| --- | --- |
| Manchete, veredito, patch em vigor, último patch grande | `src/data/estado.json` |
| Builds | `src/content/builds/*.md` (um arquivo por build; o nome vira a URL) |
| Patches | `src/content/patches/*.md` (um arquivo por update) |

### Nova build

Copie uma build existente em `src/content/builds/` e edite o topo:

- `status`: `valida` (carimbo AUDITADA), `revisar` (EM REVISÃO) ou `desatualizada` (VENCIDA)
- `tipo` de cada item: `arma`, `vitalidade` ou `espirito` (define a cor)
- `papel`: Carry, Suporte, Tanque, Iniciador ou Assassino
- `codigoBuild` (opcional): o código da build no navegador de builds do jogo
- `exemplo: true` mostra a etiqueta "Exemplo". Tire nas builds reais.

O texto depois do segundo `---` é o plano de jogo, em Markdown.

### Quando sair patch

1. Crie o arquivo em `src/content/patches/`. Em `sobe` e `desce`, liste os heróis que levaram buff e nerf: a coluna "Sobe & Desce" da capa usa o patch mais recente que tiver esses campos.
2. Em `estado.json`, atualize `patchAtual`, `veredito`, `linhaFina`, `atualizadoEm` e suba `edicao`. Se for update grande, troque também `ultimoMajor` (zera a placa "A Cidade está há X dias sem patch grande").
3. Mude para `status: revisar` as builds afetadas.

`humor` em `estado.json` muda a cor da manchete: `estavel` (tinta), `agitado` (âmbar), `caos` (vermelho).

## Publicar no GitHub Pages

O workflow em `.github/workflows/deploy.yml` publica a cada push na `main`.
No repositório, vá em Settings → Pages → Source e escolha **GitHub Actions**.
O caminho base (`usuario.github.io/brasilock/`) é ajustado sozinho.
