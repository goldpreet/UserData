import { Routes } from '@angular/router';
import { UserTableComponent } from './Components/user-table/user-table.component';
import { FormComponent } from './Components/form/form.component';
import { UserDetailComponent } from './Components/user-detail/user-detail.component';


export const routes: Routes = [
    {path: ''  , component: UserTableComponent},
    // by defaullt user page is opened whwn no url is specified
    {path: 'user'  , component: UserTableComponent},
    // user page
    {path: 'create-form', component: FormComponent },
    // create form page 
    {path: 'display-details/:id', component: UserDetailComponent}
    // through url with guid id the specific data is displayed
 
];
