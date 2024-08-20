import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ResumeService } from '../Service/resume.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projectsForm: FormGroup;
  userId: string = this.resumeService.userId;
  existingProjectsId: string | null = null;

  constructor(private fb: FormBuilder, private resumeService: ResumeService) {
    this.projectsForm = this.fb.group({
      projects: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  get projects(): FormArray {
    return this.projectsForm.get('projects') as FormArray;
  }

  addProject(): void {
    this.projects.push(this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateRange: ['', Validators.required],
      githubLinks: ['', Validators.required],
      technologyUsed: ['', Validators.required]
    }));
  }

  removeProject(index: number): void {
    this.projects.removeAt(index);
  }

  loadProjects(): void {
    this.resumeService.getProjects(this.userId).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const projectData = data.find(item => item.userId === this.userId);
          if (projectData && projectData.projects) {
            this.existingProjectsId = projectData.id; // Store the ID for updates
            this.projects.clear(); // Clear existing form array
            projectData.projects.forEach((project: any) => {
              this.projects.push(this.fb.group(project));
            });
          }
        }
      },
      error: (err) => console.error('Failed to load projects:', err)
    });
  }

  onSubmit(): void {
    if (this.projectsForm.valid) {
      const formProjects = this.projectsForm.value.projects;
      const projectsData = { userId: this.userId, projects: formProjects };

      if (this.existingProjectsId) {
        // Update existing projects
        this.resumeService.updateProjects(this.existingProjectsId, projectsData).subscribe({
          next: () => alert('Projects updated successfully!'),
          error: (err) => console.error('Failed to update projects:', err)
        });
      } else {
        // Create new projects entry
        this.resumeService.createProjects(this.userId, projectsData).subscribe({
          next: (response) => {
            alert('Projects created successfully!');
            this.existingProjectsId = response.id; // Update the ID for future use
          },
          error: (err) => console.error('Failed to create projects:', err)
        });
      }
    }
  }
}
