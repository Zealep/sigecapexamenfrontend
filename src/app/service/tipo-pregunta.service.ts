import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ItemMenu } from '../model/dto/item-menu';
import { catchError, throwError } from 'rxjs';
import { Curso } from '../model/curso';
import { TipoPregunta } from '../model/tipo-pregunta';

@Injectable({
  providedIn: 'root'
})
export class TipoPreguntaService {


  private url: string = `${environment.host}/tipoPregunta`;

  constructor(private router: Router,
    private http: HttpClient) { }

    getTipoPreguntas(){
      return this.http.get<TipoPregunta[]>(`${this.url}`)
      .pipe(
        catchError(this.handleError)
      );
    }

    private handleError(error: HttpErrorResponse) {
      if(error.error instanceof ErrorEvent) {
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
