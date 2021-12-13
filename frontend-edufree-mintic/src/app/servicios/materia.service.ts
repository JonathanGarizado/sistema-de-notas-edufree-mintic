import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloMateria } from '../modelos/materia.modelo';

@Injectable({
  //Donde se va a inyectar root en la raiz del proyecto
  providedIn: 'root',
})
export class MateriaService {
  url = 'http://localhost:3000';

  //Se crea una instancia del objeto tipo HttpClient
  constructor(private http: HttpClient) {}

  //Obtener las materias registradas de la base de datos
  //Observable permite hacer peticiones asincronas...
  obtenerMaterias(): Observable<ModeloMateria[]> {
    return this.http.get<ModeloMateria[]>(this.url + '/materias');
  }

  //Buscar una materia por id
  obtenerMateriasPorId(id: string): Observable<ModeloMateria> {
    return this.http.get<ModeloMateria>(`${this.url}/materias/${id}`);
  }

  //Crear materias
  crearMateria(materia: ModeloMateria): Observable<ModeloMateria> {
    return this.http.post<ModeloMateria>(this.url + '/materias', materia);
  }

  //Actualizar una materia
  actualizarMateria(materia: ModeloMateria): Observable<ModeloMateria> {
    return this.http.put<ModeloMateria>(
      `${this.url}/materias/${materia.id}`,materia);
  }

  //Eliminar una materia
  eliminarMateria(id: string): Observable<any> {
    return this.http.delete(`${this.url}/materias/${id}`);
  }
}
