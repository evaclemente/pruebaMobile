import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DbServiceService } from '../db-service.service';
import { Clase } from '../Clase';
import swal from 'sweetalert';

@Component({
  selector: 'app-formclase',
  templateUrl: './formclase.page.html',
  styleUrls: ['./formclase.page.scss'],
})
export class FormclasePage implements OnInit {

  administrador: string;
  idClase: string;
  Clases: Clase[];
  filtroclases: Clase;
  clasenueva: Clase;

  constructor(private router: Router,
              private http: HttpClient,
              private dbService: DbServiceService) { }

  ngOnInit() {

    this.administrador = this.dbService.ReturnNombrePersona();
    this.dbService.DameClases().subscribe( clases => this.Clases = clases.filter( clase => clase.admin === this.administrador) );
  }

  CrearClase() {

    this.filtroclases = this.Clases.filter( clase => clase.id === this.idClase)[0];

    if ( this.filtroclases === undefined) {

      this.clasenueva = new Clase(this.idClase, this.administrador, false, 'persona', 'persona_busto.png', '', '', '', '');

      this.dbService.CreaClase(this.clasenueva)
      .subscribe( () => this.showAlert());

    } else {
      this.ExisteAlert();
    }

  }

  showAlert() {
    swal({
          title: 'Clase añadida! ',
          text: 'Echa un vistazo a: ' + this.idClase,
          icon: 'success'
        });
  }

  ExisteAlert() {
    swal({
          title: 'La clase ' + this.idClase + ' ya existe',
          text: 'Prueba con otro nombre ',
          icon: 'error'
        });
  }

  VolverAClases() {
    this.router.navigate(['/clases']);
  }

  IrAClases() {
    this.router.navigate(['/clases']);
  }

}
