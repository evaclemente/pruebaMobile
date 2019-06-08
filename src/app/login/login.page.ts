import { Component, OnInit } from '@angular/core';
// Primero hago los imports necesarios, en este caso necesito estos tres de angular/forms
import { FormGroup } from '@angular/forms';
// También tengo que disponer de IonicPage, NavController y Component
import { NavController } from '@ionic/angular';
import { DbServiceService } from '../db-service.service';
import { Persona } from '../Persona';
import { from } from 'rxjs';
 // import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  myForm: FormGroup;
  lista: Persona[];
  nombre: string;
  pass: string;
  rol: string;
  puntos: number;

  constructor(private dbService: DbServiceService) { } // this.myForm = this.createMyForm();

  ngOnInit() {
  }

  Mostrar() {
    this.dbService.dameTodos()
    .subscribe(lista => this.lista = lista);
  }

 // private createMyForm() {
   // return this.formBuilder.group({
  //     user: ['', Validators.required],
  //     password: ['', Validators.required],
  //     // passwordConfirmation: ['', Validators.required],
  //     rol: ['', Validators.required]});
  // }

  // saveData() {
  //   console.log(this.myForm.value);
  // }

}
