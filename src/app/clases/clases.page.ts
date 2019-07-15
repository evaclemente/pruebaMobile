import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

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

  constructor( private popOver: PopoverController) { }

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
    if (x.style.display === 'block') {
      x.style.display = 'none';
    } else {
      x.style.display = 'block';
    }
  }

}
