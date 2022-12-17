import { ExamenApertura } from './examen-apertura';
export class ExamenInscripcion {

  idExamenSolicitudInscripcion!: number;
  idSolicitudInscripcionDetalle!: string;
  examenApertura!: ExamenApertura;
  indicadorRealizoExamen!: string;
  numeroIntentoRealizado!: number;
}
