import { Component, OnInit } from '@angular/core';

import { Task } from './task';
import { TaskService } from './tasks.service';

@Component({
  selector: 'active-tasks',
  templateUrl: './tasklist-active.component.html',
  styleUrls: [ './tasklist.component.css' ]
})
export class ActiveTasksListComponent {
  constructor(private taskService: TaskService) { }

  flipCompletion(task: Task) {
    task.completed = !task.completed;
    this.taskService.update(task);
  }

  delete(task: Task): void {
    this.taskService.delete(task.id);
  }

  onSelect(task: Task): void {
    this.taskService.select(task);
  }
}
