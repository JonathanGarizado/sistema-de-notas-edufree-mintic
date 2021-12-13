import { Component, OnInit } from '@angular/core';
import { ModeloMateria } from 'src/app/modelos/materia.modelo';
import { MateriaService } from 'src/app/servicios/materia.service';

@Component({
  selector: 'app-buscar-materia',
  templateUrl: './buscar-materia.component.html',
  styleUrls: ['./buscar-materia.component.scss']
})
export class BuscarMateriaComponent implements OnInit {

  //Listado de usuarios
  listadoMaterias : ModeloMateria[] = [];

  constructor(
    //Hacer uso del servicio backend
    private servicioMateria: MateriaService
  ) { }

  ngOnInit(): void {
    this.obtenerListadoMaterias()
  }

  //Metodo para obtener toda la informacion de los usuarios
  obtenerListadoMaterias() {

    //Llamar al servicio del backend
    this.servicioMateria.obtenerMaterias().subscribe((datos: ModeloMateria[])=>
    {
      //Se pasan los datos a la lista para mostrar en el HTML
      this.listadoMaterias=datos
    })
  }

}
