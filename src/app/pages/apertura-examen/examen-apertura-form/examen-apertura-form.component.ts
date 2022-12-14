import { Component, OnInit } from '@angular/core';
import { Curso } from './../../../model/curso';
import { Examen } from '../../../model/examen';
import { FormGroup, FormControl } from '@angular/forms';
import { CursoGrupo } from '../../../model/curso-grupo';
import { CursoService } from './../../../service/curso.service';
import { CursoGrupoService } from '../../../service/curso-grupo.service';
import { ExamenService } from '../../../service/examen.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenApertura } from '../../../model/examen-apertura';
import { ExamenAperturaService } from '../../../service/examen-apertura.service';
import { catchError, EMPTY } from 'rxjs';
import { ThemePalette, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { CREADO_APERTURA_EXAMEN } from 'src/app/shared/var.constant';
import { NgxMatDateAdapter, NgxMatDateFormats, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { SpinnerOverlayService } from '../../../service/overlay.service';


@Component({
  selector: 'app-examen-apertura-form',
  templateUrl: './examen-apertura-form.component.html',
  styleUrls: ['./examen-apertura-form.component.css'],

})
export class ExamenAperturaFormComponent implements OnInit {

  idExamenApertura!: string;
  idCurso!: string
  idGrupo!: string
  curso!: Curso
  grupo!: CursoGrupo
  examenes: Examen[] = []
  trueOrFalse!: string
  estadoEditar!: string


  public date!: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = true;
  public touchUi = false;
  public enableMeridian = false;
  public minDate!: moment.Moment;
  public maxDate!: moment.Moment;
  public stepHour = 1;
  public stepMinute = 15;
  public color: ThemePalette = 'primary';
  public defaultTime = [9, 0, 0]

  form: FormGroup = new FormGroup({
    curso: new FormControl({ value: '', disabled: true }),
    grupo: new FormControl({ value: '', disabled: true }),
    examen: new FormControl(''),
    fechaInicio: new FormControl(''),
    fechaFin: new FormControl(''),
    tiempoDuracion: new FormControl(''),
    intentos: new FormControl(''),
    indEncuesta: new FormControl('')
  });


  constructor(private cursoService: CursoService,
    private grupoService: CursoGrupoService,
    private examenService: ExamenService,
    private examenAperturaService: ExamenAperturaService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerService: SpinnerOverlayService) { }

  ngOnInit(): void {
    this.idExamenApertura = this.route.snapshot.paramMap.get('id')!;
    this.idCurso = this.route.snapshot.paramMap.get('curso')!;
    this.idGrupo = this.route.snapshot.paramMap.get('grupo')!;


    this.getCurso();
    this.getGrupo();
    this.getExamenes()
    this.initEditForm();
  }

  getCurso() {
    this.cursoService.getById(this.idCurso)
      .subscribe(x => {
        this.curso = x
        this.form.controls['curso'].setValue(this.curso?.nombreCurso);
      })
  }
  getGrupo() {
    this.grupoService.getById(this.idGrupo)
      .subscribe(x => {
        console.log('grupo', x)
        this.grupo = x
        this.form.controls['grupo'].setValue(this.grupo?.nombreGrupo);
      })
  }

  getExamenes() {
    this.examenService.getByCurso(this.idCurso)
      .subscribe(x => {
        this.examenes = x
      })
  }


  grabar() {
    this.spinnerService.show()
    const examenApertura = new ExamenApertura();
    const examen = new Examen()
    const cursoGrupo = new CursoGrupo()


    if (this.idExamenApertura != null) {
      examenApertura.idExamenApertura = this.idExamenApertura;
      examenApertura.estado = this.estadoEditar
    } else {
      examenApertura.estado = CREADO_APERTURA_EXAMEN
    }
    examen.idExamen = this.form.get('examen')?.value;
    cursoGrupo.idCursoGrupo = this.idGrupo;
    examenApertura.examen = examen
    examenApertura.cursoGrupo = cursoGrupo
    examenApertura.fechaHoraApertura = this.form.get('fechaInicio')?.value;
    examenApertura.fechaHoraCierre = this.form.get('fechaFin')?.value;
    examenApertura.tiempoDuracion = this.form.get('tiempoDuracion')?.value;
    examenApertura.numeroIntentos = this.form.get('intentos')?.value;
    if (this.form.get('indEncuesta')?.value) {
      examenApertura.indEncuesta = 'S'
    }
    else {
      examenApertura.indEncuesta = 'N'
    }

    this.examenAperturaService.save(examenApertura)
      .pipe(catchError(error => {
        this.spinnerService.hide()
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
        this.spinnerService.hide()
        this.clearForm();
        this.snackBar.open('Se registro correctamente la apertura del examen', 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000,
          panelClass: ["ok-style"]

        });
      })

  }


  initEditForm() {
    if (this.idExamenApertura != null) {
      this.examenAperturaService.getById(this.idExamenApertura!).subscribe(c => {
        this.idCurso = c.examen.curso.idCurso
        this.idGrupo = c.cursoGrupo.idCursoGrupo
        this.getCurso()
        this.getGrupo()
        this.getExamenes()
        this.form.controls['examen'].setValue(c.examen.idExamen);
        console.log('fecha apertura', c.fechaHoraApertura)
        this.form.controls['fechaInicio'].setValue(c.fechaHoraApertura);
        this.form.controls['fechaFin'].setValue(c.fechaHoraCierre);
        this.form.controls['tiempoDuracion'].setValue(c.tiempoDuracion);
        this.form.controls['intentos'].setValue(c.numeroIntentos);
        if (c.indEncuesta == 'S') {
          this.form.controls['indEncuesta'].setValue(true);
        }
        else {
          this.form.controls['indEncuesta'].setValue(false);
        }

        this.estadoEditar = c.estado
      });
    }
  }

  clearForm() {
    this.form.reset();
  }

  cancelar() {
    this.router.navigate(['/pages/examen-apertura']);
  }

}
