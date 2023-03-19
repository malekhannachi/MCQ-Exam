import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NewExamComponent } from './doctor/new-exam/new-exam.component';
import { StudentsComponent } from './doctor/students/students.component';
import { SubjectsComponent } from './doctor/subjects/subjects.component';
import { AuthGuard } from './guards/auth.guard';
import { ExamComponent } from './student/exam/exam.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'exam/:id', component: ExamComponent, canActivate: [AuthGuard] },
  { path: 'students', component: StudentsComponent, canActivate: [AuthGuard] },
  { path: 'subjects', component: SubjectsComponent, canActivate: [AuthGuard] },
  { path: 'new-exam', component: NewExamComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'exam', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
