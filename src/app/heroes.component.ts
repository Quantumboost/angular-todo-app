import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: [ './heroes.component.css' ]
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;

  constructor(
    private heroService: HeroService) { }

  getHeroes(): void {
    this.heroService.getHeroes();
  }
  
  complete(hero: Hero): void {
    this.heroService.flipCompletion(hero.id);
  }

  delete(hero: Hero): void {
    this.heroService.delete(hero.id);
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
