import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthHtppInterceptorService } from './service/basic-auth-interceptor.service';
import { PagesComponent } from './pages/pages.component';
import { MultilevelMenuService, NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { CdTimerModule } from 'angular-cd-timer';

import es from '@angular/common/locales/es-PE';
registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    NgMaterialMultilevelMenuModule,
    AngularEditorModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatDatepickerModule,
    NgxMatNativeDateModule,
    CdTimerModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "es-PE" },
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    MultilevelMenuService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
