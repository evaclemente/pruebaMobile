import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, ResponseContentType, RequestOptions, Response, Headers } from '@angular/http';
import { DbServiceService } from '../db-service.service';
import { Router } from '@angular/router';
import { Matricula } from '../Matricula';
import { Clase } from '../Clase';


@Component({
  selector: 'app-vistapermisos',
  templateUrl: './vistapermisos.page.html',
  styleUrls: ['./vistapermisos.page.scss'],
})
export class VistapermisosPage implements OnInit {

  matricula: Matricula;
  clase: Clase;
  TextoPelos: string;
  TextoOjos: string;
  TextoComp: string;
  TextoBoca: string;

  APIPermisos = 'http://localhost:3000/api/permisos/ArchivosTexto';

  constructor(private http: HttpClient,
              private http2: Http,
              private dbService: DbServiceService,
              private router: Router) { }

  ngOnInit() {
    this.matricula = this.dbService.ReturnMatri();
    this.MostrarPermisos();
    this.dbService.DameClase(this.dbService.ReturnIdClase())
    .subscribe( clase => { console.log('Tengo la clase ' + clase);
                           this.clase = clase;
                           this.CargarPermiso1(this.clase.p1);
                           this.CargarPermiso2(this.clase.p2);
                           this.CargarPermiso3(this.clase.p3);
                           this.CargarPermiso4(this.clase.p4);
                          });
  }

  MostrarPermisos() {
    
    var x = document.getElementById('p1');
    var y = document.getElementById('p2');
    var z = document.getElementById('p3');
    var j = document.getElementById('p4');

    if ( this.matricula.pelo === true) {
      x.setAttribute('checked', 'true');
    } else {
      x.setAttribute('checked', 'false');
    }

    if ( this.matricula.ojos === true) {
      y.setAttribute('checked', 'true');
    } else {
      y.setAttribute('checked', 'false');
    }

    if ( this.matricula.complemento === true) {
      z.setAttribute('checked', 'true');
    } else {
      z.setAttribute('checked', 'false');
    }

    if ( this.matricula.verclase === true) {
      j.setAttribute('checked', 'true');
    } else {
      j.setAttribute('checked', 'false');
    }
  }
  Back() {
    this.router.navigate(['/home']);
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
                                                                this.Descargaelementos(response, permiso, 'boca'); }); }
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

      if ( variable === 'boca') {
        this.TextoBoca = url;
      }

    }, false);

    if (blob) {
      reader.readAsText(blob);
    }
  }

}
