import { Curso } from './curso';
export class CursoGrupo {
  idCursoGrupo!: string;
  curso!: Curso;
  nombreGrupo!: string;
  fechaInicio!: Date;
  fechaFin!: Date;
  estado!: string;
}
