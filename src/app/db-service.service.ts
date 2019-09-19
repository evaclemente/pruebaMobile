import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Persona } from './Persona';
import { Clase } from './Clase';
import { Imagen } from './Imagen';
import { Container } from './Container';
import { Img } from './Img';
import { Matricula } from './Matricula';
// Las siguientes librerías importadas son para poder realizar operaciones Http
import { Http, ResponseContentType, RequestOptions, Response, Headers } from '@angular/http';



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
  // private APIMatriculas = 'http://localhost:3000/api/matriculas?filter[where][idAlumno]=';
  APIPermisos = 'http://localhost:3000/api/permisos/ArchivosTexto';


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

  PonMatricula(matricula: Matricula ): Observable<any> {

    return this.http.post<any>('http://localhost:3000/api/matriculas', matricula);
  }

  CuentaMatriculas(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/matriculas/count');
  }


  Eliminar(nombre: string): Observable<any> {
    return this.http.delete<any>(this.APIUrl + '/' + nombre);
  }

  EliminarClase(idClase: string): Observable<Clase> {
    return this.http.delete<Clase>(this.APIClases + '/' + idClase);
  }

  EliminarMatricula(matricula: Matricula): Observable<any> {
    console.log('Voy a eliminar la matrícula de: ' + matricula.idAlumno);
    console.log('El id que elimino es: ' + matricula.id);
    return this.http.delete<any>('http://localhost:3000/api/matriculas/' + matricula.id);
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

    console.log('Me llega un: ' + elementoP);
    if (elementoP === undefined || elementoP === '') {
      console.log('No has seleccionado ningún pelo');
    } else {
      console.log('Entro a colocar');

      var imagen = document.createElement('img');

      imagen.style.position = 'absolute';
      // imagen.style.zIndex = '1';
      imagen.style.left = '0px';
      imagen.style.top = '0px';
      imagen.src = elementoP;
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

  CreaClase(clase: Clase): Observable<any> {
    console.log(clase);
    return this.http.post<any>(this.APIClases, clase);
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

  GuardarBoca(matricula: Matricula, p4: string): Observable<Matricula> {

    matricula.URLboca = p4;
    return this.http.put<any>('http://localhost:3000/api/matriculas/' +  matricula.id, matricula);
  }

  GuardarP1(matricula: Matricula, valorp1: boolean): Observable<Matricula> {
    matricula.pelo = valorp1;
    return this.http.put<any>('http://localhost:3000/api/matriculas/' +  matricula.id, matricula);
  }

  GuardarP2(matricula: Matricula, valorp2: any): Observable<Matricula> {

    matricula.ojos = valorp2;
    return this.http.put<any>('http://localhost:3000/api/matriculas/' +  matricula.id, matricula);

  }

  GuardarP3(matricula: Matricula, valorp3: any): Observable<Matricula> {

    matricula.complemento = valorp3;
    return this.http.put<any>('http://localhost:3000/api/matriculas/' +  matricula.id, matricula);

  }

  GuardarP4(matricula: Matricula, valorp4: any): Observable<Matricula> {

    matricula.verclase = valorp4;
    return this.http.put<any>('http://localhost:3000/api/matriculas/' +  matricula.id, matricula);

  }

  MuestraFicheros(): Observable<Container[]> {
    return this.http.get<Container[]>(this.APIPermisos + '/files');
  }

  GuardaFicheroPermiso1(clase: Clase, archivo: string): Observable<any> {
    clase.p1 = archivo;
    return this.http.put<any>(this.APIClases + '/' + clase.id, clase);
  }

  GuardaFicheroPermiso2(clase: Clase, archivo: string): Observable<any> {
    clase.p2 = archivo;
    return this.http.put<any>(this.APIClases + '/' + clase.id, clase);
  }

  GuardaFicheroPermiso3(clase: Clase, archivo: string): Observable<any> {
    clase.p3 = archivo;
    return this.http.put<any>(this.APIClases + '/' + clase.id, clase);
  }

  GuardaFicheroPermiso4(clase: Clase, archivo: string): Observable<any> {
    clase.p4 = archivo;
    return this.http.put<any>(this.APIClases + '/' + clase.id, clase);
  }

  // Añadir familias de avatares va a ser tan simple como subir imágenes a la carpeta bustos.
  // Cada imágen tendrá una nomenclatura así: "nombrefamilia_pelo1" por ejemplo.

  GuardaFamilia(familia: string, clase: Clase, archivobusto: string): Observable<Clase> {

    clase.familia = familia;
    clase.busto = archivobusto;
    return this.http.put<any>(this.APIClases + '/' + clase.id, clase);

  }

  EliminarFoto(galeria: string, idfoto: string): Observable<any> {

    console.log('Voy a eliminar la foto de: ' + galeria);
    console.log('La foto es: ' + idfoto);
    return this.http.delete<any>(this.APIFotos + '/' + galeria + '/files/' + idfoto);

  }

  // Este método borra el archivo que haya
  // para poner ojos en el avatar
  ResetOjos(matricula: Matricula): Observable<any> {
    var reset = '';
    console.log('Reseteando ojos');
    matricula.URLojos = reset;
    return this.http.put<any>('http://localhost:3000/api/matriculas/' +  matricula.id, matricula);

  }

  ResetPelo(matricula: Matricula): Observable<any> {
    var reset = '';
    console.log('Reseteando pelo');
    matricula.URLpelo = reset;
    return this.http.put<any>('http://localhost:3000/api/matriculas/' +  matricula.id, matricula);

  }

  ResetComp(matricula: Matricula): Observable<any> {
    var reset = '';
    console.log('Reseteando complemento');
    matricula.URLcomplemento = reset;
    return this.http.put<any>('http://localhost:3000/api/matriculas/' +  matricula.id, matricula);

  }

  ResetBoca(matricula: Matricula): Observable<any> {
    var reset = '';
    console.log('Reseteando ojos');
    matricula.URLboca = reset;
    return this.http.put<any>('http://localhost:3000/api/matriculas/' +  matricula.id, matricula);

  }


}
