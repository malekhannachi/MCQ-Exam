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
  total: number = 0;
  showResult: boolean = false;
  studentInfo: any;
  studentSubject: any[] = [];
  validExam: boolean = true;

  constructor(
    private service: DoctorService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.getById();
    this.getLoggedInUser();
  }

  // get
  getById() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.service.getSubjectByID(this.id).subscribe((res: any) => {
      this.subject = res;
      console.log(this.subject);
    });
  }

  // check logged in is Doctor or Student
  getLoggedInUser() {
    this.authService.getRole().subscribe((res) => {
      this.user = res;
      this.getUserDate();
    });
  }

  // get  data of student by id
  getUserDate() {
    this.authService.getStudentByID(this.user.idUser).subscribe((res) => {
      this.studentInfo = res;
      this.studentSubject = res?.subject ? res?.subject : [];
      this.checkValidateExam();
    });
  }

  getAnswer(event: any) {
    let value = event.value;
    let questionIndex = event.source.name;
    this.subject.questions[questionIndex].studentAnswer = value;
    console.log(this.subject.questions);
  }

  getResult() {
    this.total = 0;
    for (let x in this.subject.questions) {
      if (
        this.subject.questions[x].studentAnswer ==
        this.subject.questions[x].correctAnswer
      ) {
        this.total++;
      }
    }
    this.showResult = true;
    this.studentSubject.push({
      name: this.subject.name,
      degree: this.total,
      id: this.id,
    });
    const model = {
      username: this.studentInfo.username,
      email: this.studentInfo.email,
      password: this.studentInfo.password,
      id: this.studentInfo.id,
      subject: this.studentSubject,
    };

    this.authService.updateStudent(this.user.idUser, model).subscribe((res) => {
      console.log(res);
    });
  }

  checkValidateExam() {
    for (let x in this.studentSubject) {
      if (this.id == this.studentSubject[x].id) {
        this.validExam = false;
      }
    }
    console.log(this.validExam);
  }

  //Part of Doctor :delete question

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
}
