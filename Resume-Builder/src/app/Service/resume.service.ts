import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  userId = '1';
  private baseUrl = 'http://localhost:3000'; // Your JSON Server URL

  constructor(private http: HttpClient) {}

  getPersonalInfo(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/personalInfo?userId=${userId}`);
  }

  updatePersonalInfo(userId: string, personalInfo: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/personalInfo/${userId}`, personalInfo);
  }

  createPersonalInfo(personalInfo: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/personalInfo`, personalInfo);
  }

  getProfiles(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/profiles?userId=${userId}`);
  }

  getExperience(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/experience?userId=${userId}`);
  }

  getEducation(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/education?userId=${userId}`);
  }

  getSkills(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/skills?userId=${userId}`);
  }

  getLanguages(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/languages?userId=${userId}`);
  }

  getCertifications(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/certifications?userId=${userId}`);
  }

  getInterests(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/interests?userId=${userId}`);
  }

  getProjects(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/projects?userId=${userId}`);
  }
}
