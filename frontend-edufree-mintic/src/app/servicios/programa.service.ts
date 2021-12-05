import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloPrograma } from '../modelos/programa.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  url = 'http://localhost:3000'
  token: String = '';

  constructor(private http: HttpClient, private seguridadServicio: SeguridadService) { 
    this.token = this.seguridadServicio.ObtenerToken();
  }

  ObtenerRegistros(): Observable<ModeloPrograma[]>{
    return this.http.get<ModeloPrograma[]>(`${this.url}/programa-academicos`)
  }

  ObtenerRegistrosPorId(id: string): Observable<ModeloPrograma>{
    return this.http.get<ModeloPrograma>(`${this.url}/programa-academicos/${id}`)
  }

  CrearPrograma(programa: ModeloPrograma): Observable<ModeloPrograma>{
    return this.http.post<ModeloPrograma>(`${this.url}/programa-academicos`, programa, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  ActualizarPrograma(programa: ModeloPrograma): Observable<ModeloPrograma>{
    return this.http.put<ModeloPrograma>(`${this.url}/programa-academicos/${programa.id}`, programa, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  EliminarPrograma(id: string): Observable<any>{
    return this.http.delete(`${this.url}/programa-academicos/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }


}

