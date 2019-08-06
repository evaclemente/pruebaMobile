import { Component, OnInit } from '@angular/core';
import { Persona } from '../Persona';
import { HttpClient } from '@angular/common/http';
import { DbServiceService } from '../db-service.service';
import { from } from 'rxjs';
import { DatosService } from '../datos.service';
import { Matricula } from '../Matricula';
import { Router } from '@angular/router';
@Component({
  selector: 'app-asignaturasalum',
  templateUrl: './asignaturasalum.page.html',
  styleUrls: ['./asignaturasalum.page.scss'],
})
export class AsignaturasalumPage implements OnInit {

  lista: Matricula[];
  private APIMatriculas = 'http://localhost:3000/api/matriculas?filter[where][idAlumno]=';
  private APIClases = 'http://localhost:3000/api/Clases';
  nombre: string;

  constructor(private http: HttpClient,
              private dbService: DbServiceService,
              private datosService: DatosService,
              private router: Router) { }

  ngOnInit() {
    this.nombre = this.datosService.DameNombre();
    this.DameAsignaturas();
  }

  DameAsignaturas() {
    this.http.get<any[]>(this.APIMatriculas + this.nombre)
    .subscribe( lista => { console.log('Ya estan las asignaturas:' + lista);
                           this.lista = lista;

                          });

  }

  myFunction(identificador: string) {

    console.log('El identificador es: ' + identificador);

    console.log(document.getElementById(identificador));

    var x = document.getElementById(identificador);

    console.log('Antes de clickar el estado es: ' + x.style.display);

    if (x.style.display === 'block') {
      x.style.display = 'none';
      console.log('Ahora el estado es: ' + x.style.display);
    } else {
      x.style.display = 'block';
      console.log('Ahora el estado es: ' + x.style.display);
    }
  }

  JuegoAvatares(idAsignatura: string) {
    console.log('Cargo datos de ' + idAsignatura);
    var x = document.getElementById('Juego' + idAsignatura);
    console.log('Valor de x: ' + x);
    var avatares;
    this.dbService.DameClase(idAsignatura).subscribe( asignatura => { console.log('Su juego es' + asignatura.avatares);
                                                                      avatares = asignatura.avatares;
                                                                      if (avatares === true) {
                                                                        document.getElementById('Juego' + idAsignatura)
                                                                        .setAttribute('disabled', 'false');
                                                                      } else {
                                                                        document.getElementById('Juego' + idAsignatura)
                                                                        .setAttribute('disabled', 'true');
                                                                      }
                                                                    });


  }

  IrAAvatares(idAsignatura: string) {
    this.datosService.GuardaIDClase(idAsignatura);
    this.router.navigate(['/home']);
  }

  IrAAlumno() {
    this.router.navigate(['/alumno']);
  }

  IrAInfo(idAsignatura: string) {
    this.dbService.SetNombrePersona(this.nombre);
    this.dbService.SetIdClase(idAsignatura);
    this.router.navigate(['/info']);
  }



}

