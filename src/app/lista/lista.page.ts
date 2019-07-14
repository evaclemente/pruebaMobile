import { Component, OnInit, Input } from '@angular/core';
import { Persona } from '../Persona';
import { DbServiceService } from '../db-service.service';
import { LoginPage } from '../login/login.page';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  lista: Persona[];
  nombre: string;
  pass: string;
  rol: string;
  puntos: number;

  constructor(private dbService: DbServiceService,
              private router: Router,
              private http: HttpClient) {
    // this.lista = navParams.get('lista');
  }

  ngOnInit() {
    this.dbService.dameTodos()
    .subscribe(lista => {
                         this.lista = lista;
                         console.log('Ya está aquí la lista');
                         console.log(this.lista);
                        }
              );
  }

  Mostrar() {
    console.log('Voy a pedir');
    this.dbService.dameTodos()
    .subscribe(lista => {
                          this.lista = lista;
                          console.log('Ya ha llegado');
                          console.log(this.lista);
                        });
  }

  Pon(persona: Persona) {
    this.dbService.PonPersona (persona).subscribe(() => this.Mostrar());
  }

  IrAForm() {
    console.log('Me voy al formulario para añadir personas');
    this.router.navigate(['/formpersona']);
  }

}
