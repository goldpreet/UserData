import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  userService = inject(UserService);
  cookieService = inject(CookieService);

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) 
  {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(
        (response: any) => {
          const token = `Bearer ${response.token}`;
          this.cookieService.set('authToken', token, { path: '/' });
          this.router.navigate(['/user']);
          console.log(token);
        },
        error => {
          console.error('Login error', error);
        }
      );
    }
  }
}
