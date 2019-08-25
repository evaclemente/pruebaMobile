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
  ModeloPelos: Imagen[] = new Array();
  ModeloOjos: Imagen[] = new Array();
  ModeloComp: Imagen[] = new Array();
  ModeloBocas: Imagen [] = new Array();
  ModeloBustos: Imagen [] = new Array();


  arrayids = new Array();

  private APIFotos = 'http://localhost:3000/api/imagenes';
  private APIBustos = 'http://localhost:3000/api/imagenes/Bustos';
  private APIOjos = 'http://localhost:3000/api/imagenes/Ojos';
  private APIPelos = 'http://localhost:3000/api/imagenes/Pelos';
  private APIComp = 'http://localhost:3000/api/imagenes/Complementos';
  // private APIFotos = 'http://localhost:3000/api/imagenes'; Aquí tengo que añadir bocas
  constructor(private http: HttpClient,
              private dbService: DbServiceService,
              private http2: Http) { }

  ngOnInit() {

    // Me aseguro de que esté vacío el array de Imagenes antes de cargar la vista HTML
    // porque como hay una función push que se dedica a añadir posiciones a la cola del array,
    // puede que no esté vacío siempre
    this.ModeloOjos = [];
    this.ModeloPelos = [];
    this.ModeloComp = [];

    this.ContenedoresFotos();

    this.dbService.DameFoto('Pelos');
    this.dbService.DameFoto('Ojos');
    this.dbService.DameFoto('Complementos');
    this.http.get<any>(this.APIPelos + '/files')
    .subscribe( fotoscontainer => { console.log(fotoscontainer);
                                    var i;
                                    for ( i = 0; i < fotoscontainer.length; i ++ ) {
                                      this.RDameFotoP(fotoscontainer[i].name);
                                    }
    });

    this.http.get<any>(this.APIOjos + '/files')
    .subscribe( fotoscontainer => { console.log(fotoscontainer);
                                    var i;
                                    for ( i = 0; i < fotoscontainer.length; i ++ ) {
                                      this.RDameFotoO(fotoscontainer[i].name);
                                    }
                                  });

    this.http.get<any>(this.APIComp + '/files')
    .subscribe( fotoscontainer => { console.log(fotoscontainer);
                                    var i;
                                    for ( i = 0; i < fotoscontainer.length; i ++ ) {
                                      this.RDameFotoC(fotoscontainer[i].name);
                                    }
                                  });


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

  // Asignar() {

  //   this.URLsComplementos = this.dbService.DameLogosComp();
  //   this.URLsOjos = this.dbService.DameLogosOjos();
  //   this.URLsPelos = this.dbService.DameLogosPelo();
  // }

  // Estas dos funciones sirven para cargar los logos de las imágenes
  // almacenadas en el contenedor de Pelos

  RDameFotoP(idfoto: string) {

    this.http2.get(this.APIPelos + '/download/' + idfoto,
    {responseType: ResponseContentType.Blob} )
    .subscribe(response => {
                             console.log(response);
                             this.CargarLogosP(response, idfoto);
                            });
    console.log('Ye he acabado');
  }


  CargarLogosP(response: Response, idfoto: string) {


    const blob = new Blob([response.blob()], {type: 'image/jpg'});

    const reader = new FileReader();
    reader.addEventListener('load', () => {
     console.log('No sé si entra');
     this.ModeloPelos.push({nombre: idfoto, direc: reader.result.toString()});
     console.log(this.ModeloPelos);
    }, false);

    if (blob) {
      reader.readAsDataURL(blob);
    }
  }

  // Estas dos funciones sirven para cargar los logos de las imágenes
  // almacenadas en el contenedor de Ojos

  RDameFotoO(idfoto: string) {

    this.http2.get(this.APIOjos + '/download/' + idfoto,
    {responseType: ResponseContentType.Blob} )
    .subscribe(response => {
                             console.log(response);
                             this.CargarLogosO(response, idfoto);
                            });
    console.log('Ye he acabado');
  }


  CargarLogosO(response: Response, idfoto: string) {


    const blob = new Blob([response.blob()], {type: 'image/jpg'});

    const reader = new FileReader();
    reader.addEventListener('load', () => {
     console.log('No sé si entra');
     this.ModeloOjos.push({nombre: idfoto, direc: reader.result.toString()});
     console.log(this.ModeloOjos);
    }, false);

    if (blob) {
      reader.readAsDataURL(blob);
    }
  }

  // Estas dos funciones sirven para cargar los logos de las imágenes
  // almacenadas en el contenedor de Complementos
  RDameFotoC(idfoto: string) {

    this.http2.get(this.APIComp + '/download/' + idfoto,
    {responseType: ResponseContentType.Blob} )
    .subscribe(response => {
                             console.log(response);
                             this.CargarLogosC(response, idfoto);
                            });
    console.log('Ye he acabado');
  }


  CargarLogosC(response: Response, idfoto: string) {


    const blob = new Blob([response.blob()], {type: 'image/jpg'});

    const reader = new FileReader();
    reader.addEventListener('load', () => {
     console.log('No sé si entra');
     this.ModeloComp.push({nombre: idfoto, direc: reader.result.toString()});
     console.log(this.ModeloComp);
    }, false);

    if (blob) {
      reader.readAsDataURL(blob);
    }
  }

  // Estas dos funciones sirven para cargar los logos de las imágenes
  // almacenadas en el contenedor de Bustos
  RDameFotoB(idfoto: string) {

    this.http2.get(this.APIComp + '/download/' + idfoto,
    {responseType: ResponseContentType.Blob} )
    .subscribe(response => {
                             console.log(response);
                             this.CargarLogosB(response, idfoto);
                            });
    console.log('Ye he acabado');
  }


  CargarLogosB(response: Response, idfoto: string) {


    const blob = new Blob([response.blob()], {type: 'image/jpg'});

    const reader = new FileReader();
    reader.addEventListener('load', () => {
     console.log('No sé si entra');
     this.ModeloBustos.push({nombre: idfoto, direc: reader.result.toString()});
     console.log(this.ModeloBustos);
    }, false);

    if (blob) {
      reader.readAsDataURL(blob);
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
