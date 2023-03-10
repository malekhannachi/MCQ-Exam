import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit {
  id!: number;
  subject: any;
  user: any;
  constructor(
    private service: DoctorService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.getById();
    this.getUserDate()
  }

  getById() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.service.getSubjectByID(this.id).subscribe((res: any) => {
      this.subject = res;
      console.log(this.subject);
    });
  }

  delete(index: number) {
    console.log(index);
    this.subject.questions.splice(index, 1);
    const model = {
      name: this.subject.name,
      questions: this.subject.questions,
    };
    this.service.updateSubject(this.id, model).subscribe((res) => {
      console.log(res);
    });
  }
  getUserDate() {
    this.authService.getRole().subscribe((res) => {
      this.user = res;
    });
  }
}
