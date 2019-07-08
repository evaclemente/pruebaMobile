import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { DatosService } from '../datos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todoselementos: any;
  indexpelo: number =  0;
  ojos: any;
  complementos: any;
  objetoseleccionado: string;

  constructor(
    private router: Router,
    private datosService: DatosService,
    private http: HttpClient
  ) {

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.http.get('assets/elementos.json', {responseType: 'json'})
    .subscribe(data => { this.todoselementos = data;
                         this.datosService.ColocoPelo(this.indexpelo, this.todoselementos); });
    this.datosService.$getObjectSource.subscribe(data => { console.log(data);
                                                           // this.indexpelo = data[1];
                                                           // this.objetoseleccionado = data[2];
                                                          });
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


}
