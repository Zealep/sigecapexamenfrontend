import { Component, OnInit, ViewChild } from '@angular/core';
import { Examen } from '../../model/examen';
import { Curso } from '../../model/curso';
import { ExamenApertura } from '../../model/examen-apertura';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExamenAperturaService } from '../../service/examen-apertura.service';
import { ExamenService } from '../../service/examen.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursoService } from '../../service/curso.service';
import { Router } from '@angular/router';
import { SpinnerOverlayService } from '../../service/overlay.service';
import { MatTableDataSource } from '@angular/material/table';
import { BandejaExamenPorAlumnoDTO } from '../../model/dto/bandeja-examen-alumno';
import { catchError, EMPTY } from 'rxjs';
import { FirmarExamenComponent } from './firmar-examen/firmar-examen.component';

@Component({
  selector: 'app-bandeja-examenes',
  templateUrl: './bandeja-examenes.component.html',
  styleUrls: ['./bandeja-examenes.component.css']
})
export class BandejaExamenesComponent implements OnInit {


  displayedColumns: string[] = ['curso', 'fechaInicio', 'fechaCierre', 'estado', 'nota', 'acciones'];
  dataSource!: MatTableDataSource<BandejaExamenPorAlumnoDTO>;
  bandejaExamenes: BandejaExamenPorAlumnoDTO[] = [];
  cursos: Curso[] = [];
  examenes: Examen[] = []
  usuario!: string


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private examenAperturaService: ExamenAperturaService,
    private examenService: ExamenService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cursoService: CursoService,
    private router: Router,
    private spinnerService: SpinnerOverlayService
  ) {

  }

  ngOnInit(): void {
    this.usuario = sessionStorage.getItem('usuario')!;
    this.getCursos()
    this.load();
  }

  load() {


    this.examenService.getBandejaPorAlumno(this.usuario).subscribe(x => {
      this.bandejaExamenes = x;
      this.dataSource = new MatTableDataSource(this.bandejaExamenes);
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



  update(x: ExamenApertura) {
    let newState = ''
    if (x.estado == 'CRE') {
      newState = 'INA'
    }
    if (x.estado == 'INA') {
      newState = 'CRE'
    }

    this.examenAperturaService.updateState(x.idExamenApertura, newState)
      .subscribe(x => {
        this.load()
      })
  }

  iniciarEncuesta(c: BandejaExamenPorAlumnoDTO) {

  }

  iniciarExamen(c: BandejaExamenPorAlumnoDTO) {
    console.log('c', c)
    this.spinnerService.show()
    this.examenAperturaService.validarInicioExamen(c)
      .pipe(catchError(error => {
        this.spinnerService.hide()
        console.log('error', error)
        this.snackBar.open(error.error.message, "X", {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 7000,
          panelClass: ["error-style"]
        })
        return EMPTY
      }))
      .subscribe(x => {
        this.spinnerService.hide()
        this.router.navigate(['/pages/examen-iniciar', c.idExamen, c.idSidExamen]);
      })


  }

  firmarExamen(c: BandejaExamenPorAlumnoDTO) {

    const dialogRef = this.dialog.open(FirmarExamenComponent, {
      width: '600px',
      data: {
        info: c,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/pages/examen-bandeja-alumno'])
    });

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
