import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Router, RouterEvent, ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { DbServiceService } from '../db-service.service';
import { Persona } from '../Persona';
import { DatosService } from '../datos.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  alumno: Persona;
  nuevoPass: string;
  nombre: any;

  constructor(private router: Router,
              public menuCtrl: MenuController,
              public popoverController: MenuController,
              public navController: NavController,
              private dbService: DbServiceService,
              private datosService: DatosService) {
  }


  ngOnInit() {

    this.nombre = this.datosService.DameNombre();
    this.dbService.DamePersona(this.nombre)
    .subscribe(alumno => {console.log('Este es el nombre: ' + alumno.nombre);
                          this.alumno = alumno; });

  }

  IrAHome() {
    this.router.navigate(['/home']);
  }

  IrAMiPerfil() {
    this.router.navigate(['/miperfil']);
  }
  IrALogin() {
    this.router.navigate(['/login']);
  }

  toggleMenu() {

    this.menuCtrl.enable(true);
    this.menuCtrl.toggle('menuAlumno');
  }

}




