import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloUsuario } from 'src/app/modelos/usuario.modelo';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.scss'],
})
export class EditarPersonaComponent implements OnInit {
  //id se lee de la url
  id: string = ''

  formUsuario: FormGroup = this.fb.group({
    //Validaciones - Este campo debe ser requerido
    id: ['', Validators.required],
    cedula: ['', Validators.required],
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    email: ['', Validators.email],
    clave: ['', Validators.email],
    telefono: ['', Validators.required],
    rolId: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    //Hacer uso del servicio backend
    private servicioUsuario: UsuarioService,
    //Permitir navegar
    private router: Router,
    //Leer id de la url
    private route: ActivatedRoute) {
    //private servicioBackend = UsuarioService
  }

  ngOnInit(): void {
    //Leer id de la url
    this.id=this.route.snapshot.params["id"]
    this.buscarUsuario()
  }

  //Busca un usuario por ID
  buscarUsuario(){
    this.servicioUsuario.obtenerUsuariosPorId(this.id).subscribe((datos:ModeloUsuario)=>{
      this.formUsuario.controls["id"].setValue(datos.id)
      this.formUsuario.controls["cedula"].setValue(datos.cedula)
      this.formUsuario.controls["nombres"].setValue(datos.nombres)
      this.formUsuario.controls["apellidos"].setValue(datos.apellidos)
      this.formUsuario.controls["email"].setValue(datos.email)
      this.formUsuario.controls["telefono"].setValue(datos.telefono)
      this.formUsuario.controls["rolId"].setValue(datos.rolId)

    })
  }

  //Metodo que obtiene los datos del form
  editarUsuario() {
    let nombres = this.formUsuario.controls['nombres'].value;
    let apellidos = this.formUsuario.controls['apellidos'].value;
    let cedula = this.formUsuario.controls['cedula'].value;
    let email = this.formUsuario.controls['email'].value;
    // let claveCifrada = CryptoJS.MD5(
    //   this.formUsuario.controls['clave'].value
    // ).toString();
    let telefono = this.formUsuario.controls['telefono'].value;
    let rolId = this.formUsuario.controls['rolId'].value;

    //Construir nuevo usuario de acuerdo a los datos ingresados
    let usu = new ModeloUsuario();
    usu.nombres = nombres;
    usu.apellidos = apellidos;
    usu.cedula = cedula;
    usu.email = email;
    // usu.clave = claveCifrada;
    usu.telefono = telefono;
    usu.rolId = rolId;
    usu.id=this.id

    //Se va a invocar el servicio y se le pasa el usuario
    this.servicioUsuario.actualizarUsuario(usu).subscribe(
      (datos: ModeloUsuario) => {
        //Cuando exista una respuesta por parte del observable se ejecutara este codigo
        alert('Actualizado correctamente');

        //Permite la navegacion despues que se crea a otra parte
        this.router.navigate(['/administracion/buscar-persona']);
      },
      (error: any) => {
        //Cuando ocurre un error se ejecutara esto
        alert('Error al actualizar usuario');
      }
    );
  }
}
