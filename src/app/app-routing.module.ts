import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
	path: 'users',
	component: UserListComponent,
	canActivate: [],
  },
  {
	path: 'user',
	component: UserDetailComponent,
	canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
