import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatosService } from '../datos.service';
import { DbServiceService } from '../db-service.service';
import { Clase } from '../Clase';

@Component({
  selector: 'app-avatares',
  templateUrl: './avatares.page.html',
  styleUrls: ['./avatares.page.scss'],
})
export class AvataresPage implements OnInit {

  estado: boolean;
  idClase: string;
  clase: Clase;
  constructor(private http: HttpClient,
              private router: Router,
              private datosService: DatosService,
              private dbService: DbServiceService) { }

  ngOnInit() {
    this.idClase = this.datosService.DameIDClase();
    this.dbService.DameClase(this.idClase).subscribe( clase => {this.clase = clase;
                                                                console.log('Datos de clase: ' + clase); 
                                                                });
  }

  myChange() {
    console.log(this.estado);
  }

  Mostrar() {
    var x = document.getElementById('activado');
    console.log('Esto funciona');
    if (this.estado === true) {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }
}
