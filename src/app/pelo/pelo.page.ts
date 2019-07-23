import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatosService } from '../datos.service';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pelo',
  templateUrl: './pelo.page.html',
  styleUrls: ['./pelo.page.scss'],
})
export class PeloPage implements OnInit {

  // Declaro una variable que va a contener los elementos del pelo

  elementosPelo: any;
  pelo: number = 0;
  estadoPelo: boolean [];
  PeloSeleccionado: number = 0;
  HayPelo: boolean = true;
  tipo: string = 'pelos';

  // Necesito usar el protocolo http para cargar el fichero,
  // así que en el contructor coloco un procedimiento http privado

  constructor(
    private http: HttpClient,
    private datosService: DatosService,
    private router: Router
              ) {
  }

  ngOnInit() {
    console.log('Empiezo a cargar elementos');
    // Leo primero el fichero que contiene todos los elementos

   // this.HayPelo = true;
    this.http.get('assets/elementos.json', {responseType: 'json'})
    .subscribe(data => {
                          // me guardos los elementos

                          this.elementosPelo = data;
                          console.log ('ya estan aquí: ' + this.elementosPelo);
                          // coloco los elementos donde toca
                          this.estadoPelo = Array (this.elementosPelo.pelos.length).fill (false);
                          this.ColocarPelos();
                          // this.PasarDatosPelo();
                        });
  }

  ColocarPelos() {

    console.log('Entro: ' + this.elementosPelo);
    var i: number;


    // El fichero elementos.json contiene los elementos de
    // pelo, gafas, ojos, boca que usaremos para construir el avatar.
    // Pues bien, ahora solamente cargaremos los del pelo.

    for ( i = 0; i < this.elementosPelo.pelos.length; i++) {
      // Leo cada fichero correspondiente a cada tipo de pelo
      var imagen = document.createElement('img'); // creo una imágen
      imagen.id = this.elementosPelo.pelos[i].identificador;
      console.log (i + ' ' + this.elementosPelo.pelos[i].identificador);
     // return this.HayPelo;
     // return this.PeloSeleccionado;

      // Coloco la imágen sobre el bloque
      // Adaptamos todas las imágenes al ancho del bloque,
      // que serán 120 px

      imagen.style.left = '100px';
      imagen.style.top = 140 * i + 'px';

      // La posición va a ser absoluta dentro del bloque

      imagen.style.position =  'absolute';
      imagen.style.zIndex = '1';

      // Coloco el nombre del fichero en el que está la imágen

      imagen.src = this.elementosPelo.pelos[i].fichero;

      imagen.onclick = ( function(elemento, i, estado) {
        return function() {
          console.log ('Elemento ' + elemento);
          console.log('Id ' + i);
          console.log('Estado ' + estado);
          // console.log('¿Tenemos pelo? ' + true);

          if (estado) {
            // Si la imágen ya estaba seleccionada cuando se clica sobre ella,
            // hay que quitarle el recuadro de selección
            document.getElementById(elemento).style.backgroundColor = 'white';
            this.HayPelo = false;
            this.PeloSeleccionado = null;
            estado = false;

            console.log('¿Tenemos pelo? ' + this.HayPelo);
            console.log('Mi pelo es ' + this.PeloSeleccionado);

          } else {

            document.getElementById(elemento).style.backgroundColor = 'green';
            this.HayPelo = true;
            estado = true;
            this.PeloSeleccionado = elemento;

            console.log('¿Tenemos pelo? ' + this.HayPelo);
            console.log('Mi pelo es ' + this.PeloSeleccionado);

          }

        };

      })(this.elementosPelo.pelos[i].identificador, i, this.estadoPelo[i]);


      // coloco la imágen en el bloque de elementos

      document.getElementById('elementosPelo').appendChild(imagen);

    }


   // var imgtick = document.createElement('img');
   // imgtick.src = 'assets/img/tick.png';
   // document.getElementById('elementosPelo').appendChild(imgtick);
    console.log(this.PeloSeleccionado);
    console.log(this.HayPelo);
  }


  DatosSeleccionados(tipopelo, status) {
    this.HayPelo = status;
    this.PeloSeleccionado = tipopelo;
  }

  PasarDatosPelo() {

    console.log('Hay pelo: ' + this.HayPelo);
    console.log('El pelo es este: ' + this.PeloSeleccionado);

    if (this.HayPelo) {

      this.datosService.sendObjectSource(this.PeloSeleccionado);
      this.router.navigate(['/home']);

    } else {

      console.log('No has seleccionado ningún pelo');
    }

  }


}
