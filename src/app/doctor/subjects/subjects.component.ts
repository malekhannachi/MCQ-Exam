import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
})
export class SubjectsComponent implements OnInit {
  subjects: any[] = [];
  user: any = null;
  constructor(
    private service: DoctorService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.getSubject();
    this.getUserDate()
  }

  getSubject() {
    this.service.getAllSubject().subscribe((res) => {
      this.subjects = res;
    });
  }

  getUserDate(){
this.authService.getRole().subscribe((res) => {
  this.user = res;
});

  }

  delete(item: any) {
    console.log(item);
    this.service.deleteSubject(item.id).subscribe((res) => {
      let index = this.subjects.indexOf(item);
      this.subjects.splice(index, 1);
    });
  }
}
