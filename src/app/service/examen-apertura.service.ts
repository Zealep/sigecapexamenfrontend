import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';
import { RespuestaApi } from '../model/dto/respuesta-api';
import { BandejaExamenInDTO } from '../model/dto/bandeja-examen';
import { Examen } from '../model/examen';
import { Router } from '@angular/router';
import { ExamenApertura } from '../model/examen-apertura';
import { BandejaExamenAperturaInDTO } from '../model/dto/bandeja-examen-apertura';
import { ExamenInscripcion } from '../model/examen-inscripcion';
import { BandejaExamenPorAlumnoDTO } from '../model/dto/bandeja-examen-alumno';

@Injectable({
  providedIn: 'root'
})
export class ExamenAperturaService {


  private url: string = `${environment.host}/examen-apertura`;

  constructor(private router: Router,
    private http: HttpClient) { }

  bandeja(x: BandejaExamenAperturaInDTO) {
    return this.http.post<ExamenApertura[]>(`${this.url}/bandeja`, x)
      .pipe(
        catchError(this.handleError)
      );
  }


  getAll() {
    return this.http.get<ExamenApertura[]>(`${this.url}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getById(id: string) {
    return this.http.get<ExamenApertura>(`${this.url}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }


  save(e: ExamenApertura) {
    return this.http.post<ExamenApertura>(`${this.url}`, e)
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

  cerrarApertura(id: string) {
    let parms = new HttpParams()
    parms = parms.append("id", id)
    return this.http.delete<RespuestaApi>(`${this.url}/cerrar`,
      {
        params: parms
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  notificar(idApertura: string, idCurso: string, idGrupo: string) {
    let parms = new HttpParams()
    parms = parms.append("idApertura", idApertura)
    parms = parms.append("curso", idCurso)
    parms = parms.append("grupo", idGrupo)
    return this.http.get<RespuestaApi>(`${this.url}/notificar`,
      {
        params: parms
      })
      .pipe(
        catchError(this.handleError)
      )
  }

  registrarAsistencia(dni: string, idCurso: string, idGrupo: string) {
    let parms = new HttpParams()
    parms = parms.append("dni", dni)
    parms = parms.append("curso", idCurso)
    parms = parms.append("grupo", idGrupo)
    return this.http.get<RespuestaApi>(`${this.url}/asistencia`,
      {
        params: parms
      })
      .pipe(
        catchError(this.handleError)
      )
  }

  getExamenInscripcionById(id: string) {
    return this.http.get<ExamenInscripcion>(`${this.url}/inscripcion/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  validarInicioExamen(e: BandejaExamenPorAlumnoDTO) {
    return this.http.post<ExamenApertura>(`${this.url}/validar-inicio-examen`, e)
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
