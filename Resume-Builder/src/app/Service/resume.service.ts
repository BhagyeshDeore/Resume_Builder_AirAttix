import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

 userId: string = this.authService.getUserId();

  private baseUrl = 'http://localhost:3000'; 
  

  constructor(private http: HttpClient , private authService : AuthService) {}
  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    console.log('User ID:', this.userId);
    
  }

  getPersonalInfo(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/personalInfo?userId=${userId}`);
  }

  updatePersonalInfo(id: string, personalInfo: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/personalInfo/${id}`, personalInfo);
  }

  createPersonalInfo(personalInfo: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/personalInfo`, personalInfo);
  }

  getProfiles(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/profiles?userId=${userId}`);
  }

  updateProfiles(profileId: string, userId: string, profiles: any[]): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/profiles/${profileId}`, { userId, profiles });
  }
  

  createProfiles(userId: string, profiles: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/profiles`, profiles);
  }

  

  getExperience(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/experience?userId=${userId}`);
  }

  updateExperience(id: string, userId: string, experienceData: any): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/experience/${id}`, { userId, ...experienceData });
  }
  

  createExperience(userId: string, experienceData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/experience`, experienceData);
  }
  
  deleteExperience(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/experience/${id}`);
  }
  getEducation(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/education?userId=${userId}`);
  }

  updateEducation(id: string, userId: string, educationData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/education/${id}`, { userId, ...educationData });
  }
  
  createEducation(userId: string, educationData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/education`, educationData);
  }

  getSkills(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/skills?userId=${userId}`);
  }

  updateSkills(skillsId: string, userId: string, skills: any[]): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/skills/${skillsId}`, { userId, skills });
  }

  createSkills(userId: string, skills: any[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/skills`, { userId, skills });
  }

  
  getLanguages(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/languages?userId=${userId}`);
  }

  updateLanguages(languagesId: string, languagesData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/languages/${languagesId}`, languagesData);
  }

  createLanguages(userId: string, languagesData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/languages`, languagesData);
  }

  getCertifications(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/certifications?userId=${userId}`);
  }

  getInterests(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/interests?userId=${userId}`);
  }

  updateInterests(id: string, interestsData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/interests/${id}`, interestsData);
  }

  createInterests(userId: string, interestsData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/interests`, interestsData);
  }

  getProjects(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/projects?userId=${userId}`);
  }

  updateProjects(projectsId: string, projectsData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/projects/${projectsId}`, projectsData);
  }
  

  createProjects(userId: string, projectsData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/projects`, projectsData);
  }
}
