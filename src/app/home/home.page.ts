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
import { Clase } from '../Clase';

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
  clase: Clase;
  matri: Matricula;
  private APIMatriculas = 'http://localhost:3000/api/matriculas?filter[where][idAlumno]=';
  private APIPelos = 'http://localhost:3000/api/imagenes/Pelos';
  private APIOjos = 'http://localhost:3000/api/imagenes/Ojos';
  private APIComplementos = 'http://localhost:3000/api/imagenes/Complementos';
  private APIBustos = 'http://localhost:3000/api/imagenes/Bustos';
  URLP: string;
  URLO: string;
  URLC: string;
  URLBusto: string;
  Familia: string;
  posicion: number;


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
    this.nombre = this.dbService.ReturnNombrePersona();
    this.dbService.DameClase(this.datosService.DameIDClase())
    .subscribe( clase => {this.clase = clase;
                          console.log('Ya tengo la clase: ' + this.clase); });
    // Traigo todas las fotos del contenedor de Bustos

    this.http.get<any>(this.APIBustos + '/files')
    .subscribe( fotoscontainer => { console.log(fotoscontainer);
                                    this.FiltraBustoAvatar(this.clase, fotoscontainer);
                                  });
    this.dbService.DameMatriculaAlumno(this.datosService.DameIDClase())
    .subscribe( matricula => {console.log('Me ha llegado:' + matricula);
                              this.matriculados = matricula;
                              console.log(this.matriculados);
                              this.matri = this.DamePorNombre();
                              console.log('Esta matricula es de: ' + this.matri.idAlumno);
                              // Una vez tenemos la matrícula podemos cargar los elementos de las fotos
                              this.DescargaFotoPelo();
                              this.DescargaFotoOjos();
                              this.DescargaFotoComp();
                              this.PermisoPelo();
                              this.PermisoOjos();
                              this.PermisoComp();
                             });
                            }
  IrAPelos() {
    this.dbService.SetMatricula(this.matri);
    console.log('Entro a pelos');
    this.router.navigate(['/pelo']);
  }

  // Necesito saber qué familia se ha escogido, para poder asignar un busto u otro

  FiltraBustoAvatar(clase: Clase, fotosbustos: any[]) {

    console.log(clase.familia);
    this.Familia = clase.familia;

    // Cuando aplique el filtro, me voy a guardar la posición
    // en la que está el ficheroque queiro descargar, puesto que necesito
    // el nombre del fichero completo, y con el filtro sólo tengo una parte del nombre
    // var posicion;
    var i;
    var nombre: string;
    console.log('Llega a entrar en el filtro');
    for (i = 0; i < fotosbustos.length; i ++) {

      nombre = fotosbustos[i].name.split('_', 1);
      console.log('nombre: ' + nombre);

      if (nombre === clase.familia) {
        console.log('Ya ha encontrado la familia');
        this.posicion = i;
        console.log('Voy a descargar: ' + fotosbustos[i].name);
        this.RDameFoto(fotosbustos[i].name);
      } else {
        console.log('Esta familia no es');
      }

    }

  }

  RDameFoto(idfoto: string) {

    this.http2.get(this.APIBustos + '/download/' + idfoto,
    {responseType: ResponseContentType.Blob} )
    .subscribe(response => {
                             console.log(response);
                             this.CargarLogos(response, idfoto);
                            });
    console.log('Ye he acabado');
  }


  CargarLogos(response: Response, idfoto: string) {


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

  DamePorNombre() {
    console.log('Entro a filtrar');
    return this.matriculados.filter( matricula => matricula.idAlumno === this.nombre)[0];
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
    this.router.navigate(['/complementos']);
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
      x.setAttribute('disabled', 'false');
    } else {
      x.setAttribute('disabled', 'true');
    }

  }

  PermisoOjos() {

    console.log(this.matri.ojos);
    var x = document.getElementById('P2');

    console.log('Elemento' + document.getElementById('P2'));

    if (this.matri.ojos === true) {
      x.setAttribute('disabled', 'false');
    } else {
      console.log('Debería entrar aquí');
      x.setAttribute('disabled', 'true');
      console.log(x);
    }

  }

  PermisoComp() {

    var x = document.getElementById('P3');

    if (this.matri.complemento === true) {
      x.setAttribute('disabled', 'false');
    } else {
      x.setAttribute('disabled', 'true');
    }

  }

  // Las tres funciones que aparecen a continuación van a iniciar la descarga de las imagenes
  // correspondientes a cada contenedor (que tenemos 3, uno para cada elemento del avatar)

  DescargaFotoPelo() {
    console.log(this.matri.URLpelo);
    if (this.matri.URLpelo !== 'string' || this.matri.URLpelo.length !== 0) {
      this.http2.get(this.APIPelos + '/download/' + this.matri.URLpelo,
                                        {responseType: ResponseContentType.Blob} )
                                        .subscribe(response => {
                                                                console.log(response);
                                                                this.Descargaelementos(response, this.matri.URLpelo); }); }
  }

  DescargaFotoOjos() {
    console.log('Esto hay: ' + this.matri.URLojos);
    if (this.matri.URLojos !== 'string' || this.matri.URLojos.length !== 0) {
      this.http2.get(this.APIOjos + '/download/' + this.matri.URLojos,
                                        {responseType: ResponseContentType.Blob} )
                                        .subscribe(response => {
                                                                console.log(response);
                                                                this.Descargaelementos(response, this.matri.URLojos); }); }
  }

  DescargaFotoComp() {
    console.log('Esto hay: ' + this.matri.URLcomplemento);
    if (this.matri.URLcomplemento !== 'string' || this.matri.URLcomplemento.length !== 0) {
      this.http2.get(this.APIComplementos + '/download/' + this.matri.URLcomplemento,
                                        {responseType: ResponseContentType.Blob} )
                                        .subscribe(response => {
                                                                console.log(response);
                                                                this.Descargaelementos(response, this.matri.URLcomplemento); }); }
  }

  VistaPermisos() {
    this.dbService.SetMatricula(this.matri);
    this.dbService.SetIdClase(this.clase.id);
    this.router.navigate(['/vistapermisos']);
  }
  // Despues del inicio de la descarga, necesitamos convertir la respuesta de la anterior función a string
  // para así poder añadir la src de la imagen y que podamos mostrarla en HTML

  Descargaelementos(response: Response, url: string) {
    console.log(url);
    // var ur;
    const blob = new Blob([response.blob()], {type: 'image/jpg'});

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      url = reader.result.toString();
      console.log(url);
     // this.URLP = ur;
      this.dbService.ColocoPelo(url);
    }, false);

    if (blob) {
      reader.readAsDataURL(blob);
    }
  }



}
