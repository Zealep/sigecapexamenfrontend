import { Component, OnInit, ViewChild } from '@angular/core';
import { Examen } from '../../../../model/examen';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from '../../../../model/curso';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExamenService } from '../../../../service/examen.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursoService } from '../../../../service/curso.service';
import { Router } from '@angular/router';
import { BandejaExamenInDTO } from '../../../../model/dto/bandeja-examen';
import { Respuesta } from '../../../../model/respuesta';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from '../../../../shared/models/confirm-dialog-model';

@Component({
  selector: 'app-examen-list',
  templateUrl: './examen-list.component.html',
  styleUrls: ['./examen-list.component.css']
})
export class ExamenListComponent implements OnInit {

  displayedColumns: string[] = ['curso', 'examen', 'estado', 'acciones'];
  dataSource!: MatTableDataSource<Examen>;
  examenes: Examen[] = [];
  cursos: Curso[] = [];


  form: FormGroup = new FormGroup({
    curso: new FormControl(),
    nombreExamen: new FormControl(),
  })

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private examenService: ExamenService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cursoService: CursoService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getCursos()
    this.load();
  }

  load() {

    const bandeja = new BandejaExamenInDTO
    bandeja.idCurso = this.form.get('curso')?.value;
    bandeja.nombreExamen = this.form.get('nombreExamen')?.value;

    this.examenService.bandeja(bandeja).subscribe(x => {
      this.examenes = x;
      this.dataSource = new MatTableDataSource(this.examenes);
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

  addExamen() {
    const curso = this.form.get('curso')?.value
    this.router.navigate(['/pages/examen/add', curso]);
  }

  clear() {
    this.form.reset()
  }

  update(x: Examen) {
    let newState
    if (x.estado == 'ACT') {
      newState = 'INA'
    }
    else {
      newState = 'ACT'
    }

    this.examenService.updateState(x.idExamen, newState)
      .subscribe(x => {
        this.load()
      })
  }

  /*
    delete(x: Examen) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: '600px',
        data: <ConfirmDialogModel>{
          title: 'Eliminar examen',
          message: 'Deseas borrar el examen?'
        }
      });

      dialogRef.afterClosed()
        .subscribe(result => {
          if (result) {
            this.sendDeleteRequest(x);
          }
        });
    }

    private sendDeleteRequest(e: Examen) {
      this.examenService.delete(e.idExamen!)
        .subscribe(response => {
          this.load();
          this.snackBar.open('Examen eliminada', 'Close', {
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




