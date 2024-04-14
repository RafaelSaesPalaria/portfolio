import { Injectable } from '@angular/core';
import path from 'path';
import { readFileSync } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor() {}
  getProjects() {
    return JSON.parse(
      readFileSync(
        path.resolve(path.dirname(''),'./src/app/projects.json')).toString()
    )
  }
}
