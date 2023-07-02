import { FormControl } from '@angular/forms';
import { Item } from './../../models/interfaces';
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

  constructor(private livroService: LivroService) {}
  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA), //debounceTime() serve para criar um delay, a requisição só será feita após esse delay (PAUSA = 300 milisegundos)
    filter((valorDigitado) => valorDigitado.length >= 3), //filter é utilizado para filtrar a busca, nesse caso só será feita a requisição ao servidor a partir de 3 caracteres digitados.
    tap(() => console.log('Fluxo inicial')),
    switchMap((valorDigitado) => this.livroService.buscar(valorDigitado)),
    tap((retornoAPI) => console.log(retornoAPI)),
    map((items) => {
      return this.livrosResultadoParaLivros(items);
    }),
    catchError(() => {
      // o catchError captura um erro se houver
      this.mensagemErro = 'Ops, ocorreu um erro. Recarregue a aplicação';
      return EMPTY;
    })
  );

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map((item) => {
      return new LivroVolumeInfo(item);
    });
  }
}
