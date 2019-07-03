import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  // Necesito usar el protocolo http para cargar el fichero,
  // así que en el contructor coloco un procedimiento http privado

  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log('Empiezo a cargar elementos');
    // Leo primero el fichero que contiene todos los elementos

    this.http.get('assets/elementos.json', {responseType: 'json'})
    .subscribe(data => {
                          // me guardos los elementos

                          this.elementosPelo = data;
                          console.log ('ya estan aquí: ' + this.elementosPelo);
                          // coloco los elementos donde toca
                          this.estadoPelo = Array (this.elementosPelo.pelos.length).fill (false);
                          this.ColocarPelos();
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
      // coloco la imágen en el bloque de elementos

      document.getElementById('elementosPelo').appendChild(imagen);
    }

  }

}
