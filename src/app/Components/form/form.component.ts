import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../Services/user.service';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      // id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      status: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      salary: ['', [Validators.required, Validators.min(0)]],
      qualification: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(0)]],
      institution: ['', Validators.required]
    });
  }

  areInitialFieldsValid(): boolean {
    const initialFields = ['name', 'email', 'status', 'gender', 'age', 'phone', 'salary'];
    return initialFields.every(field => this.userForm.get(field)?.valid);
  }



  isQualificationVisible = false

  toggleQualificationFields() {
    if (this.areInitialFieldsValid()) {
      this.isQualificationVisible = !this.isQualificationVisible
    }
  }



  
  userService = inject(UserService)
  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.userService.addUserDetails(this.userForm.value).subscribe(() => {
        alert("data submitted");
      })
    } else {
      console.log('Form is invalid');
    }
  }
}
//   onReset() {
//     this.userForm.reset();
//   }

//   // Helper methods to access form controls
//   get id() { return this.userForm.get('id')!; }
//   get name() { return this.userForm.get('name')!; }
//   get status() { return this.userForm.get('status')!; }
//   get gender() { return this.userForm.get('gender')!; }
//   get age() { return this.userForm.get('age')!; }
//   get phone() { return this.userForm.get('phone')!; }
//   get salary() { return this.userForm.get('salary')!; }
// }

