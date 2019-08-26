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
  matri: Matricula;
  private APIMatriculas = 'http://localhost:3000/api/matriculas?filter[where][idAsignatura]=';

  constructor(private dbService: DbServiceService,
              private router: Router,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.DameListaMatriculas();
    this.dbService.DameClase(this.dbService.ReturnIdClase()).subscribe( clase => {  console.log('Mi clase: ' + clase.avatares);
                                                                                    this.clase = clase;
                                                                                    this.AbrirDivAvatares();
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

  FiltraPersona(idAlumno: string) {
    return this.lista.filter(matricula => matricula.idAlumno === idAlumno)[0];
  }

  Pon(persona: Persona) {
    this.dbService.PonPersona (persona).subscribe(() => this.Mostrar());
  }

  Eliminar() {

    this.dbService.Eliminar(this.NombreEliminar)
    .subscribe();
   // console.log()
    this.dbService.EliminarMatricula(this.FiltraPersona(this.NombreEliminar)).subscribe();
    this.showAlert();
    this.Mostrar();

  }

  IrAForm() {
    this.dbService.SetIdClase(this.clase.id);
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

    let list = document.getElementsByClassName('avataresActivos') as HTMLCollectionOf<HTMLElement>;
    var i;


    console.log('Antes de clickar el estado es: ' + list);

    var i;
    for (i = 0; i < list.length; i++) {
      console.log('Aqui entro');
      if (this.clase.avatares === true) {
        console.log(list[i].style.display);
        list[i].style.display = 'block';
      } else {
        list[i].style.display = 'none';
        console.log('No está activo el juego de avatares' + this.clase.avatares);
      }
    }


  }

  CambiarPermisoPelo(idAlumno: string ) {
    // Compruebo que el id del alumno es el correcto
    console.log('El id del Alumno que me llega ' + idAlumno);
    // Escojo elelemento HTML (ion-checkbox) en el que se ha hecho click
    var x = document.getElementById('P1' + idAlumno);

    // Cargo la matrícula que contiene los datos de la asignatura y alumno que quiero
    this.matri = this.FiltraPersona(idAlumno);
    // var y = ;
    console.log('Esto vale x' + x);

    if (this.matri.pelo === true) {
      x.setAttribute('checked', 'false');
      this.dbService.GuardarP1(this.matri, false).subscribe();
      this.dbService.GuardarPelo(this.matri, ' ').subscribe();
    } else {
      x.setAttribute('checked', 'true');
      this.dbService.GuardarP1(this.matri, true).subscribe();
      console.log('Tenemos un true' + x);
    }

  }

  CambiarPermisoOjos(idAlumno: string ) {
    // Compruebo que el id del alumno es el correcto
    console.log('El id del Alumno que me llega ' + idAlumno);
    // Escojo elelemento HTML (ion-checkbox) en el que se ha hecho click
    var x = document.getElementById('P2' + idAlumno);

    // Cargo la matrícula que contiene los datos de la asignatura y alumno que quiero
    this.matri = this.FiltraPersona(idAlumno);
    // var y = ;
    console.log('Esto vale x' + x);

    if (this.matri.ojos === true) {
      x.setAttribute('checked', 'false');
      this.dbService.GuardarP2(this.matri, false).subscribe();
      this.dbService.GuardarOjos(this.matri, ' ').subscribe();
    } else {
      x.setAttribute('checked', 'true');
      this.dbService.GuardarP2(this.matri, true).subscribe();
      console.log('Tenemos un true' + x);
    }

  }

  CambiarPermisoComp(idAlumno: string ) {
    // Compruebo que el id del alumno es el correcto
    console.log('El id del Alumno que me llega ' + idAlumno);
    // Escojo elelemento HTML (ion-checkbox) en el que se ha hecho click
    var x = document.getElementById('P3' + idAlumno);

    // Cargo la matrícula que contiene los datos de la asignatura y alumno que quiero
    this.matri = this.FiltraPersona(idAlumno);
    // var y = ;
    console.log('Esto vale x' + x);

    if (this.matri.complemento === true) {
      x.setAttribute('checked', 'false');
      this.dbService.GuardarP3(this.matri, false).subscribe();
      this.dbService.GuardarComp(this.matri, ' ').subscribe();
    } else {
      x.setAttribute('checked', 'true');
      this.dbService.GuardarP3(this.matri, true).subscribe();
      console.log('Tenemos un true' + x);
    }

  }

  CambiarPermisoVerLista(idAlumno: string ) {
    // Compruebo que el id del alumno es el correcto
    console.log('El id del Alumno que me llega ' + idAlumno);
    // Escojo elelemento HTML (ion-checkbox) en el que se ha hecho click
    var x = document.getElementById('P4' + idAlumno);

    // Cargo la matrícula que contiene los datos de la asignatura y alumno que quiero
    this.matri = this.FiltraPersona(idAlumno);
    // var y = ;
    console.log('Esto vale x' + x);

    if (this.matri.verclase === true) {
      x.setAttribute('checked', 'false');
      this.dbService.GuardarP4(this.matri, false).subscribe();
      this.dbService.GuardarBoca(this.matri, ' ').subscribe();
    } else {
      x.setAttribute('checked', 'true');
      this.dbService.GuardarP4(this.matri, true).subscribe();
      console.log('Tenemos un true' + x);
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
