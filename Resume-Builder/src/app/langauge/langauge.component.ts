import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ResumeService } from '../Service/resume.service';

@Component({
  selector: 'app-langauge',
  templateUrl: './langauge.component.html',
  styleUrls: ['./langauge.component.css']
})
export class LangaugeComponent implements OnInit {
  languagesForm: FormGroup;
  userId: string = this.resumeService.userId;
  existingLanguagesId: string | null = null;

  constructor(private fb: FormBuilder, private resumeService: ResumeService) {
    this.languagesForm = this.fb.group({
      languages: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadLanguages();
  }

  get languages(): FormArray {
    return this.languagesForm.get('languages') as FormArray;
  }

  addLanguage(): void {
    this.languages.push(this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      level: ['', Validators.required]
    }));
  }

  removeLanguage(index: number): void {
    this.languages.removeAt(index);
  }

  loadLanguages(): void {
    this.resumeService.getLanguages(this.userId).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const languageData = data.find(item => item.userId === this.userId);
          if (languageData && languageData.languages) {
            this.existingLanguagesId = languageData.id; // Store the ID for updates
            this.languages.clear(); // Clear existing form array
            languageData.languages.forEach((language: any) => {
              this.languages.push(this.fb.group(language));
            });
          }
        }
      },
      error: (err) => console.error('Failed to load languages:', err)
    });
  }

  onSubmit(): void {
    if (this.languagesForm.valid) {
      const formLanguages = this.languagesForm.value.languages;
      const languagesData = { userId: this.userId, languages: formLanguages };

      if (this.existingLanguagesId) {
      
        this.resumeService.updateLanguages(this.existingLanguagesId, languagesData).subscribe({
          next: () => alert('Languages updated successfully!'),
          error: (err) => console.error('Failed to update languages:', err)
        });
      } else {
        
        this.resumeService.createLanguages(this.userId, languagesData).subscribe({
          next: (response) => {
            alert('Languages created successfully!');
            this.existingLanguagesId = response.id; // Update the ID for future use
          },
          error: (err) => console.error('Failed to create languages:', err)
        });
      }
    }
  }
}
