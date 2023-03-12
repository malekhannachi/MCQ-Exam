import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  dataSource: any;
  dataTable: any;
  displayedColumns: any;

  constructor(
    private service: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.displayedColumns = ['position', 'name', 'subjectName', 'degree'];
  }
  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents() {
    this.service.getAllUser('students').subscribe((result: any) => {
      this.dataSource = result?.map((student: any) => {
        if (student?.subject) {
          return student?.subject?.map((sub: any) => {
            return {
              name: student.username,

              subjectName: sub.name,
              degree: sub.degree,
            };
          });
        } else {
          return [
            {
              name: student.username,

              subjectName: '*',
              degree: '*',
            },
          ];
        }
      });
      console.log(this.dataSource);

      this.dataTable = [];

      this.dataSource.forEach((element: any) => {
        element.forEach((subItem: any) => {
          this.dataTable.push({
            name: subItem.name,
            subjectName: subItem.subjectName,
            degree: subItem.degree,
          });
        });
      });
      console.log(this.dataTable);
    });
  }
}
