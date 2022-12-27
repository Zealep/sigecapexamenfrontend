import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { PreguntaListComponent } from './mantenimiento/pregunta/pregunta-list/pregunta-list.component';
import { PreguntaFormComponent } from './mantenimiento/pregunta/pregunta-form/pregunta-form.component';
import { BandejaRespuestaComponent } from './mantenimiento/respuesta/bandeja-respuesta/bandeja-respuesta.component';
import { RespuestaFormComponent } from './mantenimiento/respuesta/respuesta-form/respuesta-form.component';
import { ExamenListComponent } from './mantenimiento/examen/examen-list/examen-list.component';
import { ExamenFormComponent } from './mantenimiento/examen/examen-form/examen-form.component';
import { BandejaAperturaComponent } from './apertura-examen/bandeja-apertura/bandeja-apertura.component';
import { ExamenAperturaFormComponent } from './apertura-examen/examen-apertura-form/examen-apertura-form.component';
import { AsistenciaExamenComponent } from './asistencia-examen/asistencia-examen.component';
import { BandejaExamenesComponent } from './bandeja-examenes/bandeja-examenes.component';
import { GenerarExamenComponent } from './bandeja-examenes/generar-examen/generar-examen.component';
import { FirmarExamenComponent } from './bandeja-examenes/firmar-examen/firmar-examen.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '', //
      pathMatch: 'full',
      redirectTo: 'empleado'
    },

    {
      path: 'pregunta',
      component: PreguntaListComponent,
    },
    {
      path: 'pregunta/add',
      component: PreguntaFormComponent,
    },
    {
      path: 'pregunta/edit/:id',
      component: PreguntaFormComponent,
    },

    {
      path: 'respuesta',
      component: BandejaRespuestaComponent,
    },
    {
      path: 'respuesta/add/:curso/:pregunta',
      component: RespuestaFormComponent,
    },
    {
      path: 'respuesta/edit/:id',
      component: RespuestaFormComponent,
    },


    {
      path: 'examen-apertura',
      component: BandejaAperturaComponent,
    },
    {
      path: 'examen-apertura/add/:curso/:grupo',
      component: ExamenAperturaFormComponent,
    },
    {
      path: 'examen-apertura/edit/:id',
      component: ExamenAperturaFormComponent,
    },


    {
      path: 'examen-asistencia',
      component: AsistenciaExamenComponent,
    },

    {
      path: 'examen-curso',
      component: ExamenListComponent,
    },
    {
      path: 'examen/add/:curso',
      component: ExamenFormComponent,
    },
    {
      path: 'examen/edit/:id/:curso',
      component: ExamenFormComponent,
    },


    {
      path: 'examen-bandeja-alumno',
      component: BandejaExamenesComponent,
    },


    {
      path: 'examen-iniciar/:examen/:inscripcion',
      component: GenerarExamenComponent,
    },

    {
      path: 'firmar',
      component: FirmarExamenComponent,
    },

  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
