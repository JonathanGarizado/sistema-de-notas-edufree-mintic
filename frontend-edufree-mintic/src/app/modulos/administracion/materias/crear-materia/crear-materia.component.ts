import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MateriaService } from 'src/app/servicios/materia.service';
import { ModeloMateria } from 'src/app/modelos/materia.modelo';

@Component({
  selector: 'app-crear-materia',
  templateUrl: './crear-materia.component.html',
  styleUrls: ['./crear-materia.component.scss']
})
export class CrearMateriaComponent implements OnInit {

  formMateria: FormGroup = this.fb.group(
    {
      //Validaciones - Este campo debe ser requerido
      nombre: ['', Validators.required],
      programaAcademicoId: ['', Validators.required],
    }
  );

  constructor(
    private fb: FormBuilder,
    //Permitir navegar
    private router: Router,
    //Hacer uso del servicio backend
    private servicoMateria: MateriaService
    
  ) { }

  ngOnInit(): void {
  }

  //Metodo que obtiene los datos del form
  guardarMateria() {
    let nombre = this.formMateria.controls["nombre"].value;
    let programaAcademicoId = this.formMateria.controls["programaAcademicoId"].value;

    //Construir nuevo usuario de acuerdo a los datos ingresados
    let materia = new ModeloMateria()
    materia.nombre = nombre
    materia.programaAcademicoId = programaAcademicoId

    //Se va a invocar el servicio y se le pasa la materia
    this.servicoMateria.crearMateria(materia).subscribe((datos: ModeloMateria) => {
      //Cuando exista una respuesta por parte del observable se ejecutara este codigo
      alert("Creado correctamente");

      //Permite la navegacion despues que se crea a otra parte
      this.router.navigate(["/administracion/buscar-materia"])

    }, (error: any) => {
      //Cuando ocurre un error se ejecutara esto
      alert("Error al crear materia");
    })

  }
}
