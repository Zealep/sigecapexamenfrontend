import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PreguntaService } from '../../../../service/pregunta.service';
import { CursoService } from '../../../../service/curso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Respuesta } from '../../../../model/respuesta';
import { RespuestaService } from '../../../../service/respuesta.service';
import { Curso } from '../../../../model/curso';
import { Pregunta } from '../../../../model/pregunta';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-respuesta-form',
  templateUrl: './respuesta-form.component.html',
  styleUrls: ['./respuesta-form.component.css']
})
export class RespuestaFormComponent implements OnInit {

  idRespuesta!: string;
  idCurso!: string
  idPregunta!: string
  curso!: Curso
  pregunta!: Pregunta
  trueOrFalse!: string

  form: FormGroup = new FormGroup({
    curso: new FormControl({ value: '', disabled: true }),
    pregunta: new FormControl({ value: '', disabled: true }),
    enunciado: new FormControl(''),
    retroalimentacion: new FormControl(''),
    indRespuesta: new FormControl('')
  });

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',

    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'strikeThrough',
        'subscript',
        'superscript',
      ],
      [

        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
  };

  constructor(private preguntaService: PreguntaService,
    private cursoService: CursoService,
    private snackBar: MatSnackBar,
    private respuestaService: RespuestaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.idRespuesta = this.route.snapshot.paramMap.get('id')!;
    this.idCurso = this.route.snapshot.paramMap.get('curso')!;
    this.idPregunta = this.route.snapshot.paramMap.get('pregunta')!;
    console.log('id', this.idRespuesta)
    console.log('idCurso', this.idCurso)
    console.log('idPregunta', this.idPregunta)
    this.getCurso();
    this.getPregunta();
    this.initEditForm();
  }

  getCurso() {
    this.cursoService.getById(this.idCurso)
      .subscribe(x => {
        this.curso = x
        this.form.controls['curso'].setValue(this.curso?.nombreCurso);
      })
  }
  getPregunta() {
    this.preguntaService.getPreguntaById(this.idPregunta)
      .subscribe(x => {
        this.pregunta = x
        this.form.controls['pregunta'].setValue(this.pregunta?.nombrePregunta);
      })
  }

  grabar() {
    const respuesta = new Respuesta();
    const pregunta = new Pregunta()


    if (this.idRespuesta != null) {
      respuesta.idRespuesta = this.idRespuesta;
    }

    pregunta.idPregunta = this.idPregunta
    respuesta.pregunta = pregunta
    respuesta.enunciado = this.form.get('enunciado')?.value;
    respuesta.retroAlimentacion = this.form.get('retroalimentacion')?.value;
    respuesta.respuestaCorrecta = this.form.get('indRespuesta')?.value;
    respuesta.estado = 'ACT'

    this.respuestaService.save(respuesta)
      .pipe(catchError(error => {
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
        this.clearForm();
        this.snackBar.open('Se registro correctamente la respuesta', 'X', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000,
          panelClass: ["ok-style"]

        });
      })

  }

  elegirRespuesta(event: any) {
    this.form.controls['enunciado'].setValue(event.value);
  }


  initEditForm() {
    if (this.idRespuesta != null) {
      this.respuestaService.getById(this.idRespuesta!).subscribe(c => {
        this.idCurso = c.pregunta.curso.idCurso
        this.idPregunta = c.pregunta.idPregunta
        this.getCurso()
        this.getPregunta()
        this.form.controls['enunciado'].setValue(c.enunciado);
        this.form.controls['retroalimentacion'].setValue(c.retroAlimentacion);
        this.form.controls['indRespuesta'].setValue(c.respuestaCorrecta);
      });
    }
  }

  clearForm() {
    this.form.reset();
  }

  cancelar() {
    this.router.navigate(['/pages/respuesta']);
  }

}
