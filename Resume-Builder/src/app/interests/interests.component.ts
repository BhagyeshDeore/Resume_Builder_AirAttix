import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ResumeService } from '../Service/resume.service';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {
  interestsForm: FormGroup;
  userId: string = this.resumeService.userId;
  existingInterestsId: string | null = null;

  constructor(private fb: FormBuilder, private resumeService: ResumeService) {
    this.interestsForm = this.fb.group({
      interests: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadInterests();
  }

  get interests(): FormArray {
    return this.interestsForm.get('interests') as FormArray;
  }

  addInterest(): void {
    this.interests.push(this.fb.group({
      name: ['', Validators.required]
    }));
  }

  removeInterest(index: number): void {
    this.resumeService.getInterests(this.userId).subscribe({
      next: (data) => {
        const interestData = data.find(item => item.userId === this.userId);
        if (interestData) {
          
          const updatedInterests = interestData.interests.filter((_: any, i: number) => i !== index);

          
          this.resumeService.updateInterests(interestData.id, { userId: this.userId, interests: updatedInterests }).subscribe({
            next: () => {
             
              this.interests.removeAt(index);
              alert('Interest removed successfully!');
            },
            error: (err) => console.error('Failed to update interests:', err)
          });
        }
      },
      error: (err) => console.error('Failed to load interests:', err)
    });
  }

  loadInterests(): void {
    this.resumeService.getInterests(this.userId).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const interestsData = data.find(item => item.userId === this.userId);
          if (interestsData && interestsData.interests) {
            this.existingInterestsId = interestsData.id; // Store the ID for updates
            this.interests.clear(); // Clear existing form array
            interestsData.interests.forEach((interest: any) => {
              this.interests.push(this.fb.group(interest));
            });
          }
        }
      },
      error: (err) => console.error('Failed to load interests:', err)
    });
  }

  onSubmit(): void {
    if (this.interestsForm.valid) {
      const formInterests = this.interestsForm.value.interests;
      const interestsData = { userId: this.userId, interests: formInterests };

      if (this.existingInterestsId) {
       
        this.resumeService.updateInterests(this.existingInterestsId, interestsData).subscribe({
          next: () => alert('Interests updated successfully!'),
          error: (err) => console.error('Failed to update interests:', err)
        });
      } else {
        
        this.resumeService.createInterests(this.userId, interestsData).subscribe({
          next: (response) => {
            alert('Interests created successfully!');
            this.existingInterestsId = response.id; // Update the ID for future use
          },
          error: (err) => console.error('Failed to create interests:', err)
        });
      }
    }
  }
}
