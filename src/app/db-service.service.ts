import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {PersonaComponent} from './persona/persona.component';
import { Persona } from './Persona';
import { Clase } from './Clase';
// Las librerías importadas son para poder realizar operaciones Http

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  // Declaro como string la URL de la BDD a la que me quiero conectar
  private APIUrl = 'http://localhost:3000/api/Personas';
  private APIClases = 'http://localhost:3000/api/Clases';

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

  Eliminar(nombre: string): Observable<any> {
    return this.http.delete<any>(this.APIUrl + '/' + nombre);
  }

  DamePersona(nombre: string): Observable<Persona> {
    console.log(nombre);
    return this.http.get<Persona>(this.APIUrl + '/' + nombre);
    console.log(Persona);
  }

  DameClases(): Observable<Clase[]> {
    return this.http.get<Clase[]>(this.APIClases);
  }

  CreaClase(clase: Clase, admin: string) {
    clase.admin = admin;
    return this.http.put<any>(this.APIClases + '/' + clase.id, clase);
  }

  PonPass(alumno: Persona, nuevopass: string): Observable<any> {
    alumno.pass = nuevopass;
    return this.http.put<any>(this.APIUrl + '/' + alumno.nombre, alumno);
  }
  // Añadir una persona a la BBDD es una operación post
  // requiere la URL y en este caso la persona que debemos añadir

  // Esta función también devulve un observable de cualquier tipo
  // Va a ser un método usado únicamente por el profesor

  PonPersona(persona: Persona): Observable<any> {
    return this.http.post<any>(this.APIUrl, persona);
  }


}
