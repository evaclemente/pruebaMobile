import { Component, OnInit, Input } from '@angular/core';
import { Persona } from '../Persona';
import { DbServiceService } from '../db-service.service';
// import { from } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  @Input() lista: Persona[];
  nombre: string;
  pass: string;
  rol: string;
  puntos: number;

  constructor() { }

  ngOnInit() {
  }

}
