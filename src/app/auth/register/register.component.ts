import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  students: any[] = [];
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.getUser();
    let isLoggedIn = this.service.isLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['/subjects']);
    }
  }

  getUser() {
    this.service.getAllUser('students').subscribe((result: any) => {
      this.students = result;
    });
  }

  registerUser() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.toast.info('Check your fields !');
      return;
    }

    if (
      this.registerForm.value.password !==
      this.registerForm.value.confirmPassword
    ) {
      this.toast.info('Check your Password !');
      return;
    }
    let data = this.registerForm.value;
    console.log(data);

    const model = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    let index = this.students.findIndex((item) => item.email == data.email);
    if (index !== -1) {
      this.toast.error('Student is Exist !');
    } else {
      this.service.createUser(model).subscribe((result) => {
        console.log(result);
        this.router.navigate(['/login']);
        this.toast.success('Account created successfully');
      });
    }
  }
}
