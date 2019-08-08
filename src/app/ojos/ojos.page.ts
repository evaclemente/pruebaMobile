import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { DatosService } from '../datos.service';
import { DbServiceService } from '../db-service.service';
import { Matricula } from '../Matricula';
import { Imagen } from '../Imagen';
import { Http, ResponseContentType, RequestOptions, Response, Headers  } from '@angular/http';

@Component({
  selector: 'app-ojos',
  templateUrl: './ojos.page.html',
  styleUrls: ['./ojos.page.scss'],
})
export class OjosPage implements OnInit {

  constructor(private http: HttpClient,
              private router: Router,
              private datosService: DatosService,
              private dbService: DbServiceService,
              private http2: Http) {

  }

  ModeloOjos: Imagen[] = new Array();
  matricula: Matricula;
  OjosSeleccionados: Imagen;
  // URLsOjos: Img = new Array();
  Logos: string[];
  val: any;
  private APIFotos = 'http://localhost:3000/api/imagenes/Ojos';

  ngOnInit() {
    // Me aseguro de que esté vacío el array de Imagenes antes de cargar la vista HTML
    // porque como hay una función push que se dedica a añadir posiciones a la cola del array,
    // puede que no esté vacío siempre
    this.ModeloOjos = [];
    // Lo primero que tengo que hacer es recuperar la matrícula
    // que la tiene guardada el servicio de la Base de Datos
    this.matricula = this.dbService.ReturnMatri();
    // Cargo las fotos disponibles en la galería de ojos
    this.http.get<any>(this.APIFotos + '/files')
    .subscribe( fotoscontainer => { console.log(fotoscontainer);
                                    var i;
                                    for ( i = 0; i < fotoscontainer.length; i ++ ) {
                                      this.RDameFoto(fotoscontainer[i].name);
                                    }
    });

  }


  GuardaValor(direccion: Imagen) {
    var x = document.getElementById(direccion.nombre).getAttribute('checked');

    console.log('el atributo: ' + document.getElementById(direccion.nombre).getAttribute('checked'));
    console.log( 'Valor que llega' + direccion);

    if (x === 'false') {
      x = 'true';
      document.getElementById(direccion.nombre).setAttribute('checked', 'true');
      this.OjosSeleccionados = direccion;
      console.log('Me he guardado esevalor: ' + this.OjosSeleccionados);
    } else {
      x = 'false';
      document.getElementById(direccion.nombre).setAttribute('checked', 'false');
      this.OjosSeleccionados = undefined;
      console.log ('No hay archivo seleccionado');
    }
  }

  RDameFoto(idfoto: string) {

    this.http2.get(this.APIFotos + '/download/' + idfoto,
    {responseType: ResponseContentType.Blob} )
    .subscribe(response => {
                             console.log(response);
                             this.CargarLogos(response, idfoto);
                            });
    console.log('Ye he acabado');
  }


  CargarLogos(response: Response, idfoto: string) {


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

  GuardarOjos() {

    if (this.OjosSeleccionados !== undefined || this.OjosSeleccionados.nombre !== '') {
      console.log('Guardando ojos');
      this.dbService.GuardarOjos(this.matricula, this.OjosSeleccionados.nombre).subscribe();
      this.router.navigate(['/home']);
    } else {
      console.log('No has seleccionado ningunos ojos');
    }
  }

  // PasarDatosOjos() {

  //   if (this.OjosSeleccionados === undefined) {

  //     console.log('No has seleccionado ningún pelo');

  //   } else {
  //     this.dbService.ElementoO(this.OjosSeleccionados);
  //   }
  // }

  // IrAHome() {
  //   this.router.navigate(['/home']);
  // }

}
