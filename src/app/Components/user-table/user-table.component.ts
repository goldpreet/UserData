import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
import { UserService } from '../../Services/user.service';

interface User {
  id: number;
  name: string;
  status: string;
}

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  users: User[] = [
    { id: 1, name: 'Kiran', status: 'Active' },
    { id: 2, name: 'Jeenal', status: 'Inactive' },
    { id: 3, name: 'Kirti', status: 'Pending' },
    { id: 4, name: 'Raman', status: 'Inactive' },
    { id: 5, name: 'Lavanya', status: 'Pending' }
  ];

  editedUser: User | null = null; 

  constructor(private router: Router) {}

  editUser(user: User) {
    this.editedUser = { ...user }; // Make a copy of the user to edit
  }

  cancelEdit() {
    this.editedUser = null; // Cancel editing, reset editedUser
  }

  saveUserChanges() {
    if (this.editedUser) {
      // Find the index of the edited user in the array
      const index = this.users.findIndex(u => u.id === this.editedUser!.id);
      if (index !== -1) {
        // Update the user in the array
        this.users[index] = { ...this.editedUser };
        console.log(`User ${this.editedUser.id} updated.`);
        this.editedUser = null; // Reset editedUser after save
      }
    }
  }

  deleteUser(user: User) {
    this.users = this.users.filter(u => u.id !== user.id);
  }

  addData() {
    this.router.navigateByUrl("/create-form");
  }

  userService =inject(UserService)
userdata :any=[]
  ngOnInit()
  {
    this.userService.getUserDetails().subscribe((data:any)=>{
      console.log(data.$values,"data users");
      this.userdata=data.$values
    })
    // getting data from backend part 
  }

}






