import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  users: any[] = [];
  type: string = 'students';
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.loginForm = this.fb.group({
      type: [this.type, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.getUser();
  }

  getRole(event: any) {
    console.log(event.value);
    this.type = event.value;
    this.getUser();
  }

  getUser() {
    this.service.getAllUser(this.type).subscribe((result: any) => {
      this.users = result;
      console.log(result);
    });
  }

  loginUser() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.toast.error('Form is not avaible ');
      return;
    }

    let data = this.loginForm.value;

    let index = this.users.findIndex(
      (item) => item.email == data.email && item.password == data.password
    );
    if (index == -1) {
      this.toast.info('Email or password is invalid !');
    } else {
      const model = {
        username: this.users[index].username,
        role: this.type,
        idUser: this.users[index].id,
      };
      console.log(index);
      console.log(model);

      this.service.loginUser(model).subscribe((result) => {
        this.service.user.next(result);
        console.log(result);
        this.router.navigate(['/subjects']);
        this.toast.success('Account is Login ');
      });
    }
  }
}
