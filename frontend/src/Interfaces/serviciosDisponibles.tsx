export interface ServiciosObtenidos {
  id_servicio: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

export interface DescuentosDisponibles {
  campoC: number;
  campoP: number;
  descuento: number;
}

export interface ObtenidosSeleccionados {
  id_servicio: number,
  nombre: string;
  precio: number;
}

export interface ServiciosSeleccionados {
  id_servicio: number;
  nombre: string;
  precio: number;
}