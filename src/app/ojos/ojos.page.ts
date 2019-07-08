import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-ojos',
  templateUrl: './ojos.page.html',
  styleUrls: ['./ojos.page.scss'],
})
export class OjosPage implements OnInit {

  constructor(private http: Http) { }

  elementosOjos: any;
  estadoOjos: boolean [];

  ngOnInit() {

    console.log('Empiezo a cargar ojos');
    // Leo primero el fichero que contiene todos los elementos

   // this.HayPelo = true;
    this.http.get('assets/elementos.json', {responseType: 'json'})
    .subscribe(data => {
                          // me guardos los elementos

                          this.elementosOjos = data;
                          console.log ('ya estan aquí: ' + this.elementosOjos);
                          // coloco los elementos donde toca
                          this.estadoPelo = Array (this.elementosOjos.pelos.length).fill (false);
                          this.ColocarPelos();
                          // this.PasarDatosPelo();
                        });
  }

}
