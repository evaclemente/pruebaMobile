import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {PersonaComponent} from './persona/persona.component';
// Las librerías importadas son para poder realizar operaciones Http

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  // Declaro como string la URL de la BDD a la que me quiero conectar
  private APIUrl = 'http://[::1]:3000/personas';

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

}
