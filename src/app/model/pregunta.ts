import { Curso } from './curso';
import { TipoPregunta } from './tipo-pregunta';
export class Pregunta {
  idPregunta!: string;
  curso!: Curso;
  tipoPregunta!: TipoPregunta;
  nombrePregunta!: string;
  enunciado!: string;
  enunciadoTexto!: string;
  puntuacion!: number;
  retroalimentacion!: string;
  estado!: string
  checked!: boolean
}
