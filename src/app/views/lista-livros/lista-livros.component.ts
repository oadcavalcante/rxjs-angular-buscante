import { FormControl } from '@angular/forms';
import { Item, LivrosResultado } from './../../models/interfaces';
import { Component } from '@angular/core';
import { Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

//importações do RXJS
import {
  EMPTY,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

const PAUSA = 300;
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  campoBusca = new FormControl();
  mensagemErro = '';
  livrosResultado: LivrosResultado;

  constructor(private livroService: LivroService) {}
  // totalLivros$ = this.campoBusca.valueChanges.pipe(
  //   debounceTime(PAUSA),
  //   filter((valorDigitado) => valorDigitado.length >= 3),
  //   tap(() => console.log('Fluxo inicial')),
  //   switchMap((valorDigitado) => this.livroService.buscar(valorDigitado)),
  //   map((resultado) => {
  //     this.livrosResultado = resultado;
  //   }),
  //   catchError((erro) => {
  //     console.log(erro);
  //     return of(); // o of() emite um valor e completa o Observable
  //   })
  // );

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA), //debounceTime() serve para criar um delay, a requisição só será feita após esse delay (PAUSA = 300 milisegundos)
    filter((valorDigitado) => valorDigitado.length >= 3), //filter é utilizado para filtrar a busca, nesse caso só será feita a requisição ao servidor a partir de 3 caracteres digitados.
    tap(() => console.log('Fluxo inicial')),
    switchMap((valorDigitado) => this.livroService.buscar(valorDigitado)),
    map((resultado) => (this.livrosResultado = resultado)),
    tap((retornoAPI) => console.log(retornoAPI)),
    map((resultado) => resultado.items ?? []),
    map((items) => this.livrosResultadoParaLivros(items)),
    catchError((erro) => {
      // o catchError captura um erro se houver
      // this.mensagemErro = 'Ops, ocorreu um erro. Recarregue a aplicação';
      // return EMPTY;
      // this.mensagemErro ='Ops, ocorreu um erro. Recarregue a aplicação!'
      // return EMPTY
      console.log(erro);
      return throwError(
        () =>
          new Error(
            (this.mensagemErro =
              'Ops, ocorreu um erro. Recarregue a aplicação!')
          )
      );
    })
  );

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map((item) => {
      return new LivroVolumeInfo(item);
    });
  }
}
