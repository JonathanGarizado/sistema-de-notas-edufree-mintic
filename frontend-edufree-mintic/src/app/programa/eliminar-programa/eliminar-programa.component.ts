import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloPrograma } from 'src/app/modelos/programa.modelo';
import { ProgramaService } from 'src/app/servicios/programa.service';

declare const ShowGeneralMessage: any;

@Component({
  selector: 'app-eliminar-programa',
  templateUrl: './eliminar-programa.component.html',
  styleUrls: ['./eliminar-programa.component.scss']
})
export class EliminarProgramaComponent implements OnInit {

  id: string = '';

  nombre: string = '';

  tipoProgramaAcademico: string =  '';

  constructor(
    private router: Router,
    private servicioPrograma: ProgramaService,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.BuscarProducto();
  }

  BuscarProducto(){
    this.servicioPrograma.ObtenerRegistrosPorId(this.id).subscribe({
      next: (datos: ModeloPrograma) => {
      if (datos.id && datos.nombre && datos.tipoProgramaAcademico){
        this.id = datos.id;
        this.nombre = datos.nombre;
        this.tipoProgramaAcademico = datos.tipoProgramaAcademico;
      }
    }
    });
  }

  EliminarProducto(){
    this.servicioPrograma.EliminarPrograma(this.id).subscribe({
      next: (datos: any) => {
        alert("Programa eliminado correctamente");
        this.router.navigate(["/programa"]);
      }
    })
  }

}
