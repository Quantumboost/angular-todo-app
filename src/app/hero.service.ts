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

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
                    .toPromise()
                    .then(response => response.json().data as Hero[])
                    .catch(this.handleError);
  }
  
  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }
  
  getHeroCounts(): Promise<HeroCounts> {
    return this.getHeroes()
      .then((heroes: Hero[]) => {
        var counts: HeroCounts = {all: 0, active: 0, completed: 0};
        for(var hero: Hero of heroes) {
            ++counts.all;
            if(hero.completed) ++counts.completed;
            else ++counts.active;
        }
        return counts;
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
      .catch(this.handleError);
  }
  
  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  
  clearCompleted(): Promise<void> {
    
    return this.delete();
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}