import { Component, OnInit, Input } from '@angular/core';
import { Persona } from '../Persona';
import { DbServiceService } from '../db-service.service';
import { LoginPage } from '../login/login.page';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert';
import { Clase } from '../Clase';
import { Matricula } from '../Matricula';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  lista: Matricula[];
  nombre: string;
  pass: string;
  rol: string;
  puntos: number;
  NombreEliminar: string;
  clase: Clase;
  idClase: string;
  private APIMatriculas = 'http://localhost:3000/api/matriculas?filter[where][idAsignatura]=';

  constructor(private dbService: DbServiceService,
              private router: Router,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.DameListaMatriculas();
    this.dbService.DameClase(this.dbService.ReturnIdClase()).subscribe( clase => {  console.log('Mi clase: ' + clase.avatares);
                                                                                    this.clase = clase;
                                                                                    // this.AbrirDivAvatares();
                                                                                  });



    // this.dbService.dameTodos()
    // .subscribe(lista => {
    //                      this.lista = lista;
    //                      console.log('Ya está aquí la lista');
    //                      console.log(this.lista);
    //                     }
    //           );
    //
    this.AbrirInput();
  }

  Mostrar() {
    console.log('Voy a pedir');
    this.http.get<any[]>(this.APIMatriculas + this.dbService.ReturnIdClase())
    .subscribe( lista => { console.log('Ya estan las matriculas:' + lista);
                           this.lista = lista;
                           console.log('Ya ha llegado');
                           console.log(this.lista);
                        });
  }

  DameListaMatriculas() {
    this.http.get<any[]>(this.APIMatriculas + this.dbService.ReturnIdClase())
    .subscribe( lista => { console.log('Ya estan las matriculas:' + lista);
                           this.lista = lista;

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

  AbrirDivAvatares() {

    var list = document.getElementsByClassName('avataresActivos'); // HTMLElement;
    // let list as HTMLElement


    console.log('Antes de clickar el estado es: ' + list);

    if (this.clase.avatares === true) {
      console.log('Aqui entro');

      // let list = <HTMLElement[]><any>document.querySelectorAll('li');
      // console.log('Ahora el estado es: ' + x.style.display);

    } else {
      var n;
      for (n = 0; n < list.length; n ++) {
        (list[n] as HTMLElement).style.display = 'none';
      }
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
