import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActivatedRoute } from '@angular/router';
import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TaskService } from '../../services/task.service';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import 'moment/locale/pt-br';
import { Task } from '../../model/task';


const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};


@Component({
  selector: 'app-tasks-form',
  standalone: true,
  imports: [AppMaterialModule, TaskListComponent],
  providers:[
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br'}
  ],
  templateUrl: './tasks-form.component.html',
  styleUrl: './tasks-form.component.scss'
})
export class TasksFormComponent implements OnInit {

  form!: FormGroup;

defaultSelected: string = 'nao';


  constructor(
              private formBuilder: FormBuilder,
              private service: TaskService,
              private snackBar: MatSnackBar,
              private location: Location,
              private route: ActivatedRoute,){

  }

  ngOnInit(): void {
      const task: Task = this.route.snapshot.data['task'];
      this.form = this.formBuilder.group({
        id: [task.id],
        data: [task.data, [Validators.required]],
        description: [task.description, [Validators.required]],
        completed: [task.completed]
      });
      if (task.id){
        this.defaultSelected=task.completed;
      }
      this.form.get('completed')?.setValue(this.defaultSelected);
  }

  onSubmit(){
    this.service.save(this.form.value)
    .subscribe(result => this.onSuccess(), error=> this.onError());
  }

  onCancel(){
    this.location.back();
  }

  private onError(){
    this.onMessage("Erro ao salvar tarefa.");
    this.onCancel();
  }

  private onSuccess(){
    this.onMessage("Tarefa salva com sucesso.");
    this.onCancel();
  }

  private onMessage(message: string){
    this.snackBar.open(message, '', {
      duration: 3000
    });
  }

}
