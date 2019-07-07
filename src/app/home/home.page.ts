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
  indexpelo: any;
  ojos: any;
  complementos: any;

  constructor(
    private router: Router,
    private datosService: DatosService,
    private http: HttpClient
  ) {

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.http.get('assets/elementos.json', {responseType: 'json'})
    .subscribe(data => { this.todoselementos = data; });
    this.datosService.$getObjectSource.subscribe(data => { console.log(data);
                                                           this.indexpelo = data;
                                                           this.ColocoPelo(this.indexpelo);
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

  ColocoPelo(ident: number) {

    console.log('Entro a colocar el pelo');
    var imagen = document.createElement('img');

    imagen.style.position = 'absolute';
    imagen.style.zIndex = '1';
    imagen.src = this.todoselementos.pelos[ident].fichero;


    imagen.style.left = '0px';
    imagen.style.top = '0px';
    document.getElementById('avatar').appendChild(imagen);

  }



}
