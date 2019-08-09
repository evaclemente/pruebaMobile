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
  { path: 'galeria', loadChildren: './galeria/galeria.module#GaleriaPageModule' },  { path: 'miperfil', loadChildren: './miperfil/miperfil.module#MiperfilPageModule' },
  { path: 'formpersona', loadChildren: './formpersona/formpersona.module#FormpersonaPageModule' },
  { path: 'avatares', loadChildren: './avatares/avatares.module#AvataresPageModule' },
  { path: 'listaavatares', loadChildren: './listaavatares/listaavatares.module#ListaavataresPageModule' },
  { path: 'asignaturasalum', loadChildren: './asignaturasalum/asignaturasalum.module#AsignaturasalumPageModule' },
  { path: 'complementos', loadChildren: './complementos/complementos.module#ComplementosPageModule' },
  { path: 'info', loadChildren: './info/info.module#InfoPageModule' },
  { path: 'permisos', loadChildren: './permisos/permisos.module#PermisosPageModule' },
  { path: 'vistapermisos', loadChildren: './vistapermisos/vistapermisos.module#VistapermisosPageModule' }





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
