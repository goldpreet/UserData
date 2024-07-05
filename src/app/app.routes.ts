import { Routes } from '@angular/router';
import { UserTableComponent } from './Components/user-table/user-table.component';
import { FormComponent } from './Components/form/form.component';
import { UserDetailComponent } from './Components/user-detail/user-detail.component';
import { LoginComponent } from './Components/login/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'user', component: UserTableComponent },
  { path: 'log-in', component: LoginComponent },
  { path: 'create-form', component: FormComponent },
  { path: 'display-details/:id', component: UserDetailComponent }
];
