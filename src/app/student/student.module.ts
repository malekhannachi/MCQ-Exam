import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ExamComponent } from './components/exam/exam.component';



@NgModule({
  declarations: [
    ExamComponent
  ],
  imports: [
    CommonModule,SharedModule
  ]
})
export class StudentModule { }
