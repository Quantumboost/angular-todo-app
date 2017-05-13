import { Component, OnInit } from '@angular/core';

import { Task } from './task';
import { TaskService } from './tasks.service';

@Component({
  selector: 'active-tasks',
  templateUrl: './tasklist-active.component.html',
  styleUrls: [ './tasklist.component.css' ]
})
export class ActiveTasksListComponent implements OnInit {
  selectedTask: Task;

  constructor(private taskService: TaskService) { }

  getTasks(): Promise<Task[]> {
    return this.taskService.getTasks();
  }

  flipCompletion(task: Task) {
    task.completed = !task.completed;
    this.taskService.update(task);
  }

  delete(task: Task): void {
    this.taskService.delete(task.id);
  }

  ngOnInit(): void {
    this.getTasks();
  }

  onSelect(task: Task): void {
    this.selectedTask = task;
  }
}
