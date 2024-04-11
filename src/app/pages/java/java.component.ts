import { Component } from '@angular/core';
import { ProjectItemComponent } from '../../components/project-item/project-item.component';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-java',
  standalone: true,
  imports: [ProjectItemComponent,CommonModule],
  templateUrl: './java.component.html',
  styleUrl: './java.component.css'
})
export class JavaComponent {
  projects!:[{
    name:string,
    description: string;
    image: string;
    link: string}]

  constructor(projectService: ProjectService) {
    let general_projects = projectService.getProjects()
    this.projects = general_projects['java']
  }
  
}
