import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule, Router } from '@angular/router';
// import { MenuController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';


import { AlumnoPage } from './alumno.page';
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    component: AlumnoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AlumnoPage],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AlumnoPageModule {}
