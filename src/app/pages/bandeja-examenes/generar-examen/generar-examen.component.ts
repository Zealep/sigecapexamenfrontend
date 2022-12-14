import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PreguntaService } from '../../../service/pregunta.service';
import { ExamenPreguntaDTO } from '../../../model/dto/examen-pregunta';
import { ExamenAperturaService } from '../../../service/examen-apertura.service';
import { ActivatedRoute } from '@angular/router';
import { ExamenApertura } from '../../../model/examen-apertura';
import * as moment from 'moment';
import { CdTimerComponent } from 'angular-cd-timer/lib/angular-cd-timer.component';

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
  alumno!: string
  tiempoRestanteSegundos!: number
  @ViewChild('basicTimer') cdTimer!: CdTimerComponent;

  constructor(private fb: FormBuilder,
    private preguntaService: PreguntaService,
    private examenAperturaService: ExamenAperturaService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idExamenApertura = this.route.snapshot.paramMap.get('examen')!;
    this.alumno = sessionStorage.getItem('usuario')!
    this.getPreguntasPorExamen()
    this.getExamenApertura()
  }

  ngAfterViewInit() {
    this.cdTimer.startTime = 5
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
    console.log('array', this.arrayRespuestas)
  }

  getGroup(index: any) {
    return this.arrayRespuestas.at(index) as FormGroup
  }

}
