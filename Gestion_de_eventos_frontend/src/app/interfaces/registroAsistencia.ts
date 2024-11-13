export interface RegistroAsistencia {
  id_registro?: number;
  evento_id: number;
  usuario_id: number;
  fecha_registro: Date;
  asistio: boolean;
  fecha_confirmacion?: Date | null;
}
