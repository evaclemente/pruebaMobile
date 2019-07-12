import { Component, OnInit, Input } from '@angular/core';
import { Persona } from '../Persona';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DatosService } from '../datos.service';
import { DbServiceService } from '../db-service.service';
@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  usuario: Persona;
  pass: string;
  constructor(private router: Router,
              private http: HttpClient,
              private datosService: DatosService,
              private dbService: DbServiceService) { }

  ngOnInit( ) {
    this.datosService.$getObjectSource.subscribe(persona => { this.usuario = persona;
                                                              console.log(this.usuario.nombre);
                                                              console.log(this.usuario.pass);
                                                              console.log(this.usuario.rol);
                                                              console.log(this.usuario.voz);
                                                              });
   }


  IrAClases() {
    this.router.navigate(['/clases']);
  }

  IrALista() {
    console.log('Voy a Mostrar la lista');
    this.router.navigate(['/lista']);
  }

  IrALogin() {
    this.router.navigate(['/login']);
  }

  IrAGaleria() {
    this.router.navigate(['/galeria']);
  }
}
