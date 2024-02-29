import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  titleProject = 'Projeto TASKs (lista de tarefas)';
  text = `Projeto de exemplo do uso de Angular em conjunto com angular material,  consumindo uma API desenvolvida em
  Java com Spring Boot onde a api recebe a tarefa, uma data limite para termino e o status ( concluido ou não).
  `;
  createdBy =`Clelton Henrique`;

  constructor( private router: Router,
    private route: ActivatedRoute,){}

  btnListTasks(){
    this.router.navigate (['list'], { relativeTo: this.route });
  }
}
