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
  userDetails: any = {};
  isEditMode: boolean = false;

  showQualificationInputs: boolean = false;
  newQualification: any = {
    qualificationName: '',
    experience: null,
    institution: ''
  };

  constructor(private route: ActivatedRoute) { }
  userService = inject(UserService);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const guidId = params.get('id');
      this.userService.getUserById(guidId).subscribe((data: any) => {
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

      const payload = {
        ...this.userDetails,
        qualifications: [...this.userDetails.qualifications, newQualificationEntry]
      };

      this.userService.updateUserData(payload).subscribe(() => {
        console.log("Updated successfully");
      });

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

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      const payload = { ...this.userDetails };
      this.userService.updateUserData(payload).subscribe(() => {
        console.log("User details updated successfully");
      });
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
