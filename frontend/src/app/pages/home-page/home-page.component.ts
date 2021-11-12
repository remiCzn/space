import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private router: Router,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  get() {
    console.log(document.cookie);
    this.apiService.get('/test').subscribe(
      (res) => {
        this.snackBar.open(res.body, 'Dismiss');
      },
      (err) => {
        this.snackBar.open(err, 'Dismiss');
      }
    );
  }

  logout() {
    this.apiService.get('/logout').subscribe((res) => {
      console.log(res.message);
      this.router.navigate(['/']);
    });
  }
}
