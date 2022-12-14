import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ParticipantesGrupoDTO } from '../../model/dto/participante-grupo';
import { MatTableDataSource } from '@angular/material/table';
import { ExamenApertura } from '../../model/examen-apertura';
import { Curso } from '../../model/curso';
import { Examen } from '../../model/examen';
import { CursoGrupo } from '../../model/curso-grupo';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExamenAperturaService } from '../../service/examen-apertura.service';
import { ExamenService } from '../../service/examen.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursoService } from '../../service/curso.service';
import { CursoGrupoService } from '../../service/curso-grupo.service';
import { Router } from '@angular/router';
import { SpinnerOverlayService } from '../../service/overlay.service';
import { BandejaExamenAperturaInDTO } from '../../model/dto/bandeja-examen-apertura';
import { ParticipanteService } from '../../service/participante.service';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-asistencia-examen',
  templateUrl: './asistencia-examen.component.html',
  styleUrls: ['./asistencia-examen.component.css']
})
export class AsistenciaExamenComponent implements OnInit {

  displayedColumns: string[] = ['numero', 'participante', 'dni', 'empresa', 'unidad', 'asistencia'];
  dataSource!: MatTableDataSource<ParticipantesGrupoDTO>;
  examenesApertura: ExamenApertura[] = [];
  cursos: Curso[] = [];
  examenes: Examen[] = []
  cursosGrupo: CursoGrupo[] = []
  participantes: ParticipantesGrupoDTO[] = []
  idCurso!: string
  idGrupo!: string
  asistencia: boolean = false
  dni!: string


  form: FormGroup = new FormGroup({
    curso: new FormControl(),
    grupo: new FormControl(),
    examen: new FormControl(),
  })

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private examenAperturaService: ExamenAperturaService,
    private examenService: ExamenService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cursoService: CursoService,
    private cursoGrupoService: CursoGrupoService,
    private router: Router,
    private spinnerService: SpinnerOverlayService,
    private participanteService: ParticipanteService,
    private render: Renderer2
  ) {

  }

  ngOnInit(): void {
    this.getCursos()
    this.load();
  }

  load() {

    this.idCurso = this.form.get('curso')?.value;
    this.idGrupo = this.form.get('grupo')?.value;

    this.participanteService.getCursoAndGrupo(this.idCurso, this.idGrupo).subscribe(x => {
      this.participantes = x;
      this.dataSource = new MatTableDataSource(this.participantes);
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
  onEnter() {
    this.spinnerService.show()

    if (this.dni == null) {
      alert('Ingresa un numero de documento a buscar')
      this.spinnerService.hide()
      return
    }
    if (this.dataSource.data.length == 0) {
      alert('Debes seleccionar buscar el grupo y curso, antes de tomar asistencia')
      this.spinnerService.hide()
      return
    }

    if (this.idCurso == null || this.idGrupo == null) {
      alert('Debes seleccionar buscar el grupo y curso, antes de tomar asistencia')
      this.spinnerService.hide()
      return
    }
    this.examenAperturaService.registrarAsistencia(this.dni, this.idCurso, this.idGrupo)
      .pipe(catchError(error => {
        console.log('error', error)
        this.spinnerService.hide()
        this.snackBar.open(error.error.message, "X", {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000,
          panelClass: ["error-style"]
        })
        return EMPTY
      }))
      .subscribe(x => {
        this.spinnerService.hide()
        this.render.selectRootElement('#documento').focus()
        this.load()
        this.snackBar.open('Se registro la asistencia correctamente', 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000,
          panelClass: ["ok-style"]

        });
      })
  }

  tomarAsistencia() {
    this.asistencia = true
  }



  clear() {
    this.form.reset()
    this.asistencia = false
  }

  onSelectCurso(event: string) {
    console.log('event', event)
    this.cursoGrupoService.getCursoGrupoByCurso(event)
      .subscribe(x => {
        this.cursosGrupo = x
      })

    this.examenService.getByCurso(event)
      .subscribe(x => {
        this.examenes = x
      })
  }




  verAlumnos(row: ExamenApertura) {
    /*
    const idGrupo = row.cursoGrupo.idCursoGrupo
    const idCurso = row.examen.curso.idCurso

    const dialogRef = this.dialog.open(VerAlumnosComponent, {
      width: '800px',
      data: {
        idCurso: idCurso,
        idGrupo: idGrupo
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/pages/examen-apertura'])
    });
    */
  }

  getEstado(estado: string) {

    switch (estado) {
      case 'CRE': return 'CREADO'; break;
      case 'CER': return 'CERRADO'; break;
      case 'INA': return 'INACTIVO'; break;
      default: return 'SIN'
    }
  }
}

