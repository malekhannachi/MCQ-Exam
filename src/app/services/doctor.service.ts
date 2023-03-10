import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  baseUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  createSubject(model: any) {
    return this.http.post<any>(this.baseUrl + 'subjects', model);
  }

  updateSubject(id: number, model: any) {
    return this.http.put<any>(this.baseUrl + 'subjects/' + id, model);
  }

  getAllSubject() {
    return this.http.get<any>(this.baseUrl + 'subjects');
  }
  deleteSubject(id: number) {
    return this.http.delete<any>(this.baseUrl + 'subjects/' + id);
  }

  getSubjectByID(id: number) {
    return this.http.get<any>(this.baseUrl + 'subjects/' + id);
  }
}
