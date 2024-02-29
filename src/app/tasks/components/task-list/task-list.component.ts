import { Component, EventEmitter, Input, Output } from '@angular/core';


import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { Task } from '../../model/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  imports: [AppMaterialModule]

})
export class TaskListComponent {

  @Input() tasks: Task[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['id', 'data', 'description', 'completed', 'change'];

 constructor(){}

  onAdd() {
    this.add.emit(true);
  }

  onEdit(task: Task) {
    this.edit.emit(task);
  }

  onDelete(task: Task) {
    this.remove.emit(task);
  }


}


