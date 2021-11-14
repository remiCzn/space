import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  editMode: boolean = false;
  editUserForm!: FormGroup;

  username: string = '';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.api.get('/user').subscribe(
      (res) => {
        if (res.body.message != 'Success') {
          console.log('Something went wrong');
        }
        this.username = res.body.username;

        this.initForm();
      },
      (err) => {
        this.snackBar.open('Unable to retrieve user informations', 'Dismiss', {
          duration: 5000,
        });
      }
    );
  }

  initForm() {
    this.editUserForm = this.fb.group({
      Username: new FormControl(this.username, Validators.required),
    });
  }

  save(): void {
    if (!this.editUserForm.valid) {
      this.snackBar.open('Input invalid', 'Dismiss', { duration: 5000 });
    }
    this.api
      .put('/user', {
        username: this.editUserForm.controls['Username'].value,
      })
      .subscribe(
        (res) => {
          this.snackBar.open(res.body.message, undefined, { duration: 5000 });
        },
        (err) => {
          this.snackBar.open(err.error.message, undefined, { duration: 5000 });
        }
      );
  }

  changeMode(): void {
    this.editMode = !this.editMode;
  }
}
