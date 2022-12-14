import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ItemMenu } from '../model/dto/item-menu';
import { catchError, throwError } from 'rxjs';
import { Curso } from '../model/curso';
import { TipoPregunta } from '../model/tipo-pregunta';
import { Pregunta } from '../model/pregunta';
import { RespuestaApi } from '../model/dto/respuesta-api';
import { ExamenPreguntaDTO } from '../model/dto/examen-pregunta';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {


  private url: string = `${environment.host}/pregunta`;

  constructor(private router: Router,
    private http: HttpClient) { }

  getPreguntas() {
    return this.http.get<Pregunta[]>(`${this.url}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPreguntaById(id: string) {
    return this.http.get<Pregunta>(`${this.url}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPreguntasByCurso(idCurso: string) {
    return this.http.get<Pregunta[]>(`${this.url}/curso/${idCurso}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPreguntasByTipoPregunta(idTipoPregunta: string) {
    return this.http.get<Pregunta[]>(`${this.url}/tipoPregunta/${idTipoPregunta}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getPreguntasByCursoAndTipoPregunta(idCurso: string, idTipoPregunta: string) {
    return this.http.get<Pregunta[]>(`${this.url}/curso/${idCurso}/tipoPregunta/${idTipoPregunta}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  save(pregunta: Pregunta) {
    return this.http.post<Pregunta>(`${this.url}`, pregunta)
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

  getPreguntasPorExamen(idExamen: string) {
    return this.http.get<ExamenPreguntaDTO[]>(`${this.url}/examen/${idExamen}`)
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
    return throwError('Error en peticion del servicio');

  }
}
