import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { from } from 'rxjs';
import { Http, ResponseContentType } from '@angular/http';
import { Persona } from './Persona';
import { Observable, of, from } from 'rxjs';
import {Img} from './Img';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  nombre: string;
  seleccionado: boolean;
  id: any;
  idclase: string;
  elementoP: any;
  elementoO: any;
  elementoC: any;
  idMatricula: number;


  // Creamos un método
  // Entre <> ponemos de qué tipo va a ser el método
  // A continuación entre paréntesis
  // ponemos cuál va a ser su valor inicial
  private objectSource = new BehaviorSubject<{}>({});
  // elementos: any;

  // A continuación creo la variable que me va
  // a dar acceso a objectSource, proporcionando un observable

  $getObjectSource = this.objectSource.asObservable();
  constructor(private http: Http) { }

  // sendObjectSource(data: any) {
  //  console.log('Estoy enviando estos datos: ' + data);
   // this.objectSource.next(data);
  // }

  EnviarPersona(nombre: string) {
    this.nombre = nombre;
    console.log('Estos son los datos de mi persona: ' + nombre);
  }


  SetElementoP(elemento: Img) {
    this.elementoP = elemento;
    console.log('SetPelo: ' + this.elementoP);
  }

  SetElementoO(elemento: Img) {
    this.elementoO = elemento;
    console.log('SetOjos: ' + this.elementoO);
  }

  SetElementoC(elemento: Img) {
    this.elementoC = elemento;
    console.log('SetComplemento: ' + this.elementoC);
  }

  DameElementoP() {
    return this.elementoP;
  }

  DameElementoO() {
    return this.elementoO;
  }

  DameElementoC() {
    return this.elementoC;
  }

  DameNombre() {
    return this.nombre;
  }

  GuardaIDClase(idclase: string) {
    console.log('Estoy enviando el id de la clase:' + idclase);
    this.idclase = idclase;
  }

  DameIDClase() {
    return this.idclase;
  }

  // Creo un método que sirva para enviar el identificador del pelo, ojos,
  // o complemento que se haya seleccionado
  Enviarid(identificador: any) {
    this.id = identificador;
    console.log('Esto es lo que llega a servicios: ' + identificador);
  }

  ColocoPelo() {


    if (this.elementoP === undefined) {
      console.log('No has seleccionado ningún pelo');
    } else {

      var imagen = document.createElement('img');

      imagen.style.position = 'absolute';
      imagen.style.zIndex = '1';
      imagen.style.left = '0px';
      imagen.style.top = '0px';
      imagen.src = this.elementoP;
      document.getElementById('avatar').appendChild(imagen);
    }


  }

  ColocoOjos() {


    if (this.elementoO === null) {
      console.log('No has seleccionado ningunos ojos');
    } else {

      var imagen = document.createElement('img');

      imagen.style.position = 'absolute';
      imagen.style.zIndex = '1';
      imagen.style.left = '0px';
      imagen.style.top = '0px';
      console.log('Entro a colocar los ojos');
      imagen.src = this.elementoO;
      document.getElementById('avatar').appendChild(imagen);

    }


  }

}

