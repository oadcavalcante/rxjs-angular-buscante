# APP Angular - Buscante - Utilizando RXJS para Busca de Livros

- A aplicação utiliza a API de Livros do Google. Ex: https://www.googleapis.com/books/v1/volumes?q=ddd

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
