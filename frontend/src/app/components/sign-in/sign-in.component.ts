import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth.service';
import { LoadService } from 'src/app/service/load.service';

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
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private matSnackbar: MatSnackBar,
    private load: LoadService
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
    this.load.load();
    const form = this.loginForm.value;
    console.log(form);
    this.auth.login(form.email, form.password).then((res) => {
      if(res == "" || res == null) {
        this.matSnackbar.dismiss();
        this.load.loaded();
        return;
      }
      this.displayError(res);
      this.load.loaded();
    });
  }

  displayError(message: string) {
    this.matSnackbar.open(message, 'Dismiss');
  }
}
