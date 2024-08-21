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
    this.resumeService.getProjects(this.userId).subscribe({
      next: (data) => {
        const projectData = data.find(item => item.userId === this.userId);
        if (projectData) {
          
          const updatedProjects = projectData.projects.filter((_: any, i: number) => i !== index);

     
          this.resumeService.updateProjects(projectData.id, { userId: this.userId, projects: updatedProjects }).subscribe({
            next: () => {
              this.projects.removeAt(index);
              alert('Project removed successfully!');
            },
            error: (err) => console.error('Failed to update projects:', err)
          });
        }
      },
      error: (err) => console.error('Failed to load projects:', err)
    });
  }

  loadProjects(): void {
    this.resumeService.getProjects(this.userId).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const projectData = data.find(item => item.userId === this.userId);
          if (projectData && projectData.projects) {
            this.existingProjectsId = projectData.id; 
            this.projects.clear(); 
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
       
        this.resumeService.updateProjects(this.existingProjectsId, projectsData).subscribe({
          next: () => alert('Projects updated successfully!'),
          error: (err) => console.error('Failed to update projects:', err)
        });
      } else {
       
        this.resumeService.createProjects(this.userId, projectsData).subscribe({
          next: (response) => {
            alert('Projects created successfully!');
            this.existingProjectsId = response.id; 
          },
          error: (err) => console.error('Failed to create projects:', err)
        });
      }
    }
  }
}
