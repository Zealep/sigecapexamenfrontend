import { Component, OnInit } from '@angular/core';
import { CargaMasivaService } from 'src/app/service/carga-masiva.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerOverlayService } from '../../service/overlay.service';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-carga-masiva',
  templateUrl: './carga-masiva.component.html',
  styleUrls: ['./carga-masiva.component.css']
})
export class CargaMasivaComponent implements OnInit {

  constructor(private cargaMasivaService: CargaMasivaService,
    private snackBar: MatSnackBar,
    private spinnerService: SpinnerOverlayService) { }

  ngOnInit(): void {
  }

  fileChange(event: any) {
    this.spinnerService.show()
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file, file.name);
      console.log(file)

      this.cargaMasivaService.cargarArchivoCsv(formData)
        .pipe(catchError(error => {
          this.spinnerService.hide()
          console.log('error', error)
          //this.snackBar.open(error.error.message, "X", {
          this.snackBar.open('Error en el proceso verifique que este correcto el archivo a cargar', "X", {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000,
            panelClass: ["error-style"]
          })
          return EMPTY
        }))
        .subscribe(x => {
          this.spinnerService.hide()
          this.snackBar.open('Se cargo el archivo correctamente', 'X', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000,
            panelClass: ["ok-style"]

          });
        })

    }

  }
}
