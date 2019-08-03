import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatosService } from '../datos.service';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { element } from '@angular/core/src/render3';
import { Img } from '../Img';
import { DbServiceService } from '../db-service.service';
import { Persona } from '../Persona';

@Component({
  selector: 'app-pelo',
  templateUrl: './pelo.page.html',
  styleUrls: ['./pelo.page.scss'],
})
export class PeloPage implements OnInit {

  // Declaro una variable que va a contener los elementos del pelo

  elementosPelo: any;
  val: any;
 // pelo: number = 0;
  estadoPelo: boolean [];
  PeloSeleccionado: any;
  URLsPelos: Img = new Array();
  persona: Persona;

 // tipo: string = 'pelos';

  // Necesito usar el protocolo http para cargar el fichero,
  // así que en el contructor coloco un procedimiento http privado

  constructor(
    private http: HttpClient,
    private datosService: DatosService,
    private router: Router,
    private dbService: DbServiceService
              ) {
  }

  ngOnInit() {
    console.log('Empiezo a cargar elementos');
    // Leo primero el fichero que contiene todos los elementos

    this.dbService.DameFoto('Pelos');
    this. URLsPelos = this.dbService.DameLogosPelo();
    this.dbService.DamePersona(this.dbService.ReturnNombrePersona()).subscribe( persona => { console.log(persona);
                                                                                             this.persona = persona; });
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
      this.val = undefined;
      console.log ('No hay archivo seleccionado');
    }
  }

  PasarDatosPelo() {

    if (this.val === undefined) {

      console.log('No has seleccionado ningún pelo');

    } else {

      this.datosService.SetElementoP(this.val);
    }

  }

  GuardaPelo() {
    this.dbService.PonPelo(this.persona, this.val).subscribe();
  }

  // handleButtonClick() {
  //   console.log('hi');
  //   this.controller.create({
  //     message: 'Please wait...',
  //     duration: 3
  //   }).then(loading => loading.present());
  // }

  IrAHome() {

    this.router.navigate(['/home']);
  }


}
