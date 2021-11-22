import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}

  goToUserPage() {
    this.router.navigate(['home', 'me']);
  }

  logout() {
    this.auth.logout();
  }

  goToHome() {
    this.router.navigate(["home","main"]);
  }

  ngOnInit(): void {}
}
