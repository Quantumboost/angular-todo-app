import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let tasks = [
      {id: 11, name: 'Mr. Nice', completed: false},
      {id: 12, name: 'Narco', completed: false},
      {id: 13, name: 'Bombasto', completed: false},
      {id: 14, name: 'Celeritas', completed: false},
      {id: 15, name: 'Magneta', completed: false},
      {id: 16, name: 'RubberMan', completed: false},
      {id: 17, name: 'Dynama', completed: false},
      {id: 18, name: 'Dr IQ', completed: false},
      {id: 19, name: 'Magma', completed: false},
      {id: 20, name: 'Tornado', completed: false}
    ];
    return {tasks};
  }
}
