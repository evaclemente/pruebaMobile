import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DbServiceService } from '../db-service.service';
import { Clase } from '../Clase';
import { DatosService } from '../datos.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {

  clases: Clase[];
 
  // En la siguiente variable voy a juardar el id de la clase
  // cuando quiera ver la lista de alumnos o ir al juego de avatares,
  // tengo que saber a qué clase voy y así cargo los alumnos de esa clase,
  // o bien activo el juego de avataresde la clase
  juegodeclase: string;


  constructor( private popOver: PopoverController,
               private router: Router,
               private http: HttpClient,
               private dbService: DbServiceService,
               private datosService: DatosService) {
  }

  ngOnInit() {
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

  IrALista() {

    console.log('Voy a Mostrar la lista');
    this.router.navigate(['/lista']);
  }

  ClasesAdmin() {
    this.dbService.DameClases()
                  .subscribe(clases => {console.log('Clases de la BBDD: ' + clases);
                                        this.clases = clases;
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

}
