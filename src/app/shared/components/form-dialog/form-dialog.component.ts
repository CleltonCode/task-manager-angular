import { Component, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from '../../../app.component';
import { Task } from '../../../components/model/task';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [MatFormFieldModule,
    DatePipe,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    AppComponent
  ],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.scss'
})
export class FormDialogComponent {
  taskForm!: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) public task: Task) {

  }


  sndData(){
    console.log('submited values: ', this.taskForm.value);
  }

}
