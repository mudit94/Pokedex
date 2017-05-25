import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

@Injectable()
export class PokedexService {
baseUrl='https://pokeapi.co/api/v2/pokemon/';
baseSpriteUrl='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(private http:Http) { }
  getPokemon(offset: number, limit: number) {
     return this.http.get(`${this.baseUrl}?offset=${offset}&limit=${limit}`).toPromise()
      .then(response => response.json().results)
      .then(items => items.map((item, idx) => {
        /**
         * Massage the data a bit to
         * create objects with the correct
         * structure.
         */
        const id: number = idx + offset + 1;

        return {
          name: item.name,
          sprite: `${this.baseSpriteUrl}${id}.png`,
          id
        };
      }));
  }
};
