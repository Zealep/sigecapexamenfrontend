import { Curso } from './curso';
import { ExamenPregunta } from './examen-pregunta';
export class Examen {
  idExamen!: string
  curso!: Curso
  nombreExamen!: string
  estado!: string
  detalleExamen!: ExamenPregunta[]
}
