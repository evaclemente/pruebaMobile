import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DbServiceService } from '../db-service.service';
import { Persona } from '../Persona';
import { DatosService } from '../datos.service';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {

  constructor( private http: HttpClient,
               private dbService: DbServiceService,
               private datosService: DatosService) {
  }

  usuario: Persona;

  ngOnInit() {
    this.datosService.$getObjectSource.subscribe(persona => {this.usuario = persona; });
  }

}
