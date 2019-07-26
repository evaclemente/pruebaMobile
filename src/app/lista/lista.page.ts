import { Component, OnInit, Input } from '@angular/core';
import { Persona } from '../Persona';
import { DbServiceService } from '../db-service.service';
import { LoginPage } from '../login/login.page';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert';

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
  NombreEliminar: string;

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
    this.AbrirInput();
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

  Eliminar() {

    this.dbService.Eliminar(this.NombreEliminar)
    .subscribe();
    this.showAlert();
    this.Mostrar();

  }

  IrAForm() {
    console.log('Me voy al formulario para añadir personas');
    this.router.navigate(['/formpersona']);
  }

  AbrirInput() {
    var x = document.getElementById('dropup');
    console.log('Esto funciona');
    console.log(x.style.display);
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  VolverAClases() {
    console.log('Cierro la lista');
    this.router.navigate(['/clases']);
  }

  showAlert() {
    swal({
          title: 'Has eliminado a ' + this.NombreEliminar,
          icon: 'success'
        });
  }

}
