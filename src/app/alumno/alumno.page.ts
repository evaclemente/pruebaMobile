import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Router, RouterEvent, ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { DbServiceService } from '../db-service.service';
import { Persona } from '../Persona';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  alumno: Persona;
  nuevoPass: string;


 pages = [
   {
     title: 'Home',
     url: '/alumno/home'
   }
 ];

 selectedPath = '';

  constructor(private router: Router,
              public menuCtrl: MenuController,
              public popoverController: MenuController,
              public navController: NavController,
              private route: ActivatedRoute,
              private dbService: DbServiceService) {
  }


  ngOnInit() {
    const nombre = this.route.snapshot.paramMap.get('nombre');
    this.dbService.DamePersona(nombre)
    .subscribe(alumno => {console.log('Este es el nombre: ' + alumno.nombre);
                          this.alumno = alumno; });

  }

  IrAHome() {
    this.router.navigate(['/home']);
  }

  IrALogin() {
    this.router.navigate(['/login']);
  }

  toggleMenu() {

    this.menuCtrl.enable(true);
    this.menuCtrl.toggle('menuAlumno');
  }

}




