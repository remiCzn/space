import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private matSnackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    const form = this.loginForm.value;
    console.log(form);
    this.apiService
      .post('/login', {
        email: form.email,
        password: form.password,
      })
      .subscribe(
        (res) => {
          console.log(res);
          this.matSnackbar.dismiss();
          this.router.navigate(['home']);
        },
        (err) => {
          this.displayError(err.error.message);
        }
      );
  }

  displayError(message: string) {
    this.matSnackbar.open(message, 'Dismiss');
  }
}
