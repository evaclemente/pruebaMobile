import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DbServiceService } from '../db-service.service';
import { Persona } from '../Persona';
import { DatosService } from '../datos.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';

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
  nuevacontra: any;

  ngOnInit() {

    this.nombre = this.datosService.DameNombre();
    this.dbService.DamePersona(this.nombre)
      .subscribe(usuario => {console.log('Este es el nombre: ' + usuario.nombre);
                             this.usuario = usuario;
                             console.log(usuario); });


  }

  CambiaPass() {
    this.dbService.PonPass(this.usuario, this.nuevacontra).subscribe();
    console.log('Acabas de cambiar tu contraseña' + this.nuevacontra);
  }

  MuestraCambio() {
    var x = document.getElementById('cambiacontraseña');
    console.log('Esto funciona');
    console.log('Este es el estado ahora: ' + x.style.display);
    if (x.style.display === 'block') {
      x.style.display = 'none';
    } else {
      x.style.display = 'block';
    }
  }

  showAlert() {
    swal({
          title: 'Has cambiado tu contraseña!',
          text: 'Ahora tu nueva contraseña es: ' + this.nuevacontra,
          icon: 'success'
        });
  }

}
