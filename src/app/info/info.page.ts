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
 // idClase: string;
  clase: Clase;
  idAlumno: string;
  matriculados: Matricula[];
  matri: Matricula;

  private APIPelos = 'http://localhost:3000/api/imagenes/Pelos';
  private APIOjos = 'http://localhost:3000/api/imagenes/Ojos';
  private APIComplementos = 'http://localhost:3000/api/imagenes/Complementos';
  private APIBustos = 'http://localhost:3000/api/imagenes/Bustos';
  private APIBocas = 'http://localhost:3000/api/imagenes/Bocas';

  URLBusto: string;
  URLP: string;
  URLO: string;
  URLC: string;

  constructor( private http: HttpClient,
               private router: Router,
               private dbService: DbServiceService,
               private http2: Http) { }

  ngOnInit() {
    this.idAlumno = this.dbService.ReturnNombrePersona();
    // Primero traigo la clase para poder mostrar sus datos
   // this.idClase = this.dbService.ReturnIdClase();
    this.dbService.DameClase(this.dbService.ReturnIdClase())
    .subscribe( clase => { console.log('He recibido la clase: ' + clase);
                           this.clase = clase;
                           this.RDameFotoBus(clase.busto);
                           this.AvatarVisible();
                           this.dbService.DameMatriculaAlumno(clase.id)
                                          .subscribe( lista => {this.matriculados = lista;
                                                                this.matri = this.FiltroNombre();
                                                                console.log(this.matri);
                                                                this.DescargaFotoPelo();
                                                                this.DescargaFotoOjos();
                                                                this.DescargaFotoComp();
                                                                this.DescargaFotoBoca();
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
    return this.matriculados.filter( matricula => matricula.idAlumno === this.idAlumno)[0];
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
                                                                this.Descargaelementos(response, this.matri.URLpelo); }); }
  }

  DescargaFotoOjos() {
    if (this.matri.URLojos !== undefined || this.matri.URLojos !== '') {
      this.http2.get(this.APIOjos + '/download/' + this.matri.URLojos,
                                        {responseType: ResponseContentType.Blob} )
                                        .subscribe(response => {
                                                                console.log(response);
                                                                this.Descargaelementos(response, this.matri.URLojos); }); }
  }

  DescargaFotoComp() {
    if (this.matri.URLcomplemento !== undefined || this.matri.URLcomplemento !== '') {
      this.http2.get(this.APIComplementos + '/download/' + this.matri.URLcomplemento,
                                        {responseType: ResponseContentType.Blob} )
                                        .subscribe(response => {
                                                                console.log(response);
                                                                this.Descargaelementos(response, this.matri.URLcomplemento); }); }
  }

  DescargaFotoBoca() {
    if (this.matri.URLboca !== undefined || this.matri.URLboca !== '') {
      this.http2.get(this.APIBocas + '/download/' + this.matri.URLboca,
                                        {responseType: ResponseContentType.Blob} )
                                        .subscribe(response => {
                                                                console.log(response);
                                                                this.Descargaelementos(response, this.matri.URLboca); }); }
  }

  // Despues del inicio de la descarga, necesitamos convertir la respuesta de la anterior función a string
  // para así poder añadir la src de la imagen y que podamos mostrarla en HTML

  Descargaelementos(response: Response, url: string) {
    const blob = new Blob([response.blob()], {type: 'image/jpg'});

    const reader = new FileReader();
    reader.addEventListener('load', () => {
     url = reader.result.toString();
     console.log(url);
     this.dbService.ColocoPelo(url);
    }, false);

    if (blob) {
      reader.readAsDataURL(blob);
    }


  }

  // Estas dos funciones sirven para cargar los logos de las imágenes
  // almacenadas en el contenedor de Bustos
  RDameFotoBus(idfoto: string) {

    this.http2.get(this.APIBustos + '/download/' + idfoto,
    {responseType: ResponseContentType.Blob} )
    .subscribe(response => {
                             console.log(response);
                             this.CargarLogosBus(response, idfoto);
                            });
    console.log('Ya he acabado');
  }


  CargarLogosBus(response: Response, idfoto: string) {


    const blob = new Blob([response.blob()], {type: 'image/jpg'});

    const reader = new FileReader();
    reader.addEventListener('load', () => {
     console.log('No sé si entra');
     this.URLBusto = reader.result.toString();
     console.log(this.URLBusto);
    }, false);

    if (blob) {
      reader.readAsDataURL(blob);
    }
  }

  IrAAsignaturas() {
    this.router.navigate(['/asignaturasalum']);
  }

}
