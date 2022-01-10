import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}

  goToUserPage() {
    this.router.navigate(['me']);
  }

  logout() {
    this.auth.logout();
  }

  goToHome() {
    this.router.navigate(['main']);
  }

  goToFiles() {
    this.router.navigate(['files']);
  }

  ngOnInit(): void {}
}
