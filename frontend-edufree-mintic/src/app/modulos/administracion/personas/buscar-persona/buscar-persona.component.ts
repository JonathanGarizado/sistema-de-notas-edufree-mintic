import { Component, OnInit } from '@angular/core';
import { ModeloUsuario } from 'src/app/modelos/usuario.modelo';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-buscar-persona',
  templateUrl: './buscar-persona.component.html',
  styleUrls: ['./buscar-persona.component.scss']
})
export class BuscarPersonaComponent implements OnInit {

  //Listado de usuarios
  listadoUsuarios : ModeloUsuario[] = [];
  constructor(
    //Hacer uso del servicio backend
    private servicioUsuario: UsuarioService) { }

  ngOnInit(): void {
    this.obtenerListadoUsuarios()
  }

  //Metodo para obtener toda la informacion de los usuarios
  obtenerListadoUsuarios() {

    //Llamar al servicio del backend
    this.servicioUsuario.obtenerUsuarios().subscribe((datos: ModeloUsuario[])=>
    {
      //Se pasan los datos a la lista para mostrar en el HTML
      this.listadoUsuarios=datos
    })

  }
}
