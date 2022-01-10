import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoadService } from './load.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  ApiURl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private load: LoadService) {}

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Promise<any> {
    this.load.load();
    return this.http
      .get(`${this.ApiURl}${path}`, {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(catchError(this.formatErrors))
      .toPromise()
      .then((res) => {
        this.load.loaded();
        return res;
      });
  }

  post(path: string, body: Object = {}): Promise<any> {
    this.load.load();
    return this.http
      .post(`${this.ApiURl}${path}`, body, {
        observe: 'response',
        withCredentials: true,
      })
      .toPromise()
      .then((res) => {
        this.load.loaded();
        return res;
      })
      .catch((err) => {
        console.log(err);
        this.load.loaded();
        return err;
      });
  }

  put(path: string, body: Object = {}): Promise<any> {
    this.load.load();
    return this.http
      .put(`${this.ApiURl}${path}`, body, {
        observe: 'response',
        withCredentials: true,
      })
      .toPromise()
      .then((res) => {
        this.load.loaded();
        return res;
      });
  }

  delete(path: string): Promise<any> {
    this.load.load();
    return this.http
      .delete(`${this.ApiURl}${path}`, {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(catchError(this.formatErrors))
      .toPromise()
      .then((res) => {
        return res;
      })
      .finally(() => {
        this.load.loaded();
      });
  }
}
