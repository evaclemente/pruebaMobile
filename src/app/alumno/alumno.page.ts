import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Router, RouterEvent } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { from } from 'rxjs';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


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
              public navController: NavController) {
  }


  ngOnInit() {
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




