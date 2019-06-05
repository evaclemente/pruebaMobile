import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(private router: Router) {}

  IrAPelos() {
    console.log('Entro a pelos');
    this.router.navigate(['/pelo']);
  }



}
