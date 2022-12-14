import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ItemMenu } from '../model/dto/item-menu';
import { catchError, throwError } from 'rxjs';
import { Curso } from '../model/curso';
import { ParticipantesGrupoDTO } from '../model/dto/participante-grupo';

@Injectable({
  providedIn: 'root'
})
export class ParticipanteService {


  private url: string = `${environment.host}/participante`;

  constructor(private router: Router,
    private http: HttpClient) { }

  /*

getCursoAndGrupo(curso: string, grupo: string) {
  let p = new HttpParams()
  p = p.append("curso", curso)
  p = p.append("grupo", grupo)
  return this.http.get<ParticipantesGrupoDTO[]>(`${this.url}/consultarAlumnosPorGrupo`, {
    params: p
  }
  )
    .pipe(
      catchError(this.handleError)
    );
}
*/

  getCursoAndGrupo(curso: string, grupo: string) {
    const obj = { parIdCurso: curso, parIdCursoGrupo: grupo }

    return this.http.post<ParticipantesGrupoDTO[]>(`${this.url}/consultarParticipantesInscritos`, JSON.stringify(obj)
    )
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
