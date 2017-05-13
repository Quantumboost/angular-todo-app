import { Component } from '@angular/core';

import { HeroService, HeroCounts } from './hero.service';
import { HeroesComponent } from './heroes.component'

@Component({
  selector: 'my-app',
  template: `
    <section>
      <header>
        <h1>{{title}}</h1>
        <form (submit)="add(newTodo.value); newTodo.value=''">
          <input placeholder="What needs to be done?" #newTodo />
        </form>
      </header>
    <router-outlet></router-outlet>
    <footer *ngIf="heroService.counts && heroService.counts.all > 0">
      <span>{{heroService.counts.active||0}} items left</span>
      <nav>
        <a routerLink="/">All</a>
        <a routerLink="/heroes">Active</a>
        <a routerLink="/heroes">Complete</a>
      </nav>
      <button (click)="heroService.clearCompleted()">Clear completed</button>
    </footer>
    </section>
  `,
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  title = 'Todo List';

  constructor(
    private heroService: HeroService) { }

  add(name: string): void {
    name = name.trim();
    if(!name) { return; }
    this.heroService.create(name);
  }

  ngOnInit(): void {
    this.heroService.getHeroes()
    .then(() => this.heroService.getHeroCounts());
  }
}