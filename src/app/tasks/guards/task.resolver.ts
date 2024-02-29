import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { Task } from '../model/task';
import { TaskService } from "../services/task.service";


@Injectable({
  providedIn: 'root'
})

export class TaskResolver{

  constructor(private service: TaskService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task>{
    if (route.params && route.params['id']){
      return this.service.loadById(route.params['id']);
    }
    return of({id: '' , description: '', data:'', completed:  ''} );
  }


}
