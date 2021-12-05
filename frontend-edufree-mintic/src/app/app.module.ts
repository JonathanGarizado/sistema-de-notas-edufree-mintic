import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocenteComponent } from './docente/docente.component';
import { ProgramaComponent } from './programa/programa/programa.component';
import { BarraNavegacionComponent } from './plantilla/barra-navegacion/barra-navegacion.component';
import { PiePaginaComponent } from './plantilla/pie-pagina/pie-pagina.component';
import { InicioComponent } from './plantilla/inicio/inicio.component';
import { ErrorComponent } from './plantilla/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { CrearProgramaComponent } from './programa/crear-programa/crear-programa.component';
import { EditarProgramaComponent } from './programa/editar-programa/editar-programa.component';
import { EliminarProgramaComponent } from './programa/eliminar-programa/eliminar-programa.component';

@NgModule({
  declarations: [
    AppComponent,
    EstudianteComponent,
    DocenteComponent,
    ProgramaComponent,
    BarraNavegacionComponent,
    PiePaginaComponent,
    InicioComponent,
    ErrorComponent,
    CrearProgramaComponent,
    EditarProgramaComponent,
    EliminarProgramaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
