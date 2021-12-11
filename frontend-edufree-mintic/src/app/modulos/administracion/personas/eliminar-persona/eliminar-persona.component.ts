import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloUsuario } from 'src/app/modelos/usuario.modelo';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-eliminar-persona',
  templateUrl: './eliminar-persona.component.html',
  styleUrls: ['./eliminar-persona.component.scss'],
})
export class EliminarPersonaComponent implements OnInit {
  //id se lee de la url
  id: string = '';
  nombre: string = '';
  apellidos: string = '';
  cedula: string = '';
  email: string = '';
  telefono: string = '';
  constructor(
    private fb: FormBuilder,
    //Hacer uso del servicio backend
    private servicioUsuario: UsuarioService,
    //Permitir navegar
    private router: Router,
    //Leer id de la url
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Leer id de la url
    this.id = this.route.snapshot.params['id'];
    this.buscarUsuario();
  }

  //Busca un usuario por ID
  buscarUsuario() {
    this.servicioUsuario
      .obtenerUsuariosPorId(this.id)
      .subscribe((datos: ModeloUsuario) => {
        if (
          datos.id &&
          datos.nombres &&
          datos.apellidos &&
          datos.cedula &&
          datos.email &&
          datos.telefono
        ) {
          this.nombre = datos.nombres;
          this.apellidos = datos.apellidos;
          this.cedula = datos.cedula;
          this.email = datos.email;
          this.telefono = datos.telefono;
        }
      });
  }

  /*   eliminarUsuario(){
    //Se va a invocar el servicio y se le pasa el id
    this.servicioUsuario.eliminarUsuario(this.id).subscribe({
      next: (datos: any) => {
        alert("Usuario eliminado correctamente");
        this.router.navigate(["/administracion/buscar-persona"]);
      }
    })
  }
} */

  eliminarUsuario() {
    //Se va a invocar el servicio y se le pasa el id
    this.servicioUsuario.eliminarUsuario(this.id).subscribe(
      (datos: ModeloUsuario) => {
        //Cuando exista una respuesta por parte del observable se ejecutara este codigo
        alert('Eliminado correctamente');

        //Permite la navegacion despues que se crea a otra parte
        this.router.navigate(['/administracion/buscar-persona']);
      },
      (error: any) => {
        //Cuando ocurre un error se ejecutara esto
        alert('Error al crear usuario');
      }
    );
  }
}
