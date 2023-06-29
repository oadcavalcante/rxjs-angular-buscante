import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LivrosResultado } from '../models/interfaces';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumes';
  constructor(private http: HttpClient) {}

  buscar(valorDigitado: string): Observable<LivrosResultado> {
    const params = new HttpParams().append('q', valorDigitado);
    return this.http
      .get<LivrosResultado>(this.API, { params })
      .pipe(tap((retornoAPI) => console.log('Fluxo do tap():', retornoAPI))); //operador pipe() do rxjs - agrupa outros operadores - é por onde passa o fluxo de informações e onde aplicamos as transformações
    // o tap() não altera nada no fluxo, serve apenas para debugar...
  }
}
