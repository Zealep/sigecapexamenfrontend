import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormControl } from '@angular/forms';
import { PreguntaService } from '../../../../service/pregunta.service';
import { CursoService } from '../../../../service/curso.service';
import { TipoPreguntaService } from '../../../../service/tipo-pregunta.service';
import { Curso } from '../../../../model/curso';
import { TipoPregunta } from '../../../../model/tipo-pregunta';
import { Pregunta } from '../../../../model/pregunta';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pregunta-form',
  templateUrl: './pregunta-form.component.html',
  styleUrls: ['./pregunta-form.component.css']
})
export class PreguntaFormComponent implements OnInit {

  idPregunta!: string;
  cursos: Curso[] = [];
  tipoPreguntas: TipoPregunta[] = [];

  form: FormGroup = new FormGroup({
    curso: new FormControl(''),
    tipoPregunta: new FormControl(''),
    nombrePregunta: new FormControl(''),
    enunciado: new FormControl(''),
    puntuacion: new FormControl(''),
    retroalimentacion: new FormControl('')
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
    private tipoPreguntaService: TipoPreguntaService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.idPregunta = this.route.snapshot.paramMap.get('id')!;
    console.log('id', this.idPregunta)
    this.getCursos();
    this.getTiposPreguntas();
    this.initEditForm();
  }

  getCursos() {
    this.cursoService.getCursos().subscribe(x => {
      this.cursos = x;
    })
  }
  getTiposPreguntas() {
    this.tipoPreguntaService.getTipoPreguntas().subscribe(x => {
      this.tipoPreguntas = x;
    })
  }

  grabar() {
    const pregunta = new Pregunta();
    const curso = new Curso();
    const tipoPregunta = new TipoPregunta();

    if (this.idPregunta != null) {
      pregunta.idPregunta = this.idPregunta;
    }

    curso.idCurso = this.form.get('curso')?.value;
    tipoPregunta.idTipoPregunta = this.form.get('tipoPregunta')?.value;
    pregunta.curso = curso;
    pregunta.tipoPregunta = tipoPregunta;
    pregunta.nombrePregunta = this.form.get('nombrePregunta')?.value;
    pregunta.puntuacion = this.form.get('puntuacion')?.value;
    pregunta.enunciado = this.form.get('enunciado')?.value;
    pregunta.retroalimentacion = this.form.get('retroalimentacion')?.value;
    pregunta.estado = 'ACT'

    this.preguntaService.save(pregunta)
      .subscribe(x => {
        this.clearForm();
        this.snackBar.open('Se registro la pregunta', 'Close', {
          duration: 5000
        });
      })

  }

  initEditForm() {
    if (this.idPregunta != null) {
      this.preguntaService.getPreguntaById(this.idPregunta!).subscribe(c => {
        this.form.controls['curso'].setValue(c.curso?.idCurso);
        this.form.controls['tipoPregunta'].setValue(c.tipoPregunta?.idTipoPregunta);
        this.form.controls['nombrePregunta'].setValue(c.nombrePregunta);
        this.form.controls['enunciado'].setValue(c.enunciado);
        this.form.controls['puntuacion'].setValue(c.puntuacion);
        this.form.controls['retroalimentacion'].setValue(c.retroalimentacion);
      });
    }


  }

  clearForm() {
    this.form.reset();
  }

  cancelar() {
    this.router.navigate(['/pages/pregunta']);
  }

}
