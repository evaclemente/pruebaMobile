import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DbServiceService } from '../db-service.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {

  public form = [
    { val: 'Pepperoni', isChecked: true },
    { val: 'Sausage', isChecked: false },
    { val: 'Mushroom', isChecked: false }
  ];

  constructor( private popOver: PopoverController,
               private router: Router,
               private http: HttpClient,
               private dbService: DbServiceService) { }

  ngOnInit() {
  }

  DesplegaMenu() {

    // const popoverController = document.querySelector('ion-popover-controller');
    this.popOver.create({
      component: 'PersonaComponent',
      translucent: true
    });

    return this.popOver.getTop();

  }

  myFunction() {
    var x = document.getElementById('myLinks');
    console.log('Esto funciona');
    console.log(x.style.display);
    if (x.style.display === 'block') {
      x.style.display = 'none';
    } else {
      x.style.display = 'block';
    }
  }

  IrALista() {
    console.log('Voy a Mostrar la lista');
    this.router.navigate(['/lista']);
  }

  IrAAvatares() {
    console.log('Voy al juego de avatares');
    this.router.navigate(['/avatares']);
  }

}
