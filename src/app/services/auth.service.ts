import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:3000/';
  user = new Subject();
  constructor(private http: HttpClient) {}

  createUser(user: User) {
    return this.http.post<any>(this.baseUrl + 'students', user);
  }
  getAllUser(type: string) {
    return this.http.get<any>(this.baseUrl + type);
  }
  loginUser(model: any) {
    return this.http.put<any>(this.baseUrl + 'login/1', model);
  }

  getRole() {
    return this.http.get<any>(this.baseUrl + 'login/1');
  }

  getStudentByID(id: number) {
    return this.http.get<any>(this.baseUrl + 'students/' + id);
  }

  updateStudent(id: number, model: any) {
    return this.http.put<any>(this.baseUrl + 'students/' + id, model);
  }
}
