import { Component } from '@angular/core';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {
  skills = [
    { name: 'JavaScript', level: 'Intermediate' },
    { name: 'Angular', level: 'Advanced' },
    
    // Add more skills as needed
  ];
  interests = [
    'Coding',
    'Traveling',
    'Photography',
    // Add more interests as needed
  ];
  languages = [
    { name: 'English', level: 'Fluent' },
    { name: 'Spanish', level: 'Intermediate' },
    { name: 'French', level: 'Basic' },
    // Add more languages as needed
  ];
  profiles = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/your-profile' },
    { name: 'GitHub', url: 'https://github.com/your-profile' },
    { name: 'Personal Website', url: 'https://yourwebsite.com' }
  ];

  education = [
    {
      institutionName: 'University of Example',
      studyType: 'Bachelor\'s Degree',
      areaOfStudy: 'Computer Science',
      dateRange: '2015 - 2019',
      score: "7.8",
      summary: 'Focused on software development and data structures.'
    },
    {
      institutionName: 'Example Institute',
      studyType: 'Master\'s Degree',
      areaOfStudy: 'Software Engineering',
      dateRange: '2019 - 2021',
      score :"8.93",
      summary: 'Specialized in software architecture and project management.'
    }
    // Add more education records as needed
  ];
  experiences = [
    {
      companyName: 'Example Company',
      position: 'Software Developer',
      dateRange: 'June 2020 - Present',
      companyLocation: 'New York, USA',
      companyWebsite: 'https://example.com',
      summary: 'Developed and maintained web applications, collaborated with cross-functional teams, and implemented new features.'
    },
    {
      companyName: 'Another Company',
      position: 'Junior Developer',
      dateRange: 'January 2018 - May 2020',
      companyLocation: 'San Francisco, USA',
      companyWebsite: 'https://anothercompany.com',
      summary: 'Assisted in the development of mobile applications, performed debugging and testing, and participated in code reviews.'
    }
    // Add more experience records as needed
  ];

  projects= [
    {
      "Title": "Personal Website",
      "description": "A personal portfolio website showcasing my work.",
      "dateRange": "Feb 2021 - May 2021",
      "githubLinks": "http://github.com/johndoe/personal-website",
      "technologyUsed": "HTML, CSS, JavaScript"
    }
  ]
}
