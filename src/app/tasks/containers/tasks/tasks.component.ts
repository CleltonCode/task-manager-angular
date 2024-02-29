import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { Task } from '../../model/task';
import { TaskPage } from '../../model/task-page';
import { TaskService } from '../../services/task.service';



@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [AppMaterialModule, TaskListComponent, MatProgressSpinnerModule],
  templateUrl: './tasks.component.html',

  styleUrl: './tasks.component.scss'
})
export class TasksComponent {

  Tasks$: Observable<TaskPage> | null = null ;
  @ViewChild(MatPaginator) paginator !: MatPaginator
  task!:Observable<Task> ;

  pageIndex = 0;
  pageSize = 5;

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    ){
      this.refresh();
    }

    refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 5 }) {
      this.Tasks$ = this.taskService.list(pageEvent.pageIndex, pageEvent.pageSize)
        .pipe(
          tap(() => {
            this.pageIndex = pageEvent.pageIndex;
            this.pageSize = pageEvent.pageSize;
          }),
          catchError(error => {
            this.onError('Erro ao carregar Tarefas.');
            return of({ tasks:[], totalElements: 0, totalPages: 0});
          })
        );
    }

    onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAdd() {
    this.router.navigate (['/tasks/new'],{ relativeTo: this.route });
  }

  onEdit(task: Task) {
    this.router.navigate(['/tasks/edit', task.id], { relativeTo: this.route });
  }

  onRemove(task:Task) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esta tarefa?'
    });

    dialogRef.afterClosed().subscribe((result: boolean)=> {

      if(result){

        this.taskService.remove(task.id).subscribe(
          ()=> {
            this.snackBar.open('Task removida com sucesso!', 'X', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });

          },
          () => this.onError('Erro ao tentar remover task.')
        )
      }
        this.refresh();
    });
  }



}
