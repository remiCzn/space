import { Component, OnInit } from '@angular/core';
import { LoadService } from './service/load.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  isLoading = false;

  constructor(private load: LoadService) {}

  ngOnInit() {
    this.load.subscribe((value) => {
      this.isLoading = value;
    })
  }
}
