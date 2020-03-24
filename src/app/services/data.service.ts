import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  dictionary: any = {};
  constructor() { }

  setData(key, value) {
    this.dictionary[key] = value;
    return {[key]: value}
  }

  getData(key) {
    return Object.assign({}, this.dictionary[key]) || null;
  }

  getAll() {
    return Object.assign({}, this.dictionary);
  }

  deleteData(key) {
    return delete this.dictionary[key];
  }
}
