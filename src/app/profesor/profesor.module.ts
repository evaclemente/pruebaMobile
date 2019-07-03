import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfesorPage } from './profesor.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfesorPage],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProfesorPageModule {}
