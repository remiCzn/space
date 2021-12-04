import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { Folder } from 'src/model/folder.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}

export enum SortBy {
  DATE,
  NAME,
}

export interface DialogData {
  name: string;
}

@Component({
  selector: 'dialog-create-folder',
  templateUrl: './dialog-create-folder.html',
})
export class DialogCreateFolder implements OnInit {
  folderForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogCreateFolder>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {
    console.log(data);
  }

  ngOnInit(): void {
    this.folderForm = this.fb.group({
      name: new FormControl('', Validators.required),
    });
  }

  onClick() {
    if (this.folderForm.valid && this.folderForm.get('name')?.value != null) {
      this.dialogRef.close(this.folderForm.get('name')?.value);
    }
  }

  onNoClick() {
    this.dialogRef.close(null);
  }
}
