import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.css'],
})
export class NewExamComponent implements OnInit {
  name = new FormControl('');
  QuestionForm!: FormGroup;
  questions: any[] = [];
  startAdd: boolean = false;
  preview: boolean = false;
  subjectName: string | null = '';
  id!: number;

  stepperIndex = 0;
  corretNum: any;
  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private service: DoctorService
  ) {
    this.QuestionForm = this.fb.group({
      question: ['', [Validators.required]],
      answerA: ['', [Validators.required]],
      answerB: ['', [Validators.required]],
      answerC: ['', [Validators.required]],
      answerD: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {}

  start() {
    if (this.name.value == '') {
      this.toast.info('insert the Name ! ');
    } else {
      this.subjectName = this.name.value;
      this.startAdd = true;
    }
    if (this.startAdd) {
      this.stepperIndex = 1;
    }
  }

  getCorrect(event: any) {
    this.corretNum = event.value;
    console.log(this.corretNum);
  }
  CreateQuestion() {
    if (this.corretNum) {
      const model = {
        question: this.QuestionForm.value.question,
        answerA: this.QuestionForm.value.answerA,
        answerB: this.QuestionForm.value.answerB,
        answerC: this.QuestionForm.value.answerC,
        answerD: this.QuestionForm.value.answerD,
        correctAnswer: this.QuestionForm.value[this.corretNum],
      };
      this.questions.push(model);
      this.QuestionForm.reset();
    } else {
      this.toast.info('Select the correct Answer ! ');
    }
    console.log(this.questions);
  }

  submit() {
    const model = {
      name: this.subjectName,
      questions: this.questions,
    };
    console.log(model);

    if (this.preview) {
      this.stepperIndex = 2;
    } else {
      this.service.createSubject(model).subscribe((result) => {
        console.log(result);
        this.preview = true;
        this.id = result.id;
      });
    }
  }

  clear() {
    this.QuestionForm.reset();
  }
  cansel() {
    this.QuestionForm.reset();
    this.questions = [];
    this.name.reset();
    this.subjectName = '';
    this.stepperIndex = 0;
  }

  delete(index: number) {
    console.log(index);
    this.questions.splice(index, 1);
    const model = {
      name: this.subjectName,
      questions: this.questions,
    };
    this.service.updateSubject(this.id, model).subscribe((res) => {
      console.log(res);
    });
  }
}
