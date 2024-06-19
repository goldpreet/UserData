import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
userDetails:any ={}
  constructor(private route: ActivatedRoute) { }
  userService = inject(UserService)
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const guidId = params.get('id');
      // Use the guidId to fetch user details from the backend
      console.log('Received guidId:', guidId);
      this.userService.getUserByid(guidId).subscribe((data) => {
        console.log(data, "data");
      this.userDetails=data

      })
    });
  }

}
