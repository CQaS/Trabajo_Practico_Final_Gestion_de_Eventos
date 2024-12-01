import { RegistroAsistencia } from './registroAsistencia';

export interface Certificado {
  id_certificado?: number; // ID único del certificado
  registro_id: number;
  url_certificado: string;
  fecha_emision: Date;
  registroAsistencia?: RegistroAsistencia;
}
