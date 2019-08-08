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
  PermisoPelo: string;
  // PermisoOjos: string;
  // PermisoComp: string;
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

  constructor(private http: HttpClient,
              private router: Router,
              private dbService: DbServiceService,
              private http2: Http) { }

  ngOnInit() {

    this.idClase = this.dbService.ReturnIdClase();
    this.dbService.DameClase(this.dbService.ReturnIdClase())
    .subscribe( clase => {console.log('Me ha llegado la clase: ' + clase.id);
                          this.Clase = clase;
                          this.CargarArchivo();
                          // this.PermisoPelo = clase.p1;
                          // this.PermisoOjos = clase.p2;
                          // this.PermisoComp = clase.p2;

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
    this.dbService.GuardaFicheroPermiso1(this.Clase, this.p1).subscribe();
  }

  GuardarPermiso2() {
    this.dbService.GuardaFicheroPermiso1(this.Clase, this.p1).subscribe();
  }

  GuardarPermiso3() {
    this.dbService.GuardaFicheroPermiso1(this.Clase, this.p3).subscribe();
  }

  CargarArchivo() {
    if (this.Clase.p1 !== 'string' || this.Clase.p1.length !== 0) {
      this.http2.get(this.APIPermisos + '/download/' + this.Clase.p1,
                                        {responseType: ResponseContentType.Blob} )
                                        .subscribe(response => {
                                                                console.log(response);
                                                                this.Descargaelementos(response, this.Clase.p1); }); }
  }

  Descargaelementos(response: Response, url: string) {
    console.log(url);
    // var ur;
    const blob = new Blob([response.blob()], {type: 'text/txt'});

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      url = reader.result.toString();
      console.log(url);
      this.PermisoPelo = url;
      // this.dbService.Muestrotexto(url);
    }, false);

    if (blob) {
      reader.readAsText(blob);
    }
  }

}
