import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';




@NgModule({
  declarations: [
    LoginComponent,
    HeaderComponent,
    ConfirmDialogComponent,
    ProgressSpinnerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    ConfirmDialogComponent,
    ProgressSpinnerComponent
  ],
  entryComponents: [ConfirmDialogComponent]

})
export class SharedModule { }
