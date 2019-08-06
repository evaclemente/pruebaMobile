import { Component, OnInit } from '@angular/core';
import {Clase} from '../Clase';
import { Matricula } from '../Matricula';
import { Persona } from '../Persona';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { DbServiceService } from '../db-service.service';
import { Http, ResponseContentType, RequestOptions, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  clase: Clase;
  idAlumno: string;
  matriculados: Matricula[];
  matri: Matricula;

  private APIPelos = 'http://localhost:3000/api/imagenes/Pelos';
  private APIOjos = 'http://localhost:3000/api/imagenes/Ojos';
  private APIComplementos = 'http://localhost:3000/api/imagenes/Complementos';

  URLP: string;
  URLO: string;
  URLC: string;

  constructor( private http: HttpClient,
               private router: Router,
               private dbService: DbServiceService,
               private http2: Http) { }

  ngOnInit() {

    // Primero traigo la clase para poder mostrar sus datos
    this.AvatarVisible();
    this.dbService.DameClase(this.dbService.ReturnIdClase())
    .subscribe( clase => { this.clase = clase;
                           this.dbService.DameMatriculaAlumno(clase.id)
                                          .subscribe( lista => {this.matriculados = lista;
                                                                this.matri = this.FiltroNombre();
                                                                });
                          });

    // Una vez tengo los datos de la clase, recupero también el nombre
    // de la persona, para poder traerme los datos de su matrícula en esta asignatura

    // Llamo a una función que me dará todas las matriculas de la asignatura


  }

  // Creo una función para filtrar las matrículas de la asignatura y
  // quedarme sólo con la correspondiente al id del Alumno que tenemos

  FiltroNombre() {
    console.log('Entro a filtrar');
    return this.matriculados.filter( matricula => matricula.idAsignatura === this.idAlumno)[0];
  }

  AvatarVisible() {

    var x = document.getElementById('avatar');
    console.log('Elemento' + x);
    // console.log(this.matri.pelo);


    if (this.clase.avatares === true) {
      console.log('Estoy aquí');
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }

  }

   // Las tres funciones que aparecen a continuación van a iniciar la descarga de las imagenes
  // correspondientes a cada contenedor (que tenemos 3, uno para cada elemento del avatar)

  DescargaFotoPelo() {
    if (this.matri.URLpelo !== undefined || this.matri.URLpelo !== '') {
      this.http2.get(this.APIPelos + '/download/' + this.matri.URLpelo,
                                        {responseType: ResponseContentType.Blob} )
                                        .subscribe(response => {
                                                                console.log(response);
                                                                this.Descargaelementos(response, this.URLP); }); }
  }

  DescargaFotoOjos() {
    if (this.matri.URLojos !== undefined || this.matri.URLojos !== '') {
      this.http2.get(this.APIOjos + '/download/' + this.matri.URLojos,
                                        {responseType: ResponseContentType.Blob} )
                                        .subscribe(response => {
                                                                console.log(response);
                                                                this.Descargaelementos(response, this.URLO); }); }
  }

  DescargaFotoComp() {
    if (this.matri.URLcomplemento !== undefined || this.matri.URLcomplemento !== '') {
      this.http2.get(this.APIComplementos + '/download/' + this.matri.URLcomplemento,
                                        {responseType: ResponseContentType.Blob} )
                                        .subscribe(response => {
                                                                console.log(response);
                                                                this.Descargaelementos(response, this.URLC); }); }
  }

  // Despues del inicio de la descarga, necesitamos convertir la respuesta de la anterior función a string
  // para así poder añadir la src de la imagen y que podamos mostrarla en HTML

  Descargaelementos(response: Response, url: string) {
    const blob = new Blob([response.blob()], {type: 'image/jpg'});

    const reader = new FileReader();
    reader.addEventListener('load', () => {
     url = reader.result.toString();
     console.log(url);
    }, false);

    if (blob) {
      reader.readAsDataURL(blob);
    }
  }

  IrAAsignaturas() {
    this.router.navigate(['/asignaturasalum']);
  }

}
