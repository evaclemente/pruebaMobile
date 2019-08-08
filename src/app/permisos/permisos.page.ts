import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DbServiceService } from '../db-service.service';
import { Clase } from '../Clase';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.page.html',
  styleUrls: ['./permisos.page.scss'],
})
export class PermisosPage implements OnInit {

  APIPermisos = 'http://localhost:3000/api/permisos/ArchivosTexto';
  PermisoPelo: string;
  PermisoOjos: string;
  PermisoComp: string;
  file: File;
  Clase: Clase;

  constructor(private http: HttpClient,
              private router: Router,
              private dbService: DbServiceService) { }

  ngOnInit() {
    // this.idClase = this.dbService.ReturnIdClase();
    this.dbService.DameClase(this.dbService.ReturnIdClase())
    .subscribe( clase => {console.log('Me ha llegado la clase: ' + clase.id);
                          this.Clase = clase;
                          this.PermisoPelo = clase.p1;
                          this.PermisoOjos = clase.p2;
                          this.PermisoComp = clase.p2;
                        });
  }

  ActivarInput() {
    // Recuperamos elinput y provocamos un click sobre ese input
    console.log ('Activar input');
    // Recoge el elemento cuyo id es inp en el código html
    // Por tanto tengo que acordarme de poner este id en el input que sea
    document.getElementById('inp').click();
  }

  CargaDeArchivos() {

    const formData: FormData = new FormData();
    formData.append(this.file.name, this.file);

    this.http.post(this.APIPermisos + '/upload', formData)
    .subscribe(() => console.log('Ya está'));

  }

}
