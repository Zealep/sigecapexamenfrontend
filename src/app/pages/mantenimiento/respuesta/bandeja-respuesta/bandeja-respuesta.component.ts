import { Component, OnInit, ViewChild } from '@angular/core';
import { Respuesta } from '../../../../model/respuesta';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RespuestaService } from '../../../../service/respuesta.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl } from '@angular/forms';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from '../../../../shared/models/confirm-dialog-model';
import { Curso } from '../../../../model/curso';
import { CursoService } from '../../../../service/curso.service';
import { PreguntaService } from './../../../../service/pregunta.service';
import { Pregunta } from './../../../../model/pregunta';
import { Router } from '@angular/router';
import { BandejaRespuestaInDTO } from '../../../../model/dto/bandeja-respuesta-in';

@Component({
  selector: 'app-bandeja-respuesta',
  templateUrl: './bandeja-respuesta.component.html',
  styleUrls: ['./bandeja-respuesta.component.css']
})
export class BandejaRespuestaComponent implements OnInit {

  displayedColumns: string[] = ['respuesta', 'indicador', 'estado', 'acciones'];
  dataSource!: MatTableDataSource<Respuesta>;
  respuestas: Respuesta[] = [];
  cursos: Curso[] = [];
  preguntas: Pregunta[] = []


  form: FormGroup = new FormGroup({
    curso: new FormControl(),
    pregunta: new FormControl(),
    nombreRespuesta: new FormControl(),
  })

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private respuestaService: RespuestaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cursoService: CursoService,
    private preguntaService: PreguntaService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getCursos()
    this.load();
  }

  load() {

    const bandeja = new BandejaRespuestaInDTO
    bandeja.idPregunta = this.form.get('pregunta')?.value;
    bandeja.nombreRespuesta = this.form.get('nombreRespuesta')?.value;

    this.respuestaService.bandeja(bandeja).subscribe(x => {
      this.respuestas = x;
      this.dataSource = new MatTableDataSource(this.respuestas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  getCursos() {
    this.cursoService.getCursos()
      .subscribe(x => {
        this.cursos = x
      })

  }

  addRespuesta() {
    const curso = this.form.get('curso')?.value
    const pregunta = this.form.get('pregunta')?.value
    this.router.navigate(['/pages/respuesta/add', curso, pregunta]);
  }

  clear() {
    this.form.reset()
  }

  onSelectCurso(event: string) {
    console.log('event', event)
    this.preguntaService.getPreguntasByCurso(event)
      .subscribe(x => {
        this.preguntas = x
      })
  }

  update(x: Respuesta) {
    let newState
    if (x.estado == 'ACT') {
      newState = 'INA'
    }
    else {
      newState = 'ACT'
    }

    this.respuestaService.updateState(x.idRespuesta, newState)
      .subscribe(x => {
        this.load()
      })
  }


  /*
    delete(x: Respuesta) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: '600px',
        data: <ConfirmDialogModel>{
          title: 'Eliminar Respuesta',
          message: 'Deseas borrar la respuesta?'
        }
      });

      dialogRef.afterClosed()
        .subscribe(result => {
          if (result) {
            this.sendDeleteRequest(x);
          }
        });
    }

    private sendDeleteRequest(e: Respuesta) {
      this.respuestaService.delete(e.idRespuesta!)
        .subscribe(response => {
          this.load();
          this.snackBar.open('Respuesta eliminada', 'Close', {
            duration: 3000
          });
        });
    }
    */

  getEstado(estado: string) {
    if (estado == 'ACT') {
      return 'ACTIVO'
    }
    else {
      return 'INACTIVO'
    }
  }

}

