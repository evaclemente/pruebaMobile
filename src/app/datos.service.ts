import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { from } from 'rxjs';
import { Http, ResponseContentType } from '@angular/http';
import { Persona } from './Persona';
import { Observable, of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

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

  sendObjectSource(data: any) {
    console.log('Estoy enviando estos datos: ' + data);
    this.objectSource.next(data);
  }

  EnviarPersona(persona: Persona) {
    console.log('Estos son los datos de mi persona: ' + persona);
    this.objectSource.next(persona);
  }

  ColocoPelo(ident: any, elementos: any) {


    if (ident === null) {
      console.log('No has seleccionado ningún pelo');
    } else {

      var imagen = document.createElement('img');

      imagen.style.position = 'absolute';
      imagen.style.zIndex = '1';



      console.log('Entro a colocar pelo');

      console.log('Estos son los elementos: ' + elementos);

      imagen.src = elementos.pelos[ident].fichero;


      imagen.style.left = '0px';
      imagen.style.top = '0px';
      document.getElementById('avatar').appendChild(imagen);


    }


  }

  ColocoOjos(ident: any, elementos: any) {


    if (ident === null) {
      console.log('No has seleccionado ningunos ojos');
    } else {

      var imagen = document.createElement('img');

      imagen.style.position = 'absolute';
      imagen.style.zIndex = '1';

 

      console.log('Entro a colocar los ojos');

      console.log('Estos son los elementos: ' + elementos);

      imagen.src = elementos.ojos[ident].fichero;


      imagen.style.left = '0px';
      imagen.style.top = '0px';
      document.getElementById('avatar').appendChild(imagen);


    }


  }

}

