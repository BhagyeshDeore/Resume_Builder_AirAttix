import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ResumeService } from '../Service/resume.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  educationForm: FormGroup;
  userId: string = this.resumeService.userId;
  existingEducationId: string | null = null;

  constructor(private fb: FormBuilder, private resumeService: ResumeService) {
    this.educationForm = this.fb.group({
      education: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadEducation();
  }

  get education(): FormArray {
    return this.educationForm.get('education') as FormArray;
  }

  addEducation(): void {
    this.education.push(this.fb.group({
      institutionName: ['', Validators.required],
      typeOfStudy: ['', Validators.required],
      areaOfStudy: ['', Validators.required],
      score: ['', Validators.required],
      dateRange: ['', Validators.required],
      summary: ['']
    }));
  }

  removeEducation(index: number): void {
    // Retrieve all education entries for the user
    this.resumeService.getEducation(this.userId).subscribe({
      next: (data) => {
        const educationData = data.find(item => item.userId === this.userId);
        if (educationData) {
          // Filter out the education entry to be removed by index
          const updatedEducation = educationData.education.filter((_: any, i: number) => i !== index);
  
          // Update the server with the new education array
          this.resumeService.updateEducation(educationData.id, this.userId, { education: updatedEducation }).subscribe({
            next: () => {
              // Remove the education entry from the form array by index
              this.education.removeAt(index);
              alert('Education removed successfully!');
            },
            error: (err) => console.error('Failed to update education:', err)
          });
        }
      },
      error: (err) => console.error('Failed to load education:', err)
    });
  }

  loadEducation(): void {
    this.resumeService.getEducation(this.userId).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const educationData = data.find(item => item.userId === this.userId);
          if (educationData && educationData.education) {
            this.existingEducationId = educationData.id;
            this.education.clear(); 
            educationData.education.forEach((education: any) => {
              this.education.push(this.fb.group(education));
            });
          }
        }
      },
      error: (err) => console.error('Failed to load education:', err)
    });
  }

  onSubmit(): void {
    if (this.educationForm.valid) {
      const formEducation = this.educationForm.value.education;
      const educationData = { userId: this.userId, education: formEducation };

      if (this.existingEducationId) {
        this.resumeService.updateEducation(this.existingEducationId, this.userId, educationData).subscribe({
          next: () => alert('Education updated successfully!'),
          error: (err) => console.error('Failed to update education:', err)
        });
      } else {
        this.resumeService.createEducation(this.userId, educationData).subscribe({
          next: (response) => {
            alert('Education created successfully!');
            this.existingEducationId = response.id; // Update the ID for future use
          },
          error: (err) => console.error('Failed to create education:', err)
        });
      }
    }
  }
}
