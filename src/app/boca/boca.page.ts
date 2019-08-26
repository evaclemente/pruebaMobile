import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatosService } from '../datos.service';
import { Router } from '@angular/router';
import { DbServiceService } from '../db-service.service';
import { Http, ResponseContentType, RequestOptions, Response, Headers } from '@angular/http';
import { Clase } from '../Clase';
import { Imagen } from '../Imagen';
import { Matricula } from '../Matricula';

@Component({
  selector: 'app-boca',
  templateUrl: './boca.page.html',
  styleUrls: ['./boca.page.scss'],
})
export class BocaPage implements OnInit {

  private APIBocas = 'http://localhost:3000/api/imagenes/Bocas';
  BocaSeleccionada: Imagen;
  ModeloBoca: Imagen[] = new Array();
  matricula: Matricula;
  clase: Clase;

  constructor(private http: HttpClient,
              private datosService: DatosService,
              private router: Router,
              private dbService: DbServiceService,
              private http2: Http) { }

  ngOnInit() {
    // Me aseguro de que esté vacío el array de Imagenes antes de cargar la vista HTML
    // porque como hay una función push que se dedica a añadir posiciones a la cola del array,
    // puede que no esté vacío siempre

    this.ModeloBoca = [];

    // Lo primero que tengo que hacer es recuperar la matrícula
    // que la tiene guardada el servicio de la Base de Datos
    this.matricula = this.dbService.ReturnMatri();
    // Traigo la clase para comprobar qué familia se
    // ha elegido
    this.dbService.DameClase(this.matricula.idAsignatura)
    .subscribe( clase => this.clase = clase );

    // Cargo las fotos disponibles en la galería de bocas

    this.http.get<any>(this.APIBocas + '/files')
    .subscribe( fotoscontainer => { console.log(fotoscontainer);
                                    var i;
                                    for ( i = 0; i < fotoscontainer.length; i ++ ) {
                                      this.RDameFoto(fotoscontainer[i].name);
                                    }
    });
  }

  GuardaValor(direccion: Imagen) {
    var x = document.getElementById(direccion.nombre).getAttribute('checked');

    console.log('el atributo: ' + document.getElementById(direccion.nombre).getAttribute('checked'));
    console.log( 'Valor que llega' + direccion);

    if (x === 'false') {
      x = 'true';
      document.getElementById(direccion.nombre).setAttribute('checked', 'true');
      this.BocaSeleccionada = direccion;
      console.log('Me he guardado ese valor: ' + this.BocaSeleccionada);
    } else {
      x = 'false';
      document.getElementById(direccion.nombre).setAttribute('checked', 'false');
      this.BocaSeleccionada = undefined;
      console.log ('No hay archivo seleccionado');
    }
  }

  RDameFoto(idfoto: string) {

    this.http2.get(this.APIBocas + '/download/' + idfoto,
    {responseType: ResponseContentType.Blob} )
    .subscribe(response => {
                             console.log(response);
                             this.CargarLogos(response, idfoto);
                            });
    console.log('Ye he acabado');
  }


  CargarLogos(response: Response, idfoto: string) {


    const blob = new Blob([response.blob()], {type: 'image/jpg'});
    var strn = idfoto.split('_', 1)[0];
    var fam = this.clase.familia;
    console.log('strn vale: ' + strn);
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      // console.log('No sé si entra');
      if ( strn === fam ) {
        this.ModeloBoca.push({nombre: idfoto, direc: reader.result.toString()});
        console.log(this.ModeloBoca);
      } else {
        console.log('Me vuelvo');
        return;
      } 
    }, false);

    if (blob) {
      reader.readAsDataURL(blob);
    }
  }

  GuardarBoca() {

    if (this.BocaSeleccionada !== undefined || this.BocaSeleccionada.nombre !== '') {
      console.log('Guardando ojos');
      this.dbService.GuardarBoca(this.matricula, this.BocaSeleccionada.nombre).subscribe();
      this.router.navigate(['/home']);
    } else {
      console.log('No has seleccionado ningunos ojos');
    }
  }

  Reset() {
    this.dbService.ResetBoca(this.matricula).subscribe();
  }

}
