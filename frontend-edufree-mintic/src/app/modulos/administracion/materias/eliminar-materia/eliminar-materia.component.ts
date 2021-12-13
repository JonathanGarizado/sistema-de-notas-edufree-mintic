import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloMateria } from 'src/app/modelos/materia.modelo';
import { MateriaService } from 'src/app/servicios/materia.service';

@Component({
  selector: 'app-eliminar-materia',
  templateUrl: './eliminar-materia.component.html',
  styleUrls: ['./eliminar-materia.component.scss']
})
export class EliminarMateriaComponent implements OnInit {

  //id se lee de la url
  id: string = '';
  nombre: string = '';
  programaAcademicoId: string = '';

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
    this.id = this.route.snapshot.params['id'];
    this.buscarMateria();
  }

  //Busca un usuario por ID
  buscarMateria() {
    this.servicioMateria
      .obtenerMateriasPorId(this.id)
      .subscribe((datos: ModeloMateria) => {
        if (
          datos.id &&
          datos.nombre &&
          datos.programaAcademicoId
        ) {
          this.nombre = datos.nombre;
          this.programaAcademicoId = datos.programaAcademicoId;
        }
      });
  }

  eliminarMateria() {
    //Se va a invocar el servicio y se le pasa el id
    this.servicioMateria.eliminarMateria(this.id).subscribe(
      (datos: ModeloMateria) => {
        //Cuando exista una respuesta por parte del observable se ejecutara este codigo
        alert('Eliminado correctamente');

        //Permite la navegacion despues que se crea a otra parte
        this.router.navigate(['/administracion/buscar-materia']);
      },
      (error: any) => {
        //Cuando ocurre un error se ejecutara esto
        alert('Error al crear usuario');
      }
    );
  }

}
