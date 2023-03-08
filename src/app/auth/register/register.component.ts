import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
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
  }

  getUser() {
    this.service.getAllUser('students').subscribe((result: any) => {
      this.students = result;
    });
  }

  registerUser() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.toast.error('Form is not avaible ');
      return;
    }
    let data = this.registerForm.value;
    console.log(data);
    let user = new User(data.username, data.email, data.password);
    console.log(user);

    let index = this.students.findIndex((item) => item.email == data.email);
    if (index !== -1) {
      this.toast.info('Student is Exist !');
    } else {
      this.service.createUser(user).subscribe((result) => {
        console.log(result);
        this.router.navigate(['/subjects']);
        this.toast.success('Account is Created ');
      });
    }
  }
}
