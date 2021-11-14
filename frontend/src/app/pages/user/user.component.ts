import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  editMode: boolean = false;
  editUserForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.editUserForm = this.fb.group({
      Username: new FormControl('Username', Validators.required),
    });
  }

  save(): void {
    console.log('test');
  }

  changeMode(): void {
    this.editMode = !this.editMode;
  }
}
