import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
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

  // pages = [
  //   {
  //     title: 'Ver listado',
  //     url: 'alumno/lista'
  //   }
  // ];

  // selectedPath = '';

  constructor() {}


  ngOnInit() {
  }

  // openFirst() {
  //   this.menu.enable(true, 'first');
  //   this.menu.open('first');
  // }

  // openEnd() {
  //   this.menu.open('end');
  // }

  // openCustom() {
  //   this.menu.enable(true, 'custom');
  //   this.menu.open('custom');
  // }


}
