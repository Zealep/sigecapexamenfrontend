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



@NgModule({
  declarations: [


    PreguntaListComponent,
        PreguntaFormComponent
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
    AngularEditorModule
  ]
})
export class PagesModule { }
