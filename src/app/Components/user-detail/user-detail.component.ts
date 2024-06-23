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
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  userDetails: any = {}
  constructor(private route: ActivatedRoute) { }
  userService = inject(UserService)
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const guidId = params.get('id');

      console.log('Received guidId:', guidId);
      this.userService.getUserByid(guidId).subscribe((data) => {
        console.log(data, "data");
        this.userDetails = data
        // Use the guidId to fetch user details from the backend
      })

    });

  }
  showQualificationInputs: boolean = false;
  newQualification: any = {
    qualificationName: '',
    experience: null,
    institution: ''
  };

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
        // Generate a new GUID for the qualification
        qualificationName: this.newQualification.qualificationName,
        experience: this.newQualification.experience,
        institution: this.newQualification.institution
      };

      this.userDetails.qualifications.$values.push(newQualificationEntry);

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
        qualifications: this.userDetails.qualifications.$values.map((q: any) => {
          const qualification: any = {
            qualificationName: q.qualificationName,
            experience: q.experience,
            institution: q.institution
          };
          if (q.id) {
            qualification['id'] = q.id;
          }
          return qualification;
        })
      };

      console.log(this.newQualification, "new");
      this.userService.updateUserData(payload).subscribe(() => {
        console.log("upadted");

      })

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
}


