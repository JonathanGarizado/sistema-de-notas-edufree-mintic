import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloMateria } from 'src/app/modelos/materia.modelo';
import { MateriaService } from 'src/app/servicios/materia.service';

@Component({
  selector: 'app-editar-materia',
  templateUrl: './editar-materia.component.html',
  styleUrls: ['./editar-materia.component.scss']
})
export class EditarMateriaComponent implements OnInit {
  //id se lee de la url
  id: string = ''

  formMateria: FormGroup = this.fb.group(
    {
      //Validaciones - Este campo debe ser requerido
      nombre: ['', Validators.required],
      programaAcademicoId: ['', Validators.required],
    }
  );

  constructor(
    private fb: FormBuilder,
    //Hacer uso del servicio backend
    private servicioMateria: MateriaService,
    //Permitir navegar
    private router: Router,
    //Leer id de la url
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //Leer id de la url
    this.id = this.route.snapshot.params["id"]
    this.buscarMateria()
  }

  //Busca un usuario por ID
  buscarMateria() {
      this.servicioMateria.obtenerMateriasPorId(this.id).subscribe((datos: ModeloMateria) => {
      this.formMateria.controls["nombre"].setValue(datos.nombre)
      this.formMateria.controls["programaAcademicoId"].setValue(datos.programaAcademicoId)

    })
  }

  //Metodo que obtiene los datos del form
  editarMateria() {
    let nombre = this.formMateria.controls['nombre'].value;
    let programaAcademicoId = this.formMateria.controls['programaAcademicoId'].value;

    //Construir nuevo usuario de acuerdo a los datos ingresados
    let materia = new ModeloMateria()
    materia.nombre = nombre
    materia.programaAcademicoId = programaAcademicoId
    materia.id=this.id

    //Se va a invocar el servicio y se le pasa el usuario
    this.servicioMateria.actualizarMateria(materia).subscribe(
      (datos: ModeloMateria) => {
        //Cuando exista una respuesta por parte del observable se ejecutara este codigo
        alert('Actualizado correctamente');

        //Permite la navegacion despues que se crea a otra parte
        this.router.navigate(['/administracion/buscar-materia']);
      },
      (error: any) => {
        //Cuando ocurre un error se ejecutara esto
        alert('Error al actualizar usuario');
      }
    );
  }

}
