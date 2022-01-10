import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { ChildFolder, Folder } from 'src/model/folder.model';
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
    id: 0,
    parentId: null,
  };

  folders: Array<ChildFolder> = [];

  constructor(public dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.accessNewFolder(null);
  }

  addFolder(name: string): void {
    this.api
      .post('/folder', {
        name: name,
        parentId: this.currentFolder.id,
      })
      .then((res) => {
        this.accessNewFolder(res.body.id);
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
        return a.id - b.id;
      });
    } else {
      return this.folders;
    }
  }

  accessNewFolder(id: number | null) {
    if (id == null) {
      this.api.get(`/folder/home`).then((res) => {
        this.currentFolder.id = res.body.id;
        this.currentFolder.name = res.body.name;
        this.currentFolder.parentId = res.body.parentId;
        this.folders = res.body.childrens;
      });
    } else {
      this.currentFolder.id = id;
      this.api.get(`/folder/${id}`).then((res) => {
        this.currentFolder.id = res.body.id;
        this.currentFolder.name = res.body.name;
        this.currentFolder.parentId = res.body.parentId;
        this.folders = res.body.childrens;
      });
    }
  }

  delete(folder: ChildFolder) {
    this.api
      .delete('/folder/' + folder.id)
      .then((res) => {
        this.accessNewFolder(res.body.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
