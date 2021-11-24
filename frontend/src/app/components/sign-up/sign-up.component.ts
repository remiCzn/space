import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

const PASSWORD_REGEX: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,48}$/;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private matSnackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(PASSWORD_REGEX),
      ]),
      confirmPw: new FormControl('', [Validators.required]),
    });
  }

  onRegister() {
    const form = this.registerForm.value;
    if (!this.registerForm.valid) {
      return;
    } else {
      this.api
        .post('/register', {
          username: form.username,
          email: form.email,
          password: form.password,
        })
        .then((regRes) => {
          if (regRes.status === 200) {
            this.api
              .post('/login', {
                email: form.email,
                password: form.password,
              })
              .then((logRes) => {
                this.matSnackbar.dismiss();
                this.router.navigate(['home']);
              })
              .catch((err) => {
                this.displayError(err.error.message);
              });
          }
        })
        .catch((err) => {
          this.displayError(err.error.message);
        });
    }
  }

  displayError(message: string) {
    this.matSnackbar.open(message, 'Dismiss');
  }

  onPasswordChange() {
    if (
      this.registerForm.controls['password'].value ===
      this.registerForm.controls['confirmPw'].value
    ) {
      this.registerForm.controls['confirmPw'].setErrors(null);
    } else {
      this.registerForm.controls['confirmPw'].setErrors({ mismatch: true });
    }
  }
}
