import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  ngOnInit(): void {}

  get() {
    console.log(document.cookie);
    this.apiService.post('/test', {}).subscribe((res) => {
      console.log(res);
    });
  }
}
