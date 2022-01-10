import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-do-element',
  templateUrl: './to-do-element.component.html',
  styleUrls: ['./to-do-element.component.scss'],
})
export class ToDoElementComponent implements OnInit {
  @Input() value: { title: string; id: number } = { title: '', id: -1 };
  @Input() deleteThis: () => void = () => {};

  constructor() {}

  ngOnInit(): void {}

  onClick(): void {
    this.deleteThis();
  }
}
