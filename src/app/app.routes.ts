import { Routes } from '@angular/router';
import { UserTableComponent } from './Components/user-table/user-table.component';
import { FormComponent } from './Components/form/form.component';


export const routes: Routes = [
    {path: ''  , component: UserTableComponent},
    {path: 'user'  , component: UserTableComponent},
    {path: 'create-form', component: FormComponent },
 
];
