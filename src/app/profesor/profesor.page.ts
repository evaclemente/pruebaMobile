import { Component, OnInit, Input } from '@angular/core';
import { Persona } from '../Persona';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Clase } from '../Clase';
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
  clases: Clase[];
  
  constructor(private router: Router,
              private http: HttpClient,
              private datosService: DatosService,
              private dbService: DbServiceService) { }

  // private route: ActivatedRoute
  ngOnInit( ) {

    this.nombre = this.datosService.DameNombre();

    this.dbService.DamePersona(this.nombre)
    .subscribe(usuario => {
                           this.usuario = usuario;
                           console.log('Este es el nombre: ' + this.usuario.nombre); });

    this.ClasesAdmin();
  }

  ClasesAdmin() {
    this.dbService.DameClases()
                  .subscribe(clases => {console.log('Clases de la BBDD: ' + clases);
                                        this.clases = clases;
                                        });
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
    this.datosService.EnviarPersona(this.nombre);
    this.router.navigate(['/miperfil']);
  }


}
