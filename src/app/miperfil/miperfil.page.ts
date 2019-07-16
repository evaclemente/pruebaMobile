import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DbServiceService } from '../db-service.service';
import { Persona } from '../Persona';
import { DatosService } from '../datos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.page.html',
  styleUrls: ['./miperfil.page.scss'],
})
export class MiperfilPage implements OnInit {

  constructor( private http: HttpClient,
               private dbService: DbServiceService,
               private datosService: DatosService,
               private route: ActivatedRoute) {
  }

  usuario: Persona;
  nombre: any;

  ngOnInit() {


    if (this.nombre === undefined) {
      this.usuario = new Persona ('Miguel', 'MMM' , 'Profesor', false, false, false, false);
      this.datosService.$getObjectSource.subscribe(nombre => {this.nombre = nombre;
                                                              console.log('Se llama: ' + this.nombre);
      });
    } else {
      console.log('Ya tengo nombre: ' + this.nombre);
    }


    if (this.usuario === undefined) {

     this.dbService.DamePersona(this.nombre)
      .subscribe(usuario => {console.log('Este es el nombre: ' + usuario.nombre);
                             this.usuario = usuario;
                             console.log(usuario); });
    } else {
      console.log('Ya tengo usuario: ' + this.usuario);
    }


  }

}
