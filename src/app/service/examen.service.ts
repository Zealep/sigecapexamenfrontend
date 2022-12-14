import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';
import { RespuestaApi } from '../model/dto/respuesta-api';
import { BandejaExamenInDTO } from '../model/dto/bandeja-examen';
import { Examen } from '../model/examen';
import { Router } from '@angular/router';
import { BandejaExamenPorAlumnoDTO } from '../model/dto/bandeja-examen-alumno';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {


  private url: string = `${environment.host}/examen`;

  constructor(private router: Router,
    private http: HttpClient) { }

  bandeja(x: BandejaExamenInDTO) {
    return this.http.post<Examen[]>(`${this.url}/bandeja`, x)
      .pipe(
        catchError(this.handleError)
      );
  }


  getAll() {
    return this.http.get<Examen[]>(`${this.url}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getByCurso(curso: string) {
    return this.http.get<Examen[]>(`${this.url}/curso/${curso}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getById(id: string) {
    return this.http.get<Examen>(`${this.url}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }


  save(e: Examen) {
    return this.http.post<Examen>(`${this.url}`, e)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(id: string) {
    return this.http.delete<RespuestaApi>(`${this.url}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateState(id: string, state: string) {
    return this.http.delete<RespuestaApi>(`${this.url}/${id}/${state}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getBandejaPorAlumno(usuario: string) {
    return this.http.get<BandejaExamenPorAlumnoDTO[]>(`${this.url}/bandeja-alumno/${usuario}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('Client error', error.error.message);
    } else {
      // Error en el lado del servidor
      console.log('Error Status:', error.status);
      console.log('Error:', error.error);
    }
    //catch and rethrow
    return throwError(error);

  }
}
