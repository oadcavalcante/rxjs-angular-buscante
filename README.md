<div align="center">

<img src="src/assets/imagens/logo.png" width="120" alt="Buscante" />

# Buscante

**App Angular de busca de livros com RxJS e debounce integrado à Google Books API.**

<br />

[![Repositório público](https://img.shields.io/badge/repo-público-2ea44f?style=flat-square&logo=github&logoColor=white)](https://github.com/oadcavalcante/rxjs-angular-buscante)

<br />

[![Angular 14](https://img.shields.io/badge/Angular-DD0031?style=flat-square&logoColor=fff&logo=angular)](https://github.com/oadcavalcante/rxjs-angular-buscante)

[![Karma](https://img.shields.io/badge/Karma-555555?style=flat-square)](https://github.com/oadcavalcante/rxjs-angular-buscante)

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logoColor=fff&logo=typescript)](https://github.com/oadcavalcante/rxjs-angular-buscante) [![RxJS 7](https://img.shields.io/badge/RxJS-B7178C?style=flat-square&logoColor=fff&logo=reactivex)](https://github.com/oadcavalcante/rxjs-angular-buscante) [![Zone.js](https://img.shields.io/badge/Zone_js-555555?style=flat-square)](https://github.com/oadcavalcante/rxjs-angular-buscante) [![Jasmine](https://img.shields.io/badge/Jasmine-555555?style=flat-square)](https://github.com/oadcavalcante/rxjs-angular-buscante)

<br />

[Stack completa ↓](#stack)

<br />

[Documentação](https://github.com/oadcavalcante/rxjs-angular-buscante/blob/main/README.md) · [Deploy](#deploy) · [API](https://www.googleapis.com/books/v1/volumes) · [Issues](https://github.com/oadcavalcante/rxjs-angular-buscante/issues)

</div>

## Features

- ✨ Busca de livros via Google Books API
- 🚀 Operadores RxJS: debounceTime, filter, switchMap, catchError
- ⚡ Busca só dispara com 3 ou mais caracteres
- 🎯 Cancelamento de requisições anteriores com switchMap
- 🔧 Exibição de capas e resultados de livros
- 📦 Tratamento de erros com mensagens ao usuário

## Getting Started

| Ambiente | Comando / Link |
|----------|----------------|
| Primeira vez | `npm start` |
| Documentação | [README](https://github.com/oadcavalcante/rxjs-angular-buscante/blob/main/README.md) |
| Produção | N/A |

## Stack

- **Frontend:** Angular 14
- **Infra / DevOps:** Karma
- **Outros:** TypeScript, RxJS 7, Zone.js, Jasmine

---

![screenshot](https://github.com/oadcavalcante/rxjs-angular-buscante/blob/main/src/assets/imagens/screenshot.png)

## Operadores RXJS utilizados:

* **debounceTime(PAUSA)**: Esse operador faz com que a requisição só seja feita após um atraso (definido em DEBOUNCE_TIME_MS, que é 300 milissegundos). Isso é útil para evitar requisições excessivas enquanto o usuário ainda está digitando.

* **filter((valorDigitado) => valorDigitado.length >= 3)**: Apenas permite que a busca aconteça se o usuário digitou 3 ou mais caracteres. Isso evita requisições desnecessárias.

* **tap(() => console.log('Fluxo inicial'))**: Esse operador é usado para realizar efeitos colaterais, como registrar informações no console. Aqui, ele indica que o fluxo de busca começou.

* **switchMap((valorDigitado) => this.livroService.buscar(valorDigitado))**: Esse operador troca o Observable atual por outro. Aqui, ele chama o método buscar do livroService para fazer a requisição com o valor digitado.

* **map((resultado) => (this.livrosResultado = resultado))**: Esse operador transforma o resultado da busca. Ele armazena o resultado na variável livrosResultado.

* **tap((retornoAPI) => console.log(retornoAPI))**: Mais um tap, que registra o retorno da API no console.

* **map((resultado) => resultado.items ?? [])**: Aqui, ele transforma o resultado para pegar apenas a lista de itens (livros). Se não houver itens, retorna um array vazio.

* **map((items) => this.livrosResultadoParaLivros(items))**: Essa linha transforma os itens em um formato mais utilizável, chamando o método livrosResultadoParaLivros.

* **catchError((erro) => {...})**: Esse operador captura qualquer erro que possa ocorrer durante o fluxo. Ele registra o erro no console e define uma mensagem de erro para ser exibida.
