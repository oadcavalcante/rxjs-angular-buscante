import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy {
  listaLivros: [];
  campoBusca: string = '';
  subscription: Subscription;

  constructor(private livroService: LivroService) {}
  buscarLivros() {
    this.subscription = this.livroService.buscar(this.campoBusca).subscribe({
      next: (retornoApi) => console.log(retornoApi),
      error: (erro) => console.error(erro),
      complete: () => console.log('Observable completo!'),
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); //libera recursos e cancela a execução do Observable
  }
}
