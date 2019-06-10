import { Component, OnInit, Input } from '@angular/core';
import { Persona } from '../Persona';
import { DbServiceService } from '../db-service.service';
// import { from } from 'rxjs';
// import { NavController, NavParams } from '@ionic/angular';
import { from } from 'rxjs';
import { LoginPage } from '../login/login.page';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  lista: Persona[];
  nombre: string;
  pass: string;
  rol: string;
  puntos: number;

  constructor(private dbService: DbServiceService) {
    // this.lista = navParams.get('lista');
  }

  ngOnInit() {
    this.dbService.dameTodos()
    .subscribe(lista => {
                         this.lista = lista;
                         console.log('Ya está aquí la lista');
                         console.log(this.lista);
                        }
              );
  }



}
