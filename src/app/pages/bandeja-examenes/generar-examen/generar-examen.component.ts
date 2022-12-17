import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PreguntaService } from '../../../service/pregunta.service';
import { ExamenPreguntaDTO } from '../../../model/dto/examen-pregunta';
import { ExamenAperturaService } from '../../../service/examen-apertura.service';
import { ActivatedRoute } from '@angular/router';
import { ExamenApertura } from '../../../model/examen-apertura';
import * as moment from 'moment';
import { CdTimerComponent } from 'angular-cd-timer/lib/angular-cd-timer.component';
import { ExamenInscripcionIntento } from '../../../model/examen-ins-intento';
import { ExamenInscripcionIntentoRespuesta } from '../../../model/examen-ins-intento-respuesta';
import { ExamenInscripcion } from '../../../model/examen-inscripcion';
import { ExamenIntentoService } from '../../../service/examen-intento.service';
import { catchError, EMPTY } from 'rxjs';
import { SpinnerOverlayService } from '../../../service/overlay.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-generar-examen',
  templateUrl: './generar-examen.component.html',
  styleUrls: ['./generar-examen.component.css']
})
export class GenerarExamenComponent implements OnInit {

  preguntas: ExamenPreguntaDTO[] = []
  arrayRespuestas!: FormArray
  idExamenApertura!: string
  examenApertura!: ExamenApertura
  idExamenInscripcion!: number
  fechaEmpezoReal!: Date

  alumno!: string
  tiempoRestanteSegundos!: number
  @ViewChild('basicTimer') cdTimer!: CdTimerComponent;

  constructor(private fb: FormBuilder,
    private preguntaService: PreguntaService,
    private examenAperturaService: ExamenAperturaService,
    private route: ActivatedRoute,
    private examenIntentoService: ExamenIntentoService,
    private spinnerService: SpinnerOverlayService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.fechaEmpezoReal = new Date()
    this.idExamenApertura = this.route.snapshot.paramMap.get('examen')!;
    this.idExamenInscripcion = +this.route.snapshot.paramMap.get('inscripcion')!;
    this.alumno = sessionStorage.getItem('usuario')!

    this.getPreguntasPorExamen()

    this.examenAperturaService.getById(this.idExamenApertura)
      .subscribe(x => {
        this.examenApertura = x
        var inicio = new Date(x.fechaHoraApertura)
        var fin = this.addMinutes(x.tiempoDuracion, new Date(x.fechaHoraApertura))
        var seconds = this.diferenciaSegudos(new Date(), fin);
        this.tiempoRestanteSegundos = seconds
        console.log('segundos', seconds)
      })
  }

  ngAfterViewInit() {
  }


  getExamenApertura() {
    this.examenAperturaService.getById(this.idExamenApertura)
      .subscribe(x => {
        this.examenApertura = x
        this.getTiempoRestante(x)
      })
  }

  getTiempoRestante(ex: ExamenApertura) {

    var inicio = new Date(ex.fechaHoraApertura)
    var fin = this.addMinutes(ex.tiempoDuracion, new Date(ex.fechaHoraApertura))
    var seconds = this.diferenciaSegudos(new Date(), fin);
    this.tiempoRestanteSegundos = seconds


    console.log('seconds', this.tiempoRestanteSegundos)

  }

  diferenciaSegudos(inicio = new Date(), fin = new Date()) {

    var diff = fin.getTime() - inicio.getTime()
    var seconds = diff / 1000;
    var Seconds_Between_Dates = Math.round(seconds);
    return Seconds_Between_Dates;
  }


  addMinutes(numOfMinutes: number, date = new Date()) {
    date.setMinutes(date.getMinutes() + numOfMinutes);
    return date;
  }

  getPreguntasPorExamen() {
    this.preguntaService.getPreguntasPorExamen(this.idExamenApertura)
      .subscribe(x => {

        this.preguntas = x;
        this.arrayRespuestas = new FormArray(x.map((r: any) => new FormGroup({
          idPregunta: new FormControl(r.idPregunta),
          idRespuesta: new FormControl('')
        })))

      })
  }

  finalizar() {
    this.spinnerService.show()

    let examenInscripcion = new ExamenInscripcion();
    examenInscripcion.idExamenSolicitudInscripcion = this.idExamenInscripcion

    let examenInscripcionIntento = new ExamenInscripcionIntento();
    examenInscripcionIntento.examenSolicitudInscripcion = examenInscripcion
    examenInscripcionIntento.fechaInicio = this.fechaEmpezoReal
    examenInscripcionIntento.fechaTermino = new Date()


    let respuestas: ExamenInscripcionIntentoRespuesta[] = []

    this.arrayRespuestas.getRawValue().forEach(x => {
      let examenInscripcionIntentoRespuesta = new ExamenInscripcionIntentoRespuesta()
      examenInscripcionIntentoRespuesta.idPregunta = x.idPregunta
      examenInscripcionIntentoRespuesta.idRespuestaMarcada = x.idRespuesta
      respuestas.push(examenInscripcionIntentoRespuesta)
    })

    examenInscripcionIntento.detalleRespuestas = respuestas

    this.examenIntentoService.save(examenInscripcionIntento)
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
        this.snackBar.open('Se registro correctamente tu examen realizado', 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000,
          panelClass: ["ok-style"]

        });
      })



  }

  getGroup(index: any) {
    return this.arrayRespuestas.at(index) as FormGroup
  }

}
