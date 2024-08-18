import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResumeService } from '../Service/resume.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  personalInfoForm: FormGroup;
  existingPersonalInfo: any;
  userId: string = this.resumeService.userId; // This will be set from the ResumeService

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService
  ) {
    this.personalInfoForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      location: [''],
      summary: ['']
    });
  }

  ngOnInit(): void {
    // Assuming userId is set in the ResumeService upon login or some other initialization
    this.userId = this.resumeService.userId; 
    if (this.userId) {
      this.loadPersonalInfo();
    }
  }

  loadPersonalInfo(): void {
    this.resumeService.getPersonalInfo(this.userId).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.existingPersonalInfo = data[0];
          this.personalInfoForm.patchValue(this.existingPersonalInfo);
        }
      },
      error: (err) => console.error('Failed to load personal info:', err)
    });
  }

  onSubmit(): void {
    if (this.personalInfoForm.valid) {
      const formData = this.personalInfoForm.value;
      if (this.existingPersonalInfo && this.existingPersonalInfo.id) {
        // Update existing record
        this.resumeService.updatePersonalInfo(this.userId, formData).subscribe({
          next: () => alert('Personal info updated successfully!'),
          error: (err) => console.error('Failed to update personal info:', err)
        });
      } else {
        // Create new record
        this.resumeService.createPersonalInfo({ userId: this.userId, ...formData }).subscribe({
          next: () => alert('Personal info created successfully!'),
          error: (err) => console.error('Failed to create personal info:', err)
        });
      }
    }
  }
}
