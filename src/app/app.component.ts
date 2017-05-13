import { Component } from '@angular/core';

import { TaskService, TaskCounts } from './tasks.service';
import { AllTasksListComponent } from './tasklist-all.component'

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
    <footer *ngIf="taskService.counts && taskService.counts.all > 0">
      <span>{{taskService.counts.active||0}} items left</span>
      <nav>
        <a routerLink="/">All</a>
        <a routerLink="/active">Active</a>
        <a routerLink="/completed">Complete</a>
      </nav>
      <button (click)="taskService.clearCompleted()">Clear completed</button>
    </footer>
    </section>
  `,
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  title = 'Todo List';

  constructor(
    private taskService: TaskService) { }

  add(name: string): void {
    name = name.trim();
    if(!name) { return; }
    this.taskService.create(name);
  }

  ngOnInit(): void {
    this.taskService.getTasks();
  }
}
