import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { MainRoutingModule } from './main-routing.module';
import { UserComponent } from '../user/user.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from 'src/app/components/home/home.component';

@NgModule({
  declarations: [HomePageComponent, NavbarComponent, UserComponent, HomeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MainRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class HomePageModule {}
