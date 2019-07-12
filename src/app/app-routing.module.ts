import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'details', loadChildren: './details/details.module#DetailsPageModule' },
  { path: 'pelo', loadChildren: './pelo/pelo.module#PeloPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'lista', loadChildren: './lista/lista.module#ListaPageModule' },
  { path: 'alumno', loadChildren: './alumno/alumno.module#AlumnoPageModule' },
  { path: 'profesor', loadChildren: './profesor/profesor.module#ProfesorPageModule' },
  { path: 'clases', loadChildren: './clases/clases.module#ClasesPageModule' },
  { path: 'ojos', loadChildren: './ojos/ojos.module#OjosPageModule' },
  { path: 'galeria', loadChildren: './galeria/galeria.module#GaleriaPageModule' },  { path: 'miperfil', loadChildren: './miperfil/miperfil.module#MiperfilPageModule' }





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
