import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Task } from './task';

export class TaskCounts {
  all:number;
  active:number;
  completed:number;
}

@Injectable()
export class TaskService {
  private tasksUrl = 'api/tasks'; // URL to web api
  selectedTask:number = -1;
  public tasks:Task[];
  public active_tasks:Task[];
  public completed_tasks:Task[];
  public counts:TaskCounts = {all:0, active:0, completed:0};

  constructor(private http: Http) { }

  getTasks(): Promise<Task[]> {
    return this.http.get(this.tasksUrl)
      .toPromise()
      .then(response => {
        this.tasks = response.json().data as Task[];
        this.active_tasks = this.tasks.filter((t:Task) => !t.completed);
        this.completed_tasks = this.tasks.filter((t:Task) => t.completed);
        this.getTaskCounts();
        return this.tasks;
      })
      .catch(this.handleError);
  }

  getTaskCounts(): TaskCounts {
    this.counts.all = this.counts.active = this.counts.completed = 0;

    for(let task of this.tasks) {
      ++this.counts.all;
      if(task.completed) ++this.counts.completed;
      else ++this.counts.active;
    }
    return this.counts;
  }

  private headers = new Headers({'Content-Type': 'application/json'});

  select(task: Task): void {
    this.selectedTask = task.id;
  }

  update(task: Task): Promise<void> {
    const url = `${this.tasksUrl}/${task.id}`;
    return this.http
      .put(url, JSON.stringify(task), {headers: this.headers})
      .toPromise()
      .then(res => {
        this.active_tasks = this.tasks.filter((t:Task) => !t.completed);
        this.completed_tasks = this.tasks.filter((t:Task) => t.completed);
        this.getTaskCounts();
      })
      .catch(this.handleError);
  }

  create(name: string): Promise<Task> {
    return this.http
      .post(this.tasksUrl, JSON.stringify({name: name, completed: false}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Task)
      .catch(this.handleError)
      .then(task => {
        this.tasks.push(task);
        this.active_tasks = this.tasks.filter((t:Task) => !t.completed);
        this.completed_tasks = this.tasks.filter((t:Task) => t.completed);
        this.getTaskCounts();
        return task;
      });
  }

  delete(id: number): Promise<void> {
    this.tasks = this.tasks.filter((t:Task) => t.id !== id);
    const url = `${this.tasksUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(res => {
        this.active_tasks = this.tasks.filter((t:Task) => !t.completed);
        this.completed_tasks = this.tasks.filter((t:Task) => t.completed);
        this.getTaskCounts();
      })
      .catch(this.handleError);
  }

  clearCompleted(): Promise<void> {
    let ids : number[] = [];
    let deletions = [];
    for(let i in this.tasks) {
      if(this.tasks[i].completed) {
        let id = this.tasks[i].id;
        ids.push(id);
        deletions.push(this.http.delete(`${this.tasksUrl}/${id}`, {headers: this.headers})
          .toPromise());
      }
    }

    return Promise.resolve().then(() => {
      this.tasks = this.tasks.filter((t:Task) => !ids.includes(t.id));
      this.active_tasks = this.tasks.filter((t:Task) => !t.completed);
      this.completed_tasks = this.tasks.filter((t:Task) => t.completed);
      this.getTaskCounts();
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
