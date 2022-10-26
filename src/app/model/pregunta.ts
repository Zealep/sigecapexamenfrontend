import { Curso } from './curso';
import { TipoPregunta } from './tipo-pregunta';
export class Pregunta{
  idPregunta!: string;
  curso!: Curso;
  tipoPregunta!: TipoPregunta;
  nombrePregunta!: string;
  enunciado!: string;
  puntuacion!: number;
  retroalimentacion!: string;
  estado!: string
}
