import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../home.component';

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
  ) {}

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
