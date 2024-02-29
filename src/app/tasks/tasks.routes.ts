import { Routes } from '@angular/router';
import { TasksFormComponent } from './containers/tasks-form/tasks-form.component';
import { TasksComponent } from './containers/tasks/tasks.component';
import { TaskResolver } from './guards/task.resolver';
import { HomeComponent } from './home/home.component';


export const TASKS_ROUTES: Routes = [
  {path:'', component: HomeComponent, resolve: { task: TaskResolver},  },
  {path:'list', component: TasksComponent, resolve: { task: TaskResolver}},
  {path:'new', component: TasksFormComponent, resolve: { task: TaskResolver} },
  {path:'edit/:id', component: TasksFormComponent, resolve: { task: TaskResolver} }

];
