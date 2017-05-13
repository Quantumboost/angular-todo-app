import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

export class HeroCounts {
  all:number;
  active:number;
  completed:number;
}

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes'; // URL to web api
  public heroes:Hero[];
  public counts:HeroCounts = {all:0, active:0, completed:0};

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => {
        this.heroes = response.json().data as Hero[];
        this.getHeroCounts();
        return this.heroes;
      })
      .catch(this.handleError);
  }

  getHeroCounts(): HeroCounts {
    this.counts.all = this.counts.active = this.counts.completed = 0;
    
    for(let hero of this.heroes) {
      ++this.counts.all;
      if(hero.completed) ++this.counts.completed;
      else ++this.counts.active;
    }
    return this.counts;
  }

  private headers = new Headers({'Content-Type': 'application/json'});

  update(hero: Hero): Promise<void> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(res => {
        this.getHeroCounts();
      })
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name, completed: false}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Hero)
      .catch(this.handleError)
      .then(hero => {
        this.heroes.push(hero);
        this.getHeroCounts();
        return hero;
      });
  }

  delete(id: number): Promise<void> {
    this.heroes = this.heroes.filter(h => h.id !== id);
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(res => {
        this.getHeroCounts();
      })
      .catch(this.handleError);
  }

  clearCompleted(): Promise<void> {
    var newCounts:HeroCounts = {
        all: this.counts.all-this.counts.completed,
        active: this.counts.active,
        completed: 0
    };

    let ids : number[] = [];
    let deletions = [];
    for(let i in this.heroes) {
      if(this.heroes[i].completed) {
        let id = this.heroes[i].id;
        ids.push(id);
        deletions.push(this.http.delete(`${this.heroesUrl}/${id}`, {headers: this.headers})
          .toPromise());
      }
    }

    return Promise.resolve().then(() => {
      this.counts = newCounts;
      this.heroes = this.heroes.filter(h => !ids.includes(h.id));
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}