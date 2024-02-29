import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { Task } from '../model/task';
import { TaskPage } from '../model/task-page';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  private readonly API = 'http://localhost:9090/api/tasks';


  constructor(private http: HttpClient) { }

  loadById(id: string){
    return this.http.get<Task>(`${this.API}/${id}`);
  }

  list(page = 0, pageSize=8){
    return this.http.get<TaskPage>(this.API, { params: {page, pageSize}})
    .pipe(
      first(),
      )
  }

  save(record: Partial<Task>){
    record.data = this.tratarData(record.data);
    if (record.id){
      return this.update(record);
    }
    return this.create(record)
  }

  remove(id: string){
    return this.http.delete(`${this.API}/${id}`);
  }


  private create(record: Partial<Task>){

    return this.http.post<Task>(this.API, record).pipe(
      first()
    );
  }

  private update(record: Partial<Task>){
    return this.http.put<Task>(`${this.API}/${record.id}`, record).pipe(
      first()
    );
  }


  tratarData(data: any){
    return formatDate(data,'yyyy-MM-dd','en');
  }


}
