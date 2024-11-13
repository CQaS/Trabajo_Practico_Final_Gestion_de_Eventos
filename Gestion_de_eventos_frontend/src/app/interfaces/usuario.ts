export interface Usuario {
  id_usuario: number;
  nombre_usuario: string;
  email_usuario: string;
  telefono_usuario: number;
  fecha_registro?: Date;
  direccion_usuario: string;
  sexo_usuario: 'M' | 'F' | 'Otro';
  dni_usuario: string;
}
