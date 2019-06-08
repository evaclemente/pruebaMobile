import { Component, OnInit } from '@angular/core';
import { Persona } from '../Persona';
// import { Location } from '@angular/common';
import { DbServiceService } from '../db-service.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.scss'],
})
export class ProfesorComponent implements OnInit {

  lista: Persona[];
  nombre: string;
  pass: string;
  rol: string;
  puntos: number;

  constructor(private dbService: DbServiceService) { }

  ngOnInit() {}

  Mostrar() {
    this.dbService.dameTodos()
    .subscribe(lista => {
                          this.lista = lista;
                          console.log ('Ya ha llegado la lista');
                          console.log (this.lista);
                        }
              );
  }

  // Incrementar(nombre: string) {
  //   this.lista = this.dbService.this.service.function
  //     .subscribe(arg => this.property = arg);
  // }
}
