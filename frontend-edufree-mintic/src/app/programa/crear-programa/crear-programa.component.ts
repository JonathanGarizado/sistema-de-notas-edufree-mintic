import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloPrograma } from 'src/app/modelos/programa.modelo';
import { ProgramaService } from 'src/app/servicios/programa.service';

@Component({
  selector: 'app-crear-programa',
  templateUrl: './crear-programa.component.html',
  styleUrls: ['./crear-programa.component.scss']
})
export class CrearProgramaComponent implements OnInit {

  fgValidator: FormGroup = this.fb.group({
    'nombre': ['', [Validators.required]],
    'tipoProgramaAcademico': ['', [Validators.required]],
    'imagen': ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
    private servicioPrograma: ProgramaService,
    private router: Router) { }

  ngOnInit(): void {
  }

  GuardarPrograma(){
    let nombre = this.fgValidator.controls["nombre"].value;
    let tipoProgramaAcademico = this.fgValidator.controls["tipoProgramaAcademico"].value;
    let imagen = this.fgValidator.controls["imagen"].value;
    
    let p = new ModeloPrograma();

    p.nombre = nombre;
    p.tipoProgramaAcademico = tipoProgramaAcademico;
    p.imagen = imagen;

    this.servicioPrograma.CrearPrograma(p).subscribe((datos: ModeloPrograma) => {
      alert("Programa creado correctamente");
      this.router.navigate(["/programa"]);
    }, (error: any) => {
      alert("Error creando el programa");
    })
  }

}
