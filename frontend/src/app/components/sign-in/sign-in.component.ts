import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/service/api.service';

export interface LoginResponse {
  token: string;
  expires: Date;
  cookieName: string;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {}

  login() {
    console.log('Bonjour');
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.apiService
      .post('/login', {
        userInfo: {
          username: 'rems',
          password: 1234,
        },
      })
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['home']);
      });
  }
}
