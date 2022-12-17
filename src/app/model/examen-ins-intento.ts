import { ExamenInscripcion } from './examen-inscripcion';
import { ExamenInscripcionIntentoRespuesta } from './examen-ins-intento-respuesta';
export class ExamenInscripcionIntento {

  idExamSoliInscIntento!: number;
  examenSolicitudInscripcion!: ExamenInscripcion;
  numeroIntento!: number;
  fechaInicio!: Date;
  fechaTermino!: Date;
  nota!: number;
  estado!: string;
  detalleRespuestas: ExamenInscripcionIntentoRespuesta[] = [];
}
