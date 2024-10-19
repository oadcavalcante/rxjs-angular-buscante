import { FormControl } from '@angular/forms';
import { Item, LivrosResultado } from './../../models/interfaces';
import { Component } from '@angular/core';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

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

const DEBOUNCE_TIME_MS = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  campoBusca = new FormControl();
  mensagemErro = '';
  livrosResultado: LivrosResultado;

  constructor(private livroService: LivroService) { }
  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(DEBOUNCE_TIME_MS),
    filter((valorDigitado) => valorDigitado.length >= 3),
    tap(() => console.log('Iniciando busca de livros')),
    switchMap((valorDigitado) => this.livroService.buscar(valorDigitado)),
    map((resultado) => (this.livrosResultado = resultado)),
    tap((retornoAPI) => console.log('Resultados da API:', retornoAPI)),
    map((resultado) => resultado.items ?? []),
    map((items) => this.livrosResultadoParaLivros(items)),
    catchError((erro) => {
      console.log('Erro ao buscar livros:', erro);
      this.mensagemErro = 'Ops, ocorreu um erro. Recarregue a aplicação!';
      return throwError(() => new Error(this.mensagemErro));
    })
  );

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map((item) => {
      return new LivroVolumeInfo(item);
    });
  }
}
