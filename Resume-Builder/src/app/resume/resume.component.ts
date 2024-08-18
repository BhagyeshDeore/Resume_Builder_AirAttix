import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../Service/resume.service'; 
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
  resume: any = {}; // This will hold the combined data

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    // Replace '1' with dynamic userId if necessary
    const userId = '1'; 

    forkJoin({
      personalInfo: this.resumeService.getPersonalInfo(userId),
      profiles: this.resumeService.getProfiles(userId),
      experience: this.resumeService.getExperience(userId),
      education: this.resumeService.getEducation(userId),
      skills: this.resumeService.getSkills(userId),
      languages: this.resumeService.getLanguages(userId),
      certifications: this.resumeService.getCertifications(userId),
      interests: this.resumeService.getInterests(userId),
      projects: this.resumeService.getProjects(userId)
    }).subscribe(data => {
      // Combine data into a single object
      this.resume = {
        personalInfo: data.personalInfo[0],
        profiles: data.profiles,
        experience: data.experience,
        education: data.education,
        skills: data.skills,
        languages: data.languages,
        certifications: data.certifications,
        interests: data.interests,
        projects: data.projects
      };
    });
  }
}
