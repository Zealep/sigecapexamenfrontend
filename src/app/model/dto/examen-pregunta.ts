import { ExamenRespuestasDTO } from './examen-respuestas';
export class ExamenPreguntaDTO {
  idPregunta!: string;
  enunciadoPregunta!: string;
  retroAlimentacionPregunta!: string;
  idTipoPregunta!: string;
  nombreTipoPregunta!: string;
  respuestas: ExamenRespuestasDTO[] = [];
}
