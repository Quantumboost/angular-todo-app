import { Component } from '@angular/core';

import { HeroService } from './hero.service';
import { HeroesComponent } from './heroes.component'

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <router-outlet></router-outlet>
    <div *ngIf="counts && counts.all > 0">
      {{todoCount}} items left
      <nav>
        <a routerLink="/heroes">All</a>
        <a routerLink="/heroes">Active</a>
        <a routerLink="/heroes">Complete</a>
      </nav>
      <button (click)="clearCompleted()">Clear completed</button>
    </div>
  `,
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  title = 'Tour of Heroes';

  constructor(
    private heroService: HeroService) { }

  getHeroCounts(): Promise<void> {
    return this.heroService.getHeroCounts()
      .then(counts => this.counts = counts)
      .then(() => {
        this.todoCount = this.counts.active;
      });
  }
  
  clearCompleted(): Promise<void> {
    return this.heroService.clearCompleted()
    .then(this.getHeroCounts);
  }

  ngOnInit(): void {
    this.getHeroCounts();
  }
}