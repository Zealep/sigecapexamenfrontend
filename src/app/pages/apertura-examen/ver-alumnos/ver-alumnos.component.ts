import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ParticipantesGrupoDTO } from '../../../model/dto/participante-grupo';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ParticipanteService } from '../../../service/participante.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-alumnos',
  templateUrl: './ver-alumnos.component.html',
  styleUrls: ['./ver-alumnos.component.css']
})
export class VerAlumnosComponent implements OnInit {


  displayedColumns: string[] = ['numero', 'participante', 'dni', 'empresa', 'unidad', 'asistencia'];
  dataSource!: MatTableDataSource<ParticipantesGrupoDTO>;
  participantes: ParticipantesGrupoDTO[] = []
  idCurso!: string
  idGrupo!: string

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(public dialogRef: MatDialogRef<VerAlumnosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private participanteService: ParticipanteService) { }

  ngOnInit(): void {
    console.log('data dialog', this.data)
    this.idCurso = this.data.idCurso
    this.idGrupo = this.data.idGrupo
    this.getParticipantes()
  }


  getParticipantes() {
    this.participanteService.getCursoAndGrupo(this.idCurso, this.idGrupo).subscribe(x => {
      this.participantes = x;
      this.dataSource = new MatTableDataSource(this.participantes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
}
