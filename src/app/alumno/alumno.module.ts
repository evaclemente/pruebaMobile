import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// import { MenuController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';


import { AlumnoPage } from './alumno.page';
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: 'alumno',
    component: AlumnoPage,
    children: [
      {
        path: 'listado',
        loadChildren: './lista/lista.module#ListaPageModule'
      },
      {
        path: '',
        redirectTo: '/alumno/lista'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AlumnoPage]
})
export class AlumnoPageModule {}
