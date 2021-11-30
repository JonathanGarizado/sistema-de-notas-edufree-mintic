import { Component, OnInit } from '@angular/core';

interface Usuario {

  codigo: string;
  contrasenia: string;

}



@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  titulo = "Login Edufree 1.0";

  usuarioLogin: Usuario = {codigo: '', contrasenia: ''};

  codigo: string = "";
  contrasenia: string = "";


  constructor() { }

  ngOnInit(): void {
  }

  mostrarInfo(): void {
    alert("El nombre del usuario es: " + this.usuarioLogin.codigo);
  }
}
