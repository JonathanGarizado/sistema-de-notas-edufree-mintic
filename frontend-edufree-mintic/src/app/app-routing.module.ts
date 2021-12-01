import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EstudianteComponent } from './estudiante/estudiante.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './login/login.component';
import { DocenteComponent } from './docente/docente.component';
import { ProgramaComponent } from './programa/programa.component';
import { InicioComponent } from './plantilla/inicio/inicio.component';
import { ErrorComponent } from './plantilla/error/error.component';

const routes: Routes = [
  {
    path:"inicio",
    component:InicioComponent
  },
  {
    path:"",
    pathMatch: 'full',
    redirectTo: '/inicio'
  },
  {
    path:"**",
    component: ErrorComponent
  },
  {
    path: 'seguridad',
    loadChildren: () => import("./modulos/seguridad/seguridad.module").then(x => x.SeguridadModule)
  },
  {
    path: 'administracion',
    loadChildren: () => import("./modulos/administracion/administracion.module").then(x => x.AdministracionModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import("./modulos/pedidos/pedidos.module").then(x => x.PedidosModule)
  },
  // {
  //   path:"login",
  //   component:LoginComponent
  // },
  // {
  //   path:"estudiante",
  //   component:EstudianteComponent
  // },
  // {
  //   path:"usuario",
  //   component:UsuarioComponent
  // },
  // {
  //   path:"docente",
  //   component:DocenteComponent
  // },
  // {
  //   path:"programa",
  //   component:ProgramaComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
