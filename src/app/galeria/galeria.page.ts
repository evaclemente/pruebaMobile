import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DbServiceService } from '../db-service.service';
import { Imagen } from '../Imagen';
import { Container } from '../Container';
import { Http, ResponseContentType, RequestOptions, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.page.html',
  styleUrls: ['./galeria.page.scss'],
})
export class GaleriaPage implements OnInit {

  file: File;
  logo: string;
  Contenedores: any[];
  Pelos: Imagen[];
  Ojos: Imagen[];
  Complementos: Imagen [];
  idcontenedor: string;
  imagenLogo: string[];
  private APIFotos = 'http://localhost:3000/api/imagenes';
  constructor(private http: HttpClient,
              private dbService: DbServiceService,
              private http2: Http) { }

  ngOnInit() {
    this.ContenedoresFotos();
    this.dbService.dameFotosContainer('Pelos').subscribe();
    this.DameFotosContainer('Pelos');
    console.log(this.imagenLogo);
    // console.log('Te muestro lo que recibo de contenedores: ' + this.Contenedores);
  }

  myFunction(nombre: string) {

    console.log('El identificador es: ' + nombre);

    console.log(document.getElementById('subir' + nombre));

    var x = document.getElementById('subir' + nombre);

    console.log('Antes de clickar el estado es: ' + x.style.display);

    if (x.style.display === 'block') {
      x.style.display = 'none';
      console.log('Ahora el estado es: ' + x.style.display);
    } else {
      x.style.display = 'block';
      console.log('Ahora el estado es: ' + x.style.display);
    }
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

  ContenedoresFotos() {
    this.dbService.DameContenedores()
                  .subscribe(contenedores => {console.log('Contenedores de la BBDD: ' + contenedores);
                                              this.Contenedores = contenedores;
                                              console.log(this.Contenedores);
                                              // this.CargarContenedores();
                                              });
  }

  DameLogos() {
    this.http
  }

  CargarFotosContenedor(idgaleria: string) {

    var i;

    this.dbService.dameFotosContainer(idgaleria)
                      .subscribe( Fotos => {console.log('Ya he cargado las fotos');
                                            console.log ('Mira lo que hay: ' + Fotos);
                                            for ( i = 0; i < Fotos.length; i++) {
                                              this.Mostrar(Event);

                                            //   reader.readAsDataURL(this.file);
                                            //   var imagen = document.createElement('img'); // creo una imágen
                                            //   imagen.id = Fotos[i].name;
                                            //   console.log('Esta es la foto: ' + imagen.id);
                                            //   // imagen.style.left = '100px';
                                            //  // imagen.style.top = 140 * i + 'px';
                                            //   // imagen.style.position =  'absolute';
                                            //   imagen.src = 'http://localhost:3000/api/imagenes' + idgaleria + '/files/' + Fotos[i].name;
                                            //   console.log(imagen.src);
                                            //   document.getElementById('galeria' + idgaleria).appendChild(imagen);
                                            }
                                            console.log('Ya lo he cargado todo');
                                          });

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

  DameFotosContainer(idconte: string) {
    var i;
    var imagenLogo: string;
    this.http.get<any>(this.APIFotos + '/' + idconte + '/files')
    .subscribe( fotoscontainer => { console.log('Tengo los archivos del container: ' + fotoscontainer);
                                    for (i = 0; i < 1; i++) {
                                      this.http2.get(this.APIFotos + '/' + idconte + '/download/' + fotoscontainer[i].name,
                                      {responseType: ResponseContentType.Blob} )
                                      .subscribe(response => {console.log('Respuesta: ' + response);
                                                              const blob = new Blob([response.blob()], {type: 'image/jpg'});
                                                              const reader = new FileReader();
                                                              reader.addEventListener('load', () => {
                                                                console.log(reader.result.toString());
                                                                imagenLogo = reader.result.toString();
                                                              }, false);
                                                              if (blob) {
                                                                reader.readAsDataURL(blob);
                                                              }
                                                            });
                                      this.imagenLogo[i] = imagenLogo;
                                    }
                                   });
  }

  // CargarLogos(response: Response, idx: number) {

  //   const blob = new Blob([response.blob()], {type: 'image/jpg'});

  //   const reader = new FileReader();
  //   reader.addEventListener('load', () => {
  //     console.log(reader.result.toString());
  //     this.imagenLogo[idx] = reader.result.toString();
  //     console.log('Cargo: ' + this.imagenLogo);
  //   }, false);

  //   if (blob) {
  //     reader.readAsDataURL(blob);
  //   }
  // }
}
