import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit {
  input: string = '';
  tasks: Array<string> = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api
      .get('/tasks')
      .then((res: any) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addTask() {
    this.tasks.push(this.input);
    this.api
      .post('/task', { name: this.input })
      .then((res: any) => {
        this.input = '';
      })
      .catch((err) => {});
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  callback(index: number) {
    return () => {
      this.deleteTask(index);
    };
  }
}
