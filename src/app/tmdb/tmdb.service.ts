import { httpResource } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { TmdbSearchResponse } from './tmdb.models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {

  searchTv(query: Signal<string>) {
    return httpResource<TmdbSearchResponse>(() => {
      const pesquisa = query();
      if (!pesquisa) return undefined;
      return {
        url: environment.tmdbApiUrl + "/search/tv",
        params: { query: pesquisa, language: 'pt-BR' },
        headers: { Authorization: 'Bearer ' + environment.tmdbToken},
      };
    });
  }
}
