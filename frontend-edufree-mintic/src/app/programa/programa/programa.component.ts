import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ModeloPrograma } from '../../modelos/programa.modelo';
import { ProgramaService } from '../../servicios/programa.service';

@Component({
  selector: 'programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.scss']
})
export class ProgramaComponent implements OnInit {

  listadoProgramas: ModeloPrograma[] = [];

  constructor(private programaServicio: ProgramaService) { }

  ngOnInit(): void {
    this.ObtenerListadoPrograma();
  }

  ObtenerListadoPrograma(){
    this.programaServicio.ObtenerRegistros().subscribe((datos: ModeloPrograma[]) => {
      this.listadoProgramas = datos;
    })
  }

}
