import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ResumeService } from '../Service/resume.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  experienceForm: FormGroup;
  userId: string = this.resumeService.userId;
  existingExperienceId: string | null = null;

  constructor(private fb: FormBuilder, private resumeService: ResumeService) {
    this.experienceForm = this.fb.group({
      experiences: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadExperiences();
  }

  get experiences(): FormArray {
    return this.experienceForm.get('experiences') as FormArray;
  }

  addExperience(): void {
    this.experiences.push(this.fb.group({
      companyName: ['', Validators.required],
      position: ['', Validators.required],
      dateRange: ['', Validators.required],
      companyLocation: ['', Validators.required],
      companyWebsite: ['', [Validators.required, Validators.pattern('https?://.+')]],
      summary: ['']
    }));
  }

  removeExperience(index: number): void {
    this.experiences.removeAt(index);
  }

  loadExperiences(): void {
    this.resumeService.getExperience(this.userId).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const experiencesData = data.find(item => item.userId === this.userId);
          if (experiencesData && experiencesData.experience) {
            this.existingExperienceId = experiencesData.id; 
            experiencesData.experience.forEach((exp: { companyName: any; position: any; dateRange: any; companyLocation: any; companyWebsite: any; summary: any; }) => {
              this.experiences.push(this.fb.group({
                companyName: [exp.companyName, Validators.required],
                position: [exp.position, Validators.required],
                dateRange: [exp.dateRange, Validators.required],
                companyLocation: [exp.companyLocation, Validators.required],
                companyWebsite: [exp.companyWebsite, [Validators.required, Validators.pattern('https?://.+')]],
                summary: [exp.summary]
              }));
            });
          }
        }
      },
      error: (err) => console.error('Failed to load experiences:', err)
    });
  }

  onSubmit(): void {
    if (this.experienceForm.valid) {
      const formExperiences = this.experienceForm.value.experiences;
      const experiencesData = { userId: this.userId, experience: formExperiences };

      if (this.existingExperienceId) {
        // Update existing experiences
        this.resumeService.updateExperience(this.existingExperienceId, experiencesData).subscribe({
          next: () => alert('Experiences updated successfully!'),
          error: (err) => console.error('Failed to update experiences:', err)
        });
      } else {
        // Create new experiences entry
        this.resumeService.createExperience(this.userId, experiencesData).subscribe({
          next: (response) => {
            alert('Experiences created successfully!');
            this.existingExperienceId = response.id; // Update the ID for future use
          },
          error: (err) => console.error('Failed to create experiences:', err)
        });
      }
    }
  }
}
