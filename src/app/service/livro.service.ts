import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item, LivrosResultado } from '../models/interfaces';
import { tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumes';
  constructor(private http: HttpClient) {}

  buscar(valorDigitado: string): Observable<Item[]> {
    const params = new HttpParams().append('q', valorDigitado);
    return this.http.get<LivrosResultado>(this.API, { params }).pipe(
      tap((retornoAPI) => console.log('Fluxo do 1° tap():', retornoAPI)),
      map((resultado) => resultado.items),
      tap((retorno) => console.log('Fluxo após o map(): ', retorno))
    );
    // o operador pipe() do rxjs - agrupa outros operadores - é por onde passa o fluxo de informações e onde aplicamos as transformações
    // o tap() não altera nada no fluxo, serve apenas para debugar...
    // o operador map() transforma os dados recebidos, retornando apenas o que queremos...
  }
}
