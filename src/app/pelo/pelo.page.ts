import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatosService } from '../datos.service';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { element } from '@angular/core/src/render3';
import { Img } from '../Img';
import { DbServiceService } from '../db-service.service';
import { Persona } from '../Persona';
import { Imagen } from '../Imagen';
import { Http, ResponseContentType, RequestOptions, Response, Headers  } from '@angular/http';
import { Matricula } from '../Matricula';

@Component({
  selector: 'app-pelo',
  templateUrl: './pelo.page.html',
  styleUrls: ['./pelo.page.scss'],
})
export class PeloPage implements OnInit {

  // Declaro una variable que va a contener los elementos del pelo


  PeloSeleccionado: Imagen;
  ModeloPelos: Imagen[] = new Array();
  matricula: Matricula;

  private APIFotos = 'http://localhost:3000/api/imagenes/Pelos';
 
  // Necesito usar el protocolo http para cargar el fichero,
  // así que en el contructor coloco un procedimiento http privado

  constructor(
    private http: HttpClient,
    private datosService: DatosService,
    private router: Router,
    private dbService: DbServiceService,
    private http2: Http ) {
  }

  ngOnInit() {

    // Me aseguro de que esté vacío el array de Imagenes antes de cargar la vista HTML
    // porque como hay una función push que se dedica a añadir posiciones a la cola del array,
    // puede que no esté vacío siempre
    this.ModeloPelos = [];
    console.log('Empiezo a cargar elementos');
    // Lo primero que tengo que hacer es recuperar la matrícula
    // que la tiene guardada el servicio de la Base de Datos
    this.matricula = this.dbService.ReturnMatri();
    // Cargo las fotos disponibles en la galería de peinados

    this.http.get<any>(this.APIFotos + '/files')
    .subscribe( fotoscontainer => { console.log(fotoscontainer);
                                    var i;
                                    for ( i = 0; i < fotoscontainer.length; i ++ ) {
                                      this.RDameFoto(fotoscontainer[i].name);
                                    }
    });

  }

  GuardaValor(pelo: Imagen) {
    var x = document.getElementById(pelo.nombre).getAttribute('checked');
    // let y =  document.getElementsByClassName('panel2') as HTMLCollectionOf<Element>;


    console.log('el atributo: ' + document.getElementById(pelo.nombre).getAttribute('checked'));
    console.log( 'Valor que llega' + pelo.nombre);

    if (x === 'false') {

      x = 'true';
      document.getElementById(pelo.nombre).setAttribute('checked', 'true');
      this.PeloSeleccionado = pelo;
      // y.filter( elemento => elemento.getElementById() !== nombre);
      console.log('Me he guardado esevalor: ' + this.PeloSeleccionado);
    } else {
      x = 'false';
      document.getElementById(pelo.nombre).setAttribute('checked', 'false');
      this.PeloSeleccionado = undefined;
      console.log ('No hay archivo seleccionado');
    }
  }

  RDameFoto(idfoto: string) {

    this.http2.get(this.APIFotos + '/download/' + idfoto,
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
      // console.log('No sé si entra');
     this.ModeloPelos.push({nombre: idfoto, direc: reader.result.toString()});
     console.log(this.ModeloPelos);
    }, false);

    if (blob) {
      reader.readAsDataURL(blob);
    }
  }
  // PasarDatosPelo() {

  //   if (this.PeloSeleccionado === undefined) {

  //     console.log('No has seleccionado ningún pelo');

  //   } else {

  //     this.dbService.ElementoP(this.PeloSeleccionado);
  //   }

  // }

  // Voy a guardar el pelo en la Base de datos, así que necesito la matrícula
  // para pasarla por parámetro a la función que está en dbService. Le paso también
  // la Imagen, con su correspondiente nombre y dirección.

  GuardarPelo() {

    console.log(this.PeloSeleccionado.nombre);
    console.log(this.matricula);

    if (this.PeloSeleccionado !== undefined || this.PeloSeleccionado.nombre !== '') {
      console.log('Guardando pelo');
      this.dbService.GuardarPelo(this.matricula, this.PeloSeleccionado.nombre).subscribe();
      this.router.navigate(['/home']);
    } else {
      console.log('No has seleccionado ningún pelo');
    }
  }

}
