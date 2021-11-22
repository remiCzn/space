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
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  editMode: boolean = false;
  editUserForm!: FormGroup;

  username: string = '';
  firstname: string = '';
  lastname: string = '';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.retrieveUserData().then(() => {
      this.initForm();
    });
    document.addEventListener('keydown', (e) => {
      if (e.code == 'Enter' && this.editMode) {
        this.save();
      }
    });
  }

  retrieveUserData() {
    return this.api
      .get('/user')
      .then(
        (res: {
          body: {
            message: string;
            username: string;
            firstname: string;
            lastname: string;
          };
        }) => {
          if (res.body.message != 'Success') {
            console.log('Something went wrong');
          }
          this.username = res.body.username;
          this.firstname = res.body.firstname;
          this.lastname = res.body.lastname;

          this.initForm();
        }
      )
      .catch(() => {
        this.snackBar.open('Unable to retrieve user informations', 'Dismiss', {
          duration: 5000,
        });
      });
  }

  initForm() {
    this.editUserForm = this.fb.group({
      Username: new FormControl(this.username, Validators.required),
      firstname: new FormControl(this.firstname),
      lastname: new FormControl(this.lastname),
    });
  }

  save(): void {
    if (!this.editUserForm.valid) {
      this.snackBar.open('Input invalid', 'Dismiss', { duration: 5000 });
      return;
    }
    this.api
      .put('/user', {
        username: this.editUserForm.controls['Username'].value,
        firstname: this.editUserForm.controls['firstname'].value,
        lastname: this.editUserForm.controls['lastname'].value,
      })
      .then((res: { body: { message: string } }) => {
        this.retrieveUserData();
        this.snackBar.open(res.body.message, undefined, { duration: 5000 });
        this.editMode = false;
      })
      .catch((err: { error: { message: string } }) => {
        this.snackBar.open(err.error.message, undefined, { duration: 5000 });
      });
  }

  changeMode(): void {
    this.editMode = !this.editMode;
  }
}
