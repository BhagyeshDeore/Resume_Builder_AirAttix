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
    const userId = this.resumeService.userId; // Use dynamic userId

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
      this.resume = {
        personalInfo: data.personalInfo.length > 0 ? data.personalInfo[0] : {}, // Ensure personalInfo is properly accessed
        profiles: data.profiles.length > 0 ? data.profiles[0].profiles : [], // Adjust for profiles array
        experience: data.experience.length > 0 ? data.experience[0].experience : [], // Adjust for experience array
        education: data.education.length > 0 ? data.education[0].education : [], // Adjust for education array
        skills: data.skills.length > 0 ? data.skills[0].skills : [], // Adjust for skills array
        languages: data.languages.length > 0 ? data.languages[0].languages : [], // Adjust for languages array
        certifications: data.certifications.length > 0 ? data.certifications[0].certifications : [], // Adjust for certifications array
        interests: data.interests.length > 0 ? data.interests[0].interests : [], // Adjust for interests array
        projects: data.projects.length > 0 ? data.projects[0].projects : [] // Adjust for projects array
      };
    });
  }
}
