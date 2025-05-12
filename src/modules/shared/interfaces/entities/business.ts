export interface IEmpresa {
    id: number;
    nombreCategoria: string;
    nombreEmpresa: string;
    pais: string;
    ciudad: string;
    estado: string;
    foto: null | string;
    promedioCalificacion: number;
    totalComentarios: number;
    slugEmpresa: string;
  }