import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  // Creamos un método
  // Entre <> ponemos de qué tipo va a ser el método
  // A continuación entre paréntesis
  // ponemos cuál va a ser su valor inicial
  private objectSource = new BehaviorSubject<{}>({});

  // A continuación creo la variable que me va
  // a dar acceso a objectSource, proporcionando un observable

  $getObjectSource = this.objectSource.asObservable();
  constructor() { }

  sendObjectSource(data: any) {
    console.log('Estoy enviando los datos');
    this.objectSource.next(data);
  }
}
