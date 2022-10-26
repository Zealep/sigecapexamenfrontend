import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { PreguntaListComponent } from './mantenimiento/pregunta/pregunta-list/pregunta-list.component';
import { PreguntaFormComponent } from './mantenimiento/pregunta/pregunta-form/pregunta-form.component';

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

  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
