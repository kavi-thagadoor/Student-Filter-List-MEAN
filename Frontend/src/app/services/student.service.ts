import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Student {
  name: string;
  address: string;
  class: string;
  studentId: string;
  parentName: string;
}
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private API_URL = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}

  getStudents(search: string = ''): Observable<Student[]> {
    let params = new HttpParams().set('search', search);
    return this.http.get<Student[]>(this.API_URL, { params });
  }
}
