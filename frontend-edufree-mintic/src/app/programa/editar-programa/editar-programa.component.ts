import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloPrograma } from 'src/app/modelos/programa.modelo';
import { ProgramaService } from 'src/app/servicios/programa.service';

@Component({
  selector: 'app-editar-programa',
  templateUrl: './editar-programa.component.html',
  styleUrls: ['./editar-programa.component.scss']
})
export class EditarProgramaComponent implements OnInit {

  id:string = '';

  fgValidator: FormGroup = this.fb.group({
    'id': ['', [Validators.required]],
    'nombre': ['', [Validators.required]],
    'tipoProgramaAcademico': ['', [Validators.required]],
    'imagen': ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
    private servicioPrograma: ProgramaService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.BuscarPrograma();
  }

  BuscarPrograma(){
    this.servicioPrograma.ObtenerRegistrosPorId(this.id).subscribe((datos: ModeloPrograma) => {
      this.fgValidator.controls["id"].setValue(this.id);
      this.fgValidator.controls["nombre"].setValue(datos.nombre);
      this.fgValidator.controls["tipoProgramaAcademico"].setValue(datos.tipoProgramaAcademico);
      this.fgValidator.controls["imagen"].setValue(datos.imagen);
    });
  }

  EditarPrograma(){
    let nombre = this.fgValidator.controls["nombre"].value;
    let tipoProgramaAcademico = this.fgValidator.controls["tipoProgramaAcademico"].value;
    let imagen = this.fgValidator.controls["imagen"].value;
    
    let p = new ModeloPrograma();

    p.nombre = nombre;
    p.tipoProgramaAcademico = tipoProgramaAcademico;
    p.imagen = imagen;
    p.id=this.id;

    this.servicioPrograma.ActualizarPrograma(p).subscribe((datos: ModeloPrograma) => {
      alert("Programa editado correctamente");
      this.router.navigate(["/programa"]);
    }, (error: any) => {
      alert("Error editando el programa");
    })
  }

}