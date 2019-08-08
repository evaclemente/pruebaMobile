import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DbServiceService } from '../db-service.service';
import { Imagen } from '../Imagen';
import { Container } from '../Container';
import { Http, ResponseContentType, RequestOptions, Response, Headers } from '@angular/http';
import { Img } from '../Img';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.page.html',
  styleUrls: ['./galeria.page.scss'],
})
export class GaleriaPage implements OnInit {

  selec: boolean;
  val: Img;
  file: File;
  logo: string;
  Contenedores: any[];
  Pelos: Imagen[];
  Ojos: Imagen[];
  Complementos: Imagen [];
  idcontenedor: string;
  imagenLogo: string;
  URLsPelos: Img[] = new Array();
  URLsOjos: Img[] = new Array();
  URLsComplementos: Img[] = new Array();


  arrayids = new Array();

  private APIFotos = 'http://localhost:3000/api/imagenes';
  constructor(private http: HttpClient,
              private dbService: DbServiceService,
              private http2: Http) { }

  ngOnInit() {
    this.ContenedoresFotos();

    this.dbService.DameFoto('Pelos');
    this.dbService.DameFoto('Ojos');
    this.dbService.DameFoto('Complementos');



  }

  myFunction(nombre: string) {

    console.log('El identificador es: ' + nombre);

    console.log(document.getElementById('subir' + nombre));

    var x = document.getElementById('subir' + nombre);

    console.log('Antes de clickar el estado es: ' + x.style.display);

    if (x.style.display === 'block') {
      x.style.display = 'none';
      console.log('Ahora el estado es: ' + x.style.display);
      console.log(this.selec);
    } else {
      x.style.display = 'block';
      console.log('Ahora el estado es: ' + x.style.display);
    }
  }

  Asignar() {
    this.URLsComplementos = this.dbService.DameLogosComp();
    this.URLsOjos = this.dbService.DameLogosOjos();
    this.URLsPelos = this.dbService.DameLogosPelo();
  }

  ActivarInput() {
    // Recuperamos elinput y provocamos un click sobre ese input
    console.log ('Activar input');
    // Recoge el elemento cuyo id es inp en el código html
    // Por tanto tengo que acordarme de poner este id en el input que sea
    document.getElementById('inp').click();
  }

  Mostrar($event) {
    this.file = $event.target.files[0];

    console.log ( 'fichero' + this.file.name );
    const reader = new FileReader();

    // Ordeno que lea el fichero
    reader.readAsDataURL(this.file);
    // reader.readAsBinaryString
    // Pasa el resultado de la lectura a string
    reader.onload = () => {
      console.log ('ya');
      this.logo = reader.result.toString();
    };

  }

  CargaDeArchivos(idcontainer: string) {

    const formData: FormData = new FormData();
    formData.append(this.file.name, this.file);

    this.http.post('http://localhost:3000/api/imagenes' + '/' + idcontainer + '/upload', formData)
    .subscribe(() => console.log('Ya está'));

  }

  GuardaValor(direccion: any) {
    var x = document.getElementById(direccion).getAttribute('checked');

    console.log('el atributo: ' + document.getElementById(direccion).getAttribute('checked'));
    console.log( 'Valor que llega' + direccion);

    if (x === 'false') {
      x = 'true';
      document.getElementById(direccion).setAttribute('checked', 'true');
      this.val = direccion;
      console.log('Me he guardado esevalor: ' + this.val);
    } else {
      x = 'false';
      document.getElementById(direccion).setAttribute('checked', 'false');
      console.log ('No hay archivo seleccionado');
    }
  }

  ContenedoresFotos() {
    var n;
    var dir = new Array();
    this.dbService.DameContenedores()
                  .subscribe(contenedores => {console.log('Contenedores de la BBDD: ' + contenedores);
                                              this.Contenedores = contenedores;
                                              console.log(this.Contenedores);
                                              // for (n = 0; n < contenedores.length; n++) {
                                              //   this.dbService.DameFoto(contenedores[n].name);
                                              //   dir.push(this.dbService.DameLogos());
                                              //   this.URLs.push(dir);
                                              // }
                                              // console.log(this.URLs);
                                              });
  }


  CargarFotosContenedor(idgaleria: string) {

    var i;
    console.log('El identificador es: ' + idgaleria);

    var x = document.getElementById('galeria' + idgaleria);

    console.log('Antes de clickar el estado es: ' + x.style.display);

    if (x.style.display === 'block') {
      x.style.display = 'none';
      console.log('Ahora el estado es: ' + x.style.display);
    } else {
      x.style.display = 'block';
      console.log('Ahora el estado es: ' + x.style.display);
    }
  }


}
