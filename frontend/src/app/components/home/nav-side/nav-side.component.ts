import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { Folder } from 'src/model/folder.model';
import { SortBy } from '../home.component';
import { DialogCreateFolder } from './dialog-create-folder';

@Component({
  selector: 'app-nav-side',
  templateUrl: './nav-side.component.html',
  styleUrls: ['./nav-side.component.scss'],
})
export class NavSideComponent implements OnInit {
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
        return b.date.getTime() - a.date.getTime();
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

  delete(folder: Folder) {
    this.api.delete('/folder/' + folder.id).then((res) => {
      //refresh
      this.accessNewFolder(this.currentFolder.id);
    });
  }
}
