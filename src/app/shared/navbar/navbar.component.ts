import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: any = null;

  constructor(private service: AuthService) {}
  ngOnInit(): void {
    this.service.user.subscribe((res: any) => {
      if (res.role) {
        this.user = res;
        console.log(this.user);
      }
    });
  }

  logOut() {
    const model = {};
    this.service.loginUser(model).subscribe((res) => {
      this.user = null;
      console.log(res);
      this.service.user.next(res);
    });
  }
}
