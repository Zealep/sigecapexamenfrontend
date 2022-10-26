import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ItemMenu } from '../model/dto/item-menu';
import { catchError, throwError } from 'rxjs';
import { Curso } from '../model/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {


  private url: string = `${environment.host}/curso`;

  constructor(private router: Router,
    private http: HttpClient) { }

    getCursos(){
      return this.http.get<Curso[]>(`${this.url}`)
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
