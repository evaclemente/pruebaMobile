import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {PersonaComponent} from './persona/persona.component';
import { Persona } from './Persona';
import { Clase } from './Clase';
import { Imagen } from './Imagen';
import { Container } from './Container';
import { Img } from './Img';
import { Http, ResponseContentType, RequestOptions, Response, Headers } from '@angular/http';
import { Matricula } from './Matricula';
// Las librerías importadas son para poder realizar operaciones Http

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  // Creo un array en el que voy a guardar imágenes
  // que vendran de un contenedor concreto

  imagenesPelos: Img[] = new Array();
  imagenesOjos: Img[] =  new Array();
  imagenesComplementos: Img[] = new Array();
  idclase: string;
  NPersona: string;
  matricula: Matricula;

  // Declaro como string la URL de la BDD a la que me quiero conectar
  private APIUrl = 'http://localhost:3000/api/Personas';
  private APIClases = 'http://localhost:3000/api/Clases';
  private APIFotos = 'http://localhost:3000/api/imagenes';
  private APIMatriculas = 'http://localhost:3000/api/matriculas?filter[where][idAlumno]=';


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

  DameMatriculaAlumno(idAsignatura: string) {

    console.log( idAsignatura );

    return this.http.get<Matricula[]>('http://localhost:3000/api/matriculas?filter[where][idAsignatura]=' + idAsignatura);

  }


  Eliminar(nombre: string): Observable<any> {
    return this.http.delete<any>(this.APIUrl + '/' + nombre);
  }

  DamePersona(nombre: string): Observable<Persona> {
    console.log(nombre);
    return this.http.get<Persona>(this.APIUrl + '/' + nombre);
    console.log(Persona);
  }

  SetIdClase(clase: string) {
    this.idclase = clase;
  }

  SetNombrePersona(npersona: string) {
    this.NPersona = npersona;
  }

  SetMatricula(matri: Matricula) {
    this.matricula = matri;
  }


  ReturnNombrePersona() {
    return this.NPersona;
  }

  ReturnIdClase() {
    return this.idclase;
  }

  ReturnMatri() {
    return this.matricula;
  }


  DameClase(idclase: string): Observable<Clase> {
    this.idclase = idclase;
    console.log('Te doy los datos de: ' + idclase);
    return this.http.get<Clase>(this.APIClases + '/' + idclase);
  }

  DameClases(): Observable<Clase[]> {
    return this.http.get<Clase[]>(this.APIClases);
  }


  ColocoPelo(elementoP: string) {


    if (elementoP === undefined || elementoP === '') {
      console.log('No has seleccionado ningún pelo');
    } else {
      console.log('Entro a colocar');

      var imagen = document.createElement('img');

      imagen.style.position = 'absolute';
      imagen.style.zIndex = '1';
      imagen.style.left = '0px';
      imagen.style.top = '0px';
      imagen.src = elementoP;
      document.getElementById('avatar').appendChild(imagen);
    }


  }


  ColocoOjos(elementoO: string) {


    if (elementoO === undefined || elementoO === '' ) {
      console.log('No has seleccionado ningún pelo');
    } else {

      var imagen = document.createElement('img');

      imagen.style.position = 'absolute';
      imagen.style.zIndex = '1';
      imagen.style.left = '0px';
      imagen.style.top = '0px';
      imagen.src = elementoO;
      document.getElementById('avatar').appendChild(imagen);
    }


  }


  ColocoComp(elementoC) {


    if (elementoC === undefined || elementoC === '' ) {
      console.log('No has seleccionado ningún pelo');
    } else {

      var imagen = document.createElement('img');

      imagen.style.position = 'absolute';
      imagen.style.zIndex = '1';
      imagen.style.left = '0px';
      imagen.style.top = '0px';
      imagen.src = elementoC;
      document.getElementById('avatar').appendChild(imagen);
    }


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



  DameContenedores(): Observable<any[]> {
    return this.http.get<any[]>(this.APIFotos);
  }



  DameFoto(idconte: string) {
    // this.VaciarArray();
    var i;
    this.http.get<any>(this.APIFotos + '/' + idconte + '/files')
    .subscribe( fotoscontainer => { console.log('Tengo los archivos del container: ' + fotoscontainer);
                                    // this.nombreslogos = fotoscontainer;
                                    for (i = 0; i < fotoscontainer.length; i++) {
                                      console.log(fotoscontainer[i].name);
                                      this.http2.get(this.APIFotos + '/' + idconte + '/download/' + fotoscontainer[i].name,
                                      {responseType: ResponseContentType.Blob} )
                                      .subscribe(response => {
                                                              console.log(response);
                                                              this.CargarLogos(response, idconte); });
                                    }
                                    console.log('Ye he acabado');
                                   });
  }

  DameLogosPelo() {
    // console.log('Ya he rellenado el modelo');
    return this.imagenesPelos;
  }

  DameLogosOjos() {
    return this.imagenesOjos;
  }

  DameLogosComp() {
    return this.imagenesComplementos;
  }

  CargarLogos(response: Response, idconte: string) {


    const blob = new Blob([response.blob()], {type: 'image/jpg'});

    const reader = new FileReader();
    reader.addEventListener('load', () => {

      if (idconte === 'Pelos') {
        // console.log('No sé si entra');
        this.imagenesPelos.push(reader.result.toString());
      }

      if (idconte === 'Ojos') {
        this.imagenesOjos.push(reader.result.toString());
        console.log(this.imagenesOjos);
      }

      if (idconte === 'Complementos') {
        this.imagenesComplementos.push(reader.result.toString());
        console.log(this.imagenesComplementos);
      }

    }, false);

    if (blob) {
      reader.readAsDataURL(blob);
    }
  }

  GuardarPelo(matricula: Matricula, p1: string): Observable<Matricula> {

    console.log(p1);
    matricula.URLpelo = p1;
    console.log('He llegado al servicio');
    console.log('http://localhost:3000/api/matriculas/' +  matricula.id);

    return this.http.put<any>('http://localhost:3000/api/matriculas/' +  matricula.id, matricula);
  }

  GuardarOjos(matricula: Matricula, p2: string): Observable<Matricula> {

    matricula.URLojos = p2;

    return this.http.put<any>('http://localhost:3000/api/matriculas/' +  matricula.id, matricula);
  }

  GuardarComp(matricula: Matricula, p3: string): Observable<Matricula> {

    matricula.URLcomplemento = p3;

    return this.http.put<any>('http://localhost:3000/api/matriculas/' +  matricula.id, matricula);
  }




}
