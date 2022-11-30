
import { Pregunta } from './pregunta';

export class Respuesta {
  idRespuesta!: string;
  pregunta!: Pregunta;
  enunciado!: string;
  retroAlimentacion!: string;
  respuestaCorrecta!: string;
  estado!: string
}
