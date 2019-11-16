import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HomeComponent } from './components/home/home.component';

const routes: Route[] = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'edit-user/:userId',
    component: UserProfileComponent
  },

  {
    path: '**',
    redirectTo: 'Error'
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
    })
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {}
}
