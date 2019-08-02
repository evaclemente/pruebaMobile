import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { DatosService } from '../datos.service';
import { HttpClient } from '@angular/common/http';
import { Img } from '../Img';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todoselementos: any;
  URLPelo: any;
  URLOjos: any;
  ojos: any;
  complementos: any;
  objetoseleccionado: string;
  // indexojos: number = 0;

  constructor(
    private router: Router,
    private datosService: DatosService,
    private http: HttpClient
  ) {

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.ColocaElementos();
    this.http.get('assets/elementos.json', {responseType: 'json'})
    .subscribe(data => { this.todoselementos = data;
                         this.datosService.ColocoPelo(0, this.todoselementos);
                         this.datosService.ColocoOjos(0, this.todoselementos); });
    this.datosService.$getObjectSource.subscribe(data => { console.log(data);
                                                           // this.indexpelo = data[1];
                                                           // this.objetoseleccionado = data[2];
                                                          });
    console.log('Ya ha llegado la URL del pelo: ' + this.URLPelo);

    console.log('Ya ha llegado la URL del pelo: ' + this.URLOjos);
  }

  IrAPelos() {
    console.log('Entro a pelos');
    this.router.navigate(['/pelo']);
  }

  IrALogin() {
    console.log('Entro al Login');
    this.router.navigate(['/login']);
  }

  IrAOjos() {
    console.log('Me voy a Ojos');
    this.router.navigate(['/ojos']);
  }

  IrAAlumno() {
    console.log('Me voy a Alumno');
    this.router.navigate(['/alumno']);
  }

  ColocaElementos() {
    console.log('Entro');
    this.URLPelo = this.datosService.DameElementoP();
    this.URLOjos = this.datosService.DameElementoO();

  }


}
