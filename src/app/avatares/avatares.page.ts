import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatosService } from '../datos.service';
import { DbServiceService } from '../db-service.service';
import { Clase } from '../Clase';
import { Http } from '@angular/http';
import { Familia } from '../Familia';
 // import { from } from 'rxjs';

@Component({
  selector: 'app-avatares',
  templateUrl: './avatares.page.html',
  styleUrls: ['./avatares.page.scss'],
})
export class AvataresPage implements OnInit {

  estado: boolean;
  idClase: string;
  clase: Clase;
  familias: Familia[] = new Array();
  nombrefamilias = new Array();
  private APIFotos = 'http://localhost:3000/api/imagenes';
  familiaescogida: string;

  constructor(private http: HttpClient,
              private router: Router,
              private datosService: DatosService,
              private dbService: DbServiceService,
              private http2: Http) { }

  ngOnInit() {
    this.idClase = this.datosService.DameIDClase();
    this.dbService.DameClase(this.idClase).subscribe( clase => {this.clase = clase;
                                                                console.log('Datos de clase: ' + clase);
                                                                this.estado = clase.avatares;
                                                                this.myChange();
                                                                this.Mostrar();
                                                                });

    this.http.get<any[]>(this.APIFotos + '/Bustos/files')
    .subscribe( fotoscontainer => {console.log (fotoscontainer);
                                   var i;
                                   for ( i = 0; i < fotoscontainer.length; i ++) {
                                    this.familias[i] = fotoscontainer[i].name;
                                   }
                                   console.log('Aquí están las familias: ' + this.nombrefamilias);
                                   this.DivideFamilias(this.familias);
                                  });


  }

  DivideFamilias(containerfotos: any []) {

    var i;
    console.log('Me ha llegado el container: ' + containerfotos);
    var strn;
    for ( i = 0; i < containerfotos.length; i ++) {
      strn = containerfotos[i];
      this.familias[i] = strn.split('_', 1);
      console.log(this.familias);
    }

    console.log(this.familias);

    // return this.familias;
    // var str = "How are you doing today?";
    // var res = str.split('_', 1);
    // document.getElementById("demo").innerHTML = res;
  }

  myChange() {
    console.log(this.estado);
  }

  VerListaAvatares() {
    console.log('Entra');
    this.dbService.SetIdClase(this.idClase);
    this.router.navigate(['/listaavatares']);
  }

  Mostrar() {
    var x = document.getElementById('activado');
    console.log('Esto funciona');
    if (this.estado === true) {
      x.style.display = 'block';
    } else {
     x.style.display = 'none';
    }
  }

  GuardarFamilia() {

    this.dbService.GuardaFamilia(this.familiaescogida, this.clase).subscribe( () => this.MuestraFamilia());

  }

  MuestraFamilia() {

    var x = document.getElementById('fam');
    console.log('Esto Muestro la familia');
    x.style.display = 'block';

  }

  IrAPermisos() {
    this.dbService.SetIdClase(this.clase.id);
    this.router.navigate(['/permisos']);
  }

  IrAClases() {
    this.router.navigate(['/clases']);
  }

  CambiaEstado() {
    this.dbService.CambiaEstadoJuego(this.clase).subscribe();
  }
}
