import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AsignaturasalumPage } from './asignaturasalum.page';

const routes: Routes = [
  {
    path: '',
    component: AsignaturasalumPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AsignaturasalumPage]
})
export class AsignaturasalumPageModule {}
