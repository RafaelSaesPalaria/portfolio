import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.css'
})
export class ProjectItemComponent {
  @Input() project!:{
    name: string,
    description: string,
    image: string,
    link: string
  }

}
