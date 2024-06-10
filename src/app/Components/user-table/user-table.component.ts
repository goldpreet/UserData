import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
interface User {
  id: number;
  name: string;
  status: string;
}
@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent {
  users: User[] = [
    { id: 1, name: 'Kiran', status: 'Active' },
    { id: 2, name: 'Jeenal', status: 'Inactive' },
    { id: 3, name: 'Kirti', status: 'Pending' },
    { id: 4, name: 'Raman', status: 'Inactive' },
    { id: 5, name: 'Lavanya', status: 'Pending' }
  ];

router = inject(Router)
addData()
{
  this.router.navigateByUrl("/create-form")
  
}
}
