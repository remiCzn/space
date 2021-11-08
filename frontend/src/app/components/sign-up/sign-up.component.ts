import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface formFields {
  username: string;
  email: string;
  password: string;
  confirmPw: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group(<formFields>{
      username: '',
      email: '',
      password: '',
      confirmPw: '',
    });
  }

  onRegister() {
    const form: formFields = this.registerForm.value;
    if (form.password != form.confirmPw) {
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
        .subscribe((res) => {
          console.log(res);
        });
    }
  }
}
