import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../Persona';
import { from } from 'rxjs';
import { DbServiceService } from '../db-service.service';
import { FormGroup } from '@angular/forms';
import swal from 'sweetalert';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { AlertController } from '@ionic/angular';
import { ok } from 'assert';
import { text } from '@angular/core/src/render3';
import { Clase } from '../Clase';
import { Matricula } from '../Matricula';


@Component({
  selector: 'app-formpersona',
  templateUrl: './formpersona.page.html',
  styleUrls: ['./formpersona.page.scss'],
})
export class FormpersonaPage implements OnInit {
 lista: Persona[];
 nombre: string;
 pass: string;
 // rol: any;
 idClase: string;
 nuevoid: any;
 matricula: Matricula;
 antigualista: Persona[];
 comparapersona: Persona;
 comparamatricula: Matricula;
 listamatriculas: Matricula[];

 // APIMatriculas = 'http://localhost:3000/api/matriculas/count';


  constructor(private router: Router,
              private http: HttpClient,
              private dbService: DbServiceService,
              ) { }

  ngOnInit() {
    this.idClase = this.dbService.ReturnIdClase();
    this.dbService.dameTodos().subscribe( lista => this.antigualista = lista );
    this.dbService.DameMatriculaAlumno(this.idClase).subscribe( matriculas => this.listamatriculas = matriculas);

  }

  Pon() {
    console.log('Estoy añadiendo a: ' + this.nombre + this.pass);

    this.comparapersona = this.antigualista.filter( persona => persona.nombre === this.nombre)[0];
    this.comparamatricula = this.listamatriculas.filter( matricula => matricula.idAlumno === this.nombre)[0];

    console.log(this.antigualista);

    console.log('Hay alguien ya con ese usuario: ' + this.comparapersona);

    if (this.comparapersona === undefined ) {

      // La persona no existe, por tanto tampoco está matriculada en la asignatura,
      // así que se añade a ambos modelos de datos

      this.dbService.PonPersona(new Persona(this.nombre,
        this.pass, 'Alumno')).subscribe(() => this.Mostrar());

      this.dbService.CuentaMatriculas().subscribe( numero => {console.log(numero);
                                                              this.nuevoid = numero ++ ;
                                                              console.log(this.nuevoid);
                                                              this.matricula = new Matricula(0, this.nuevoid, this.nombre
                                                             , this.idClase, false, false, false, false, '', '', '', '');
                                                              console.log(this.matricula);
                                                              this.dbService.PonMatricula(this.matricula)
                                                              .subscribe( () => this.showAlert());
      });


    } else {
      // Si la persona existe pero no está matriculada en esa asgnatura en concreto,se añade
      // sólo la matrícula
      if (this.comparamatricula === undefined) {
        this.dbService.CuentaMatriculas().subscribe( numero => {console.log(numero);
                                                                this.nuevoid = numero ++ ;
                                                                console.log(this.nuevoid);
                                                                this.matricula = new Matricula(0, this.nuevoid, this.nombre
                                                                , this.idClase, false, false, false, false, '', '', '', '');
                                                                console.log(this.matricula);
                                                                this.dbService.PonMatricula(this.matricula)
                                                                .subscribe( () => this.showAlert());
        });
      } else {

        // La persona existe y además ya está matriculadaen la asignatura
        this.ExistePersona();
        return;

      }

    }

  }

 VolverALista() {
    this.router.navigate(['/lista']);
  }

  Mostrar() {

    console.log('Voy a pedir');
    this.dbService.dameTodos()
    .subscribe(lista => {
                          this.lista = lista;
                          console.log('Ya ha llegado');
                          console.log(this.lista);
                        });
  }


  showAlert() {
    swal({
          title: 'Listo!',
          text: 'Persona añadida con éxito',
          icon: 'success'
        });
  }

  ExistePersona() {
    swal({
          title: 'Error!',
          text: 'Este usuario ya existe, prueba con otro',
          icon: 'error'
        });
  }
}
