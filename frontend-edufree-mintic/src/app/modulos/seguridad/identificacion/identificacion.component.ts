import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import * as cryptoJS from "crypto-js";
import { Router } from '@angular/router';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.scss']
})
export class IdentificacionComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group(
    {
      'usuario': ['', [Validators.required, Validators.email]],
      'clave': ['', [Validators.required]]
    }
  );

  constructor(private fb: FormBuilder,
    private serviciosSeguridad: SeguridadService,
    private router: Router) { }

  ngOnInit(): void {
  }

  IdentificarUsuario(){
    let email = this.fgValidador.controls["usuario"].value;
    let clave = this.fgValidador.controls["clave"].value;
    let claveCifrada= cryptoJS.MD5(clave).toString();
    this.serviciosSeguridad.Identificar(email, claveCifrada).subscribe((datos:any) => {
      this.serviciosSeguridad.AlmacenarSesion(datos);
      this.router.navigate(["/inicio"])
    }, (error: any) => {
      alert("Datos invalidos")
    });
  }

}
