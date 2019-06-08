import { Component, OnInit } from '@angular/core';
import { Persona } from '../Persona';
import { from } from 'rxjs';
import {DbServiceService} from '../db-service.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss'],
})
export class PersonaComponent implements OnInit {


  persona: Persona;
  constructor() { }

  ngOnInit() {

  }

  Mostrar() {
    console.log ('Entro a mostrar');
    this.persona = new Persona ('Juan', 'JJJ', 'Alumno', 10);
  }

}
