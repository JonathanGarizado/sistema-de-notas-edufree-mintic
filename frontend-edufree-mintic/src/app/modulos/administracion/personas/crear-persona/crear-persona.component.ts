import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloUsuario } from 'src/app/modelos/usuario.modelo';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.scss']
})
export class CrearPersonaComponent implements OnInit {

  formUsuario: FormGroup = this.fb.group(
    {
      //Validaciones - Este campo debe ser requerido
      cedula: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.email],
      clave: ['', Validators.required],
      telefono: ['', Validators.required],
      rolId: ['', Validators.required],
    }
  );
  constructor(
    private fb: FormBuilder,
    //Hacer uso del servicio backend
    private servicioUsuario: UsuarioService,
    //Permitir navegar
    private router: Router) {}

  ngOnInit(): void {
  }

  //Metodo que obtiene los datos del form
  guardarUsuario() {
    let nombres = this.formUsuario.controls["nombres"].value;
    let apellidos = this.formUsuario.controls["apellidos"].value;
    let cedula = this.formUsuario.controls["cedula"].value
    let email = this.formUsuario.controls["email"].value;
    let claveCifrada = CryptoJS.MD5(this.formUsuario.controls["clave"].value).toString();
    let telefono = this.formUsuario.controls["telefono"].value;
    let rolId = this.formUsuario.controls["rolId"].value;


    //Construir nuevo usuario de acuerdo a los datos ingresados
    let usu = new ModeloUsuario()
    usu.nombres = nombres
    usu.apellidos = apellidos
    usu.cedula = cedula
    usu.email = email
    usu.clave = claveCifrada
    usu.telefono = telefono
    usu.rolId = rolId

    //Se va a invocar el servicio y se le pasa el usuario
    this.servicioUsuario.crearUsuario(usu).subscribe((datos: ModeloUsuario) => {
      //Cuando exista una respuesta por parte del observable se ejecutara este codigo
      alert("Creado correctamente");

      //Permite la navegacion despues que se crea a otra parte
      this.router.navigate(["/administracion/buscar-persona"])

    }, (error: any) => {
      //Cuando ocurre un error se ejecutara esto
      alert("Error al crear usuario");
    })

  }
}
