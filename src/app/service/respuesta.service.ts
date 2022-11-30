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
import { Respuesta } from '../model/respuesta';
import { BandejaRespuestaInDTO } from '../model/dto/bandeja-respuesta-in';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {


  private url: string = `${environment.host}/respuesta`;

  constructor(private router: Router,
    private http: HttpClient) { }

  bandeja(x: BandejaRespuestaInDTO) {
    return this.http.post<Respuesta[]>(`${this.url}/bandeja`, x)
      .pipe(
        catchError(this.handleError)
      );
  }


  getAll() {
    return this.http.get<Respuesta[]>(`${this.url}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getById(id: string) {
    return this.http.get<Respuesta>(`${this.url}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getByPregunta(id: string) {
    return this.http.get<Respuesta[]>(`${this.url}/pregunta/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }


  save(respuesta: Respuesta) {
    return this.http.post<Respuesta>(`${this.url}`, respuesta)
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
