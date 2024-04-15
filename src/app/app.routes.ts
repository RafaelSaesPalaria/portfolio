import { Routes } from '@angular/router';
import { JavaComponent } from './pages/java/java.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { WebComponent } from './pages/web/web.component';

export const routes: Routes = [
    {path:"portfolio/", component: MainPageComponent},
    {path:"portfolio/web", component: WebComponent},
    {path:"portfolio/java", component: JavaComponent}
];
