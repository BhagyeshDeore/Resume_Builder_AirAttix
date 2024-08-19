import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ResumeService } from '../Service/resume.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  profilesForm: FormGroup;
  existingProfiles: any[] = [];
  userId: string = this.resumeService.userId;
  existingProfileId: string | null = null;

  constructor(private fb: FormBuilder, private resumeService: ResumeService) {
    this.profilesForm = this.fb.group({
      profiles: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadProfiles();
  }

  get profiles(): FormArray {
    return this.profilesForm.get('profiles') as FormArray;
  }

  addProfile(): void {
    this.profiles.push(this.fb.group({
      platform: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern('https?://.+')]]
    }));
  }

  removeProfile(index: number): void {
    const profile = this.profiles.at(index).value;
    if (profile.url) {
      this.resumeService.deleteProfileByUrl(profile.url).subscribe({
        next: () => {
          this.profiles.removeAt(index);
          alert('Profile removed successfully!');
        },
        error: (err) => console.error('Failed to remove profile by URL:', err)
      });
    } else {
      this.profiles.removeAt(index);
    }
  }

  loadProfiles(): void {
    this.resumeService.getProfiles(this.userId).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          // Extract profiles from the received data
          const profilesData = data.find(item => item.userId === this.userId);
          if (profilesData && profilesData.profiles) {
            this.existingProfiles = profilesData.profiles;
            this.existingProfileId = profilesData.id; // Store the ID for updates
            this.existingProfiles.forEach(profile => {
              this.profiles.push(this.fb.group(profile));
            });
          }
        }
      },
      error: (err) => console.error('Failed to load profiles:', err)
    });
  }

  onSubmit(): void {
    if (this.profilesForm.valid) {
      const formProfiles = this.profilesForm.value.profiles;

      if (this.existingProfileId) {
        // Update existing profiles
        const updatedProfiles = { userId: this.userId, profiles: formProfiles };
        this.resumeService.updateProfiles(this.existingProfileId, updatedProfiles).subscribe({
          next: () => alert('Profiles updated successfully!'),
          error: (err) => console.error('Failed to update profiles:', err)
        });
      } else {
        // Create new profiles entry
        const newProfiles = { userId: this.userId, profiles: formProfiles };
        this.resumeService.createProfiles(this.userId, newProfiles).subscribe({
          next: (response) => {
            alert('Profiles created successfully!');
            this.existingProfileId = response.id; // Update the ID for future use
          },
          error: (err) => console.error('Failed to create profiles:', err)
        });
      }
    }
  }
}