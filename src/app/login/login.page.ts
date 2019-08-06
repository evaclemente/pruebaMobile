import { Component, OnInit } from '@angular/core';
// Primero hago los imports necesarios, en este caso necesito estos tres de angular/forms
import { FormGroup } from '@angular/forms';
// También tengo que disponer de IonicPage, NavController y Component
import { NavController } from '@ionic/angular';
import { DbServiceService } from '../db-service.service';
import { Persona } from '../Persona';
import { Clase } from '../Clase';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import {ProfesorPage} from '../profesor/profesor.page';
// Importo el servicio que me va a permitir pasar datos entre páginas
import { DatosService } from '../datos.service';
// El protocolo httpClient lo necesito para poder usar siempre un servicio, por eso lo importo
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert';

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
  clases: Clase[];

  constructor(private dbService: DbServiceService,
              private router: Router,
              private datosService: DatosService,
              private http: HttpClient) {
  }

  ngOnInit() {
  }

  Autentificar() {
    console.log(this.nombre);
    console.log(this.pass);
    this.dbService.DamePersona(this.nombre)
                  .subscribe(persona => {console.log(persona);
                                         this.usuario = persona;
                                         console.log('aaaa' + persona);
                                         this.datosService.EnviarPersona(persona.nombre);
                                         if (persona != null) {
                                          if (persona.pass === this.pass) {
                                            if (persona.rol === 'Profesor') {
                                              this.router.navigate(['/profesor']);
                                            } else {
                                              this.router.navigate(['/alumno']);
                                            } } else {

                                            console.log('Contraseña incorrecta');
                                            this.showAlert();
                                          }

                                         }

    });
  }

  showAlert() {
    swal({
          title: 'Contraseña equivocada!',
          text: 'Por favor, introduce una contraseña válida',
          icon: 'error'
        });
  }
}
