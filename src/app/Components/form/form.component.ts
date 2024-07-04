import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
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
      password: ['', Validators.required],
      qualifications: this.fb.array([]),
    });
  }

  areInitialFieldsValid(): boolean {
    const initialFields = [
      'name',
      'email',
      'status',
      'gender',
      'age',
      'phone',
      'salary',
      'password',
    ];
    return initialFields.every((field) => this.userForm.get(field)?.valid);
  }

  isQualificationVisible = false;

  toggleQualificationFields() {
    if (this.areInitialFieldsValid()) {
      this.isQualificationVisible = !this.isQualificationVisible;
      if (this.isQualificationVisible && this.qualifications.length === 0) {
        this.addQualification();
      }
    }
  }

  // show add qualification button only when the personal details are fully validated 
  // and completed  otherwise the button is disabled

  get qualifications(): FormArray {
    return this.userForm.get('qualifications') as FormArray;
  }

  getQualificationFormGroup(index: number): FormGroup {
    return this.qualifications.controls[index] as FormGroup;
  }   

  addQualification() {
    const areAllQualificationsValid = this.qualifications.controls.every(
      (control) => control.valid
    );

    if (areAllQualificationsValid) {
      const qualificationGroup = this.fb.group({
        qualificationName: ['', Validators.required],
        experience: ['', [Validators.required, Validators.min(0)]],
        institution: ['', Validators.required],
      });
      this.qualifications.push(qualificationGroup);
    } else {
      console.log(
        'Please fill all the previous qualifications before adding a new one.'
      );
    }
  }
// add more qualification only if the minimum all qualification row data is filled

  isAboveQualificationFilled() {
    const areAllQualificationsValid = this.qualifications.controls.every(
      (control) => control.valid
    );

    return areAllQualificationsValid;
  }

  // validating whether the data of qualification is filled 
  // then only one more row can be added and the add more qualification button gets to appear

  hasError(controlName: string, errorCode: string): boolean {
    const control = this.userForm.get(controlName);
    return control?.invalid && control?.errors?.[errorCode];
  }


  removeQualification(index: number) {
    this.qualifications.removeAt(index);
  }

  // remove the data entered in qualification

  isFormValid(): boolean {
    return this.areInitialFieldsValid() && this.qualifications.length > 0;
  }
  // submit button is validating that if  
  // data of qualification details filled then only submit button will appear
route =inject(Router)
  userService = inject(UserService);
  onSubmit() {
    console.log(this.userForm.value);
// user data coming from backend
    this.userService.addUserDetails(this.userForm.value).subscribe(() => {
      alert('data submitted');
      // alert msg will be shown 
      this.route.navigateByUrl('/user') 
      // after data is added in frorm it will be redirected to user table
    });
  }
}
