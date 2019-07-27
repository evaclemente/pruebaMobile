import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DbServiceService } from '../db-service.service';
import { Clase } from '../Clase';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {

  clases: Clase[];
  estadoEstilos: string [];
  // document.onclick = captura_click;

  constructor( private popOver: PopoverController,
               private router: Router,
               private http: HttpClient,
               private dbService: DbServiceService) {
  }

  ngOnInit() {
    this.ClasesAdmin();
    // this.myFunction();

  }

  DesplegaClases() {
    var x = document.getElementById('myLinks');
    let y = x.getElementsByClassName('panel') as HTMLCollectionOf<HTMLElement>;
    var i;

    for (i = 0; i < y.length; i++) {
     this.estadoEstilos[i] = y[i].style.display;
    }

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
    // var x = document.getElementById('myLinks');
    // let y = document.getElementsByClassName('MenuClases') as HTMLCollectionOf<HTMLElement>;
    // var i;
    // console.log('Esto funciona');
    // console.log(y);
    // for (i = 0; i < y.length; i++) {

    //   y[i].addEventListener('click', function() {

    //     // var panel = this.nextElementSibling;
    //     console.log('Has clickado!');
    //     // this.classList.toggle('active');
    //     var panel = this.nextElementSibling;
    //     console.log(panel);
    //     if (panel.style.display === 'none') {
    //       panel.style.display = 'block';
    //       console.log(panel.style.display);
    //     } else {
    //       panel.style.display = 'none';
    //       console.log(panel.style.display);
    //     }
    //   });
    // }
    // if (y[i].style.display === 'block') {
      // y[i].style.display = 'none';
    // } else {
      // y[i].style.display = 'block';
    // }
   // }
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

  IrAAvatares() {
    console.log('Voy al juego de avatares');
    this.router.navigate(['/avatares']);
  }

  IrAProfesor() {
    console.log('Vuelvo a Profesor');
    this.router.navigate(['/profesor']);
  }

}
