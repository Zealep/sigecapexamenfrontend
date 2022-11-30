import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Curso } from '../../../../model/curso';
import { Pregunta } from '../../../../model/pregunta';
import { FormGroup, FormControl } from '@angular/forms';
import { ExamenService } from '../../../../service/examen.service';
import { CursoService } from '../../../../service/curso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Examen } from '../../../../model/examen';
import { catchError, EMPTY } from 'rxjs';
import { PreguntaService } from '../../../../service/pregunta.service';
import { MatTableDataSource } from '@angular/material/table';
import { ExamenPregunta } from '../../../../model/examen-pregunta';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-examen-form',
  templateUrl: './examen-form.component.html',
  styleUrls: ['./examen-form.component.css']
})
export class ExamenFormComponent implements OnInit {

  displayedColumns: string[] = ['pregunta', 'puntuacion', 'acciones'];
  dataSource!: MatTableDataSource<Pregunta>;
  selection = new SelectionModel<Pregunta>(true, []);

  examen!: Examen
  idExamen!: string;
  idCurso!: string
  idPregunta!: string
  curso!: Curso
  preguntas: Pregunta[] = []
  detalleExamen: ExamenPregunta[] = []
  trueOrFalse!: string

  form: FormGroup = new FormGroup({
    curso: new FormControl({ value: '', disabled: true }),
    nombreExamen: new FormControl(''),
  });


  constructor(private examenService: ExamenService,
    private preguntaService: PreguntaService,
    private cursoService: CursoService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.idExamen = this.route.snapshot.paramMap.get('id')!;
    this.idCurso = this.route.snapshot.paramMap.get('curso')!;
    this.getCurso();
    this.getPreguntas()
    //this.initEditForm()

  }

  ngAfterViewInit(): void {

  }

  getPreguntas() {
    this.preguntaService.getPreguntasByCurso(this.idCurso)
      .subscribe(x => {
        console.log('x', x)
        this.preguntas = x
        this.dataSource = new MatTableDataSource(this.preguntas);
        console.log('preguntas,', this.preguntas)
        if (this.idExamen != null) {
          this.examenService.getById(this.idExamen!).subscribe(c => {
            console.log('examen', c)
            this.examen = c
            this.idCurso = c.curso.idCurso
            this.getCurso()
            this.form.controls['nombreExamen'].setValue(c.nombreExamen);
            let preguntasChecked: Pregunta[] = []

            for (let i = 0; i < c.detalleExamen.length; i++) {
              preguntasChecked.push(c.detalleExamen[i].pregunta)
            }

            //this.selection = new SelectionModel<Pregunta>(true, preguntasChecked)
            this.dataSource.data = this.preguntas

          });
        }

      })
  }

  getCurso() {
    this.cursoService.getById(this.idCurso)
      .subscribe(x => {
        this.curso = x
        this.form.controls['curso'].setValue(this.curso?.nombreCurso);
      })
  }

  grabar() {
    const examen = new Examen();
    const curso = new Curso()

    if (!this.validarPuntaje()) {
      this.snackBar.open('La suma de puntuacion de las preguntas tiene que ser 20', "X", {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000,
        panelClass: ["error-style"]
      })
      return
    }


    if (this.idExamen != null) {
      examen.idExamen = this.idExamen;
    }

    curso.idCurso = this.idCurso
    examen.curso = curso
    examen.nombreExamen = this.form.get('nombreExamen')?.value;
    examen.estado = 'ACT'


    if (this.selection.selected != null) {
      let preguntas = this.selection.selected
      let examenPreguntas: ExamenPregunta[] = []

      preguntas.forEach(x => {
        let examPreg = new ExamenPregunta()
        examPreg.pregunta = x
        examenPreguntas.push(examPreg)
      })

      examen.detalleExamen = examenPreguntas
    }

    this.examenService.save(examen)
      .pipe(catchError(error => {
        console.log('error', error)
        this.snackBar.open(error.error.message, "X", {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000,
          panelClass: ["error-style"]
        })
        return EMPTY
      }))
      .subscribe(x => {
        this.clearForm();
        this.snackBar.open('Se registro correctamente el examen', 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000,
          panelClass: ["ok-style"]

        });
        this.selection.clear()
      })

  }

  initEditForm() {
  }

  validarPuntaje() {
    let validacion = true
    let sum = 0;
    this.selection.selected.forEach(x => {
      sum += x.puntuacion;
    })
    if (sum != 20) {
      validacion = false
    }
    return validacion
  }

  clearForm() {
    this.form.reset();
  }

  cancelar() {
    this.router.navigate(['/pages/examen-curso']);


  }
  seleccionados() {
    console.log('BTN SELECT', this.selection.selected)
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data?.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }


}
