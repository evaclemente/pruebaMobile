import { Component, OnInit } from '@angular/core';
import { Matricula } from '../Matricula';
import { Persona } from '../Persona';
import { DbServiceService } from '../db-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Http, ResponseContentType, RequestOptions, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-listaavatares',
  templateUrl: './listaavatares.page.html',
  styleUrls: ['./listaavatares.page.scss'],
})
export class ListaavataresPage implements OnInit {

  idClase: string;
  matriculas: Matricula[];

  private APIPelos = 'http://localhost:3000/api/imagenes/Pelos';
  private APIOjos = 'http://localhost:3000/api/imagenes/Ojos';
  private APIComplementos = 'http://localhost:3000/api/imagenes/Complementos';


  constructor(private http: HttpClient,
              private router: Router,
              private dbService: DbServiceService,
              private http2: Http) { }

  ngOnInit() {

    this.idClase = this.dbService.ReturnIdClase();
    this.dbService.DameMatriculaAlumno(this.idClase)
    .subscribe( matriculas => {
                               this.matriculas = matriculas;
                               console.log(this.matriculas.length);
                               this.BucleMatriculas();
                              });
  }

  DescargaFotoPelo(matricula: Matricula) {

      console.log('Debería entrar en este bucle ' + matricula.idAlumno);
      console.log(matricula.idAlumno + 'tiene pelo: ' + matricula.URLpelo);
      console.log(matricula.URLpelo.length);

      if (matricula.URLpelo.length > 2 && matricula.URLpelo !== 'string') {
        this.http2.get(this.APIPelos + '/download/' + matricula.URLpelo,
                                          {responseType: ResponseContentType.Blob} )
                                          .subscribe(response => {console.log('Este es el idAlumno' + matricula.idAlumno);
                                                                  console.log(response);
                                                                  this.Descargaelementos(response, matricula.URLpelo,
                                                                     matricula.idAlumno); });
      } else {
        console.log('No hay pelo');
      }
    }
  BucleMatriculas() {
    console.log('entra a cargar fotos');
    var i;
    for (i = 0; i < this.matriculas.length; i++) {
      console.log('Voy a por la matrícula: ' + this.matriculas[i]);
      this.DescargaFotoPelo(this.matriculas[i]);
      this.DescargaFotoOjos(this.matriculas[i]);
      this.DescargaFotoComp(this.matriculas[i]);
    }
  }
  DescargaFotoOjos(matricula: Matricula) {


      console.log('Debería entrar en este bucle ' + matricula.idAlumno);
      console.log(matricula.idAlumno + 'tiene ojos: ' + matricula.URLojos);
      console.log(matricula.URLojos.length);

      if (matricula.URLojos.length > 2 && matricula.URLojos !== 'string') {
        this.http2.get(this.APIOjos + '/download/' + matricula.URLojos,
                                          {responseType: ResponseContentType.Blob} )
                                          .subscribe(response => {console.log('Este es el idAlumno' + matricula.idAlumno);
                                                                  console.log(response);
                                                                  this.Descargaelementos(response, matricula.URLojos,
                                                                     matricula.idAlumno); });
      } else {
        console.log('No hay ojos');
      }

  }

  DescargaFotoComp(matricula: Matricula) {


      console.log('Debería entrar en este bucle ' + matricula.idAlumno);
      console.log(matricula.idAlumno + 'tiene pelo: ' + matricula.URLcomplemento);
      console.log(matricula.URLcomplemento.length);

      if (matricula.URLcomplemento.length > 2 && matricula.URLcomplemento !== 'string' ) {
        this.http2.get(this.APIComplementos + '/download/' + matricula.URLcomplemento,
                                          {responseType: ResponseContentType.Blob} )
                                          .subscribe(response => {console.log('Este es el idAlumno' + matricula.idAlumno);
                                                                  console.log(response);
                                                                  this.Descargaelementos(response, matricula.URLcomplemento,
                                                                     matricula.idAlumno); });
      } else {
        console.log('No hay complemento');
      }

  }

  Descargaelementos(response: Response, url: string, idAlumno: string) {
    console.log(url);
    // var ur;
    const blob = new Blob([response.blob()], {type: 'image/jpg'});

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      url = reader.result.toString();
      console.log(url);
     // this.URLP = ur;
      this.ColocoElemento(url, idAlumno);
    }, false);

    if (blob) {
      reader.readAsDataURL(blob);
    }
  }

  ColocoElemento(elementoP: string, idAlumno: string) {

    console.log('Voy a descargar: ' + elementoP);
    console.log('lo voy a poner en el div: ' + idAlumno);

    console.log('Me llega un: ' + elementoP);
    if (elementoP === 'string' || elementoP === '') {
      console.log('No has seleccionado ningún elemento');
    } else {
      console.log('Entro a colocar');

      var imagen = document.createElement('img');

      imagen.style.position = 'absolute';
      imagen.style.zIndex = '1';
      imagen.style.left = '0px';
      imagen.style.top = '0px';
      imagen.src = elementoP;
      document.getElementById(idAlumno).appendChild(imagen);
    }


  }

  VolverJuego() {
    this.router.navigate(['/avatares']);
  }

}
