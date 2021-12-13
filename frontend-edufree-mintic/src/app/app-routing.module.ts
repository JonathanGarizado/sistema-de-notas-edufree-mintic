import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { DocenteComponent } from './docente/docente.component';
import { ProgramaComponent } from './programa/programa/programa.component';
import {CrearProgramaComponent} from './programa/crear-programa/crear-programa.component';
import {EditarProgramaComponent} from './programa/editar-programa/editar-programa.component';
import {EliminarProgramaComponent} from './programa/eliminar-programa/eliminar-programa.component';
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
    path: 'seguridad',
    loadChildren: () => import("./modulos/seguridad/seguridad.module").then(x => x.SeguridadModule)
  },
  {
    path: 'administracion',
    loadChildren: () => import("./modulos/administracion/administracion.module").then(x => x.AdministracionModule)
  },
  {
    path:"estudiante",
    component:EstudianteComponent
  },
  {
    path:"docente",
    component:DocenteComponent
  },
  {
    path:"programa",
    component:ProgramaComponent
  },
  {
    path:"programa-crear",
    component:CrearProgramaComponent
  },
  {
    path:"programa-editar/:id",
    component:EditarProgramaComponent
  },
  {
    path:"programa-eliminar/:id",
    component:EliminarProgramaComponent
  },
  {
    path:"**",
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
