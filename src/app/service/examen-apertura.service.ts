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
    parms.append("id", id)
    return this.http.delete<RespuestaApi>(`${this.url}/cerrar`)
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
