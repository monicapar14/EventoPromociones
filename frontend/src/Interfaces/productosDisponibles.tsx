export interface ProductosObtenidos {
  id_producto: number;
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
  id_producto: number,
  nombre: string;
  precio: number;
}