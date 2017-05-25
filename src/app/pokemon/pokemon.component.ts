import { Component, OnInit } from '@angular/core';
import {Pokemonmodel} from '../pokemonmodel';
import {PokedexService} from '../pokedex.service';
import { Pipe, PipeTransform } from '@angular/core';
@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemon: Pokemonmodel[] = [];

   /**
    * A boolean that represents
    * if we are currently loading data.
    */
   isLoading: boolean = false;

   /**
    * This boolean will be set
    * to true if an error occurred.
    */
   error: boolean = false;
  constructor(private pokedexService: PokedexService) { }

  ngOnInit() {
     this.loadMore();
  }
  loadMore() {
    this.isLoading = true;
    this.pokedexService.getPokemon(this.pokemon.length, 9)
         .then(pokemon => {
           pokemon = pokemon.map(p => {
             p.imageLoaded = false;
             return p;
           });
                   /**
            * If loading was successful
            * we append the result to the list.
            */
           this.pokemon = this.pokemon.concat(pokemon);
           this.isLoading = false;
           this.error = false;
         })
         .catch(() => {
           this.error = true;
           this.isLoading = false;
         });
     }
   }
