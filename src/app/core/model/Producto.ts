import {Empresa} from "./Empresa";

export interface Producto{
  id?: number
  nombre: string
  precio: number
  descripcion: string
  img: string
  tipo: string
  idEmpresa:Empresa,/*
  idempresa?: number*/
}
