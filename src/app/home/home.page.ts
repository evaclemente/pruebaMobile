import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(public navCtrl: NavController) {}


}
