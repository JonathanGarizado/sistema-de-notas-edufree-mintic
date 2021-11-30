import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EstudianteComponent } from './estudiante/estudiante.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './login/login.component';
import { DocenteComponent } from './docente/docente.component';

const routes: Routes = [
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"estudiante",
    component:EstudianteComponent
  },
  {
    path:"usuario",
    component:UsuarioComponent
  },
  {
    path:"docente",
    component:DocenteComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
