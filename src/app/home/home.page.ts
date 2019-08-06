import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { DatosService } from '../datos.service';
import { HttpClient } from '@angular/common/http';
import { Img } from '../Img';
import { DbServiceService } from '../db-service.service';
import { Persona } from '../Persona';
import { Matricula } from '../Matricula';
import { Http, ResponseContentType, RequestOptions, Response, Headers  } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todoselementos: any;
  objetoseleccionado: string;
  nombre: string;
  matriculados: Matricula[];
  matri: Matricula;
  private APIMatriculas = 'http://localhost:3000/api/matriculas?filter[where][idAlumno]=';
  private APIPelos = 'http://localhost:3000/api/imagenes/Pelos';
  private APIOjos = 'http://localhost:3000/api/imagenes/Ojos';
  private APIComplementos = 'http://localhost:3000/api/imagenes/Complementos';
  URLP: string;
  URLO: string;
  URLC: string;


  constructor(
    private router: Router,
    private datosService: DatosService,
    private http: HttpClient,
    private dbService: DbServiceService,
    private http2: Http,
  ) {

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.nombre = this.datosService.DameIDClase();
    this.dbService.DameMatriculaAlumno(this.datosService.DameIDClase())
    .subscribe( matricula => {console.log('Me ha llegado:' + matricula);
                              this.matriculados = matricula;
                              console.log(this.matriculados);
                              this.matri = this.DamePorNombre();
                              // Una vez tenemos la matrícula podemos cargar los elementos de las fotos
                              this.DescargaFotoPelo();
                              this.DescargaFotoOjos();
                              this.DescargaFotoComp();
                              this.PermisoOjos();
                              this.PermisoPelo();
                              this.PermisoComp();
                              this.dbService.ColocoPelo(this.URLP);
                              this.dbService.ColocoOjos(this.URLO);
                              this.dbService.ColocoComp(this.URLC);
                             });
                            }
  IrAPelos() {
    this.dbService.SetMatricula(this.matri);
    console.log('Entro a pelos');
    this.router.navigate(['/pelo']);
  }

  DamePorNombre() {
    console.log('Entro a filtrar');
    return this.matriculados.filter( matricula => matricula.idAsignatura === this.nombre)[0];
  }

  IrALogin() {
    console.log('Entro al Login');
    this.router.navigate(['/login']);
  }

  IrAOjos() {
    console.log('Me voy a Ojos');
    this.dbService.SetMatricula(this.matri);
    this.router.navigate(['/ojos']);
  }

  IrAAlumno() {
    // this.dbService.SetNombrePersona(this.persona.nombre);
    console.log('Me voy a Alumno');
    this.router.navigate(['/alumno']);
  }

  IrAComp() {
    this.dbService.SetMatricula(this.matri);
    console.log('Me voy a Alumno');
    // this.router.navigate(['/complementos']);
  }

  // funciones de permiso, comprueban si el alumno matriculado en la asignatura tiene activados los permisos
  // para poder cambiarse los elementos del avatar. si tiene permiso, podrá hacer click en el botón, y si no lo
  // tiene la función cambiará el atributo del elemento HTML que es un botón, y pondra un valor 'true' en la
  // propiedad de disabled que tiene el botón. Si la propiedad disabled es true, el botón no puede clickarse.

  PermisoPelo() {

    var x = document.getElementById('P1');
    console.log('Elemento' + x);
    console.log(this.matri.pelo);


    if (this.matri.pelo === true) {
      console.log('Estoy aquí');
      document.getElementById('P1').setAttribute('disabled', 'false');
    } else {
      document.getElementById('P1').setAttribute('disabled', 'true');
    }

  }

  PermisoOjos() {

    var x = document.getElementById('P2');

    console.log(this.matri.ojos);

    if (this.matri.ojos === true) {
      document.getElementById('P2').setAttribute('disabled', 'false');
    } else {
      console.log('Debería entrar aquí');
      document.getElementById('P2').setAttribute('disabled', 'true');
    }

  }

  PermisoComp() {

    var x = document.getElementById('P3');

    if (this.matri.complemento === true) {
      document.getElementById('P3').setAttribute('disabled', 'false');
    } else {
      document.getElementById('P3').setAttribute('disabled', 'true');
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



}
