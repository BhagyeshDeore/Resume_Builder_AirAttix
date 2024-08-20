import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { ExperienceComponent } from './experience/experience.component';
import { EducationComponent } from './education/education.component';
import { SkillComponent } from './skill/skill.component';
import { CertificationsComponent } from './certifications/certifications.component';
import { InterestsComponent } from './interests/interests.component';
import { ProjectsComponent } from './projects/projects.component';
import { ResumeComponent } from './resume/resume.component';
import { ResumeformComponent } from './resumeform/resumeform.component';
import { LangaugeComponent } from './langauge/langauge.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path : "",
    component :LoginComponent
  },
  {
    path : "login",
    component :LoginComponent
  },
  {
    path: "personal-info",
    component: PersonalInfoComponent
  },
  {
    path: "profiles",
    component: ProfilesComponent
  },
  {
    path: "experience",
    component: ExperienceComponent
  },
  {
    path: "education",
    component: EducationComponent
  },
  {
    path: "skills",
    component: SkillComponent
  },
  {
    path: "certificate",
    component: CertificationsComponent
  },
  {
    path: "interests",
    component: InterestsComponent
  },
  {
    path : "langauge",
    component : LangaugeComponent
  },
  {
    path: "projects",
    component: ProjectsComponent
  },
  {
    path: "resume",
    component: ResumeComponent
  },
  {
    path: "resumeform",
    component: ResumeformComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
