import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avatares',
  templateUrl: './avatares.page.html',
  styleUrls: ['./avatares.page.scss'],
})
export class AvataresPage implements OnInit {

  estado: boolean;
  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
  }

  myChange() {
    console.log(this.estado);
  }

  Mostrar() {
    var x = document.getElementById('activado');
    console.log('Esto funciona');
    if (this.estado === true) {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }
}
