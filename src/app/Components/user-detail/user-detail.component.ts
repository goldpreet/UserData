import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  userDetails: any = {}
  constructor(private route: ActivatedRoute) { }
  userService = inject(UserService)

  showQualificationInputs: boolean = false;
  newQualification: any = {
    qualificationName: '',
    experience: null,
    institution: ''
  };

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const guidId = params.get('id');
      console.log('Received guidId:', guidId);
      this.userService.getUserByid(guidId).subscribe((data:any) => {
        console.log(data.qualifications, "data");
        this.userDetails = data;
      });
    });
  }

  toggleAddQualification() {
    this.showQualificationInputs = true;
  }

  updateQualification() {
    if (this.newQualification.qualificationName &&
      this.newQualification.experience &&
      this.newQualification.institution) {

      if (!this.userDetails.qualifications) {
        this.userDetails.qualifications = { $values: [] };
      }

      const newQualificationEntry = {
        qualificationName: this.newQualification.qualificationName,
        experience: this.newQualification.experience,
        institution: this.newQualification.institution
      };

      this.userDetails.qualifications.push(newQualificationEntry);

      // Prepare the payload
      const payload = {
        name: this.userDetails.name,
        guidId: this.userDetails.guidId,
        email: this.userDetails.email,
        status: this.userDetails.status,
        gender: this.userDetails.gender,
        age: this.userDetails.age,
        phone: this.userDetails.phone,
        salary: this.userDetails.salary,
        qualifications: [
          newQualificationEntry,
        ]
      };

      console.log(this.newQualification, "new");
      this.userService.updateUserData(payload).subscribe(() => {
        console.log("Updated successfully");
      });

      // Reset the form
      this.newQualification = {
        qualificationName: '',
        experience: null,
        institution: ''
      };

      this.showQualificationInputs = false;
    } else {
      alert('Please fill all fields');
    }
  }

  cancelAddQualification() {
    this.newQualification = {
      qualificationName: '',
      experience: null,
      institution: ''
    };
    this.showQualificationInputs = false;
  }
}
