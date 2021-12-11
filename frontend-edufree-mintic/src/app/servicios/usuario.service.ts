import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloUsuario } from '../modelos/usuario.modelo';

@Injectable({
  //Donde se va a inyectar root en la raiz del proyecto
  providedIn: 'root',
})
export class UsuarioService {
  url = 'http://localhost:3000';

  //Se crea una instancia del objeto tipo HttpClient
  constructor(private http: HttpClient) {}

  //Obtener las personas registradas de la base de datos
  //Observable permite hacer peticiones asincronas...
  obtenerUsuarios(): Observable<ModeloUsuario[]> {
    return this.http.get<ModeloUsuario[]>(this.url + '/usuarios');
  }

  //Buscar un usuario por id
  obtenerUsuariosPorId(id: string): Observable<ModeloUsuario> {
    //return this.http.get<ModeloUsuario>(this.url + "/usuarios/"+{id})
    return this.http.get<ModeloUsuario>(`${this.url}/usuarios/${id}`);
    //return this.http.get<ModeloUsuario>(this.url + "/usuarios/61986895b08741237c5e636b")
  }

  //Crear un usuario
  crearUsuario(usuario: ModeloUsuario): Observable<ModeloUsuario> {
    return this.http.post<ModeloUsuario>(this.url + '/usuarios', usuario);
  }

  //Actualizar un usuario
  actualizarUsuario(usuario: ModeloUsuario): Observable<ModeloUsuario> {
    return this.http.put<ModeloUsuario>(
      `${this.url}/usuarios/${usuario.id}`,
      usuario
    );
  }

  //Eliminar un usuario
  eliminarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.url}/usuarios/${id}`);
  }
}
