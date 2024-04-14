import { Component } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ProjectItemComponent } from '../../components/project-item/project-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-web',
  standalone: true,
  imports: [ProjectItemComponent,CommonModule],
  templateUrl: './web.component.html',
  styleUrl: './web.component.css'
})
export class WebComponent {
  projects!:{
    name:string,
    description: string;
    img_name: string;
    link: string}[]

  constructor(projectService: ProjectService) {
    let general_projects = projectService.getProjects()
    this.projects = general_projects["web"]
    console.log(general_projects)
  }
  
}
