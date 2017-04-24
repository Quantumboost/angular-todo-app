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
                      return this.heroes;
                    })
                    .catch(this.handleError);
  }

  getHeroCounts(): Promise<HeroCounts> {
    return this.getHeroes()
      .then((heroes: Hero[]) => {
        this.counts = {all: 0, active: 0, completed: 0};
        for(let hero of this.heroes) {
            ++this.counts.all;
            if(hero.completed) ++this.counts.completed;
            else ++this.counts.active;
        }
        return this.counts;
      });
  }

  private headers = new Headers({'Content-Type': 'application/json'});

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name, complete: false}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Hero)
      .catch(this.handleError)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
        this.getHeroCounts();
      });
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => {
        var wasCompleted = this.heroes.filter(h => h.id == id)[0].completed;
        this.heroes = this.heroes.filter(h => h.id !== id);
        if(wasCompleted) --this.counts.completed;
        else --this.counts.active;
        --this.counts.all;
      })
      .catch(this.handleError);
  }

  clearCompleted(): Promise<void> {
    var newCounts = this.counts;
    newCounts.all = newCounts.all-newCounts.completed;
    newCounts.completed = 0;

    let ids = [];
    let deletions = [];
    for(let i:number in this.heroes) {
        if(this.heroes[i].complete) {
            ids.push(this.heroes[i].id);
            deletions.push(this.delete(this.heroes[i].id));
        }
    }

    return Promise.resolve().then(() => this.counts = newCounts);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}