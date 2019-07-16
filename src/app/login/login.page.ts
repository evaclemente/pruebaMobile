import { Component, OnInit } from '@angular/core';
// Primero hago los imports necesarios, en este caso necesito estos tres de angular/forms
import { FormGroup } from '@angular/forms';
// También tengo que disponer de IonicPage, NavController y Component
import { NavController } from '@ionic/angular';
import { DbServiceService } from '../db-service.service';
import { Persona } from '../Persona';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import {ProfesorPage} from '../profesor/profesor.page';
// Importo el servicio que me va a permitir pasar datos entre páginas
import { DatosService } from '../datos.service';
// El protocolo httpClient lo necesito para poder usar siempre un servicio, por eso lo importo
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: Persona;
  myForm: FormGroup;
  lista: Persona[];
  nombre: string;
  pass: string;
  rol: string;
  puntos: number;

  constructor(private dbService: DbServiceService,
              private router: Router,
              private datosService: DatosService,
              private http: HttpClient) { } // this.myForm = this.createMyForm();

  ngOnInit() {
  }

  Mostrar() {
    this.dbService.dameTodos()
    .subscribe(lista => {
                          this.lista = lista;
                          console.log ('Ya está aquí la lista');
                          console.log (this.lista);
                        }

              );

    console.log ('Ya me he suscrito');
  }

  // Comento este método aquí porque lo voy a usar realmente en el apartado de mis clases, que
  // es desde donde va a poder el profesor ver los alumnos de cada clase
  IrALista() {
   console.log('Voy a Mostrar la lista');
   this.router.navigate(['/lista']);
  }


  Autentificar() {
    console.log(this.nombre);
    console.log(this.pass);
    this.dbService.DamePersona(this.nombre)
                  .subscribe(persona => {console.log(persona);
                                         this.usuario = persona;
                                         this.datosService.EnviarPersona(this.nombre);
                                         if (persona != null) {

                                          if (persona.rol === 'Profesor') {
                                            this.router.navigate(['/profesor']);
                                          } else {
                                            this.router.navigate(['/alumno']);
                                          }
                                         }

    });
  }

 // Seleccionar(persona: Persona) {
   // this.usuarioSeleccionado = persona;
 // }

}

// (persona => persona.nombre === nombre
//   && persona.pass === persona.pass
//   );
//   console.log.
