import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private api: ApiService) {}

  goToUserPage() {
    this.router.navigate(['home', 'me']);
  }

  logout() {
    this.api.get('/logout').subscribe();
    this.router.navigate(['']);
  }

  ngOnInit(): void {}
}
