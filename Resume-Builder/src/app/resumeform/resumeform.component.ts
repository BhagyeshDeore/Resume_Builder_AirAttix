import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResumeService } from '../Service/resume.service'; // Adjust the path as needed

@Component({
  selector: 'app-resumeform',
  templateUrl: './resumeform.component.html',
  styleUrls: ['./resumeform.component.css']
})
export class ResumeformComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  // resumeForm!: FormGroup;
  // profiles: { platform: string; url: string }[] = [];
  // experience: {
  //   companyName: string;
  //   position: string;
  //   dateRange: string;
  //   companyLocation: string;
  //   companyWebsite: string;
  //   summary: string;
  // }[] = [];
  // userId: string = '2'; // Replace with dynamic userId if needed

  // constructor(private fb: FormBuilder, private resumeService: ResumeService) {}

  // ngOnInit(): void {
  //   this.resumeForm = this.fb.group({
  //     fullName: [''],
  //     email: [''],
  //     phone: [''],
  //     location: [''],
  //     summary: [''],
  //   });

  //   // Load existing resume if userId is provided
  //   this.resumeService.getResume(this.userId).subscribe((resume: any) => {
  //     if (resume && resume.length > 0) {
  //       this.resumeForm.patchValue(resume[0]);
  //       this.profiles = resume[0].profiles || [];
  //       this.experience = resume[0].experience || [];
  //     }
  //   });
  // }

  // addProfile(): void {
  //   this.profiles.push({ platform: '', url: '' });
  // }

  // removeProfile(index: number): void {
  //   this.profiles.splice(index, 1);
  // }

  // addExperience(): void {
  //   this.experience.push({
  //     companyName: '',
  //     position: '',
  //     dateRange: '',
  //     companyLocation: '',
  //     companyWebsite: '',
  //     summary: ''
  //   });
  // }

  // removeExperience(index: number): void {
  //   this.experience.splice(index, 1);
  // }

  // onSubmit(): void {
  //   const formData = {
  //     ...this.resumeForm.value,
  //     profiles: this.profiles,
  //     experience: this.experience
  //   };

  //   this.resumeService.saveOrUpdateResume(this.userId, formData).subscribe(
  //     (response: any) => {
  //       console.log('Resume saved successfully:', response);
  //     },
  //     (error: any) => {
  //       console.error('Error saving resume:', error);
  //     }
  //   );
  // }
}
