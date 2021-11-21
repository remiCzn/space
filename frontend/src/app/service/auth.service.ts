import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService, private router: Router) { }

  redirectToLogin() {
    this.router.navigate(['']);
  }

  authentified() : Promise<boolean> {
    return this.api.get("/authentified").then((res) => {
      if(res.status == 200 && res.body == true) {
        return true;
      }
      this.redirectToLogin();
      return false;
    }).catch((err) => {
      this.redirectToLogin()
      return false;
    });
  }

  login(email: string, password: string) : Promise<any> {
    return this.api
      .post('/login', {
        email: email,
        password: password,
      })
      .then(
        (res) => {
          this.router.navigate(['home','main']);
          return;
        }).catch(
        (err) => {
          return err.error.message;
        }
      );
  }

  logout() {
    this.api.get('/logout');
    this.router.navigate(['']);
  }
}
