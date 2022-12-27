import { NgSignaturePadOptions, SignaturePadComponent } from '@almothafar/angular-signature-pad/public-api';
import { Component, OnInit, ViewChild, ElementRef, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Archivo } from '../../../model/archivo';
import { ArchivoService } from '../../../service/upload-file.service';
import * as BlobUtil from 'blob-util';
import { BandejaExamenPorAlumnoDTO } from '../../../model/dto/bandeja-examen-alumno';

@Component({
  selector: 'app-firmar-examen',
  templateUrl: './firmar-examen.component.html',
  styleUrls: ['./firmar-examen.component.css']
})
export class FirmarExamenComponent implements OnInit {

  @ViewChild('signature')
  public signaturePad!: SignaturePadComponent;

  info!: BandejaExamenPorAlumnoDTO


  signaturePadOptions: NgSignaturePadOptions = { // passed through to szimek/signature_pad constructor
    minWidth: 5,
    canvasWidth: 600,
    canvasHeight: 200
  };

  constructor(public dialogRef: MatDialogRef<FirmarExamenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private archivoService: ArchivoService) {
    // no-op
  }
  ngOnInit(): void {
    this.info = this.data.info
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('penColor', 'black'); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawComplete(event: MouseEvent | Touch) {
    // will be notified of szimek/signature_pad's onEnd event
    console.log('Completed drawing', event);
    this.signaturePad.toData
  }

  drawStart(event: MouseEvent | Touch) {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('Start drawing', event);
  }

  guardar() {
    console.log(this.signaturePad.toDataURL());

    let a = new Archivo()
    a.idDocumento = this.info.idSidExamen.toString()
    a.nombre = this.info.nombreUsuario
    a.tipo = "image/png"

    const formData: FormData = new FormData();
    BlobUtil.dataURLToBlob
    formData.append('file', BlobUtil.dataURLToBlob(this.signaturePad.toDataURL()));
    formData.append('archivo', JSON.stringify(a));

    this.archivoService.upload(formData)
      .subscribe(x => {

      })

  }

  limpiar() {
    this.signaturePad.clear()
  }


}
