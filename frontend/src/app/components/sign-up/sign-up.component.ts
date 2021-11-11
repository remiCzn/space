import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private http: HttpClient
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
    console.log(form);
    if (!this.registerForm.valid) {
      return;
    } else {
      this.http
        .post<any>(
          'http://localhost:3000/api/register',
          {
            username: form.username,
            email: form.email,
            password: form.password,
          },
          { observe: 'response' }
        )
        .subscribe(
          (res) => {
            console.log(res.status);
          },
          (err) => {
            this.displayError(err.error.message);
          }
        );
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
