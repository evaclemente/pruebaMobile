import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {PersonaComponent} from './persona/persona.component';
import { Persona } from './Persona';
import { Clase } from './Clase';
import { Imagen } from './Imagen';
import { Container } from './Container';
import { Http, ResponseContentType, RequestOptions, Response, Headers } from '@angular/http';
// Las librerías importadas son para poder realizar operaciones Http

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  // Creo un array en el que voy a guardar imágenes
  // que vendran de un contenedor concreto

  imagenesLogos = new Array();

  // Declaro como string la URL de la BDD a la que me quiero conectar
  private APIUrl = 'http://localhost:3000/api/Personas';
  private APIClases = 'http://localhost:3000/api/Clases';
  private APIFotos = 'http://localhost:3000/api/imagenes';

  // Inserto en el constructor el servicio Http para poder hacer las operaciones necesarias
  constructor(private http: HttpClient,
              private http2: Http) { }

  // A partir de aquí declaro las operaciones que va a ofrecer este servicio

  // La siguiente función lama a un observable de la lista de personas
  // Por esto mismo hemos importado arriba la clase Observable


  dameTodos(): Observable<Persona[]> {
    // La operacion get del protocolo http devuelve lo que tiene
    // entre "< >", en este caso una lista de personas.
    return this.http.get<Persona[]>(this.APIUrl);
  }

  dameFotosContainer(container: string): Observable<any[]> {

    return this.http.get<any[]>(this.APIFotos + '/' + container + '/files');

  }


  Eliminar(nombre: string): Observable<any> {
    return this.http.delete<any>(this.APIUrl + '/' + nombre);
  }

  DamePersona(nombre: string): Observable<Persona> {
    console.log(nombre);
    return this.http.get<Persona>(this.APIUrl + '/' + nombre);
    console.log(Persona);
  }
  DameClase(idclase: string): Observable<Clase> {
    console.log('Te doy los datos de: ' + idclase);
    return this.http.get<Clase>(this.APIClases + '/' + idclase);
  }

  DameClases(): Observable<Clase[]> {
    return this.http.get<Clase[]>(this.APIClases);
  }

  CambiaEstadoJuego(clase: Clase) {

    if (clase.avatares === true) {
      clase.avatares = false;
    } else {
      clase.avatares = true;
    }
    console.log('Ahora el estado es este:' + clase.avatares);
    return this.http.put<any>(this.APIClases + '/' + clase.id, clase);
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

  // Creo una función que sirve sólamente para la carga de archivos
  // como imágenes o archivos de texto, servirá para que el profesor
  // cargue el material en la galería y los archivos de texto que irán ligados
  // a los permisos 1, 2 y 3 para construir el avatar

  // CargaDeArchivos() {

  //   const formData: FormData = new FormData();
  //   formData.append(this.file.name, this.file);

  //   this.http.post('http://localhost:3000/api/imagenes/FotosAvatares/upload', formData)
  //   .subscribe(() => console.log('Ya está'));

  // }

  DameContenedores(): Observable<any[]> {
    return this.http.get<any[]>(this.APIFotos);
  }

  DameFoto(idconte: string) {
    var i;
    this.http.get<any>(this.APIFotos + '/' + idconte + '/files')
    .subscribe( fotoscontainer => { console.log('Tengo los archivos del container: ' + fotoscontainer);
                                    for (i = 0; i < fotoscontainer.length; i++) {
                                      console.log(fotoscontainer[i].name);
                                      this.http2.get(this.APIFotos + '/' + idconte + '/download/' + fotoscontainer[i].name,
                                      {responseType: ResponseContentType.Blob} )
                                      .subscribe(response => {console.log(response);
                                                              this.CargarLogos(response); });
                                    }
                                    // return this.imagenesLogos;
                                   });
  }

  DameLogos() {
    // this.DameFoto(idconte);
    return this.imagenesLogos;
  }

  CargarLogos(response: Response) {

    const blob = new Blob([response.blob()], {type: 'image/jpg'});

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imagenesLogos.push(reader.result.toString());
      console.log(this.imagenesLogos);
    }, false);

    if (blob) {
      reader.readAsDataURL(blob);
    }
  }



}
