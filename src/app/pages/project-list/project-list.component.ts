import { Component } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
  projects!:{
    name:string,
    description: string;
    img_name: string;
    link: string}[]

  constructor(projectService: ProjectService, activatedRoute: ActivatedRoute) {
    let general_projects = projectService.getProjects()

    if (activatedRoute.routeConfig?.path === 'java' ||
      activatedRoute.routeConfig?.path === 'web') {
        
      this.projects = general_projects[activatedRoute.routeConfig?.path]
    }
  }
  
}
