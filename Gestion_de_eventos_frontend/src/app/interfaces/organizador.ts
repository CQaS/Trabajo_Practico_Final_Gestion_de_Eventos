export interface Organizador {
  id_organizador?: number;
  nombre_organizador: string;
  email_organizador: string;
  tipo_organizador: 'persona' | 'empresa';
  nombre_empresa: string | null;
  nif_empresa: string | null;
}
