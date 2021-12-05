import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { MainRoutingModule } from './main-routing.module';
import { UserComponent } from '../user/user.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from 'src/app/components/home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserCardComponent } from 'src/app/components/user-card/user-card.component';
import { ToDoListComponent } from 'src/app/components/to-do-list/to-do-list.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { ToDoElementComponent } from 'src/app/components/to-do-list/to-do-element/to-do-element.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { NavSideComponent } from 'src/app/components/home/nav-side/nav-side.component';
import { DialogCreateFolder } from 'src/app/components/home/nav-side/dialog-create-folder';

@NgModule({
  declarations: [
    HomePageComponent,
    NavbarComponent,
    UserComponent,
    HomeComponent,
    UserCardComponent,
    ToDoListComponent,
    ToDoElementComponent,
    DialogCreateFolder,
    NavSideComponent,
  ],
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
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDividerModule,
    MatDialogModule,
    MatMenuModule,
  ],
  providers: [MatSelectionList],
})
export class HomePageModule {}
