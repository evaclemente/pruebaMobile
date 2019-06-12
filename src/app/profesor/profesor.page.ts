import { Component, OnInit, Input } from '@angular/core';
import { Persona } from '../Persona';
import { Router } from '@angular/router';
import { from } from 'rxjs';
@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  usuario: Persona;
  nombre: string;
  pass: string;
  constructor(private router: Router) { }

  ngOnInit() { console.log (this.nombre);
  }

  IraClases() {
    this.router.navigate(['/clases']);
  }

  IrALista() {
    console.log('Voy a Mostrar la lista');
    this.router.navigate(['/lista']);
  }
  IrALogin() {
    this.router.navigate(['/login']);
  }
}
