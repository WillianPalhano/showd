import { Component, inject, signal } from '@angular/core';
import { TmdbService } from '../tmdb/tmdb.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  tmbdService = inject(TmdbService);
  env = environment;
  valueSearch = signal('');
  readonly estavel = toSignal(
  toObservable(this.valueSearch).pipe(
    debounceTime(500),          // espera 300 ms de silêncio
    distinctUntilChanged(),     // ignora se o valor final for igual ao anterior
  ),
  { initialValue: '' },
);
  resultado = this.tmbdService.searchTv(this.estavel)
}
