import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'MCQ-Exam';
  constructor(private service: AuthService) {}
  ngOnInit(): void {
    this.getUsersData();
  }
  getUsersData() {
    this.service.getRole().subscribe((result) => {
      this.service.user.next(result);
    });
  }
}
