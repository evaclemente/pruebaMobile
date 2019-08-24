import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DbServiceService } from '../db-service.service';
import { Clase } from '../Clase';
import { DatosService } from '../datos.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {

  clases: Clase[];
  nombre: string;
  Filtroeliminar: Clase;

  // En la siguiente variable voy a juardar el id de la clase
  // cuando quiera ver la lista de alumnos o ir al juego de avatares,
  // tengo que saber a qué clase voy y así cargo los alumnos de esa clase,
  // o bien activo el juego de avataresde la clase
  juegodeclase: string;
  NombreEliminar: string;


  constructor( private popOver: PopoverController,
               private router: Router,
               private http: HttpClient,
               private dbService: DbServiceService,
               private datosService: DatosService) {
  }

  ngOnInit() {
    this.nombre = this.dbService.ReturnNombrePersona();
    this.ClasesAdmin();
    // this.myFunction();

  }

  myFunction(identificador: string) {

    console.log('El identificador es: ' + identificador);

    console.log(document.getElementById(identificador));

    var x = document.getElementById(identificador);

    console.log('Antes de clickar el estado es: ' + x.style.display);

    if (x.style.display === 'block') {
      x.style.display = 'none';
      console.log('Ahora el estado es: ' + x.style.display);
    } else {
      x.style.display = 'block';
      console.log('Ahora el estado es: ' + x.style.display);
    }
  }

  IrALista(idclase: string) {
    this.dbService.SetIdClase(idclase);
    console.log('Voy a Mostrar la lista');
    this.router.navigate(['/lista']);
  }

  ClasesAdmin() {
    this.dbService.DameClases()
                  .subscribe(clases => {console.log('Clases de la BBDD: ' + clases);
                                        this.clases = clases.filter( clase => clase.admin === this.dbService.ReturnNombrePersona());
                                        });
  }

  IrAAvatares(idclase: string) {
    this.datosService.GuardaIDClase(idclase);
    console.log('Voy al juego de avatares');
    this.router.navigate(['/avatares']);
  }

  IrAProfesor() {
    console.log('Vuelvo a Profesor');
    this.router.navigate(['/profesor']);
  }

  Eliminar() {

    this.Filtroeliminar = this.clases.filter( clase => clase.id === this.NombreEliminar )[0];
    console.log('La clase es: ' + this.Filtroeliminar);

    if ( this.Filtroeliminar !== undefined && this.Filtroeliminar.id === this.NombreEliminar) {

      this.dbService.EliminarClase(this.NombreEliminar)
      .subscribe( () => { this.showAlert();
                          this.ClasesAdmin();
                        });

    } else {
      this.ClaseNoEncontrada();
      this.ClasesAdmin();
    }

  }

  AbrirInput() {
    var x = document.getElementById('dropup');
    console.log('Esto funciona');
    console.log(x.style.display);
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  ClaseNoEncontrada() {
    swal({
          title: 'Error',
          text: 'La clase ' + this.NombreEliminar + ' no existe',
          icon: 'error'
        });
  }

  showAlert() {
    swal({
          title: 'Has eliminado ' + this.NombreEliminar,
          icon: 'success'
        });
  }

  // AñadirClase() {
  //   this.router.navigate(['/formclase']);
  // }
}
