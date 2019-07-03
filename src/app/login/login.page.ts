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
              private router: Router) { } // this.myForm = this.createMyForm();

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

  IrALista() {
    console.log('Voy a Mostrar la lista');
    this.router.navigate(['/lista']);
  }


  Autentificar() {
    console.log(this.nombre);
    console.log(this.pass);
    this.dbService.DamePersona(this.nombre)
                  .subscribe(persona => {console.log(persona);
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
