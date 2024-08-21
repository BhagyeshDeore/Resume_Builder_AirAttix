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
      description: ['', Validators.required],
      level: ['', Validators.required]
    }));
  }

  removeSkill(index: number): void {
    const skillToRemove = this.skills.at(index).value;
  
    this.resumeService.getSkills(this.userId).subscribe({
      next: (data) => {
        const skillData = data.find(item => item.userId === this.userId);
        if (skillData) {
         
          const updatedSkills = skillData.skills.filter((skill: any) =>
            skill.name !== skillToRemove.name ||
            skill.description !== skillToRemove.description ||
            skill.level !== skillToRemove.level
          );
  
          
          this.resumeService.updateSkills(skillData.id, this.userId, updatedSkills).subscribe({
            next: () => {
              this.skills.removeAt(index);
              alert('Skill removed successfully!');
            },
            error: (err) => console.error('Failed to update skills:', err)
          });
        }
      },
      error: (err) => console.error('Failed to load skills:', err)
    });
  }
  
  
  loadSkills(): void {
    this.resumeService.getSkills(this.userId).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
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
        this.resumeService.updateSkills(this.existingSkillsId, this.userId, formSkills).subscribe({
          next: () => alert('Skills updated successfully!'),
          error: (err) => console.error('Failed to update skills:', err)
        });
      } else {
        this.resumeService.createSkills(this.userId, formSkills).subscribe({
          next: (response) => {
            alert('Skills created successfully!');
            this.existingSkillsId = response.id;
          },
          error: (err) => console.error('Failed to create skills:', err)
        });
      }
    }
  }
}
