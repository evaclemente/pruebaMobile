import { Component, OnInit } from '@angular/core';
import { Http, ResponseContentType, RequestOptions, Response, Headers } from '@angular/http';
import { DbServiceService } from '../db-service.service';
import { DatosService } from '../datos.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Imagen } from '../Imagen';
import { Matricula } from '../Matricula';
import { from } from 'rxjs';

@Component({
  selector: 'app-complementos',
  templateUrl: './complementos.page.html',
  styleUrls: ['./complementos.page.scss'],
})
export class ComplementosPage implements OnInit {

  private APIComplementos = 'http://localhost:3000/api/imagenes/Complementos';
  CompSeleccionado: Imagen;
  ModeloComp: Imagen[] = new Array();
  matricula: Matricula;

  constructor( private http: HttpClient,
               private datosService: DatosService,
               private router: Router,
               private dbService: DbServiceService,
               private http2: Http) { }

  ngOnInit() {

    // Me aseguro de que esté vacío el array de Imagenes antes de cargar la vista HTML
    // porque como hay una función push que se dedica a añadir posiciones a la cola del array,
    // puede que no esté vacío siempre
    this.ModeloComp = [];
    console.log('Empiezo a cargar elementos');
    // Lo primero que tengo que hacer es recuperar la matrícula
    // que la tiene guardada el servicio de la Base de Datos
    this.matricula = this.dbService.ReturnMatri();
    // Cargo las fotos disponibles en la galería de peinados

    this.http.get<any>(this.APIComplementos + '/files')
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
      this.CompSeleccionado = direccion;
      console.log('Me he guardado esevalor: ' + this.CompSeleccionado);
    } else {
      x = 'false';
      document.getElementById(direccion.nombre).setAttribute('checked', 'false');
      this.CompSeleccionado = undefined;
      console.log ('No hay archivo seleccionado');
    }
  }

  RDameFoto(idfoto: string) {

    this.http2.get(this.APIComplementos + '/download/' + idfoto,
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
      // console.log('No sé si entra');
     this.ModeloComp.push({nombre: idfoto, direc: reader.result.toString()});
     console.log(this.ModeloComp);
    }, false);

    if (blob) {
      reader.readAsDataURL(blob);
    }
  }

  GuardarComp() {

    if (this.CompSeleccionado !== undefined || this.CompSeleccionado.nombre !== '') {
      console.log('Guardando ojos');
      this.dbService.GuardarComp(this.matricula, this.CompSeleccionado.nombre).subscribe();
      this.router.navigate(['/home']);
    } else {
      console.log('No has seleccionado ningunos ojos');
    }
  }

}
