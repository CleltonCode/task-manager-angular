import { Routes } from '@angular/router';


export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'tasks' , pathMatch: 'full'},
  {
    path: 'tasks',
      loadChildren: () => import('./tasks/tasks.routes').then(m => m.TASKS_ROUTES)
  }

  // {path:'', component: HomeComponent},
  // {path:'list', component: TasksComponent, resolve: { task: TaskResolver}},
  // {path:'new', component: TasksFormComponent, resolve: { task: TaskResolver}},
  // {path:'edit/:id', component: TasksFormComponent, resolve: { task: TaskResolver}}


];
