import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {

  input: string = '';
  tasks: Array<string> = [];

  constructor() { }

  ngOnInit(): void {
  }

  addTask() {
    this.tasks.push(this.input);
    this.input = '';
  }

  deleteTask(index : number) {
    this.tasks.splice(index, 1);
  }

  callback(index: number) {
    return () => {
      this.deleteTask(index);
    }
  }

}
