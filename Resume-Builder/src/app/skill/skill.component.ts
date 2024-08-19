import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ResumeService } from '../Service/resume.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  skillForm: FormGroup;
  existingSkills: any[] = [];
  userId: string = this.resumeService.userId;
  existingSkillsId: string | null = null;

  constructor(private fb: FormBuilder, private resumeService: ResumeService) {
    this.skillForm = this.fb.group({
      skills: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadSkills();
  }

  get skills(): FormArray {
    return this.skillForm.get('skills') as FormArray;
  }

  addSkill(): void {
    this.skills.push(this.fb.group({
      name: ['', Validators.required],
      description: [''],
      level: ['']
    }));
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  loadSkills(): void {
    this.resumeService.getSkills(this.userId).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          // Extract skills data and store the ID for updating later
          const skillData = data.find(item => item.userId === this.userId);
          if (skillData) {
            this.existingSkills = skillData.skills || [];
            this.existingSkillsId = skillData.id; // Store the ID for updates
            this.existingSkills.forEach(skill => {
              this.skills.push(this.fb.group(skill));
            });
          }
        }
      },
      error: (err) => console.error('Failed to load skills:', err)
    });
  }

  onSubmit(): void {
    if (this.skillForm.valid) {
      const formSkills = this.skillForm.value.skills;

      if (this.existingSkillsId) {
        // Update existing skills
        this.resumeService.updateSkills(this.existingSkillsId, this.userId, formSkills).subscribe({
          next: () => alert('Skills updated successfully!'),
          error: (err) => console.error('Failed to update skills:', err)
        });
      } else {
        // Create new skills entry
        this.resumeService.createSkills(this.userId, formSkills).subscribe({
          next: (response) => {
            alert('Skills created successfully!');
            this.existingSkillsId = response.id; // Update the ID for future use
          },
          error: (err) => console.error('Failed to create skills:', err)
        });
      }
    }
  }
}
