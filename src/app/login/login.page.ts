import { Component, OnInit } from '@angular/core';
// Primero hago los imports necesarios, en este caso necesito estos tres de angular/forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// También tengo que disponer de IonicPage, NavController y Component
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  myForm: FormGroup;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder) { this.myForm = this.createMyForm(); }

  ngOnInit() {
  }

  private createMyForm() {
    return this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      // passwordConfirmation: ['', Validators.required],
      rol: ['', Validators.required]});
  }

  saveData() {
    console.log(this.myForm.value);
  }

}
