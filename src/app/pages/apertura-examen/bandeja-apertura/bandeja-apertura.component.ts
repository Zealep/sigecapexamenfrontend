import { Component, OnInit, ViewChild } from '@angular/core';
import { ExamenApertura } from '../../../model/examen-apertura';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from './../../../model/curso';
import { Examen } from '../../../model/examen';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExamenAperturaService } from '../../../service/examen-apertura.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursoService } from './../../../service/curso.service';
import { CursoGrupoService } from '../../../service/curso-grupo.service';
import { Router } from '@angular/router';
import { CursoGrupo } from '../../../model/curso-grupo';
import { ExamenService } from './../../../service/examen.service';
import { BandejaExamenAperturaInDTO } from '../../../model/dto/bandeja-examen-apertura';
import { VerAlumnosComponent } from '../ver-alumnos/ver-alumnos.component';
import { CERRADO_APERTURA_EXAMEN } from '../../../shared/var.constant';

@Component({
  selector: 'app-bandeja-apertura',
  templateUrl: './bandeja-apertura.component.html',
  styleUrls: ['./bandeja-apertura.component.css']
})
export class BandejaAperturaComponent implements OnInit {

  displayedColumns: string[] = ['examen', 'fechaInicio', 'fechaCierre', 'estado', 'acciones'];
  dataSource!: MatTableDataSource<ExamenApertura>;
  examenesApertura: ExamenApertura[] = [];
  cursos: Curso[] = [];
  examenes: Examen[] = []
  cursosGrupo: CursoGrupo[] = []


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
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getCursos()
    this.load();
  }

  load() {

    const bandeja = new BandejaExamenAperturaInDTO
    bandeja.idExamen = this.form.get('examen')?.value;
    bandeja.idCurso = this.form.get('curso')?.value;
    bandeja.idCursoGrupo = this.form.get('grupo')?.value;

    this.examenAperturaService.bandeja(bandeja).subscribe(x => {
      this.examenesApertura = x;
      this.dataSource = new MatTableDataSource(this.examenesApertura);
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

  addApertura() {
    const curso = this.form.get('curso')?.value
    const grupo = this.form.get('grupo')?.value
    this.router.navigate(['/pages/examen-apertura/add', curso, grupo]);
  }

  clear() {
    this.form.reset()
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

  update(x: ExamenApertura) {
    let newState
    if (x.estado == 'ACT') {
      newState = 'INA'
    }
    else {
      newState = 'ACT'
    }

    this.examenAperturaService.updateState(x.idExamenApertura, newState)
      .subscribe(x => {
        this.load()
      })
  }

  cerrar(x: ExamenApertura) {
    this.examenAperturaService.cerrarApertura(x.idExamenApertura)
      .subscribe(x => {
        this.load()
      })
  }

  verAlumnos() {
    const idGrupo = this.form.get('grupo')?.value;

    if (idGrupo == null) {
      alert('Debes de seleccionar un grupo')
      return
    }
    const dialogRef = this.dialog.open(VerAlumnosComponent, {
      data: {
        idGrupo: idGrupo
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/pages/examen-apertura'])
    });
  }




  getEstado(estado: string) {
    if (estado == 'ACT') {
      return 'ACTIVO'
    }
    else {
      return 'INACTIVO'
    }
  }

}

