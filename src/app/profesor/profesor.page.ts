import { Component, OnInit, Input } from '@angular/core';
import { Persona } from '../Persona';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DatosService } from '../datos.service';
import { DbServiceService } from '../db-service.service';
import { PENDING } from '@angular/forms/src/model';
@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  nombre: any;
  usuario: Persona;
  pass: string;
  constructor(private router: Router,
              private http: HttpClient,
              private datosService: DatosService,
              private dbService: DbServiceService) { }

  // private route: ActivatedRoute
  ngOnInit( ) {
    this.usuario = new Persona ('AAA', 'bbb' , 'Alumno', false, false, false, false);
    this.datosService.$getObjectSource.subscribe(nombre => {this.nombre = nombre;
                                                            console.log('Se llama: ' + this.nombre); });
    this.dbService.DamePersona(this.nombre)
    .subscribe(usuario => {console.log('Este es el nombre: ' + usuario.nombre);
                           this.usuario = usuario;
                           console.log(usuario); });
   }


  IrAClases() {
    this.router.navigate(['/clases']);
  }

  IrALista() {
    console.log('Voy a Mostrar la lista');
    this.router.navigate(['/lista']);
  }

  IrALogin() {
    this.router.navigate(['/login']);
  }

  IrAGaleria() {
    this.router.navigate(['/galeria']);
  }

  MostrarDatosPerfil() {
    this.datosService.sendObjectSource(this.nombre);
    this.router.navigate(['/miperfil']);
  }


}
