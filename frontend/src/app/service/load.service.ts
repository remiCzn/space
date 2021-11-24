import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadService {
  public static loading: boolean = false;

  load(): void {
    LoadService.loading = true;
  }

  loaded(): void {
    LoadService.loading = false;
  }
}
