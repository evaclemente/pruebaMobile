import { Component, OnInit } from '@angular/core';
import { Persona } from '../Persona';
import { HttpClient } from '@angular/common/http';
import { DbServiceService } from '../db-service.service';
import { from } from 'rxjs';
import { DatosService } from '../datos.service';
import { Matricula } from '../Matricula';
@Component({
  selector: 'app-asignaturasalum',
  templateUrl: './asignaturasalum.page.html',
  styleUrls: ['./asignaturasalum.page.scss'],
})
export class AsignaturasalumPage implements OnInit {

  lista: Matricula[];
  private APIMatriculas = 'http://localhost:3000/api/matriculas?filter[where][idAlumno]=';
  nombre: string;

  constructor(private http: HttpClient,
              private dbService: DbServiceService,
              private datosService: DatosService) { }

  ngOnInit() {
  }

  DameAsignaturas() {
    this.http.get<any[]>(this.APIMatriculas + this.nombre)
    .subscribe( lista => { console.log('Ya estan las asignaturas:' + lista);
                           this.lista = lista; });

  }

}
