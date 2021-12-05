import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloUsuario } from '../modelos/usuario.modelo';


@Injectable({
  //Donde se va a inyectar root en la raiz del proyecto
  providedIn: 'root'
})
export class UsuarioService {
  url = "http://localhost:3000"

  //Se crea una instancia del objeto tipo HttpClient
  constructor(private http: HttpClient) { }

  //Obtener las personas registradas de la base de datos
  //Observable permite hacer peticiones asincronas...
  obtenerUsuarios(): Observable<ModeloUsuario[]> {
    return this.http.get<ModeloUsuario[]>(this.url + "/usuarios")

  }

  //Crear un usuario
  crearUsuario(usuario: ModeloUsuario): Observable<ModeloUsuario> {
    return this.http.post<ModeloUsuario>(this.url + "/usuarios", usuario,)

  }


}
