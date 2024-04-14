import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    // Load the JSON data when the service is created
    this.loadProjects();
  }

  private loadProjects(): void {
    this.http.get<any>('./assets/projects.json').subscribe(data => {
      // Store the loaded data in the BehaviorSubject
      this.projectsData.next(data);
    });
  }

  getProjects() {
    return this.projectsData.getValue();
  }
}
