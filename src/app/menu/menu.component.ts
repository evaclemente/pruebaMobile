import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular'; // importo el controlador de menú
import { from } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor( public menuCtrl: MenuController) {
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  ngOnInit() {}

}
