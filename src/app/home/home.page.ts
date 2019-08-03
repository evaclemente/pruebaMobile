import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { DatosService } from '../datos.service';
import { HttpClient } from '@angular/common/http';
import { Img } from '../Img';
import { DbServiceService } from '../db-service.service';
import { Persona } from '../Persona';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todoselementos: any;
  URLPelo: any;
  URLOjos: any;
  URLComp: any;
  ojos: boolean;
  pelo: boolean;
  complemento: boolean;
  objetoseleccionado: string;
  nombre: string;
  persona: Persona;
  // indexojos: number = 0;

  constructor(
    private router: Router,
    private datosService: DatosService,
    private http: HttpClient,
    private dbService: DbServiceService,
  ) {

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.dbService.DamePersona(this.dbService.ReturnNombrePersona()).subscribe(persona => { console.log('Me ha llegado:' + persona);
                                                                                            this.persona = persona;
                                                                                            this.pelo = persona.pelo;
                                                                                            this.ojos = persona.ojos;
                                                                                            this.complemento = persona.complemento;
                                                                                            this.URLPelo = persona.URLpelo;
                                                                                            this.URLOjos = persona.URLojos;
                                                                                            this.URLComp = persona.URLcomplemento;
                                                                                            this.PermisoPelo();
                                                                                            this.PermisoOjos();
                                                                                            this.PermisoComp();
                                                                                            this.dbService.ColocoPelo(persona);
                                                                                            this.dbService.ColocoOjos(persona);
                                                                                            this.dbService.ColocoComp(persona);
                                                                                          });
  }

  IrAPelos() {
    this.dbService.SetNombrePersona(this.persona.nombre);
    console.log('Entro a pelos');
    this.router.navigate(['/pelo']);
  }

  IrALogin() {
    console.log('Entro al Login');
    this.router.navigate(['/login']);
  }

  IrAOjos() {
    console.log('Me voy a Ojos');
    this.dbService.SetNombrePersona(this.persona.nombre);
    this.router.navigate(['/ojos']);
  }

  IrAAlumno() {
    // this.dbService.SetNombrePersona(this.persona.nombre);
    console.log('Me voy a Alumno');
    this.router.navigate(['/alumno']);
  }

  IrAComp() {
    this.dbService.SetNombrePersona(this.persona.nombre);
    console.log('Me voy a Alumno');
    // this.router.navigate(['/complementos']);
  }

  PermisoPelo() {

    var x = document.getElementById('P1');

    var p1 = this.pelo;

    if (p1 === true) {
      document.getElementById('P1').setAttribute('disabled', 'false');
    } else {
      document.getElementById('P1').setAttribute('disabled', 'true');
    }

  }

  PermisoOjos() {

    var x = document.getElementById('P2');

    var p2 = this.ojos;

    if (p2 === true) {
      document.getElementById('P2').setAttribute('disabled', 'false');
    } else {
      document.getElementById('P2').setAttribute('disabled', 'true');
    }

  }

  PermisoComp() {

    var x = document.getElementById('P3');

    var p3 = this.ojos;

    if (p3 === true) {
      document.getElementById('P3').setAttribute('disabled', 'false');
    } else {
      document.getElementById('P3').setAttribute('disabled', 'true');
    }

  }


}
