import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarMateriaComponent } from './materias/buscar-materia/buscar-materia.component';
import { CrearMateriaComponent } from './materias/crear-materia/crear-materia.component';
import { EditarMateriaComponent } from './materias/editar-materia/editar-materia.component';
import { EliminarMateriaComponent } from './materias/eliminar-materia/eliminar-materia.component';
import { BuscarPersonaComponent } from './personas/buscar-persona/buscar-persona.component';
import { CrearPersonaComponent } from './personas/crear-persona/crear-persona.component';
import { EditarPersonaComponent } from './personas/editar-persona/editar-persona.component';
import { EliminarPersonaComponent } from './personas/eliminar-persona/eliminar-persona.component';

const routes: Routes = [
  {
    path: 'crear-persona',
    component: CrearPersonaComponent
  },
  {
    path: 'editar-persona/:id',
    component: EditarPersonaComponent
  },
  {
    path: 'buscar-persona',
    component: BuscarPersonaComponent
  },
  {
    path: 'eliminar-persona/:id',
    component: EliminarPersonaComponent
  },
  {
    path: 'crear-materia',
    component: CrearMateriaComponent
  },
  {
    path: 'editar-materia/:id',
    component: EditarMateriaComponent
  },
  {
    path: 'eliminar-materia/:id',
    component: EliminarMateriaComponent
  },
  {
    path: 'buscar-materia',
    component: BuscarMateriaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
