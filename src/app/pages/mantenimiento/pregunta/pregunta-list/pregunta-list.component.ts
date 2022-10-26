import { Component, OnInit, ViewChild } from '@angular/core';
import { PreguntaService } from '../../../../service/pregunta.service';
import { CursoService } from '../../../../service/curso.service';
import { TipoPreguntaService } from '../../../../service/tipo-pregunta.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pregunta } from '../../../../model/pregunta';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from 'src/app/shared/models/confirm-dialog-model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pregunta-list',
  templateUrl: './pregunta-list.component.html',
  styleUrls: ['./pregunta-list.component.css']
})
export class PreguntaListComponent implements OnInit {

  displayedColumns: string[] = ['curso', 'pregunta', 'tipoPregunta', 'estado','acciones'];
  dataSource!: MatTableDataSource<Pregunta>;
  preguntas: Pregunta[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private preguntaService:PreguntaService,
    private dialog: MatDialog,
    private snackBar:MatSnackBar
   ) {

   }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.preguntaService.getPreguntas().subscribe(x=>{
      this.preguntas = x;
      this.dataSource = new MatTableDataSource(this.preguntas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  delete(x: Pregunta) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: <ConfirmDialogModel>{
        title: 'Eliminar Pregunta',
        message: 'Deseas borrar la pregunta?'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if(result) {
          this.sendDeleteRequest(x);
        }
      });
  }

  private sendDeleteRequest(e: Pregunta) {
    this.preguntaService.delete(e.idPregunta!)
    .subscribe(response => {
      this.load();
      this.snackBar.open('Pregunta eliminada', 'Close', {
        duration: 3000
      });
    });
  }

  getEstado(estado:string){
    if(estado == 'ACT'){
      return 'ACTIVO'
    }
    else{
      return 'INACTIVO'
    }
  }

}
