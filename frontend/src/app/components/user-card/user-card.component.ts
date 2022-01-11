import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { FileUploadService } from 'src/app/service/file-upload.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  editMode: boolean = false;
  editUserForm!: FormGroup;

  username: string = '';

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private uploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.retrieveUserData().then(() => {
      this.initForm();
    });
    this.fileInfos = this.uploadService.getFiles();
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
          };
        }) => {
          if (res.body.message != 'Success') {
          }
          this.username = res.body.username;

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

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        console.log(file);
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file.';
            }

            this.currentFile = undefined;
          },
        });
      }
    }
  }
}
