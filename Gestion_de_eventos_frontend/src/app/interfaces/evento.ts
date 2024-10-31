export interface Evento {
  id_evento?: number;
  nombre_evento: string;
  fecha_evento: Date;
  ubicacion_evento: string;
  descripcion_evento: string;
  organizador_id: number;
}
