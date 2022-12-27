import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from '../shared/material/material.module';
import { PreguntaListComponent } from './mantenimiento/pregunta/pregunta-list/pregunta-list.component';
import { PreguntaFormComponent } from './mantenimiento/pregunta/pregunta-form/pregunta-form.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BandejaRespuestaComponent } from './mantenimiento/respuesta/bandeja-respuesta/bandeja-respuesta.component';
import { RespuestaFormComponent } from './mantenimiento/respuesta/respuesta-form/respuesta-form.component';
import { ExamenFormComponent } from './mantenimiento/examen/examen-form/examen-form.component';
import { ExamenListComponent } from './mantenimiento/examen/examen-list/examen-list.component';
import { BandejaAperturaComponent } from './apertura-examen/bandeja-apertura/bandeja-apertura.component';
import { ExamenAperturaFormComponent } from './apertura-examen/examen-apertura-form/examen-apertura-form.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { VerAlumnosComponent } from './apertura-examen/ver-alumnos/ver-alumnos.component';
import { AsistenciaExamenComponent } from './asistencia-examen/asistencia-examen.component';
import { BandejaExamenesComponent } from './bandeja-examenes/bandeja-examenes.component';
import { GenerarExamenComponent } from './bandeja-examenes/generar-examen/generar-examen.component';
import { CdTimerModule } from 'angular-cd-timer';
import { FirmarExamenComponent } from './bandeja-examenes/firmar-examen/firmar-examen.component';
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';



@NgModule({
  declarations: [


    PreguntaListComponent,
    PreguntaFormComponent,
    BandejaRespuestaComponent,
    RespuestaFormComponent,
    ExamenFormComponent,
    ExamenListComponent,
    BandejaAperturaComponent,
    ExamenAperturaFormComponent,
    VerAlumnosComponent,
    AsistenciaExamenComponent,
    BandejaExamenesComponent,
    GenerarExamenComponent,
    FirmarExamenComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgMaterialMultilevelMenuModule,
    MaterialModule,
    HttpClientModule,
    AngularEditorModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatDatepickerModule,
    NgxMatNativeDateModule,
    CdTimerModule,
    AngularSignaturePadModule
  ]
})
export class PagesModule { }
