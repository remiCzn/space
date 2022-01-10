import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit {
  input: string = '';
  tasks: Array<{
    title: string;
    id: number;
  }> = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api
      .get('/tasks')
      .then((res: any) => {
        this.tasks = res.body.list;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addTask() {
    this.api
      .post('/task', { name: this.input })
      .then((res: any) => {
        this.input = '';
        this.tasks = res.body;
      })
      .catch((err) => {});
  }

  deleteTask(index: number) {
    this.api.delete(`/task/${this.tasks[index].id}`).then((res) => {
      console.log(res);
      this.tasks.splice(index, 1);
    });
  }

  callback(index: number) {
    return () => {
      this.deleteTask(index);
    };
  }
}
