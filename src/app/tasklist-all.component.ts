import { Component, OnInit } from '@angular/core';

import { Task } from './task';
import { TaskService } from './tasks.service';

@Component({
  selector: 'all-tasks',
  templateUrl: './tasklist-all.component.html',
  styleUrls: [ './tasklist.component.css' ]
})
export class AllTasksListComponent {
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
