import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadService {
  private static loadEmitter: EventEmitter<boolean>;

  constructor() {
    if(!LoadService.loadEmitter) {
      LoadService.loadEmitter = new EventEmitter();
    }
  }

  load() {
    LoadService.loadEmitter.emit(true);
  }

  loaded() {
    LoadService.loadEmitter.emit(false);
  }

  subscribe(callback: (value: boolean) => void) {
    LoadService.loadEmitter.subscribe(callback);
  }


  


}
