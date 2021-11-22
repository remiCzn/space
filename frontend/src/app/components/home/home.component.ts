import { Component, OnInit } from '@angular/core';
import { Folder } from 'src/model/folder.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  date: Date = new Date('1/1/21');

  folders: Array<Folder> = [{ name: 'Example', date: new Date(Date.now()) }];

  constructor() {}

  ngOnInit(): void {}

  addFolder(folder: Folder): void {
    this.folders.push(folder);
  }

  addExFolder() {
    this.addFolder({ name: 'Example', date: new Date(Date.now()) });
  }
}
