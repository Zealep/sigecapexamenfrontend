import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ExamenInscripcionIntento } from '../model/examen-ins-intento';
import { throwError, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExamenIntentoService {


  private url: string = `${environment.host}/examen-intento`;

  constructor(private router: Router,
    private http: HttpClient) { }

  save(e: ExamenInscripcionIntento) {
    return this.http.post<ExamenInscripcionIntento>(`${this.url}`, e)
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
