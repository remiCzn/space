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
export class HomeComponent implements OnInit {
  date: Date = new Date('1/1/21');

  currentFolder: Folder = {
    name: '',
    date: new Date(),
    id: '',
    parentId: null,
  };

  folders: Array<Folder> = [];

  constructor(public dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.accessNewFolder('home');
  }

  addFolder(name: string): void {
    this.api
      .post('/folder', {
        name: name,
        parentId: this.currentFolder.id,
      })
      .then((res) => {
        this.folders.push({
          name: res.body.name,
          id: res.body.id,
          date: new Date(res.body.updatedAt),
          parentId: res.body.parentId,
        });
      });
  }

  addFolderDialog(): void {
    const dialogRef = this.dialog.open(DialogCreateFolder, {
      width: '250px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((res: string | null) => {
      if (res != null && res.trim() != '') {
        this.addFolder(res);
      }
    });
  }

  displayDate(date: Date) {
    return date.toLocaleString();
  }

  sortBy(prop: SortBy) {
    if (prop == SortBy.DATE) {
      return this.folders.sort((a, b) => {
        return a.date.getTime() - b.date.getTime();
      });
    } else {
      return this.folders;
    }
  }

  accessNewFolder(id: string | null) {
    if (id == null) {
      console.error('Unable to go to null folder');
      return;
    }
    this.currentFolder.id = id;
    this.api.get(`/folder/${id}`).then((res) => {
      this.currentFolder.id = res.body.id;
      this.currentFolder.name = res.body.name;
      this.currentFolder.parentId = res.body.parentId;
      this.folders = [];
      res.body.childrens.forEach((childId: string) => {
        this.api.get(`/folder/${childId}`).then((res) => {
          this.folders.push({
            id: res.body.id,
            name: res.body.name,
            date: new Date(res.body.updatedAt),
            parentId: res.body.parentId,
          });
        });
      });
    });
  }
}

enum SortBy {
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
