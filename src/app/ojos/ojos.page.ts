import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { DatosService } from '../datos.service';
import { DbServiceService } from '../db-service.service';
import { Img } from '../Img';
import { from } from 'rxjs';

@Component({
  selector: 'app-ojos',
  templateUrl: './ojos.page.html',
  styleUrls: ['./ojos.page.scss'],
})
export class OjosPage implements OnInit {

  constructor(private http: HttpClient,
              private router: Router,
              private datosService: DatosService,
              private dbService: DbServiceService) {

               }

  elementosOjos: any;
  estadoOjos: boolean [];
  // HayOjos: boolean =  true;
  // OjosSeleccionados: number = 0;
  // tipo: string =  'ojos';
  URLsOjos: Img = new Array();
  val: any;

  ngOnInit() {

    console.log('Empiezo a cargar ojos');
    // Leo primero el fichero que contiene todos los elementos

   // this.HayPelo = true;
    // this.http.get('assets/elementos.json', {responseType: 'json'})
    //     .subscribe(data => {
    //                          this.elementosOjos = data;
    //                          console.log('ya están aquí: ' + this.elementosOjos);
    //                          this.estadoOjos = Array (this.elementosOjos.ojos.length).fill (false);
    //                          // this.ColocarOjos();
    //                          });

    this.dbService.DameFoto('Ojos');
    this. URLsOjos = this.dbService.DameLogosOjos();
  }


  // ColocarOjos() {

  //   console.log('Entro: ' + this.elementosOjos);
  //   var i: number;


  //   // El fichero elementos.json contiene los elementos de
  //   // pelo, gafas, ojos, boca que usaremos para construir el avatar.
  //   // Pues bien, ahora solamente cargaremos los del pelo.

  //   for ( i = 0; i < this.elementosOjos.ojos.length; i++) {
  //     // Leo cada fichero correspondiente a cada tipo de pelo
  //     var imagen = document.createElement('img'); // creo una imágen
  //     imagen.id = this.elementosOjos.ojos[i].identificador;
  //     console.log (i + ' ' + this.elementosOjos.ojos[i].identificador);
  //    // return this.HayPelo;
  //    // return this.PeloSeleccionado;

  //     // Coloco la imágen sobre el bloque
  //     // Adaptamos todas las imágenes al ancho del bloque,
  //     // que serán 120 px

  //     imagen.style.left = '100px';
  //     imagen.style.top = 140 * i + 'px';

  //     // La posición va a ser absoluta dentro del bloque

  //     imagen.style.position =  'absolute';
  //     imagen.style.zIndex = '1';

  //     // Coloco el nombre del fichero en el que está la imágen

  //     imagen.src = this.elementosOjos.ojos[i].fichero;

  //     imagen.onclick = ( function(elemento, i, estado) {
  //       return function() {
  //         console.log ('Elemento: ' + elemento);
  //         console.log('Id: ' + i);
  //         console.log('Estado: ' + estado);
  //         // console.log('¿Tenemos pelo? ' + true);

  //         if (estado) {
  //           // Si la imágen ya estaba seleccionada cuando se clica sobre ella,
  //           // hay que quitarle el recuadro de selección
  //           document.getElementById(elemento).style.backgroundColor = 'white';

  //           estado = false;

  //         } else {

  //           document.getElementById(elemento).style.backgroundColor = 'green';
  //           // this.HayPelo = true;
  //           estado = true;

  //         }

  //       };

  //     })(this.elementosOjos.ojos[i].identificador, i, this.estadoOjos[i]);


  //     // coloco la imágen en el bloque de elementos

  //     document.getElementById('elementosOjos').appendChild(imagen);

  //   }


  //  // var imgtick = document.createElement('img');
  //  // imgtick.src = 'assets/img/tick.png';
  //  // document.getElementById('elementosPelo').appendChild(imgtick);
  //  // console.log(this.PeloSeleccionado);
  //  // console.log(this.HayPelo);
  // }

  GuardaValor(direccion: any) {
    var x = document.getElementById(direccion).getAttribute('checked');

    console.log('el atributo: ' + document.getElementById(direccion).getAttribute('checked'));
    console.log( 'Valor que llega' + direccion);

    if (x === 'false') {
      x = 'true';
      document.getElementById(direccion).setAttribute('checked', 'true');
      this.val = direccion;
      console.log('Me he guardado esevalor: ' + this.val);
    } else {
      x = 'false';
      document.getElementById(direccion).setAttribute('checked', 'false');
      this.val = undefined;
      console.log ('No hay archivo seleccionado');
    }
  }

  PasarDatosOjos() {

    if (this.val === undefined) {

      console.log('No has seleccionado ningún pelo');

    } else {
      this.datosService.SetElementoO(this.val);
    }
  }

  IrAHome() {
    this.router.navigate(['/home']);
  }

}
