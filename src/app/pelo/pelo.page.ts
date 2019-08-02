import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatosService } from '../datos.service';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { element } from '@angular/core/src/render3';
import { Img } from '../Img';
import { DbServiceService } from '../db-service.service';

@Component({
  selector: 'app-pelo',
  templateUrl: './pelo.page.html',
  styleUrls: ['./pelo.page.scss'],
})
export class PeloPage implements OnInit {

  // Declaro una variable que va a contener los elementos del pelo

  elementosPelo: any;
  val: any;
 // pelo: number = 0;
  estadoPelo: boolean [];
  PeloSeleccionado: any;
  URLsPelos: Img = new Array();
 // tipo: string = 'pelos';

  // Necesito usar el protocolo http para cargar el fichero,
  // así que en el contructor coloco un procedimiento http privado

  constructor(
    private http: HttpClient,
    private datosService: DatosService,
    private router: Router,
    private dbService: DbServiceService
              ) {
  }

  ngOnInit() {
    console.log('Empiezo a cargar elementos');
    // Leo primero el fichero que contiene todos los elementos

    this.dbService.DameFoto('Pelos');
    this. URLsPelos = this.dbService.DameLogosPelo();
  }

  // ColocarPelos() {

  //   console.log('Entro: ' + this.elementosPelo);
  //   var i: number;


  //   // El fichero elementos.json contiene los elementos de
  //   // pelo, gafas, ojos, boca que usaremos para construir el avatar.
  //   // Pues bien, ahora solamente cargaremos los del pelo.

  //   for ( i = 0; i < this.elementosPelo.pelos.length; i++) {
  //     // Leo cada fichero correspondiente a cada tipo de pelo
  //     var imagen = document.createElement('img'); // creo una imágen
  //     imagen.id = this.elementosPelo.pelos[i].identificador;
  //     console.log (i + ' ' + this.elementosPelo.pelos[i].identificador);
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

  //     imagen.src = this.elementosPelo.pelos[i].fichero;

  //     imagen.onclick =  (function (elemento, i, estado) {

  //       return function() {
  //         console.log ('Elemento ' + elemento);
  //         this.datosService.Enviarid(elemento);
  //         console.log('Id ' + i);
  //         console.log('Estado ' + estado);
  //         // console.log('¿Tenemos pelo? ' + true);

  //         if (estado) {
  //           // Si la imágen ya estaba seleccionada cuando se clica sobre ella,
  //           // hay que quitarle el recuadro de selección
  //           document.getElementById(elemento).style.backgroundColor = 'white';
  //           this.HayPelo = false;
  //           this.PeloSeleccionado = null;
  //           estado = false;
  //           this.datosService.Enviarid(this.PeloSeleccionado);

  //           console.log('¿Tenemos pelo? ' + this.HayPelo);
  //           console.log('Mi pelo es ' + this.PeloSeleccionado);

  //         } else {

  //           document.getElementById(elemento).style.backgroundColor = 'green';
  //           this.HayPelo = true;
  //           estado = true;
  //           this.PeloSeleccionado = elemento;

  //           console.log(elemento);
  //           console.log('¿Tenemos pelo? ' + this.HayPelo);
  //           console.log('Mi pelo es ' + this.PeloSeleccionado);

  //         }

  //       };

  //     })(this.elementosPelo.pelos[i].identificador, i, this.estadoPelo[i]);


  //     // coloco la imágen en el bloque de elementos

  //     document.getElementById('elementosPelo').appendChild(imagen);
  //     // console.log('Se ha guardado este pelo:' + this.PeloSeleccionado);

  //   }

  //   console.log('Se ha guardado este pelo:' + this.PeloSeleccionado);
  // }



  // DatosSeleccionados(tipopelo, status) {
  //   this.HayPelo = status;
  //   this.PeloSeleccionado = tipopelo;
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

  PasarDatosPelo() {

    if (this.val === undefined) {

      console.log('No has seleccionado ningún pelo');

    } else {

      this.datosService.SetElementoP(this.val);
    }

  }

  IrAHome() {
    this.router.navigate(['/home']);
  }


}
