import { Component } from '@angular/core';

import { HeroService, HeroCounts } from './hero.service';
import { HeroesComponent } from './heroes.component'

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <div>
      <label>Hero name:</label> <input #newTodo />
      <button (click)="add(newTodo.value); newTodo.value=''">
        Add
      </button>
    </div>
    <router-outlet></router-outlet>
    <div *ngIf="heroService.counts && heroService.counts.all > 0">
      {{heroService.counts.active||0}} items left
      <nav>
        <a routerLink="/">All</a>
        <a routerLink="/heroes">Active</a>
        <a routerLink="/heroes">Complete</a>
      </nav>
      <button (click)="heroService.clearCompleted()">Clear completed</button>
    </div>
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