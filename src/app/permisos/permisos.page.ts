import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DbServiceService } from '../db-service.service';
import { Clase } from '../Clase';
import { Container } from '../Container';
import { Http, ResponseContentType, RequestOptions, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.page.html',
  styleUrls: ['./permisos.page.scss'],
})
export class PermisosPage implements OnInit {

  APIPermisos = 'http://localhost:3000/api/permisos/ArchivosTexto';
  TextoPelos: string;
  TextoOjos: string;
  TextoComp: string;
  file: File;
  idClase: string;
  Clase: Clase;
  urltexto: string;
  ficherospermisos: Container[];

  // Las variables que aparecen a continuación van a servir para guardar
  // el texto del archivo seleccionado para cada permiso.

  // Al hacer click en guardar, pasarán a la Base de datos
  p1: string;
  p2: string;
  p3: string;
  p4: string;

  constructor(private http: HttpClient,
              private router: Router,
              private dbService: DbServiceService,
              private http2: Http) { }

  ngOnInit() {

    this.idClase = this.dbService.ReturnIdClase();
    this.dbService.DameClase(this.dbService.ReturnIdClase())
    .subscribe( clase => {console.log('Me ha llegado la clase: ' + clase.id);
                          this.Clase = clase;
                          this.CargarPermiso1(clase.p1);
                          this.CargarPermiso2(clase.p2);
                          this.CargarPermiso3(clase.p3);
                          this.CargarPermiso4(clase.p4);

                        });
    this.dbService.MuestraFicheros().subscribe(permisos => {console.log('Ya han llegado los permisos ' + permisos);
                                                            this.ficherospermisos = permisos;
                                                            console.log(this.ficherospermisos);

                                                           });
  }

  ActivarInput() {
    // Recuperamos elinput y provocamos un click sobre ese input
    console.log ('Activar input');
    // Recoge el elemento cuyo id es inp en el código html
    // Por tanto tengo que acordarme de poner este id en el input que sea
    document.getElementById('inp').click();
  }

  CargaDeArchivos() {

    const formData: FormData = new FormData();
    formData.append(this.file.name, this.file);
    console.log('Esto voy a subir ' + formData.append(this.file.name, this.file));
    this.http.post(this.APIPermisos + '/upload', formData)
    .subscribe(() => console.log('Ya está'));

  }

  Mostrar($event) {

    this.file = $event.target.files[0];

    console.log ( 'fichero' + this.file.name );
    const reader = new FileReader();

    // Ordeno que lea el fichero
    reader.readAsDataURL(this.file);
    // reader.readAsBinaryString
    // Pasa el resultado de la lectura a string
    reader.onload = () => {
      console.log ('ya');
      this.urltexto = reader.result.toString();
    };

  }

  GuardarPermiso1() {
    this.dbService.GuardaFicheroPermiso1(this.Clase, this.p1).subscribe( () => this.CargarPermiso1(this.p1));
  }

  GuardarPermiso2() {
    this.dbService.GuardaFicheroPermiso2(this.Clase, this.p2).subscribe( () => this.CargarPermiso2(this.p2));
  }

  GuardarPermiso3() {
    this.dbService.GuardaFicheroPermiso3(this.Clase, this.p3).subscribe( () => this.CargarPermiso3(this.p3));
  }

  GuardarPermiso4() {
    this.dbService.GuardaFicheroPermiso4(this.Clase, this.p4).subscribe( () => this.CargarPermiso4(this.p4));
  }

  CargarPermiso1(permiso: string) {
    if (permiso !== 'string' || permiso.length !== 0) {
      this.http2.get(this.APIPermisos + '/download/' + permiso,
                                        {responseType: ResponseContentType.Blob} )
                                        .subscribe(response => {
                                                                console.log(response);
                                                                this.Descargaelementos(response, permiso, 'pelos'); }); }
  }

  CargarPermiso2(permiso: string) {
    if (permiso !== 'string' || permiso.length !== 0) {
      this.http2.get(this.APIPermisos + '/download/' + permiso,
                                        {responseType: ResponseContentType.Blob} )
                                        .subscribe(response => {
                                                                console.log(response);
                                                                this.Descargaelementos(response, permiso, 'ojos'); }); }
  }

  CargarPermiso3(permiso: string) {
    if (permiso !== 'string' || permiso.length !== 0) {
      this.http2.get(this.APIPermisos + '/download/' + permiso,
                                        {responseType: ResponseContentType.Blob} )
                                        .subscribe(response => {
                                                                console.log(response);
                                                                this.Descargaelementos(response, permiso, 'comp'); }); }
  }

  CargarPermiso4(permiso: string) {
    if (permiso !== 'string' || permiso.length !== 0) {
      this.http2.get(this.APIPermisos + '/download/' + permiso,
                                        {responseType: ResponseContentType.Blob} )
                                        .subscribe(response => {
                                                                console.log(response);
                                                                this.Descargaelementos(response, permiso, 'comp'); }); }
  }

  Descargaelementos(response: Response, url: string, variable: string) {
    console.log(url);
    console.log(variable);
    const blob = new Blob([response.blob()], {type: 'text/txt'});

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      url = reader.result.toString();
      console.log(url);

      if ( variable === 'pelos') {
        this.TextoPelos = url;
      }

      if ( variable === 'ojos') {
        this.TextoOjos = url;
      }

      if ( variable === 'comp') {
        this.TextoComp = url;
      }

    }, false);

    if (blob) {
      reader.readAsText(blob);
    }
  }

  showAlert() {
    swal({
          title: 'Archivo subido!',
          text: 'Has añadido un archivo nuevo',
          icon: 'success'
        });
  }

  IrAAvatares() {
    this.dbService.SetIdClase(this.idClase);
    this.router.navigate(['/avatares']);
  }

}
