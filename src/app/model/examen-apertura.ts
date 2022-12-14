import { Examen } from './examen';
import { Pregunta } from './pregunta';
import { CursoGrupo } from './curso-grupo';
export class ExamenApertura {
  idExamenApertura!: string
  examen!: Examen
  cursoGrupo!: CursoGrupo
  fechaHoraApertura!: Date
  fechaHoraCierre!: Date
  tiempoDuracion!: number
  numeroIntentos!: number
  estado!: string
  indEncuesta!: string
}
