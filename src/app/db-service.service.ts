import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {PersonaComponent} from './persona/persona.component';
import { Persona } from './Persona';
// Las librerías importadas son para poder realizar operaciones Http

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  // Declaro como string la URL de la BDD a la que me quiero conectar
  private APIUrl = 'http://localhost:3000/api/Personas';

  // Inserto en el constructor el servicio Http para poder hacer las operaciones necesarias
  constructor(private http: HttpClient) { }

  // A partir de aquí declaro las operaciones que va a ofrecer este servicio

  // La siguiente función lama a un observable de la lista de personas
  // Por esto mismo hemos importado arriba la clase Observable


  dameTodos(): Observable<Persona[]> {
    // La operacion get del protocolo http devuelve lo que tiene
    // entre "< >", en este caso una lista de personas.
    return this.http.get<Persona[]>(this.APIUrl);
  }

  // Autentificar(nombre: string, pass: string): Persona {
  //   let user: Persona[] = [];
  //   user = this.lista.filter(persona => persona.nombre === nombre && persona.pass === pass);

  //   if (user.length === 0) {
  //     return null;
  //   } else {
  //     return user[0];
  //   }

  // }
  // Mostrar (): Persona[] {
    // return this.lista;
  // }

  // Incrementar (nombre: string): Persona[] {
   // this.lista.filter(persona => persona.nombre === nombre)[0].puntos ++;
   // return this.lista;
  // }

  // Eliminar(nombre: string): Persona [] {
  //   this.lista = this.lista
  // }

  DamePersona(nombre: string): Observable<Persona> {
    console.log(nombre);
    return this.http.get<Persona>(this.APIUrl + '/' + nombre);
    console.log(Persona);
  }

  Eliminar(nombre: string): Persona[] {
    console.log('Voy a eliminar a : ' + nombre);
    this.http.delete
  }

  // Autentificar(nombre: string, pass: string): Persona {
  //   let usuario: Persona[] = [];

  //   usuario = this.http.get(persona => persona.nombre === nombre
  //     && persona.pass === pass
  //                           );

  // }
}
