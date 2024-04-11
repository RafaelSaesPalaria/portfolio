import { Component } from '@angular/core';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
  project = {
    name: "Simple chat",
    description: "A simple multi-client chat",
    image: "java-project1-img",
    link: "https://github.com/RafaelSaesPalaria/simpleChat"
  }
}
