import { Routes } from '@angular/router';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

export const routes: Routes = [
    {path:"", component: MainPageComponent},
    {path:"web", component: ProjectListComponent},
    {path:"java", component: ProjectListComponent}
];
