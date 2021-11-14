import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { HomePageComponent } from './home-page.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      {
        path: 'me',
        component: UserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
