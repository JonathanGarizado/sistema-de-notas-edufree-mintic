import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss']
})
export class EstudianteComponent implements OnInit {
  url = "http://localhost:3000"


  //Se crea una instancia del objeto tipo HttpClient
  constructor(private http: HttpClient) {
    //Llamar al metodo obtenerUsuarios cuando se cargue la pagina
    //Suscribirse porque son peticiones asincronas y no se sabe cuando se tenga respuesta
    this.obtenerUsuarios().subscribe(
      {
        next: (v) => {
          //Cuando exista una respuesta por parte del observable se ejecutara este codigo
          alert("Gracias psssss");
          console.log(v)
        },
        error: (e) => {
          //Cuando ocurre un error se ejecutara esto
          alert("Paila ERROR");
        },
        complete: () => {
          //Cuando se complete todo se hace este codigo
          alert("Completo");
        }
      }
    );

  }

  ngOnInit(): void { }

  //Obtener las personas registradas de la base de datos
  //Observable permite hacer peticiones asincronas...
  obtenerUsuarios(): Observable<any> {
    //Retorna un objeto Observable
    return this.http.get<any>(this.url + "/usuarios")

  }
}