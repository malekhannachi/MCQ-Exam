import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl = 'http://localhost:3000/';
  user = new Subject();
  constructor(private http: HttpClient) {}

  createUser(user: User) {
    return this.http.post<any>(this.authUrl + 'students', user);
  }
  getAllUser(type: string) {
    return this.http.get<any>(this.authUrl + type);
  }
  loginUser(model: any) {
    return this.http.put<any>(this.authUrl + 'login/1', model);
  }

  getRole() {
    return this.http.get<any>(this.authUrl + 'login/1');
  }
}
