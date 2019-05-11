import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
// import {PeloComponent} from '../pelo/pelo.component';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

 // webpelos: PeloComponent;

  constructor(public navCtrl: NavController) {}

//  MuestraPelos() {
//    this.webpelos = PeloComponent;
//  }

}
